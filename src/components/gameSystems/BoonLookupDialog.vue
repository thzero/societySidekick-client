<template>
	<VFormDialog
		:label="$t('characters.boons.namePlural')"
		:signal="signal"
		:button-clear="false"
		:button-ok="false"
		:fullscreen="fullscreenInternal"
		max-width="700px"
		@close="close"
		@cancel="cancel"
	>
		<v-layout
			wrap
			pa-0
		>
			<v-flex
				xs12
				sm12
				md4
				:pr-4="$vuetify.breakpoint.mdAndUp"
			>
				<VTextFieldWithValidation
					ref="boonName"
					v-model="boonNameFilter"
					vid="boonName"
					:label="$t('characters.boons.name') + ' ' + $t('forms.name')"
				/>
			</v-flex>
			<v-flex
				xs12
			>
				<v-card
					v-for="item in boons"
					:key="item.id"
					class="mb-3"
				>
					<v-card-title
						class="pb-2"
					>
						{{ boonName(item) }}
					</v-card-title>
					<v-card-text
						class="pb-2"
					>
						{{ item.description }}
					</v-card-text>
					<v-card-actions>
						<v-spacer />
						<v-btn
							color="primary lighten-1"
							text
							@click="ok(item.id)"
						>
							{{ $t('buttons.select') }}
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-flex>
		</v-layout>
	</VFormDialog>
</template>

<script>
import baseBoonLookupDialog from '@/components/gameSystems/baseBoonLookupDialog';

export default {
	name: 'BoonLookupDialog',
	extends: baseBoonLookupDialog
};
</script>

<style scoped>
</style>
