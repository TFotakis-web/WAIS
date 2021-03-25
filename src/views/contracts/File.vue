<template>
	<base-layout :page-title="$t('components.navigation.sidenav.contracts.file')">
		<div style="text-align: center; position: absolute; left: 0; right: 0; top: 50%; transform: translateY(-50%);">
			<h1>{{ $t('various.underConstruction') }}</h1>
		</div>
	</base-layout>
</template>
<script>
	import BaseLayout from '@/components/base/BaseLayout';

	export default {
		name: 'ContractsFile',
		components: {
			BaseLayout
		}
	};
</script>
