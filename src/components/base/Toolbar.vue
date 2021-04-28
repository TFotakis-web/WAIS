<template>
	<ion-header :translucent="true">
		<ion-toolbar>
			<ion-buttons slot="start">
				<ion-menu-button v-show="!$store.getters['pageStructure/pageBackButton']"/>
				<ion-back-button :default-href="$store.getters['pageStructure/backButtonDefaultHref']" v-if="$store.getters['pageStructure/pageBackButton']"/>
			</ion-buttons>
			<ion-title>{{ $store.getters['pageStructure/pageTitle']() }}</ion-title>
			<ion-buttons slot="end">
				<slot name="actions-end"/>
			</ion-buttons>
		</ion-toolbar>
	</ion-header>
</template>
<script>
	export default {
		name: 'Toolbar',
	};
</script>
