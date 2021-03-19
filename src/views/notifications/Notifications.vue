<template>
	<div>
		<div class="text-center pt-5">
			<h1>{{ $t('views.notifications.pageTitle') }}</h1>
			<h5 class="text-info mb-5">{{ $t('various.underConstruction') }}</h5>
			<mdb-container>
				<mdb-card>
					<mdb-card-body>
						<mdb-list-group>
							<mdb-list-group-item v-for="request in createTradeList" :key="request.id" @click="edit(request)" :action="true">
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
						<form @submit.prevent="acceptRequest(selectedRequest)">
							<mdb-date-picker
								disabledPast
								v-model="form.subscriptionExpirationDate"
								:label="$t('fields.subscriptionExpirationDate')"
								:option="$datepickerOptions()"
								required
								autoHide
								outline
								class="mt-3"
							/>
							<mdb-input
								v-model="form.partnersNumberLimit"
								type="number"
								:min="0"
								:label="$t('fields.partnersNumberLimit')"
								required
								outline
								class="mt-3"
							/>
							<mdb-input
								v-model="form.employeesNumberLimit"
								type="number"
								:min="0"
								:label="$t('fields.employeesNumberLimit')"
								required
								outline
								class="mt-3"
							/>
							<mdb-select multiple selectAll search v-model="form.featureAccessOptions" :label="$t('fields.featureAccess')" required outline class="mt-3"/>
							<mdb-select multiple selectAll search v-model="form.companyOptions" :visibleOptions="8" :label="$t('fields.companyAccess')" required outline class="mt-3"/>
							<div class="text-center">
								<mdb-btn type="submit" color="success" size="sm" icon="check">{{ $t('actions.accept') }}</mdb-btn>
								<mdb-btn @click="rejectRequest(selectedRequest)" color="danger" size="sm" icon="times">{{ $t('actions.reject') }}</mdb-btn>
							</div>
						</form>
					</mdb-container>
				</mdb-modal-body>
			</mdb-modal>
		</div>
	</div>
</template>
<script>
	import { mapActions, mapGetters, mapMutations } from 'vuex';
	import { Storage } from 'aws-amplify';

	export default {
		name: 'Notifications',
		data() {
			return {
				modal: false,
				selectedRequest: {},
				form: {
					subscriptionExpirationDate: '',
					partnersNumberLimit: '',
					employeesNumberLimit: '',
					featureAccessOptions: [],
					companyOptions: [],
				},
			};
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
				this.form = {
					subscriptionExpirationDate: '',
					partnersNumberLimit: '',
					employeesNumberLimit: '',
					featureAccessOptions: [
						{ text: this.$t('fields.billing'), value: 'Billing', selected: false },
						{ text: this.$t('fields.issuing'), value: 'Issuing', selected: false },
					],
					companyOptions: [
						{ text: 'Am Trust', value: 'Am Trust', selected: false },
						{ text: 'Brokers Union / Ergo', value: 'Brokers Union / Ergo', selected: false },
						{ text: 'Brokers Union / Prime', value: 'Brokers Union / Prime', selected: false },
						{ text: 'Cromar/Lloyds', value: 'Cromar/Lloyds', selected: false },
						{ text: 'Euroins', value: 'Euroins', selected: false },
						{ text: 'Europrotection / Am Trust', value: 'Europrotection / Am Trust', selected: false },
						{ text: 'Europrotection / Eurolife', value: 'Europrotection / Eurolife', selected: false },
						{ text: 'Express Ηρακλειου', value: 'Express Ηρακλειου', selected: false },
						{ text: 'Express Χανίων', value: 'Express Χανίων', selected: false },
						{ text: 'Generali', value: 'Generali', selected: false },
						{ text: 'Interamerican', value: 'Interamerican', selected: false },
						{ text: 'Interlife', value: 'Interlife', selected: false },
						{ text: 'Intersalonica', value: 'Intersalonica', selected: false },
						{ text: 'Oracle', value: 'Oracle', selected: false },
						{ text: 'Personal Brokers / Generali', value: 'Personal Brokers / Generali', selected: false },
						{ text: 'Personal Brokers / Interamerican', value: 'Personal Brokers / Interamerican', selected: false },
						{ text: 'Personal Brokers / Intersalonica', value: 'Personal Brokers / Intersalonica', selected: false },
						{ text: 'Personal Brokers / Ατλαντική Ένωση', value: 'Personal Brokers / Ατλαντική Ένωση', selected: false },
						{ text: 'Personal Insurance', value: 'Personal Insurance', selected: false },
						{ text: 'Εθνική', value: 'Εθνική', selected: false },
						{ text: 'Ευρωπαϊκή Πίστη', value: 'Ευρωπαϊκή Πίστη', selected: false },
					],
				};
				this.modal = true;
			},
			acceptRequest(request) {
				let featureAccess = [];
				for (const feature of this.form.featureAccessOptions) {
					if (feature.selected) {
						featureAccess.push(feature.value);
					}
				}

				let companyAccess = [];
				for (const company of this.form.companyOptions) {
					if (company.selected) {
						companyAccess.push(company.value);
					}
				}

				const payload = {
					decision: 'ACCEPT',
					manager_permissions: {
						'Home': {
							read: true,
							write: true,
						},
						'VehiclePricing': {
							read: true,
							write: true,
						},
						'IndustrialLiabilityPricing': {
							read: true,
							write: true,
						},
						'FirePricing': {
							read: true,
							write: true,
						},
						'LifePricing': {
							read: true,
							write: true,
						},
						'ContractsFile': {
							read: true,
							write: true,
						},
						'UncollectedContracts': {
							read: true,
							write: true,
						},
						'CollectedContracts': {
							read: true,
							write: true,
						},
						'ContractAdditionalActs': {
							read: true,
							write: true,
						},
						'GreenCardContracts': {
							read: true,
							write: true,
						},
						'UnclaimedContracts': {
							read: true,
							write: true,
						},
						'InvalidContracts': {
							read: true,
							write: true,
						},
						'NewContract': {
							read: true,
							write: true,
						},
						'ProcessingDueDateRegister': {
							read: true,
							write: true,
						},
						'ProcessingDuePayment': {
							read: true,
							write: true,
						},
						'ProcessingPaid': {
							read: true,
							write: true,
						},
						'ProcessingLosses': {
							read: true,
							write: true,
						},
						'AccountingReceipts': {
							read: true,
							write: true,
						},
						'AccountingRegisters': {
							read: true,
							write: true,
						},
						'AccountingTodaysIncome': {
							read: true,
							write: true,
						},
						'AccountingCommissionsUncollected': {
							read: true,
							write: true,
						},
						'AccountingCommissionsCollected': {
							read: true,
							write: true,
						},
						'AccountingMutualAccount': {
							read: true,
							write: true,
						},
						'SupplierContractors': {
							read: true,
							write: true,
						},
						'ContractorsExternalContractors': {
							read: true,
							write: true,
						},
						'VehicleCards': {
							read: true,
							write: true,
						},
						'VehicleCardsDetails': {
							read: true,
							write: true,
						},
						'CustomerCards': {
							read: true,
							write: true,
						},
						'Library': {
							read: true,
							write: true,
						},
						'Trade': {
							read: true,
							write: true,
						},
						'UserProfile': {
							read: true,
							write: true,
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
							write: true,
						},
						'Payment': {
							read: true,
							write: true,
						},
						'Bank': {
							read: true,
							write: true,
						},
						'Collaboration': {
							read: true,
							write: true,
						},
						'Notifications': {
							read: true,
							write: true,
						},
						'Wallet': {
							read: true,
							write: true,
						},
					},
					subscriptionExpirationDate: this.form.subscriptionExpirationDate,
					partnersNumberLimit: this.form.partnersNumberLimit,
					employeesNumberLimit: this.form.employeesNumberLimit,
					featureAccess,
					companyAccess,
				};

				this.resolveRequest({ id: request.id, payload })
					.then(() => {
						this.$store.commit('auth/removeRequestForMe', request);
						this.modal = false;
						this.$notifyAction.saveSuccess();
					})
					.catch((err) => this.$notifyAction.error(err));
			},
			rejectRequest(request) {
				const payload = { decision: 'REJECT' };
				this.resolveRequest({ id: request.id, payload })
					.then(() => {
						this.$store.commit('auth/removeRequestForMe', request);
						this.modal = false;
						this.$notifyAction.saveSuccess();
					})
					.catch((err) => this.$notifyAction.error(err));
			},
		},
		computed: {
			...mapGetters('auth', ['requestsForMe']),
			createTradeList() {
				return this.requestsForMe.filter(el => el.type === 'CREATE_TRADE');
			},
		},
	};
</script>
