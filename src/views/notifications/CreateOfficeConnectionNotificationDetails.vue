<template>
	<ion-grid fixed>
		<ion-card>
			<ion-item lines="full">
				<ion-label>
					<h3>{{ $t('requests.createOfficeConnection') }}</h3>
					<p>{{ request.payload.createOfficeConnectionPayload.manager_email }} • {{ request.senderUsername }}</p>
				</ion-label>
				<loading-btn v-if="isMine" @click="deleteRequest" slot="end" color="danger" type="button" :loading="deleteLoading" :text="$t('actions.delete')" :loadingText="$t('actions.deleting')" :icon="$ionicons.trashOutline"/>
			</ion-item>
			<ion-card-content>
				<p>
					<strong>{{ $t('fields.managerEmail') + ': '}}</strong>
					<span>{{ request.payload.createOfficeConnectionPayload.manager_email }}</span>
				</p>
				<form @submit.prevent="acceptRequest" v-if="!isMine">
					<ion-item>
						<ion-icon :icon="$ionicons.calendarOutline" slot="start" class="ion-align-self-center"/>
						<ion-label position="floating">{{ $t('fields.expirationDate') }}</ion-label>
						<ion-datetime v-model="form.expirationDate" display-format="DD MMM YYYY" :min="new Date().toISOString()" :max="new Date(new Date().getFullYear() + 50, 1, 1).toISOString()" name="expirationDate" required/>
					</ion-item>
					<div class="ion-text-center">
						<loading-btn color="success" type="submit" :loading="acceptLoading" :text="$t('actions.accept')" :loadingText="$t('actions.accepting')"/>
						<loading-btn @click="rejectRequest" color="danger" :loading="rejectLoading" :text="$t('actions.reject')" :loadingText="$t('actions.rejecting')"/>
					</div>
				</form>
			</ion-card-content>
		</ion-card>
	</ion-grid>
</template>
<script>
	import LoadingBtn from '@/components/structure/loadingBtn';

	export default {
		name: 'CreateOfficeConnectionNotificationDetails',
		components: { LoadingBtn },
		data() {
			return {
				acceptLoading: false,
				rejectLoading: false,
				deleteLoading: false,
				form: {
					expirationDate: '',
				},
				request: {},
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
			acceptRequest() {
				this.acceptLoading = true;

				this.$store.dispatch('request/resolveRequest', {
					id: this.request.id,
					decision: 'ACCEPT',
					payload: {
						createOfficeConnectionPayload: this.form,
					},
				})
					.then(() => {
						this.$toast.saveSuccess();
						this.$router.push({ name: 'Notifications' });
					})
					.catch((err) => this.$toast.error(err))
					.finally(() => this.acceptLoading = false);
			},
			rejectRequest() {
				this.rejectLoading = true;
				this.$store.dispatch('request/resolveRequest', { id: this.request.id, decision: 'REJECT' })
					.then(() => {
						this.$toast.saveSuccess();
						this.$router.push({ name: 'Notifications' });
					})
					.catch((err) => this.$toast.error(err))
					.finally(() => this.rejectLoading = false);
			},
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
		computed: {
			isMine() {
				return this.request.senderUsername === this.$store.getters['auth/username'];
			},
		},
	};
</script>
