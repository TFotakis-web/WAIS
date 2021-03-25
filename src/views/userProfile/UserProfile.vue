<template>
	<base-layout :page-title="$t('views.userProfile.pageTitle')">
		<h1 class="ion-text-center">{{ $t('various.underConstruction') }}</h1>
		<ion-grid fixed>
			<ion-row>
				<ion-col>
					<personal-info-card/>
				</ion-col>
			</ion-row>
		</ion-grid>
	</base-layout>
</template>
<script>
	import BaseLayout from '@/components/base/BaseLayout';
	import PersonalInfoCard from '@/views/userProfile/personalInfoCard';

	export default {
		name: 'UserProfile',
		components: {
			BaseLayout,
			PersonalInfoCard,
		},
	};
</script>
