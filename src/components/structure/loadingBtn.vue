<template>
	<ion-button
		:buttonType="buttonType"
		:color="color"
		:disabled="disabled"
		:download="download"
		:expand="expand"
		:fill="fill"
		:href="href"
		:mode="mode"
		:rel="rel"
		:routerAnimation="routerAnimation"
		:routerDirection="routerDirection"
		:shape="shape"
		:size="size"
		:strong="strong"
		:target="target"
		:type="type"
	>
		<span>{{ loading ? loadingText : text }}</span>
		<ion-spinner v-if="loading" class="ion-margin-start"/>
	</ion-button>
</template>
<script>
	import { IonButton, IonSpinner } from '@ionic/vue';

	export default {
		name: 'LoadingBtn',
		props: [
			'loading',
			'text',
			'loadingText',
			'buttonType',
			'color',
			'disabled',
			'download',
			'expand',
			'fill',
			'href',
			'mode',
			'rel',
			'routerAnimation',
			'routerDirection',
			'shape',
			'size',
			'strong',
			'target',
			'type',
		],
		components: {
			IonButton,
			IonSpinner,
		},
	};
</script>
