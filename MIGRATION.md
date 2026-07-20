# skick client — Framework Migration Plan

Migrate the skick (societySidekick) client from the **thZero 0.16 / Vue 2** framework
generation to the **thZero 0.18 / Vue 3** generation, matching the reference app at
`D:\programming\javascript\thzero\client`.

**Style:** incremental — keep the app compiling/booting at phase checkpoints, port feature
areas one at a time, verify each phase before moving on.

---

## 1. What this migration is

Not a version bump — a full framework-generation jump. Every layer changes at once.

| Layer | Current (skick) | Target (thzero 0.18) |
|---|---|---|
| Vue | Vue 2 (2.6) | Vue 3 |
| State | Vuex 3 + vuex-persist | Pinia (`library_client_vue3_store_pinia`) |
| Build | vue-cli / webpack (`openssl-legacy-provider`) | Vite 8, ESM (`"type":"module"`) |
| UI | Vuetify 2 | Vuetify 3 (`library_client_vue3_vuetify3`) |
| HTTP | axios (`service_rest_axios`) | fetch (`service_rest_fetch`) |
| Router | vue-router 3 | vue-router 4 |
| thZero libs | 0.16.x | 0.18.x |
| Node | legacy | ≥ 22 |

### The key structural change: vendored submodules → npm packages
skick vendors two framework libraries as **git submodules** and imports from them directly
(e.g. `main.js` → `@/library_vue_vuetify/boot/main`). In the new framework these are
**deleted** and replaced by published npm packages:

| Vendored submodule (DELETE) | Replaced by npm package (0.18) |
|---|---|
| `src/library_vue` | `@thzero/library_client_vue3` |
| `src/library_vue_vuetify` | `@thzero/library_client_vue3_vuetify3` |

`src/common` (societySidekick-common) **stays** a submodule. `.gitmodules` shrinks to just it.

---

## 2. Scope

- **129 `.vue` components** — including `admin/`, and game-system trees
  `gameSystems/pathfinder2e/` + `gameSystems/starfinder1e/`.
- **~12 Vuex store modules** → Pinia.
- **~15 service files** — mostly reusable as-is; only base classes + REST transport swap.
- Build, entry/boot, router, i18n/validate, firebase/deploy config.

---

## 3. Reference patterns (from thzero, the target app)

**Entry — `src/main.js`:**
```js
import 'vuetify/styles';
import bootStarter from '@thzero/library_client_firebase_vue/boot/starter';
import bootEventBus from '@thzero/library_client_vue3/boot/eventBus';
import bootServices from '@/boot/services';
import bootUi from '@/boot/ui';
import router from '@/router';
import store from '@/store/pinia';
import start from '@thzero/library_client_vue3/boot/main';
import App from '@/components/App.vue';
start(App, router, store, [ booti18n, bootEventBus, bootServices, bootValidate, bootUi, bootCookieComply ],
      bootStarter, { idGenerator: { ...AppConstants.IdGenerator } });
```

**Store — `src/store/pinia.js`:** single `AppStore extends BaseStore` (from
`@thzero/library_client_vue3_store_pinia/store/index`) with override methods:
`_initStoreConfigState/Actions/Getters/Dispatchers` (+ `...Base()`/`...Additional()` splits),
`_initPluginPersistConfig`, `_initModules(addModule)`.

**Services — `src/boot/services.js`:** unchanged shape; only import swaps —
`service_rest_axios` → `service_rest_fetch`, base class stays `RootServicesBoot`.

**Build — `vite.config.js`:** copy thzero's; it already contains the
config-injection (`local-config`, `open-source-config` aliases) and the generated
`src/openSource.js` logic.

---

## 4. Vuex → Pinia transform (the repeated store task)

The `dispatcher` / `actions` / `getters` pattern **survives**. The one real change:
**Pinia has no mutations** — each `mutations.setX(state, params)` becomes an async
`actions.setX(correlationId, ...)` that mutates `this.*` directly, and callers use
`this.setX(...)` instead of `commit('setX', ...)`. Getters become plain functions reading
`LibraryClientUtility.$store.*`.

**Before (Vuex, `store/classes/index.js`):**
```js
actions: {
  async getClassListing({ commit }, params) {
    ...
    commit('setClassListing', { correlationId, listing });
  }
},
mutations: {
  setClassListing(state, params) { state.listing = ...; }
}
```

**After (Pinia module):**
```js
_initStoreConfigActions() {
  return {
    async getClassListing(correlationId, gameSystemId) {
      ...
      this.setClassListing(correlationId, listing);   // was commit()
    },
    async setClassListing(correlationId, listing) {    // was a mutation
      this.listing = ...;
    }
  };
}
```
Confirm the exact per-domain-module registration shape against
`@thzero/library_client_vue3_store_pinia` before batch-porting all 12 modules
(thzero's own app has no domain modules to copy, so the library is the source of truth here).

---

## 5. Vuetify 2 → 3 component changes (largest effort — 129 files)

Recurring breaking changes to sweep for:
- `.sync` modifier → `v-model:propName`
- `@input` / `value` → `@update:modelValue` / `modelValue` (or `v-model`)
- `$listeners` removed (merged into `$attrs`); `$scopedSlots` → `$slots`
- Vue 2 filters (`{{ x | filter }}`) removed → methods/computed
- `v-list-item` slot API rework; `v-list-item-content`/`-title` changes
- Input components (`v-text-field`, `v-select`, `v-checkbox`) prop/event changes
- `v-dialog` / `v-menu` activator slot + `v-model` changes
- Base components now imported from npm packages, not the vendored submodules
- Options API tweaks for the event bus / async-computed boot

---

## 6. Phased execution (verify at each checkpoint)

### Phase 0 — Prep
- [ ] Create migration branch off `dev`.
- [ ] Commit current WIP (`src/store/classes/index.js` is modified).
- [ ] Remove vendored submodules `src/library_vue`, `src/library_vue_vuetify`; update `.gitmodules` to keep only `src/common`.
- [ ] Snapshot: record current build works / doesn't as baseline.
- **Verify:** submodules gone, `src/common` intact, repo still checks out clean.

### Phase 1 — Build + deps + entry (goal: near-empty app serves under Vite)
- [ ] Rewrite `package.json` — `"type":"module"`, 0.18 deps + vue3 variants, drop vuex/vuex-persist/vue-router/vuetify2/vue-cli, scripts `dev`/`build`/`preview`, `engines.node >=22`.
- [ ] Add root `index.html`, `vite.config.js` (from thzero), `jsconfig.json`. Delete `babel.config.js`, vue-cli eslint config.
- [ ] Rewrite `src/main.js` to the new `start()` signature.
- [ ] `npm install`; get `npm run dev` to serve (stub `App.vue` if needed).
- **Verify:** `npm run dev` boots; blank/shell page renders with no console errors.

### Phase 2 — Store + services + router + shell
- [ ] `boot/services.js` — swap `service_rest_axios` → `service_rest_fetch`; add `boot/ui.js`, `boot/network.js`.
- [ ] `store/index.js` → `store/pinia.js` (AppStore root config: gameSystems, organizedPlay, plans, settings, version).
- [ ] Port 12 domain store modules to Pinia (classes, boons, characters, equipment, factions, scenarios + admin/{boons,classes,equipment,factions,scenarios}).
- [ ] Router → vue-router 4; add `layouts/` (MainLayout etc.).
- [ ] `App.vue` shell + navigation booting.
- **Verify:** app boots to shell, routes resolve, store initialize() populates gameSystems, no store/DI errors.

### Phase 3 — Core pages + shared/base components
- [ ] Base components: `base.vue`, `baseEdit.vue`, `baseDashboard.vue`, `baseFilter.vue`, `App.vue`, `Auth.vue`.
- [ ] Core pages: `Home`, `About`, `News`, `Profile`, `Settings`, `Support`, `OpenSource`, `NotFound`, `ShareDialog`, `Cards`, `Favorites`, `Characters`, `Scenarios`.
- **Verify:** log in, navigate all core pages, Vuetify 3 renders correctly, forms/validation work.

### Phase 4 — Game systems + admin
- [ ] `components/gameSystems/*` base + shared (Boon*, Character*, Scenario*, Inventory*, snippets, colorize).
- [ ] `components/gameSystems/pathfinder2e/*`.
- [ ] `components/gameSystems/starfinder1e/*`.
- [ ] `components/admin/*` (baseListing + boons/classes/equipment/factions/news/scenarios/users edit+listing dialogs).
- **Verify:** exercise a full character flow per game system; admin CRUD works end-to-end.

### Phase 5 — Config, deploy, QA
- [ ] `boot/i18n.js`, `boot/validate.js`, `locales/`, config JSON injection.
- [ ] `firebase.json` (dist output), `Dockerfile`, `cloudbuild.yaml`, `.gitignore`.
- [ ] Full regression pass; production `npm run build` + `preview`.
- **Verify:** clean prod build, deploy dry-run, no runtime regressions vs. old app.

---

## 7. Open questions / risks
- **Pinia domain-module shape** — confirm against the 0.18 store library (thzero app has no domain modules to copy from). Resolve before Phase 2 batch port.
- **`src/common` submodule** — does the societySidekick-common submodule itself need a 0.18-compatible update (it feeds services + gameSystems logic)? Check its version/branch.
- **Game-system snippet complexity** — pathfinder2e/starfinder1e trees are the deepest; budget the most component-conversion time here.
- **i18n loader** — `@alienfast/i18next-loader` 1.x → 2.x (webpack loader → Vite plugin usage may differ).
