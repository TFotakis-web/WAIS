<template>
	<ion-grid fixed>
		<ion-card>
			<ion-item lines="full">
				<ion-label>
					<h3>{{ request.payload.createOfficeConnectionPayload.manager_email }}</h3>
					<p>{{ $t('requests.inviteOffice') }}</p>
				</ion-label>
				<loading-btn @click="deleteRequest" slot="end" color="danger" type="button" :loading="deleteLoading" :text="$t('actions.delete')" :loadingText="$t('actions.deleting')" :icon="$ionicons.trashOutline"/>
			</ion-item>
		</ion-card>
	</ion-grid>
</template>
<script>
	import LoadingBtn from '@/components/structure/loadingBtn';

	export default {
		name: 'InviteOfficeItem',
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
			this.$store.commit('pageStructure/setPageBackButton', true);
			this.$store.commit('pageStructure/setBackButtonDefaultHref', this.$router.resolve({ name: 'Office' }).fullPath);
		},
		methods: {
			deleteRequest() {
				this.deleteLoading = true;
				this.$store.dispatch('request/deleteRequestsSentByMe', this.request.id)
					.then(() => {
						this.$toast.deleteSuccess();
						this.$router.push({ name: 'Office' });
					})
					.catch((err) => this.$toast.error(err))
					.finally(() => this.deleteLoading = false);
			},
		},
	};
</script>
