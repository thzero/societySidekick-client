<template>
	<v-row dense>
		<v-col cols="12" lg="2" />
		<v-col cols="12" lg="8">
			<v-row dense>
				<v-col
					cols="12"
				>
					<v-toolbar
						density="compact"
					>
						<v-toolbar-title class="text-center text-h5">
							<span>{{ $t('titles.settings') }}</span>
						</v-toolbar-title>
					</v-toolbar>
					<!-- <div class="text-center text-h5">
						<span>{{ $t('titles.settings') }}</span>
					</div> -->
				</v-col>
				<v-col
					cols="12"
				>
					<div class="flex-form-wrapper">
						<VtFormControl
							ref="formSettingsRef"
							:validation="validation"
							button-clear-name="buttons.reset"
							button-ok-name="buttons.save"
							:pre-complete-ok="preCompleteOk"
							:reset-additional="resetAdditional"
							:dirty-callback="dirtyCallback"
						>
							<div :class="$vuetify.display.xs ? 'flex-form' : ''">
								<v-row dense>
									<v-col
										cols="12"
										sm="6"
										:class="'pl-0 pr-' + ($vuetify.display.mdAndUp ? '2' : '0')"
									>
										<v-card>
											<v-card-text>
												<v-row
													align="center"
													dense
												>
													<v-col
														cols="9"
														class="text-h4 mb-1 pt-1"
													>
														{{ name }}
													</v-col>
													<v-col
														cols="3"
														style="text-align: right;"
													>
														<v-avatar
															tile
															size="80"
															color="grey"
														>
															<img
																v-if="hasPicture"
																:src="picture"
																class="responsive"
															>
														</v-avatar>
													</v-col>
												</v-row>
											</v-card-text>
										</v-card>
									</v-col>
									<v-col
										cols="12"
										sm="6"
										class="pl-0 pr-0"
									>
										<v-card>
											<v-card-text>
												<VtTextFieldWithValidation
													ref="gamerTagRef"
													vid="gamerTag"
													v-model="gamerTag"
													:counter="30"
													:validation="validation"
													:label="$t('forms.gamerTag')"
												/>
											</v-card-text>
										</v-card>
									</v-col>
								</v-row>
							</div>
						</VtFormControl>
					</div>
				</v-col>
			</v-row>
		</v-col>
	</v-row>
</template>

<script>
import { ref } from 'vue';
import { maxLength, minLength, required } from '@vuelidate/validators';

import VtFormControl from '@thzero/library_client_vue3_vuetify3/components/form/VtFormControl';
import VtSelectWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtSelectWithValidation';
import VtTextFieldWithValidation from '@thzero/library_client_vue3_vuetify3/components/form/VtTextFieldWithValidation';

import { useAppSettingsComponent } from '@/components/appSettings';

export default {
	name: 'AppSettings',
	components: {
		VtFormControl,
		VtSelectWithValidation,
		VtTextFieldWithValidation
	},
	setup(props, context) {
		const formSettingsRef = ref(null);

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
			isSaving,
			serverErrors,
			setErrors,
			beforeUnload,
			dirty,
			dirtyCallback,
			leaveCheck,
			cancel,
			close,
			fab,
			hasPicture,
			name,
			ok,
			open,
			picture,
			preComplete,
			preCompleteI,
			requestReset,
			serviceStore,
			serviceUsers,
			user,
			gamerTag,
			preCompleteOk,
			resetAdditional,
			resetIdCheck,
			scope,
			validation
		} = useAppSettingsComponent(props, context, formSettingsRef);

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
			isSaving,
			serverErrors,
			setErrors,
			beforeUnload,
			dirty,
			dirtyCallback,
			leaveCheck,
			cancel,
			close,
			fab,
			hasPicture,
			name,
			ok,
			open,
			picture,
			preComplete,
			preCompleteI,
			requestReset,
			serviceStore,
			serviceUsers,
			user,
			gamerTag,
			preCompleteOk,
			resetAdditional,
			resetIdCheck,
			scope,
			validation,
			formSettingsRef
		};
	},
	validations () {
		return {
			gamerTag: {
				// validatorGamerTag,
				minLength: minLength(3),
				maxLength: maxLength(20),
				$autoDirty: true
			}
		};
	}
};
</script>

<style scoped>
</style>
