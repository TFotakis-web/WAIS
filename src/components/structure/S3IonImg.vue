<template>
	<ion-img :src="url"/>
</template>
<script>
	import { Storage } from 'aws-amplify';

	export default {
		name: 'S3IonImg',
		props: ['defaultUrl', 's3Object'],
		data() {
			return {
				url: '',
			};
		},
		watch: {
			s3Object: {
				immediate: true,
				handler: async function(newValue) {
					if (!newValue.filePath || !newValue.filename || !newValue.level) {
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
<style scoped>
</style>
