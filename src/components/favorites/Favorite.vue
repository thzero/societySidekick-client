<template>
	<v-card
		class="pl-2 pr-2"
	>
		<v-card-text
			style="padding-left: 0px; padding-right: 0px;"
		>
			<table>
				<tr>
					<th class="text-left subtitle-2 gameSystemHeaderSpacer">
						{{ $t('forms.name' ) }}
					</th>
					<td class="text-top body-2">
						{{ value.name }}
					</td>
				</tr>
				<tr>
					<th class="text-left subtitle-2 gameSystemHeaderSpacer">
						{{ $t('favorites.name' ) }}
					</th>
					<td class="text-top body-2">
						{{ value.favorite ? $t('strings.yes') : $t('strings.no') }}
					</td>
				</tr>
			</table>
		</v-card-text>
		<v-card-actions>
			<v-spacer />
			<v-btn
				color="primary"
				variant="text"
				@click="dialogFavoriteOpen()"
			>
				{{ $t('buttons.edit') }}
			</v-btn>
			<v-btn
				color="primary"
				variant="text"
				@click="dialogFavoriteDelete()"
			>
				{{ $t('buttons.delete') }}
			</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import { useBaseComponent } from '@thzero/library_client_vue3/components/base';

export default {
	name: 'Favorite',
	props: {
		value: {
			type: Object,
			default: null
		}
	},
	emits: ['dialog-favorite-delete', 'dialog-favorite-edit'],
	setup(props, context) {
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

		const dialogFavoriteDelete = () => {
			context.emit('dialog-favorite-delete', props.value);
		};
		const dialogFavoriteOpen = () => {
			context.emit('dialog-favorite-edit', props.value);
		};

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
			dialogFavoriteDelete,
			dialogFavoriteOpen
		};
	}
};
</script>
