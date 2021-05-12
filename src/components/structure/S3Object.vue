<template>
	<ion-button :href="url" target="_blank" fill="clear" size="small">{{ $t(`files.${s3Object.filename.split('.')[0]}`) || s3Object.filename }}</ion-button>
	<ion-button v-if="!disableDelete" @click="deleteFile()" fill="clear" size="small">
		<ion-icon :icon="$ionicons.closeOutline" slot="icon-only"/>
	</ion-button>
</template>
<script>
	import { Storage } from 'aws-amplify';

	export default {
		name: 'S3Object',
		props: [
			's3Object',
			'defaultUrl',
			'disableDelete'
		],
		emits: ['fileDeleted'],
		data() {
			return {
				url: '',
			};
		},
		methods: {
			async deleteFile() {
				await Storage.remove(this.s3Object.filePath + '/' + this.s3Object.filename, { level: this.s3Object.level });
				this.$emit('fileDeleted');
			},
		},
		watch: {
			s3Object: {
				immediate: true,
				handler: async function(newValue) {
					if (!newValue || !newValue.filePath || !newValue.filename || !newValue.level) {
						this.url = this.defaultUrl;
						return;
					}
					const url = await Storage.get(newValue.filePath + '/' + newValue.filename, { level: newValue.level });
					this.url = url ? url : this.defaultUrl;
				},
			},
		},
	};
</script>
