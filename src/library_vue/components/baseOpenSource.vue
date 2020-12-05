<template>
	<div>
		<v-card v-resize="onResize">
			<v-card-title>
				{{ $t('openSource.client') }}
			</v-card-title>
			<v-card-text
				class="pt-2"
			>
				<v-simple-table
					fixed-header
					:height="height"
				>
					<template #default>
						<thead>
							<tr>
								<th class="text-left">
									{{ $t('openSource.resource') }}
								</th>
								<th class="text-left">
									{{ $t('openSource.license') }}
								</th>
							</tr>
						</thead>
						<tbody>
							<template
								v-for="(item, index) in dependencies"
							>
								<tr :key="key(index, 'a')">
									<td colspan="3">
										{{ $t(`openSource.${item.category}`) }}
									</td>
								</tr>
								<tr
									v-for="(item2, jndex) in item.dependencies"
									:key="key(jndex, 'b', index)"
								>
									<td>
										<a
											v-if="item2.url"
											class="opensource-padding"
											:href="item2.url"
										>
											{{ item2.name }}
										</a>
										<span
											v-if="!item2.url"
											class="opensource-padding"
										>
											{{ item2.name }}
										</span>
									</td>
									<td>
										<a
											v-if="item2.licenseUrl"
											class="opensource-padding"
											:href="item2.licenseUrl"
										>
											{{ item2.licenseName }}
										</a>
										<span
											v-if="!item2.licenseUrl"
											class="opensource-padding"
										>
											{{ item2.licenseName }}
										</span>
									</td>
								</tr>
							</template>
						</tbody>
					</template>
				</v-simple-table>
			</v-card-text>
		</v-card>
	</div>
</template>

<script>
export default {
	name: 'BaseOpenSource',
	data: () => ({
			height: '800px',
			dependencies: [ {
					category: 'client',
					dependencies: [ ]
				},
				{
					category: 'server',
					dependencies: [ ]
				}
			]
	}),
	created() {
		let dependencies = this.dependencies.find(l => l.category === 'client');
		dependencies.dependencies = this.initializeDependenciesClient();
		dependencies = this.dependencies.find(l => l.category === 'server');
		dependencies.dependencies = this.initializeDependenciesServer();
	},
	mounted() {
		this.onResize();
	},
	methods: {
		initializeDependenciesClient() {
			return [];
		},
		initializeDependenciesServer() {
			return [];
		},
		key(index, prefix, secondary) {
			return prefix + '' + index + '' + secondary;
		},
		onResize() {
			let temp = window.innerHeight - 200;
			if (temp < 200)
				temp = 200;
			this.height = temp;
		}
	}
};
</script>

<style scoped>
	.opensource-padding {
		padding-left: 16px
	}
</style>
