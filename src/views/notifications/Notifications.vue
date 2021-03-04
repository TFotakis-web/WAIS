<template>
	<div class="text-center pt-5">
		<h1>{{ $t('views.notifications.pageTitle') }}</h1>
		<h5 class="text-info mb-5">{{ $t('various.underConstruction') }}</h5>
		<mdb-container>
			<mdb-card>
				<mdb-card-body>
					<mdb-list-group>
						<mdb-list-group-item v-for="request in createTradeList" :key="request.id">
							<span>{{ request.payload.surname + ' ' + request.payload.name + ' ' + request.payload.fathersName + ' | ' + request.payload.tradeName }}</span>
							<mdb-btn @click.native="acceptRequest(request)" color="success" size="sm" class="my-0">{{ $t('actions.accept') }}</mdb-btn>
							<mdb-btn @click.native="rejectRequest(request)" color="danger" size="sm" class="my-0">{{ $t('actions.reject') }}</mdb-btn>
						</mdb-list-group-item>
					</mdb-list-group>
				</mdb-card-body>
			</mdb-card>
		</mdb-container>
	</div>
</template>
<script>
	import { mapActions } from "vuex";

	export default {
		name: "Notifications",
		data() {
			return {
				requests: [],
			}
		},
		mounted() {
			this.listRequestsByReceiverEmail("wais@admin.com")
				.then((response) => {
					for (let request of response) {
						request.payload = JSON.parse(request.payload);
					}
					this.requests = response;
				});
		},
		methods: {
			...mapActions('request', ['listRequestsByReceiverEmail', 'resolveRequest']),
			acceptRequest(request) {
				this.resolveRequest({
					id: request.id,
					payload: { decision: 'ACCEPT' }
				})
				.then(() => {
					this.$notifyAction.saveSuccess();
				})
				.catch((err) => this.$notifyAction.error(err));
			},
			rejectRequest(request) {
				this.resolveRequest({
					id: request.id,
					payload: { decision: 'REJECT' }
				})
				.then(() => {
					this.$notifyAction.saveSuccess();
				})
				.catch((err) => this.$notifyAction.error(err));
			}
		},
		computed: {
			createTradeList() {
				return this.requests.filter(el => el.type === 'CREATE_TRADE');
			}
		}
	}
</script>
