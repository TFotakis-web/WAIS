<template>
	<ion-button
		:buttonType="buttonType"
		:color="color"
		:disabled="disabled || loading"
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
		<ion-icon v-if="icon" :icon="icon" slot="start"/>
		<span>{{ loading ? loadingText : text }}</span>
		<ion-spinner v-if="loading" class="ion-margin-start"/>
	</ion-button>
</template>
<script>
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
			'icon'
		],
	};
</script>
