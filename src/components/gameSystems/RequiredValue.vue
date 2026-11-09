<template>
	<span
		class="body-2 text-error requiredValue"
		:class="{ displayLink: editable }"
		:title="$t('characters.required')"
		@click.stop="editable ? $emit('edit') : null"
	>
		<v-icon
			size="small"
			icon="mdi-alert-circle"
		/>
		{{ $t('characters.required') }}
	</span>
</template>

<script>
// Stands in for a required value the character does not have yet, as a class
// or a faction; an empty cell said nothing. When the character can be edited,
// a click asks for the edit dialog (emits 'edit').
export default {
	name: 'RequiredValue',
	props: {
		editable: {
			type: Boolean,
			default: false
		}
	},
	emits: [ 'edit' ]
};
</script>

<style scoped>
	.requiredValue {
		white-space: nowrap;
	}
</style>
