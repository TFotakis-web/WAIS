<template>
	<div>
		<div class="text-center pt-5">
			<h1>{{ $t('views.notifications.pageTitle') }}</h1>
			<h5 class="text-info mb-5">{{ $t('various.underConstruction') }}</h5>
			<mdb-container>
				<mdb-card>
					<mdb-card-body>
						<mdb-list-group>
							<mdb-list-group-item v-for="request in createTradeList" :key="request.id" @click.native="edit(request)">
							<span>
								<strong>{{ request.payload.tradeName }}: </strong>
								{{ request.payload.surname + ' ' + request.payload.name + ' ' + request.payload.fathersName }}</span>
							</mdb-list-group-item>
						</mdb-list-group>
					</mdb-card-body>
				</mdb-card>
			</mdb-container>
		</div>
		<div>
			<mdb-modal @close="modal = false" size="lg" centered v-if="modal">
				<mdb-modal-header>
					<mdb-modal-title>{{ selectedRequest.payload.tradeName }}</mdb-modal-title>
				</mdb-modal-header>
				<mdb-modal-body>
					<mdb-container fluid>
						<strong>{{ $t('fields.username') }}: </strong>
						<span>{{ selectedRequest.payload.username }}</span>
						<br>
						<strong>{{ $t('fields.full_name') }}: </strong>
						<span>{{ selectedRequest.payload.surname + ' ' + selectedRequest.payload.name + ' ' + selectedRequest.payload.fathersName }}</span>
						<br>
						<strong>{{ $t('fields.mobile') }}: </strong>
						<span>{{ selectedRequest.payload.mobile }}</span>
						<br>
						<strong>{{ $t('fields.phone') }}: </strong>
						<span>{{ selectedRequest.payload.phone }}</span>
						<br>
						<strong>{{ $t('fields.address') }}: </strong>
						<span>{{ selectedRequest.payload.address + ', ' + selectedRequest.payload.postcode }}</span>
						<br>
						<strong>{{ $t('fields.tin') }}: </strong>
						<span>{{ selectedRequest.payload.tin }}</span>
						<br>
						<strong>{{ $t('fields.chamberRecordNumber') }}: </strong>
						<span>{{ selectedRequest.payload.chamberRecordNumber }}</span>
						<br>
						<strong>{{ $t('fields.professionStartDate') }}: </strong>
						<span>{{ selectedRequest.payload.professionStartDate }}</span>
						<br>
						<strong>{{ $t('fields.licenseExpirationDate') }}: </strong>
						<span>{{ selectedRequest.payload.licenseExpirationDate }}</span>
						<br>
						<strong>{{ $t('fields.comments') }}: </strong>
						<span>{{ selectedRequest.payload.comments }}</span>
						<br>
						<strong>{{ $t('fields.files') }}: </strong>
						<span v-for="(file, fileIndex) in selectedRequest.payload.files" :key="file.url + fileIndex">
							<a :href="file.url" target="_blank" class="mr-1">{{ file.filename }}</a>
							<span v-if="fileIndex !== selectedRequest.payload.files.length - 1">, </span>
						</span>
					</mdb-container>
				</mdb-modal-body>
				<mdb-modal-footer>
					<mdb-btn @click.native="acceptRequest(selectedRequest)" color="success" size="sm" class="my-0">{{ $t('actions.accept') }}</mdb-btn>
					<mdb-btn @click.native="rejectRequest(selectedRequest)" color="danger" size="sm" class="my-0">{{ $t('actions.reject') }}</mdb-btn>
				</mdb-modal-footer>
			</mdb-modal>
		</div>
	</div>
</template>
<script>
	import { mapActions, mapGetters, mapMutations } from "vuex";
	import { Storage } from "aws-amplify";

	export default {
		name: "Notifications",
		data() {
			return {
				modal: false,
				selectedRequest: {}
			};
		},
		mounted() {
			this.listRequestsByReceiverEmail("wais@admin.com")
				.then((response) => {
					for (let request of response) {
						request.payload = JSON.parse(request.payload);
					}
					this.concatRequestsForMe(response);
				});
		},
		methods: {
			...mapActions('request', ['listRequestsByReceiverEmail', 'resolveRequest']),
			...mapMutations('auth', ['concatRequestsForMe']),
			async edit(request) {
				this.selectedRequest = request;
				for (const file of request.payload.files) {
					let url = file.url;
					const urlParts = url.split('/');
					const level = urlParts[0];
					const identityId = urlParts[1];
					const filePath = urlParts.slice(2).join('/');
					file.url = await Storage.get(filePath, { level, identityId });
					// file.url = await Storage.get('createTradeRequest/File type 1.pdf', {
						// level: 'private',
						// customPrefix: {
						// 	public: 'private/eu-central-1:fe329ece-fe3e-4439-970d-057c3942c32b/'
						// },
						// level: 'public',
						// identityId: 'eu-central-1:fe329ece-fe3e-4439-970d-057c3942c32b'
					// });
				}
				this.modal = true;
			},
			acceptRequest(request) {
				const payload = {
					decision: 'ACCEPT',
					manager_permissions: {
						'Home': {
							read: true,
							write: true
						},
						'VehiclePricing': {
							read: true,
							write: true
						},
						'IndustrialLiabilityPricing': {
							read: true,
							write: true
						},
						'FirePricing': {
							read: true,
							write: true
						},
						'LifePricing': {
							read: true,
							write: true
						},
						'ContractsFile': {
							read: true,
							write: true
						},
						'UncollectedContracts': {
							read: true,
							write: true
						},
						'CollectedContracts': {
							read: true,
							write: true
						},
						'ContractAdditionalActs': {
							read: true,
							write: true
						},
						'GreenCardContracts': {
							read: true,
							write: true
						},
						'UnclaimedContracts': {
							read: true,
							write: true
						},
						'InvalidContracts': {
							read: true,
							write: true
						},
						'NewContract': {
							read: true,
							write: true
						},
						'ProcessingDueDateRegister': {
							read: true,
							write: true
						},
						'ProcessingDuePayment': {
							read: true,
							write: true
						},
						'ProcessingPaid': {
							read: true,
							write: true
						},
						'ProcessingLosses': {
							read: true,
							write: true
						},
						'AccountingReceipts': {
							read: true,
							write: true
						},
						'AccountingRegisters': {
							read: true,
							write: true
						},
						'AccountingTodaysIncome': {
							read: true,
							write: true
						},
						'AccountingCommissionsUncollected': {
							read: true,
							write: true
						},
						'AccountingCommissionsCollected': {
							read: true,
							write: true
						},
						'AccountingMutualAccount': {
							read: true,
							write: true
						},
						'SupplierContractors': {
							read: true,
							write: true
						},
						'ContractorsExternalContractors': {
							read: true,
							write: true
						},
						'VehicleCards': {
							read: true,
							write: true
						},
						'VehicleCardsDetails': {
							read: true,
							write: true
						},
						'CustomerCards': {
							read: true,
							write: true
						},
						'Library': {
							read: true,
							write: true
						},
						'Trade': {
							read: true,
							write: true
						},
						'UserProfile': {
							read: true,
							write: true
						},
						// 'PlatformData': {
						// 	read: true,
						// 	write: true
						// },
						// 'DevTools': {
						// 	read: true,
						// 	write: true
						// },
						'ContractApproval': {
							read: true,
							write: true
						},
						'Payment': {
							read: true,
							write: true
						},
						'Bank': {
							read: true,
							write: true
						},
						'Collaboration': {
							read: true,
							write: true
						},
						'Notifications': {
							read: true,
							write: true
						},
						'Wallet': {
							read: true,
							write: true
						},
					}
				};

				this.resolveRequest({ id: request.id, payload })
					.then(() => this.$notifyAction.saveSuccess())
					.catch((err) => this.$notifyAction.error(err));
			},
			rejectRequest(request) {
				const payload = { decision: 'REJECT' };
				this.resolveRequest({ id: request.id, payload })
					.then(() => this.$notifyAction.saveSuccess())
					.catch((err) => this.$notifyAction.error(err));
			}
		},
		computed: {
			...mapGetters('auth', ['requestsForMe']),
			createTradeList() {
				return this.requestsForMe.filter(el => el.type === 'CREATE_TRADE');
			}
		}
	}
</script>
