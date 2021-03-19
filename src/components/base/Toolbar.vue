<template>
	<ion-header :translucent="true">
		<ion-toolbar>
			<ion-buttons slot="start">
				<ion-menu-button color="primary"/>
				<ion-back-button :default-href="pageDefaultBackLink"/>
			</ion-buttons>
			<ion-title>{{ $route.params.id }}</ion-title>
			<ion-buttons slot="end">
				<slot name="actions-end"/>
			</ion-buttons>
		</ion-toolbar>
	</ion-header>
</template>
<script>
	import {
		IonButtons,
		IonHeader,
		IonMenuButton,
		IonTitle,
		IonToolbar,
		IonBackButton,
	} from '@ionic/vue';

	export default {
		name: 'Toolbar',
		components: {
			IonButtons,
			IonHeader,
			IonMenuButton,
			IonTitle,
			IonToolbar,
			IonBackButton,
		},
		props: {
			pageDefaultBackLink: {
				type: String,
				default: '/',
			},
		},
		setup() {
			return {};
		},
	};
</script>
