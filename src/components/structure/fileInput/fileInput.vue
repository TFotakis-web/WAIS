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
			<ion-button :href="downloadUrls[fileIndex]" target="_blank" fill="clear" size="small">{{ file.filename }}</ion-button>
			<ion-button @click="deleteFile(fileIndex)" fill="clear" size="small">
				<ion-icon :icon="$ionicons.closeOutline" slot="icon-only"/>
			</ion-button>
		</ion-item>
	</ion-list>
</template>
<script>
	import { Storage } from 'aws-amplify';
	import loadingBtn from '@/components/structure/loadingBtn';

	export default {
		name: 'fileInput',
		components: {
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
		emits: ['update:modelValue', 'update:downloadUrls'],
		data() {
			return {
				files: [],
				downloadUrls: [],
				loading: false,
			};
		},
		methods: {
			async onFilePicked(event) {
				this.loading = true;
				if (!this.multiple) {
					this.files = [];
					this.downloadUrls = [];
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

						const response = await Storage.get(this.filePath + '/' + filename, { level: this.level });
						this.downloadUrls.push(response);
					} catch (error) {
						console.error(error);
					}
				}
				event.target.value = '';
				this.loading = false;
				if (this.multiple) {
					this.$emit('update:modelValue', this.files);
					this.$emit('update:downloadUrls', this.downloadUrls);
				} else {
					this.$emit('update:modelValue', this.files[0]);
					this.$emit('update:downloadUrls', this.downloadUrls[0]);
				}
			},
			async deleteFile(fileIndex) {
				const file = this.files[fileIndex];
				await Storage.remove(file.filePath + '/' + file.filename, { level: file.level });
				this.files.splice(fileIndex, 1);
				this.downloadUrls.splice(fileIndex, 1);

				if (this.multiple) {
					this.$emit('update:modelValue', this.files);
					this.$emit('update:downloadUrls', this.downloadUrls);
				} else {
					this.$emit('update:modelValue', this.files[0]);
					this.$emit('update:downloadUrls', this.downloadUrls[0]);
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
				this.downloadUrls = [];

				if (this.multiple) {
					this.files = newValue;
				} else if (Object.keys(newValue).length) {
					this.files.push(newValue);
				}

				for (const file of this.files) {
					const response = await Storage.get(file.filePath + '/' + file.filename, { level: file.level });
					this.downloadUrls.push(response);
				}
			},
		},
	};
</script>
<style scoped>
</style>
