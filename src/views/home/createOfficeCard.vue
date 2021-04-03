<template>
	<div>
		<span>{{ $t('views.homePage.createOfficeCard.youHaveNoConnectedOffices') + ' ' }}</span>
		<router-link :to="{ name: 'OfficeCreationForm' }">{{ $t('views.homePage.createOfficeCard.createOne') }}</router-link>
		<span>{{ ' ' + $t('views.homePage.createOfficeCard.orCheckYour') + ' ' }}</span>
		<router-link :to="{ name: 'Notifications' }">{{ $t('components.navigation.navbar-item.notifications') }}</router-link>
		<span>{{ ' ' + $t('views.homePage.createOfficeCard.forInvitations') }}</span>
	</div>
</template>
<script>
	export default {
		name: 'createOfficeCard',
	};
</script>
<style scoped>
</style>
