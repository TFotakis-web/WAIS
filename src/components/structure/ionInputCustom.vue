<template>
	<ion-input
		v-if="['email', 'month', 'number', 'password', 'search', 'tel', 'text', 'time', 'url', 'week'].includes(config.type)"
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
	<ion-avatar v-if="config.showAvatar" class="ion-margin-end">
		<s3-ion-img :s3-object="modelValue" :default-url="config.defaultUrl"/>
	</ion-avatar>
	<file-input
		v-if="config.type === 'file'"
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
	<ion-select
		v-if="config.type === 'select'"
		v-model="modelValue"
		@update:modelValue="inputChanged"
		:cancel-text="$t('actions.cancel')"
		:compare-with="config.compareWith"
		:disabled="config.disabled"
		:interface="config.interface"
		:interface-options="config.interfaceOptions"
		:mode="config.mode"
		:multiple="config.multiple"
		:name="config.name"
		:ok-text="$t('actions.ok')"
		:placeholder="config.placeholder"
		:selected-text="config.selectedText"
		:value="config.value"
		:required="config.required"
	>
		<ion-select-option v-for="o in config.selectOptions()" :key="o.text" :value="o.value" :disabled="o.disabled">{{ o.text }}</ion-select-option>
	</ion-select>
</template>
<script>
	import IonDatetimeCustom from '@/components/structure/ionDatetimeCustom';
	import FileInput from '@/components/structure/fileInput/fileInput';
	import S3IonImg from '@/components/structure/S3IonImg';


	export default {
		name: 'ionInputCustom',
		components: { S3IonImg, FileInput, IonDatetimeCustom },
		props: ['modelValue', 'config', 'inputGroup'],
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
			this.$mitt.on('discardChanges:all', () => {
				this.$emit('update:modelValue', this.initialValue);
			});
			if (this.inputGroup) {
				this.$mitt.on(`markInputClean:${this.inputGroup}`, () => {
					this.markClean();
				});
				this.$mitt.on(`discardChanges:${this.inputGroup}`, () => {
					this.$emit('update:modelValue', this.initialValue);
				});
			}
		},
		beforeUnmount() {
			this.markClean();
		},
		methods: {
			inputChanged() {
				if (this.modelValue === this.initialValue || (this.initialValue === null && (this.modelValue === '' || this.modelValue === {}))) {
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
