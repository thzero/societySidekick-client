<template>
	<div>
		<v-row class="pt-2">
			<v-col
				cols="9"
				sm="9"
				md="5"
				class="mb-4 notPrintable"
			>
				<v-card>
					<v-card-text>
						<VtSelect
							v-if="!external"
							v-model="gameSystemFilter"
							:items="gameSystems"
							:flat="true"
							:hide-details="true"
							:solo-inverted="true"
							:label="$t('forms.gameSystem')"
							class="pb-1"
						/>
						<VtTextField
							v-if="external"
							v-model="gameSystemName"
							:flat="true"
							:hide-details="true"
							:solo-inverted="true"
							:label="$t('forms.gameSystem')"
							:readonly="true"
							class="pb-1"
						/>
						<VtSelect
							v-model="printSizeId"
							:items="printSizes"
							:flat="true"
							:hide-details="true"
							:solo-inverted="true"
							:label="$t('forms.gameSystem')"
							class="pb-1"
						/>
					</v-card-text>
				</v-card>
			</v-col>
			<v-col
				cols="3"
				sm="3"
				md="7"
				class="mb-1 notPrintable"
			>
				<table
					border="0"
					cellspacing="0"
					cellpadding="0"
					style="margin-right: 0px; margin-left: auto;"
				>
					<tr>
						<td
							style="padding-right: 4px;"
						>
							<v-btn
								v-if="gameSystemFilter"
								variant="flat"
								size="large"
								class="mb-2"
								style="min-width: 0px"
								@click="clickPrint()"
							>
								<v-icon>mdi-printer</v-icon>
							</v-btn>
						</td>
					</tr>
					<tr>
						<td>
							<v-btn
								v-if="isAuthenticated && gameSystemFilter"
								variant="flat"
								size="large"
								style="min-width: 0px"
								@click="dialogShareOpen()"
							>
								<v-icon>mdi-share-variant</v-icon>
							</v-btn>
						</td>
					</tr>
				</table>
			</v-col>
			<v-col
				v-if="gameSystemFilter"
				cols="12"
				class="pl-2 pr-2 pb-4"
				style="text-align: center"
			>
				<v-card
					class="mx-auto rotated"
					:max-width="printSize.width"
					:max-height="printSize.height"
				>
					<v-img
						v-if="imagePath"
						class="text-white align-end"
						:width="printSize.width"
						:src="imagePath"
					/>
					<v-card-subtitle>
						<div>
							<v-chip
								color="success"
								variant="outlined"
								label
							>
								{{ userDisplayName }}
							</v-chip>
						</div>
						<div
							class="mt-2 printable"
						>
							<v-chip
								color="success"
								variant="outlined"
								label
							>
								#{{ gameSystemNumber }}
							</v-chip>
						</div>
					</v-card-subtitle>
				</v-card>
			</v-col>
		</v-row>
		<ShareDialog
			ref="shareDialogRef"
			:label="$t('characters.share') + ' ' +$t('cards.namePlural')"
			:signal="dialogShare.signal"
			url="cards"
			@cancel="dialogShare.cancel()"
			@ok="dialogShare.ok()"
		/>
	</div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import LibraryConstants from '@thzero/library_client/constants';

import AppUtility from '@/utility/app';
import GameSystemsUtility from '@/utility/gameSystems';
import LibraryClientUtility from '@thzero/library_client/utility/index';
import VueUtility from '@thzero/library_client_vue3/utility/index';

import { useBaseComponent } from '@/components/base';

import ShareDialog from '@/components/ShareDialog';
import VtSelect from '@thzero/library_client_vue3_vuetify3/components/form/VtSelect';
import VtTextField from '@thzero/library_client_vue3_vuetify3/components/form/VtTextField';

import DialogSupport from '@thzero/library_client_vue3/components/support/dialog';

const check = (to) => {
	return VueUtility.checkHasParams(to);
};

// TODO(migration): human review:
//  1. Route guards beforeRouteEnter/beforeRouteUpdate kept as component options alongside setup()
//     (Vue Router 4 still supports in-component guards this way); params read via useRoute().
//  2. :solo-inverted / :flat on VtSelect/VtTextField are Vuetify2-era; Vuetify3 uses `variant`.
//  3. isLoggedIn was referenced in the original without parens (always truthy); behavior preserved.
export default {
	name: 'Cards',
	components: {
		ShareDialog,
		VtSelect,
		VtTextField
	},
	setup(props, context) {
		const shareDialogRef = ref(null);

		const {
			correlationId,
			error,
			hasFailed,
			hasSucceeded,
			initialize,
			logger,
			noBreakingSpaces,
			notImplementedError,
			success,
			successResponse
		} = useBaseComponent(props, context);

		const route = useRoute();

		const serviceUsers = LibraryClientUtility.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_USER);

		const dialogShare = ref(new DialogSupport());
		const external = ref(false);
		const gameSystemFilter = ref(null);
		const printSizeId = ref('bc');
		const printSizes = ref([
			{ id: 'bc', name: 'Business Card', width: '3.5in', height: '2in' },
			{ id: 'a2', name: 'A2', width: '5.5in', height: '4.25in' },
			{ id: 'a6', name: 'A6', width: '6.25in', height: '4.5in' }
		]);
		const user = ref(null);

		const gameSystemName = computed({
			get() {
				const results = LibraryClientUtility.$store.getters.getGameSystem(correlationId(), gameSystemFilter.value);
				return results ? results.name : '';
			},
			set() {}
		});
		const gameSystemNumber = computed(() => {
			return GameSystemsUtility.gameSystemNumber(correlationId(), user.value, gameSystemFilter.value);
		});
		const gameSystems = computed(() => {
			let results = LibraryClientUtility.$store.gameSystems.slice(0);
			results = results.filter(l => {
				return GameSystemsUtility.gameSystemNumber(correlationId(), user.value, l.id);
			});
			return results;
		});
		const imagePath = computed(() => {
			if (gameSystemFilter.value)
				return `/images/gameSystems/${gameSystemFilter.value}.png`;
			return null;
		});
		const isAuthenticated = computed(() => {
			return LibraryClientUtility.$store.user.user != null;
		});
		const printSize = computed(() => {
			return printSizes.value.find(l => l.id == printSizeId.value);
		});
		const userDisplayName = computed(() => {
			return AppUtility.userDisplayName(user.value);
		});

		const clickPrint = () => {
			window.print();
		};
		const dialogShareOpen = () => {
			shareDialogRef.value.openDialog(gameSystemFilter.value);
			dialogShare.value.open();
		};
		const gamerTag = () => {
			return route.params.gamerTag;
		};
		const isLoggedIn = () => {
			return LibraryClientUtility.$store.user && LibraryClientUtility.$store.user.isLoggedIn;
		};
		const fetch = async (correlationIdI) => {
			if (!serviceUsers)
				return;

			const key = route.params.key ? route.params.key.trim() : null;
			if (key) {
				const gameSystem = AppUtility.findSharedConstantsGameSystemByFriendlyId(key);
				if (!gameSystem) {
					VueUtility.invalid();
					return;
				}

				gameSystemFilter.value = gameSystem.id;
			}
			else if (!LibraryClientUtility.$store.user.user) {
				VueUtility.invalid();
				return;
			}

			const gamerTagValue = gamerTag();
			if (!gamerTagValue) {
				if (!isLoggedIn)
					VueUtility.invalid();
				user.value = LibraryClientUtility.$store.user.user;
				logger.debug('Cards', 'fetch', 'user', user.value, correlationIdI);
				return;
			}

			const responseUser = await serviceUsers.fetchByGamerId(correlationIdI, gamerTagValue);
			logger.debug('Cards', 'fetch', 'response', responseUser, correlationIdI);
			if (hasSucceeded(responseUser)) {
				user.value = responseUser.results;
				external.value = true;
				logger.debug('Cards', 'fetch', 'user', user.value, correlationIdI);
				return;
			}

			VueUtility.invalid();
		};

		onMounted(async () => {
			check(route);

			await fetch(correlationId());
		});

		return {
			correlationId,
			error,
			hasFailed,
			hasSucceeded,
			initialize,
			logger,
			noBreakingSpaces,
			notImplementedError,
			success,
			successResponse,
			shareDialogRef,
			dialogShare,
			external,
			gameSystemFilter,
			printSizeId,
			printSizes,
			user,
			gameSystemName,
			gameSystemNumber,
			gameSystems,
			imagePath,
			isAuthenticated,
			printSize,
			userDisplayName,
			clickPrint,
			dialogShareOpen,
			gamerTag,
			isLoggedIn,
			fetch
		};
	},
	// eslint-disable-next-line
	async beforeRouteEnter (to, from, next) {
		const results = check(to);
		if (results)
			next();
	},
	// eslint-disable-next-line
	async beforeRouteUpdate (to, from, next) {
		this.logger.debug('Cards', 'beforeRouteUpdate', null, null, this.correlationId());
		const results = check(to);
		if (results)
			next();
	}
};
</script>

<style scoped>
</style>

<style>
@media print {
	.notPrintable { display: none; }
}
.v-image__image {
	-webkit-print-color-adjust: exact;
}
</style>
