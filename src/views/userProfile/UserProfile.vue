<template>
	<ion-grid fixed>
		<h1 class="ion-text-center">{{ $t('various.underConstruction') }}</h1>
		<ion-row>
			<ion-col>
				<personal-info-card/>
			</ion-col>
		</ion-row>
	</ion-grid>
</template>
<script>
	import PersonalInfoCard from '@/views/userProfile/personalInfoCard';

	export default {
		name: 'UserProfile',
		components: {
			PersonalInfoCard,
		},
		mounted() {
			this.$store.commit('pageStructure/setPageTitle', () => window.vm.$t('views.userProfile.pageTitle'));
			this.$store.commit('pageStructure/setPageBackButton', false);
		},
	};
</script>
