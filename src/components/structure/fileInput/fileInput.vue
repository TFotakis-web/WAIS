<template>
	<input
		type="file"
		class="ion-hide"
		@change="onFilePicked"
		ref="fileInput"
		:accept="accept"
		:multiple="multiple"
	/>
	<loading-btn
		@click="$refs.fileInput.click()"
		:color="color"
		:disabled="disabled"
		:expand="expand"
		:fill="fill"
		:shape="shape"
		:size="size"
		:strong="strong"
		:text="text ? text : $t('fields.chooseFile')"
		:loading-text="loadingText ? loadingText : $t('actions.uploading')"
		:loading="loading"
	/>
	<ion-list>
		<ion-item v-for="(file, fileIndex) in files" :key="file.filePath + '/' + file.filename">
			<s3-object :s3-object="file" @fileDeleted="deleteFile(fileIndex)"/>
		</ion-item>
	</ion-list>
</template>
<script>
	import { Storage } from 'aws-amplify';
	import loadingBtn from '@/components/structure/loadingBtn';
	import S3Object from '@/components/structure/S3Object';

	export default {
		name: 'fileInput',
		components: {
			S3Object,
			loadingBtn,
		},
		props: {
			color: {
				type: String,
				default: 'primary',
			},
			disabled: {
				type: Boolean,
				default: false,
			},
			expand: {
				type: String,
				default: '',
			},
			fill: {
				type: String,
				default: 'solid',
			},
			shape: {
				type: String,
				default: '',
			},
			size: {
				type: String,
				default: 'default',
			},
			strong: {
				type: Boolean,
				default: false,
			},
			text: {
				type: String,
				default: '',
			},
			loadingText: {
				type: String,
				default: '',
			},
			modelValue: {
				type: [Object, Array],
				default: function(props) {
					return props.multiple ? [] : {};
				},
			},
			accept: {
				type: String,
				default: '',
			},
			multiple: {
				type: Boolean,
				default: false,
			},
			sizeLimitInMBs: {
				type: Number,
				default: 1,
			},
			renameTo: {
				type: String,
				default: '',
			},
			filePath: {
				type: String,
				default: '',
			},
			level: {
				type: String,
				default: 'private',
			},
		},
		emits: ['update:modelValue'],
		data() {
			return {
				files: [],
				loading: false,
			};
		},
		methods: {
			async onFilePicked(event) {
				this.loading = true;
				if (!this.multiple) {
					this.files = [];
				}

				for (const file of event.target.files) {
					if (file.size > this.sizeLimitInBytes) {
						this.error.message += this.error.message === '' ? '' : ' ';
						this.error.message += `File ${file.name} exceeds ${this.sizeLimitInMBs} MBs.`;
						continue;
					}

					let filename = '';
					if (this.renameTo) {
						let extension = file.name.split('.');
						extension = extension[extension.length - 1];
						filename = this.renameTo + '.' + extension;
					} else {
						filename = file.name;
					}

					const contentType = file.type;

					try {
						await Storage.put(this.filePath + '/' + filename, file, {
							level: this.level,
							contentType: contentType,
						});

						this.files.push({
							filePath: this.filePath,
							filename,
							level: this.level,
							contentType,
							idToken: this.$store.getters['auth/user'].id,
						});
					} catch (error) {
						console.error(error);
					}
				}
				event.target.value = '';
				this.loading = false;
				if (this.multiple) {
					this.$emit('update:modelValue', this.files);
				} else {
					this.$emit('update:modelValue', this.files[0]);
				}
			},
			deleteFile(fileIndex) {
				this.files.splice(fileIndex, 1);

				if (this.multiple) {
					this.$emit('update:modelValue', this.files);
				} else {
					this.$emit('update:modelValue', this.files[0]);
				}
			},
		},
		computed: {
			sizeLimitInBytes() {
				return this.sizeLimitInMBs * 2 ** 20;
			},
		},
		watch: {
			async modelValue(newValue) {
				this.files = [];

				if (this.multiple) {
					this.files = newValue;
				} else if (Object.keys(newValue).length) {
					this.files.push(newValue);
				}
			},
		},
	};
</script>
<style scoped>
</style>
