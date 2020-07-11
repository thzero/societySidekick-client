<template>
	<v-card
		class="pl-2 pr-2"
	>
		<v-card-text
			pa-0
			ma-0
			style="padding-left: 0px; padding-right: 0px;"
		>
			<table>
				<tr>
					<th
						class="text-left subtitle-2 gameSystemHeaderSpacer"
					>
						{{ $t('forms.name' ) }}
					</th>
					<td
						class="text-top body-2"
					>
						{{ value.name }}
					</td>
				</tr>
				<tr>
					<th
						class="text-left subtitle-2 gameSystemHeaderSpacer"
					>
						{{ $t('favorites.name' ) }}
					</th>
					<td
						class="text-top body-2"
					>
						{{ value.favorite ? $t('strings.yes') : $t('strings.no') }}
					</td>
				</tr>
			</table>
		</v-card-text>
		<v-card-actions>
			<v-spacer />
			<v-btn
				color="primary lighten-1"
				text
				@click="dialogFavoriteOpen()"
			>
				{{ $t('buttons.edit') }}
			</v-btn>
			<v-btn
				color="primary lighten-1"
				text
				@click="dialogFavoriteDelete()"
			>
				{{ $t('buttons.delete') }}
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import base from '@/library_vue/components/base';

export default {
	name: 'Favorite',
	extends: base,
	props: {
		value: {
			type: Object,
			default: null
		}
	},
	methods: {
		dialogFavoriteDelete() {
			this.$emit('dialogFavoriteDelete', this.value);
		},
		dialogFavoriteOpen() {
			this.$emit('dialogFavoriteEdit', this.value);
		}
	}
};
</script>
