<template>
	<ion-grid fixed>
		<h1 class="ion-text-center">{{ $t('various.underConstruction') }}</h1>
		<ion-card>
			<ion-card-content>
				<ion-list>
					<ion-item v-for="request in createTradeList" :key="request.id" @click="$router.push({name: 'NotificationDetails', params: {id: request.id}})" button>
						<strong>{{ request.payload.tradeName }}: </strong>
						<span>{{ request.payload.surname + ' ' + request.payload.name + ' ' + request.payload.fathersName }}</span>
					</ion-item>
				</ion-list>
			</ion-card-content>
		</ion-card>
	</ion-grid>
</template>
<script>
	import { mapGetters } from 'vuex';

	export default {
		name: 'Notifications',
		mounted() {
			this.$store.commit('pageStructure/setPageTitle', () => this.$t('views.notifications.pageTitle'));
			this.$store.commit('pageStructure/setPageBackButton', false);
		},
		computed: {
			...mapGetters('auth', ['requestsForMe']),
			createTradeList() {
				return this.requestsForMe.filter(el => el.type === 'CREATE_TRADE');
			},
		},
	};
</script>
