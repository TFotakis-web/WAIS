<template>
	<div>
		<input
			type="file"
			class="d-none"
			@change="onFilePicked"
			ref="fileInput"
			:accept="accept"
			:multiple="multiple"
		/>
		<loading-btn
			@click="$refs.fileInput.click()"
			:color="btnColor"
			:rounded="rounded"
			:size="size"
			:outline="outline"
			:floating="floating"
			:flat="flat"
			:transparent="transparent"
			:gradient="gradient"
			:icon="icon"
			:iconLeft="iconLeft"
			:iconRight="iconRight"
			:text="btnTitle"
			:loading-text="$t('actions.uploading')"
			:loading="loading"
		/>
		<span v-for="(file, fileIndex) in files" :key="file.url + fileIndex">
			<a :href="downloadUrls[fileIndex]" target="_blank" class="mr-1">{{ file.filename }}</a>
			<mdb-icon far icon="times-circle" @click="deleteFile(fileIndex)" class="clickable"/>
			<span v-if="fileIndex !== files.length - 1">, </span>
		</span>
	</div>
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
			value: {
				type: [Object, Array],
				default: function () {
					return this.multiple ? [] : {};
				},
			},
			accept: {
				type: String,
				default: '',
			},
			btnColor: {
				type: String,
				default: 'primary',
			},
			btnTitle: {
				type: String,
				default: 'Choose file',
			},
			multiple: {
				type: Boolean,
				default: false,
			},
			textFieldTitle: {
				type: String,
				default: 'Upload your file',
			},
			rounded: {
				type: Boolean,
				default: false,
			},
			size: {
				type: String,
				default: '',
			},
			outline: {
				type: String,
				default: '',
			},
			floating: {
				type: Boolean,
				default: false,
			},
			flat: {
				type: Boolean,
				default: false,
			},
			transparent: {
				type: Boolean,
				default: false,
			},
			gradient: {
				type: String,
				default: '',
			},
			icon: {
				type: String,
				default: 'cloud-upload-alt',
			},
			iconLeft: {
				type: Boolean,
				default: false,
			},
			iconRight: {
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
		},
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
				this.files = [];

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

					let url = '';
					try {
						const response = await Storage.put(this.filePath + filename, file, {
							level: 'private',
							contentType: contentType,
						});
						url = `private/${this.$store.getters['auth/user'].id}/${response.key}`;
					} catch (error) {
						console.error(error);
					}

					this.files.push({ filename, url });
				}
				this.loading = false;
			},
			async deleteFile(fileIndex) {
				const file = this.files[fileIndex];
				await Storage.remove(this.filePath + file.filename, { level: 'private' });
				this.files.splice(fileIndex, 1);
			},
		},
		computed: {
			sizeLimitInBytes() {
				return this.sizeLimitInMBs * 2 ** 20;
			},
		},
		watch: {
			files(newValue) {
				if (this.multiple) {
					this.$emit('input', newValue);
				} else {
					this.$emit('input', newValue[0]);
				}
			},
			async value(newValue) {
				this.files = [];

				if (this.multiple) {
					this.files = newValue;
				} else if (Object.keys(newValue).length) {
					this.files.push(newValue);
				}

				for (const fileIndex in this.files) {
					const response = await Storage.get(this.filePath + this.files[fileIndex].filename, { level: 'private' });
					this.downloadUrls.push(response);
				}
			},
		},
	};
</script>
<style scoped>
</style>
