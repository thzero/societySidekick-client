<template>
	<div>
		<v-layout
			wrap
			pt-2
		>
			<v-flex
				xs9
				sm9
				md5
				mb-4
				class="notPrintable"
			>
				<v-card>
					<v-card-text>
						<VSelect2
							v-if="!external"
							ref="gameSystems"
							v-model="gameSystemFilter"
							:items="gameSystems"
							:flat="true"
							:hide-details="true"
							:solo-inverted="true"
							:label="$t('forms.gameSystem')"
							class="pb-1"
						/>
						<VText2
							v-if="external"
							ref="gameSystem"
							v-model="gameSystemName"
							:flat="true"
							:hide-details="true"
							:solo-inverted="true"
							:label="$t('forms.gameSystem')"
							:readonly="true"
							class="pb-1"
						/>
						<VSelect2
							ref="sizes"
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
			</v-flex>
			<v-flex
				xs3
				sm3
				md7
				mb-1
				class="notPrintable"
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
								depressed
								large
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
								depressed
								large
								style="min-width: 0px"
								@click="dialogShareOpen()"
							>
								<v-icon>mdi-share-variant</v-icon>
							</v-btn>
						</td>
					</tr>
				</table>
			</v-flex>
			<v-flex
				v-if="gameSystemFilter"
				xs12
				pl-2
				pr-2
				pb-4
				style="text-align: center"
			>
				<v-card
					class="mx-auto rotated"
					:max-width="printSize.width"
					:max-height="printSize.height"
				>
					<v-img
						v-if="imagePath"
						class="white--text align-end"
						:width="printSize.width"
						:src="imagePath"
					/>
					<v-card-subtitle>
						<div>
							<v-chip
								color="success"
								outlined
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
								outlined
								label
							>
								#{{ gameSystemNumber }}
							</v-chip>
						</div>
					</v-card-subtitle>
				</v-card>
			</v-flex>
		</v-layout>
		<ShareDialog
			ref="shareDialog"
			:label="$t('characters.share') + ' ' +$t('cards.namePlural')"
			:signal="dialogShare.signal"
			url="cards"
			@cancel="dialogShare.cancel()"
			@ok="dialogShare.ok()"
		/>
	</div>
</template>

<script>
import LibraryConstants from '@thzero/library_client/constants';

import AppUtility from '@/utility/app';
import GameSystemsUtility from '@/utility/gameSystems';
import VueUtility from '@/library_vue/utility/index';

import base from '@/library_vue/components/base';
import ShareDialog from '@/components/ShareDialog';
import VSelect2 from '@/library_vue/components/form/VSelect';
import VText2 from '@/library_vue/components/form/VTextField';

import DialogSupport from '@/library_vue/components/support/dialog';

const check = (to) => {
	return VueUtility.checkHasParams(to);
};

export default {
	name: 'Cards',
	components: {
		ShareDialog,
		VSelect2,
		VText2
	},
	extends: base,
	data: () => ({
		dialogShare: new DialogSupport(),
		external: false,
		gameSystemFilter: null,
		printSizeId: null,
		printSizes: [
			{ id: 'bc', name: 'Business Card', width: '3.5in', height: '2in' },
			{ id: 'a2', name: 'A2', width: '5.5in', height: '4.25in' },
			{ id: 'a6', name: 'A6', width: '6.25in', height: '4.5in' }
		],
		user: null
	}),
	computed: {
		gameSystemName: {
			get() {
				const results = this.$store.getters.getGameSystem(this.gameSystemFilter);
				return results ? results.name : '';
			},
			set() {}
		},
		gameSystemNumber() {
			return GameSystemsUtility.gameSystemNumber(this.user, this.gameSystemFilter);
		},
		gameSystems() {
			let results = this.$store.state.gameSystems.slice(0);
			results = results.filter(l => {
				return GameSystemsUtility.gameSystemNumber(this.user, l.id);
			});
			return results;
		},
		imagePath() {
			if (this.gameSystemFilter)
				return `/images/gameSystems/${this.gameSystemFilter}.png`;
			return null;
		},
		isAuthenticated() {
			return this.$store.state.user.user != null;
		},
		printSize() {
			return this.printSizes.find(l => l.id == this.printSizeId);
		},
		userDisplayName() {
			return AppUtility.userDisplayName(this.user);
		}
	},
	created() {
		this.printSizeId = 'bc';
		this.serviceUsers = this.$injector.getService(LibraryConstants.InjectorKeys.SERVICE_USER);
	},
	async mounted() {
		check(this.$route);

		await this.fetch();
	},
	methods: {
		clickPrint() {
			window.print();
		},
		dialogShareOpen() {
			this.$refs.shareDialog.openDialog(this.gameSystemFilter);
			this.dialogShare.open();
		},
		async fetch() {
			if (!this.serviceUsers)
				return;

			const key = this.$route.params.key ? this.$route.params.key.trim() : null;
			if (key) {
				const gameSystem = AppUtility.findSharedConstantsGameSystemByFriendlyId(key);
				if (!gameSystem) {
					VueUtility.invalid();
					return;
				}

				this.gameSystemFilter = gameSystem.id;
			}
			else if (!this.$store.state.user.user) {
				VueUtility.invalid();
				return;
			}

			const gamerTag = this.gamerTag();
			if (!gamerTag) {
				if (!this.isLoggedIn)
					VueUtility.invalid();
				this.user = this.$store.state.user.user;
				this.logger.debug('Cards', 'fetch', 'user', this.user);
				return;
			}

			const responseUser = await this.serviceUsers.fetchByGamerId(gamerTag);
			this.logger.debug('Cards', 'fetch', 'response', responseUser);
			if (responseUser && responseUser.success) {
				this.user = responseUser.results;
				this.external = true;
				this.logger.debug('Cards', 'fetch', 'user', this.user);
				return;
			}

			VueUtility.invalid();
		},
		gamerTag() {
			return this.$route.params.gamerTag;
		},
		isLoggedIn() {
			return this.$store.state.user && this.$store.state.user.isLoggedIn;
		}
	},
	// eslint-disable-next-line
	async beforeRouteEnter (to, from, next) {
		// called before the route that renders this component is confirmed.
		// does NOT have access to `this` component instance,
		// because it has not been created yet when this guard is called!
		const results = check(to);
		if (results)
			next();
	},
	// eslint-disable-next-line
	async beforeRouteUpdate (to, from, next) {
		// called when the route that renders this component has changed,
		// but this component is reused in the new route.
		// For example, for a route with dynamic params `/foo/:id`, when we
		// navigate between `/foo/1` and `/foo/2`, the same `Foo` component instance
		// will be reused, and this hook will be called when that happens.
		// has access to `this` component instance.
		this.logger.debug('Cards', 'beforeRouteUpdate');
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
/* .rotated {
	margin-top: 100px;
	transform: rotate(90deg);
} */
.v-image__image {
	-webkit-print-color-adjust: exact;
}
</style>
