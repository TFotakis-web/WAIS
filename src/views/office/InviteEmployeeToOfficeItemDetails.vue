<template>
	<ion-grid fixed>
		<ion-card>
			<ion-item lines="full">
				<ion-label>
					<h3>{{ request.payload.inviteEmployeeToOfficePayload.email }}</h3>
					<p>{{ $t('requests.inviteEmployeeToOffice') }}</p>
				</ion-label>
				<loading-btn @click="deleteRequest" slot="end" color="danger" type="button" :loading="deleteLoading" :text="$t('actions.delete')" :loadingText="$t('actions.deleting')" :icon="$ionicons.trashOutline"/>
			</ion-item>
			<ion-card-content>
				<ion-list>
					<ion-list-header>
						<h2>{{ $t('fields.permissions') + ': ' }}</h2>
					</ion-list-header>
					<ion-item v-for="permission in JSON.parse(request.payload.inviteEmployeeToOfficePayload.empPagePermissions)" :key="permission">
						<ion-text>{{ permission }}</ion-text>
					</ion-item>
				</ion-list>
			</ion-card-content>
		</ion-card>
	</ion-grid>
</template>
<script>
	import LoadingBtn from '@/components/structure/loadingBtn';

	export default {
		name: 'inviteEmployeeToOfficeItem',
		components: { LoadingBtn },
		data() {
			return {
				deleteLoading: false,
				request: {},
			};
		},
		async created() {
			const requestId = this.$route.params.id;
			this.request = Object.assign({}, this.$store.getters['request/requestById'](requestId));

			this.$store.commit('pageStructure/setPageTitle', () => window.vm.$t('views.Office.pageTitle'));
			this.$store.commit('pageStructure/setBackButtonDefaultHref', this.$router.resolve({ name: 'Office' }).fullPath);
			this.$store.commit('pageStructure/setPageBackButton', true);
		},
		methods: {
			deleteRequest() {
				this.deleteLoading = true;
				this.$store.dispatch('request/deleteRequestsSentByMe', this.request.id)
					.then(() => {
						this.$toast.deleteSuccess();
						this.$router.push({ name: 'Notifications' });
					})
					.catch((err) => this.$toast.error(err))
					.finally(() => this.deleteLoading = false);
			},
		},
	};
</script>
