<template>
	<ion-grid fixed>
		<ion-label>
			<h3>{{ $t('requests.inviteContractorToOffice') }}</h3>
			<p>{{ request.senderUsername }} • {{ request.senderEmail }}</p>
		</ion-label>
		<!--		<p>{{ request.payload.inviteContractorToOfficePayload }}</p>-->
		<div class="ion-text-center">
			<loading-btn @click="acceptRequest" color="success" type="submit" :loading="acceptLoading" :text="$t('actions.accept')" :loadingText="$t('actions.accepting')"/>
			<loading-btn @click="rejectRequest" color="danger" :loading="rejectLoading" :text="$t('actions.reject')" :loadingText="$t('actions.rejecting')"/>
		</div>
	</ion-grid>
</template>
<script>
	import LoadingBtn from '@/components/structure/loadingBtn';
	import { mapActions } from 'vuex';

	export default {
		name: 'InviteContractorToOfficeNotificationDetails',
		components: { LoadingBtn },
		data() {
			return {
				request: {},
				acceptLoading: false,
				rejectLoading: false,
			};
		},
		async created() {
			const requestId = this.$route.params.id;
			this.request = Object.assign({}, this.$store.getters['request/requestById'](requestId));

			this.$store.commit('pageStructure/setPageTitle', () => window.vm.$t('views.notifications.pageTitle'));
			this.$store.commit('pageStructure/setPageBackButton', true);
			this.$store.commit('pageStructure/setBackButtonDefaultHref', this.$router.resolve({ name: 'Notifications' }).fullPath);
		},
		methods: {
			...mapActions('request', ['resolveRequest']),
			acceptRequest() {
				this.acceptLoading = true;
				this.resolveRequest({ id: this.request.id, decision: 'ACCEPT' })
					.then(() => {
						this.$toast.saveSuccess();
						this.$router.push({ name: 'Notifications' });
					})
					.catch((err) => this.$toast.error(err))
					.finally(() => this.acceptLoading = false);
			},
			rejectRequest() {
				this.rejectLoading = true;
				this.resolveRequest({ id: this.request.id, decision: 'REJECT' })
					.then(() => {
						this.$toast.saveSuccess();
						this.$router.push({ name: 'Notifications' });
					})
					.catch((err) => this.$toast.error(err))
					.finally(() => this.rejectLoading = false);
			},
		},
	};
</script>
