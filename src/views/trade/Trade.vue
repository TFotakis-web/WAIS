<template>
	<ion-grid fixed>
		<h1 class="ion-text-center">{{ $t('various.underConstruction') }}</h1>
		<!--	<div class="pt-5">
				<h5 class="text-info text-center mb-5">{{ $t('various.underConstruction') }}</h5>
				<mdb-container>
					<mdb-row class="mb-5">
						<mdb-col>
							<companyInfoCard/>
						</mdb-col>
					</mdb-row>
					<mdb-row>
						<mdb-col>
							<user-permissions-table-card/>
						</mdb-col>
					</mdb-row>
				</mdb-container>
			</div>-->
	</ion-grid>
</template>
<script>
	// import companyInfoCard from '@/views/trade/companyInfoCard';
	// import UserPermissionsTableCard from '@/views/trade/userPermissionsTableCard';

	export default {
		name: 'Trade',
		components: {
			// UserPermissionsTableCard,
			// companyInfoCard,
		},
		mounted() {
			this.$store.commit('pageStructure/setPageTitle', this.$t('views.Trade.pageTitle'));
			this.$store.commit('pageStructure/setPageBackButton', false);
		},
	};
</script>
