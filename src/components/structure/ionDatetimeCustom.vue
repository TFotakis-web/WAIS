<template>
	<ion-datetime
		v-model="modelValue"
		@update:modelValue="el => $emit('update:modelValue', returnDate ? el.split('T')[0] : el)"
		:key="$i18n.locale + name"
		:day-names="calendarOptions.dayNames"
		:day-short-names="calendarOptions.dayShortNames"
		:month-names="calendarOptions.monthNames"
		:month-short-names="calendarOptions.monthShortNames"
		:max="maxValue"
		:min="minValue"
		:cancel-text="$t('actions.cancel')"
		:done-text="$t('actions.ok')"
		:display-format="displayFormat || returnDate ? 'DD MMM YYYY' : 'DD MMM YYYY, HH:mm'"
		:day-values="dayValues"
		:disabled="disabled"
		:display-timezone="displayTimezone"
		:hour-values="hourValues"
		:minute-values="minuteValues"
		:mode="mode"
		:month-values="monthValues"
		:name="name"
		:picker-format="pickerFormat"
		:picker-options="pickerOptions"
		:placeholder="placeholder"
		:readonly="readonly"
		:value="value"
		:year-values="yearValues"
		:required="required"
	/>
</template>
<script>
	import { mapGetters } from 'vuex';

	export default {
		name: 'ionDatetimeCustom',
		props: [
			'cancelText',
			'dayValues',
			'disabled',
			'displayFormat',
			'displayTimezone',
			'doneText',
			'hourValues',
			'max',
			'min',
			'minuteValues',
			'mode',
			'monthValues',
			'name',
			'pickerFormat',
			'pickerOptions',
			'placeholder',
			'readonly',
			'value',
			'yearValues',
			'required',
			'disablePast',
			'disableFuture',
			'returnDate',
			'modelValue',
		],
		emits: ['update:modelValue'],
		data() {
			return {
				minValue: undefined,
				maxValue: undefined,
			};
		},
		mounted() {
			if (this.disablePast) {
				this.minValue = (new Date()).toISOString();
				this.maxValue = new Date(new Date().getFullYear() + 50, 1, 1).toISOString();
			} else if (this.disableFuture) {
				this.minValue = undefined;
				this.maxValue = (new Date()).toISOString();
			} else {
				if (this.min) {
					this.minValue = this.min;
				}
				if (this.max) {
					this.maxValue = this.max;
				}
			}
		},
		computed: {
			...mapGetters('platformData', ['calendarOptions']),
		},
	};
</script>
<style scoped>
</style>
