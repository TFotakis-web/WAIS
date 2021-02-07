<template>
	<mdb-card cascade narrow>
		<mdb-view cascade class="gradient-card-header blue">
			<h5 class="mb-0">Developer Options</h5>
		</mdb-view>
		<mdb-card-body>
			<mdb-input type="checkbox" v-model="options.templateOption" id="templateOption" label="Template Option"/>
			<hr>
			<mdb-btn outline="primary" darkWaves rounded @click.native="save" class="text-center">{{ $t('actions.save') }}</mdb-btn>
			<mdb-btn outline="danger" darkWaves rounded @click.native="clear" class="text-center">Clear</mdb-btn>
		</mdb-card-body>
	</mdb-card>
</template>
<script>
export default {
	name: "devOptionsCard",
	data() {
		return {
			options: {}
		}
	},
	mounted() {
		this.loadOptions();
	},
	methods: {
		loadOptions() {
			const devOptions = {
				templateOption: false
			};
			const devOptionsCookie = this.$cookies.get('devOptions');
			this.options = Object.assign(devOptions, devOptionsCookie);
			console.log('Options loaded.')
		},
		save() {
			this.$cookies.set('devOptions', this.options);
			console.log('Saved!');
		},
		clear() {
			this.$cookies.remove('devOptions');
			this.loadOptions();
			console.log('Cleared.')
		}
	},
}
</script>
<style scoped>
</style>