<template>
	<ion-input
		ref="root"
		v-model="modelValue"
		@ionChange="inputChanged"
		:accept="config.accept"
		:autocapitalize="config.autocapitalize"
		:autocomplete="config.autocomplete"
		:autocorrect="config.autocorrect"
		:autofocus="config.autofocus"
		:clear-input="config.clearInput"
		:clear-on-edit="config.clearOnEdit"
		:color="config.color"
		:debounce="config.debounce"
		:disabled="config.disabled"
		:enterkeyhint="config.enterkeyhint"
		:inputmode="config.inputmode"
		:max="config.max"
		:maxlength="config.maxlength"
		:min="config.min"
		:minlength="config.minlength"
		:mode="config.mode"
		:multiple="config.multiple"
		:name="config.name"
		:pattern="config.pattern"
		:placeholder="config.placeholder"
		:readonly="config.readonly"
		:required="config.required"
		:size="config.size"
		:spellcheck="config.spellcheck"
		:step="config.step"
		:type="config.type"
		:value="config.value"
	/>
</template>
<script>
	export default {
		name: 'ionInputCustom',
		props: ['modelValue', 'config'],
		emits: ['update:modelValue'],
		data() {
			return {
				isDirty: false,
				initialValue: null,
			};
		},
		mounted() {
			this.initialValue = this.modelValue;
			this.$mitt.on('markInputClean:all', () => {
				this.markClean();
			});
			if (this.config.inputGroup) {
				this.$mitt.on(`markInputClean:${this.config.inputGroup}`, () => {
					this.markClean();
				});
			}
		},
		methods: {
			inputChanged() {
				if (this.modelValue === this.initialValue || (this.initialValue === null && this.modelValue === '')) {
					this.markClean();
				} else {
					this.markDirty();
				}
			},
			markDirty() {
				if (this.isDirty) {
					return;
				}
				this.isDirty = true;
				this.$store.commit('pageStructure/increaseDirtyInputs');
			},
			markClean() {
				if (!this.isDirty) {
					return;
				}
				this.isDirty = false;
				this.$store.commit('pageStructure/decreaseDirtyInputs');
			},
		},
	};
</script>
