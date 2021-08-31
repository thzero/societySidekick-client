<template>
	<v-layout
		wrap
	>
		<v-flex
			xs12
			pb-2
		>
			<v-card>
				<v-card-text>
					<div class="support">
						<h1>Support</h1>
						<br>
						<h2>Lost? Need some help?</h2>
					</div>
				</v-card-text>
			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
import baseSupport from '@/library_vue_components/baseSupport';

export default {
	name: 'Support',
	extends: baseSupport
};
</script>

<style scoped>
</style>
