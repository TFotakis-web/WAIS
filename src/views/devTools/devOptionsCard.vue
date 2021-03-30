<template>
	<ion-card cascade narrow>
		<ion-card-header>
			<ion-card-title>Developer Options</ion-card-title>
		</ion-card-header>
		<ion-card-content>
			<ion-list>
				<ion-item>
					<ion-checkbox v-model="options.templateOption" slot="start"/>
					<ion-label>Template Option</ion-label>
				</ion-item>
			</ion-list>
			<ion-button @click="save">{{ $t('actions.save') }}</ion-button>
			<ion-button @click="clear">Clear</ion-button>
		</ion-card-content>
	</ion-card>
</template>
<script>
	export default {
		name: 'devOptionsCard',
		data() {
			return {
				options: {},
			};
		},
		mounted() {
			this.loadOptions();
		},
		methods: {
			loadOptions() {
				const devOptions = {
					templateOption: false,
				};
				const devOptionsCookie = this.$cookies.get('devOptions');
				this.options = Object.assign(devOptions, devOptionsCookie);
				console.log('Options loaded.');
			},
			save() {
				this.$cookies.set('devOptions', this.options);
				console.log('Saved!');
			},
			clear() {
				this.$cookies.remove('devOptions');
				this.loadOptions();
				console.log('Cleared.');
			},
		},
	};
</script>
<style scoped>
</style>
