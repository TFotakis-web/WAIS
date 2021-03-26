<template>
	<ion-header :translucent="true">
		<ion-toolbar>
			<ion-buttons slot="start">
				<ion-menu-button color="primary" v-if="!showBackButton"/>
				<ion-back-button :default-href="backButtonDefaultHref" v-if="showBackButton"/>
			</ion-buttons>
			<ion-title>{{ pageTitle }}</ion-title>
			<ion-buttons slot="end">
				<slot name="actions-end"/>
			</ion-buttons>
		</ion-toolbar>
	</ion-header>
</template>
<script>
	export default {
		name: 'Toolbar',
		props: {
			backButtonDefaultHref: {
				type: String,
				default: '/',
			},
			showBackButton: {
				type: Boolean,
				default: false
			},
			pageTitle: {
				type: String,
				default: ''
			}
		},
		setup() {
			return {};
		},
	};
</script>
