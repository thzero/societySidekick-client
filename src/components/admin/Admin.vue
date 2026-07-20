<template>
	<v-container fluid>
		<v-navigation-drawer
			v-model="drawer"
			temporary
			style="z-index: 2"
		>
			<v-list
				density="compact"
				class="pt-0"
			>
				<v-list-item
					v-for="tab of tabSupport.tabs"
					:key="tab.index"
					@click="clickTab(tab.index)"
				>
					<template
						v-if="tab.icon"
						#prepend
					>
						<v-icon>{{ tab.icon }}</v-icon>
					</template>
					<v-list-item-title>{{ tab.label }}</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<div class="flex-container">
			<div
				class="flex-item hidden-sm-and-down"
				style="padding-top: 10px"
			>
				<v-tabs
					v-model="tabSupport.currentTab"
					direction="vertical"
				>
					<v-tab
						v-for="tab of tabSupport.tabs"
						:key="tab.index"
						:value="tab.index"
						style="justify-content: start; margin-left: 0px"
						@click="clickTab(tab.index)"
					>
						<v-icon
							v-if="tab.icon"
							start
						>
							{{ tab.icon }}
						</v-icon>
						{{ tab.label }}
					</v-tab>
				</v-tabs>
			</div>
			<div class="flex-item2">
				<!-- // Admin Update -->
				<NewsListing v-if="tabSupport.currentTab === tabNews" />
				<BoonsListing v-if="tabSupport.currentTab === tabBoons" />
				<ClassesListing v-if="tabSupport.currentTab === tabClasses" />
				<EquipmentListing v-if="tabSupport.currentTab === tabEquipment" />
				<FactionsListing v-if="tabSupport.currentTab === tabFactions" />
				<ScenariosListing v-if="tabSupport.currentTab === tabScenarios" />
				<UsersListing v-if="tabSupport.currentTab === tabUsers" />
			</div>
		</div>
	</v-container>
</template>

<script>
import LibraryClientUtility from '@thzero/library_client/utility/index';

import { useBaseAdminComponent } from '@thzero/library_client_vue3/components/baseAdmin';

// Admin Update
import BoonsListing from '@/components/admin/boons/Listing';
import ClassesListing from '@/components/admin/classes/Listing';
import EquipmentListing from '@/components/admin/equipment/Listing';
import FactionsListing from '@/components/admin/factions/Listing';
import NewsListing from '@/components/admin/news/Listing';
import ScenariosListing from '@/components/admin/scenarios/Listing';
import UsersListing from '@/components/admin/users/Listing';

export default {
	name: 'Admin',
	components: {
		// Admin Update
		BoonsListing,
		ClassesListing,
		EquipmentListing,
		FactionsListing,
		NewsListing,
		ScenariosListing,
		UsersListing
	},
	setup(props, context) {
		// Admin Update
		const tabNews = 0;
		const tabBoons = 1;
		const tabClasses = 2;
		const tabEquipment = 3;
		const tabFactions = 4;
		const tabScenarios = 5;
		const tabUsers = 6;

		const base = useBaseAdminComponent(props, context, {
			initializeTabs: (tabSupport) => {
				// TODO: Depending on security results, only some of these should be displayed...
				// Admin Update
				tabSupport.add(tabNews, 'mdi-newspaper-variant-outline', LibraryClientUtility.$trans.t('admin.news'));
				tabSupport.add(tabBoons, 'mdi-star-outline', LibraryClientUtility.$trans.t('admin.boons'));
				tabSupport.add(tabClasses, 'mdi-account-group-outline', LibraryClientUtility.$trans.t('admin.classes'));
				tabSupport.add(tabEquipment, 'mdi-sword', LibraryClientUtility.$trans.t('admin.equipment'));
				tabSupport.add(tabFactions, 'mdi-flag-outline', LibraryClientUtility.$trans.t('admin.factions'));
				tabSupport.add(tabScenarios, 'mdi-script-text-outline', LibraryClientUtility.$trans.t('admin.scenarios'));
				tabSupport.add(tabUsers, 'mdi-account-multiple-outline', LibraryClientUtility.$trans.t('admin.users'));
			}
		});

		return {
			...base,
			tabNews,
			tabBoons,
			tabClasses,
			tabEquipment,
			tabFactions,
			tabScenarios,
			tabUsers
		};
	}
};
</script>

<style scoped>
.flex-container {
	padding: 0;
	margin: 0;
	list-style: none;

	display: -webkit-box;
	display: -moz-box;
	display: -ms-flexbox;
	display: -webkit-flex;
	display: flex;

	height: 100%;
}

.flex-item {
	flex-grow: 0;
	margin-right: 10px;
}

.flex-item2 {
	flex-grow: 1;
}

.v-navigation-drawer--temporary {
	z-index: auto;
}
</style>
