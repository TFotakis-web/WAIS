<template>
	<ion-button
		:color="color"
		:type="type"
		:rounded="rounded"
		:disabled="loading"
		:size="size"
		:outline="outline"
		:floating="floating"
		:flat="flat"
		:transparent="transparent"
		:gradient="gradient"
		:icon="icon"
		:iconLeft="iconLeft"
		:iconRight="iconRight"
	>
		<span>{{ loading ? loadingText : text }}</span>
		<ion-spinner v-if="loading"/>
	</ion-button>
</template>
<script>
	import { IonButton, IonSpinner } from '@ionic/vue';

	export default {
		name: 'LoadingBtn',
		props: {
			color: {
				type: String,
				default: 'default',
			},
			type: {
				type: String,
				default: 'button',
			},
			rounded: {
				type: Boolean,
				default: false,
			},
			loading: {
				type: Boolean,
				default: false,
			},
			text: {
				type: String,
				default: 'Button',
			},
			loadingText: {
				type: String,
				default: 'Loading Button',
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
				default: '',
			},
			iconLeft: {
				type: Boolean,
				default: false,
			},
			iconRight: {
				type: Boolean,
				default: false,
			},
		},
		components: {
			IonButton,
			IonSpinner,
		},
	};
</script>
