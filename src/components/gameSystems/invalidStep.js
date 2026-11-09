// For a stepper dialog: whether any of a step's rules is invalid, each named by
// its path in the vuelidate instance ('scenarioName', 'innerValue.factionId').
// A step's fields can be invalid while another step shows, and Ok is then
// disabled with nothing on screen to say why, so the step header says it.
export function useInvalidStep(validation) {
	return (...paths) => paths.some((path) => path.split('.').reduce((value, key) => (value ? value[key] : null), validation.value)?.$invalid === true);
}
