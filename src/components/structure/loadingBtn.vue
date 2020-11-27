<template>
	<mdb-btn :color="color" :type="type" :rounded="rounded" :disabled="loading">
		<span v-if="loading" class="spinner-border spinner-border-sm mr-1" />
		<span>{{ loading ? loadingText : text }}</span>
	</mdb-btn>
</template>

<script>
	export default {
		name: 'LoadingBtn',
		props: {
			color: {
				type: String,
				default: 'default',
			},
			type: {
				type: String,
				default: '',
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
		},
	};
</script>
