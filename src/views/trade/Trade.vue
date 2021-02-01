<template>
	<div class="pt-5">
		<h5 class="text-info text-center mb-5">{{ $t('various.underConstruction') }}</h5>
		<mdb-container>
			<companyInfoCard/>
		</mdb-container>
	</div>
</template>
<script>
import companyInfoCard from "@/views/trade/companyInfoCard";

export default {
	name: 'Trade',
	components: {
		companyInfoCard
	},
};
</script>
