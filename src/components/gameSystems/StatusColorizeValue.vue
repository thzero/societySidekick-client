<script>
import SharedContants from '@/common/constants';
import ColorizeValue from '@/components/gameSystems/ColorizeValue';

export default {
	name: 'StatusColorizeValue',
	extends: ColorizeValue,
	methods: {
		calculateValue(value) {
			return value === SharedContants.CharactersStatus.DEAD ? 3 : 1;
		}
	}
};
</script>