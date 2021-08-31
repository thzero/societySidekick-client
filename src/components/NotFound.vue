<template>
	<v-overlay
		opacity="1.0"
		z-index="5"
	>
		<v-container>
			<v-row justify="center">
				<v-alert type="error">
					{{ $t('errors.notFound') }}
				</v-alert>
			</v-row>
			<v-row
				justify="center"
				class="mb-8"
			>
				<v-img
					src="/icons/icon.png"
					:width="imageWidth"
					:max-width="imageWidth"
				/>
			</v-row>
			<v-row justify="center">
				<v-btn
					color="primary"
					@click="clickHome"
				>
					{{ $t('titles.home') }}
				</v-btn>
			</v-row>
		</v-container>
	</v-overlay>
	<!-- <v-container fluid>
		<v-row justify="center">
			<v-alert type="error">
				{{ $t('errors.notFound') }}
			</v-alert>
		</v-row>
		<v-row
			justify="center"
			class="mb-8"
		>
			<v-img
				src="/icons/icon.png"
				:width="imageWidth"
				:max-width="imageWidth"
			/>
		</v-row>
		<v-row justify="center">
			<v-btn
				color="primary"
				@click="clickHome"
			>
				{{ $t('titles.home') }}
			</v-btn>
		</v-row>
	</v-container> -->
</template>

<script>
import baseNotFound from '@/library_vue_components/components/baseNotFound';

export default {
	name: 'NotFound',
	extends: baseNotFound
};
</script>

<style scoped>
</style>
