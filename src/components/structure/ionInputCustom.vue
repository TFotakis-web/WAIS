<template>
	<ion-input
		v-if="['email', 'month', 'number', 'password', 'search', 'tel', 'text', 'time', 'url', 'week'].includes(config.type)"
		ref="root"
		v-model="modelValue"
		@update:modelValue="inputChanged"
		:slot="config.slot"
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
		:class="{'no-arrows': config.noArrows}"
	/>
	<ion-datetime-custom
		v-if="['date', 'time', 'datetime'].includes(config.type)"
		ref="root"
		v-model="modelValue"
		@update:modelValue="inputChanged"
		:slot="config.slot"
		:cancelText="config.cancelText"
		:dayValues="config.dayValues"
		:disabled="config.disabled"
		:displayFormat="config.displayFormat"
		:displayTimezone="config.displayTimezone"
		:doneText="config.doneText"
		:hourValues="config.hourValues"
		:max="config.max"
		:min="config.min"
		:minuteValues="config.minuteValues"
		:mode="config.mode"
		:monthValues="config.monthValues"
		:name="config.name"
		:pickerFormat="config.pickerFormat"
		:pickerOptions="config.pickerOptions"
		:placeholder="config.placeholder"
		:readonly="config.readonly"
		:value="config.value"
		:yearValues="config.yearValues"
		:required="config.required"
		:disablePast="config.disablePast"
		:disableFuture="config.disableFuture"
		:returnDate="config.returnDate"
		:type="config.type"
	/>
	<ion-textarea
		v-if="config.type === 'textarea'"
		ref="root"
		v-model="modelValue"
		@update:modelValue="inputChanged"
		:slot="config.slot"
		:auto-grow="config.autoGrow"
		:autocapitalize="config.autocapitalize"
		:autofocus="config.autofocus"
		:clear-on-edit="config.clearOnEdit"
		:color="config.color"
		:cols="config.cols"
		:debounce="config.debounce"
		:disabled="config.disabled"
		:enterkeyhint="config.enterkeyhint"
		:inputmode="config.inputmode"
		:maxlength="config.maxlength"
		:minlength="config.minlength"
		:mode="config.mode"
		:name="config.name"
		:placeholder="config.placeholder"
		:readonly="config.readonly"
		:required="config.required"
		:rows="config.rows"
		:spellcheck="config.spellcheck"
		:value="config.value"
		:wrap="config.wrap"
	/>
	<ion-checkbox
		v-if="config.type === 'checkbox'"
		ref="root"
		v-model="modelValue"
		@update:modelValue="inputChanged"
		:slot="config.slot"
		:checked="config.checked"
		:color="config.color"
		:disabled="config.disabled"
		:indeterminate="config.indeterminate"
		:mode="config.mode"
		:name="config.name"
		:value="config.value"
	/>
	<file-input
		v-if="config.type === 'file'"
		ref="root"
		v-model="modelValue"
		@update:modelValue="inputChanged"
		:color="config.color"
		:disabled="config.disabled"
		:expand="config.expand"
		:fill="config.fill"
		:shape="config.shape"
		:size="config.size"
		:strong="config.strong"
		:text="config.text()"
		:loadingText="config.loadingText"
		:accept="config.accept"
		:multiple="config.multiple"
		:sizeLimitInMBs="config.sizeLimitInMBs"
		:renameTo="config.renameTo"
		:filePath="config.filePath"
		:level="config.level"
	/>
</template>
<script>
	import IonDatetimeCustom from '@/components/structure/ionDatetimeCustom';
	import FileInput from '@/components/structure/fileInput/fileInput';

	export default {
		name: 'ionInputCustom',
		components: { FileInput, IonDatetimeCustom },
		props: ['modelValue', 'config'],
		emits: ['update:modelValue'],
		data() {
			return {
				isDirty: false,
				initialValue: null,
			};
		},
		mounted() {
			this.initialValue = this.modelValue || '';
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
				if (this.modelValue === this.initialValue) {
					this.markClean();
				} else {
					this.markDirty();
				}
				this.$emit('update:modelValue', this.modelValue);
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
