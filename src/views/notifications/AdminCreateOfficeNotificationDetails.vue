<template>
	<ion-grid fixed>
		<strong>{{ $t('fields.office') }}: </strong>
		<span>{{ request.payload.createOfficePayload.officeName }}</span>
		<br>
		<strong>{{ $t('fields.username') }}: </strong>
		<span>{{ user.username }}</span>
		<br>
		<strong>{{ $t('fields.full_name') }}: </strong>
		<span>{{ user.family_name + ' ' + user.name + ' ' + user.fathers_name }}</span>
		<br>
		<strong>{{ $t('fields.mobile') }}: </strong>
		<span>{{ request.payload.createOfficePayload.mobile }}</span>
		<br>
		<strong>{{ $t('fields.phone') }}: </strong>
		<span>{{ request.payload.createOfficePayload.phone }}</span>
		<br>
		<strong>{{ $t('fields.address') }}: </strong>
		<span>{{ request.payload.createOfficePayload.address + ', ' + request.payload.createOfficePayload.zip_code }}</span>
		<br>
		<strong>{{ $t('fields.tin') }}: </strong>
		<span>{{ request.payload.createOfficePayload.tin }}</span>
		<br>
		<strong>{{ $t('fields.chamberRecordNumber') }}: </strong>
		<span>{{ request.payload.createOfficePayload.chamberRecordNumber }}</span>
		<br>
		<strong>{{ $t('fields.professionStartDate') }}: </strong>
		<span>{{ request.payload.createOfficePayload.professionStartDate }}</span>
		<br>
		<strong>{{ $t('fields.licenseExpirationDate') }}: </strong>
		<span>{{ request.payload.createOfficePayload.licenseExpirationDate }}</span>
		<br>
		<strong>{{ $t('fields.comments') }}: </strong>
		<span>{{ request.payload.createOfficePayload.comments }}</span>
		<br>
		<strong>{{ $t('fields.files') }}: </strong>
		<ion-button v-for="file in request.payload.createOfficePayload.files" :key="file.level + '/' + file.idToken + '/' + file.filePath + '/' + file.filename" @click="openFile(file)" fill="clear">{{ file.filename }}</ion-button>
		<form @submit.prevent="acceptRequest">
			<ion-list>
				<ion-item>
					<ion-icon :icon="$ionicons.calendarOutline" slot="start" class="ion-align-self-center"/>
					<ion-label position="floating">{{ $t('fields.subscriptionExpirationDate') }}</ion-label>
					<ion-datetime-custom v-model="form.subscriptionExpirationDate" :disable-past="true" name="subscriptionExpirationDate" :required="true" :return-date="true"/>
				</ion-item>
				<ion-item>
					<ion-icon :icon="$ionicons.peopleOutline" slot="start" class="ion-align-self-center"/>
					<ion-label position="floating">{{ $t('fields.partnersNumberLimit') }}</ion-label>
					<ion-input v-model="form.partnersNumberLimit" :min="0" type="number" name="partnersNumberLimit" required class="no-arrows"/>
				</ion-item>
				<ion-item>
					<ion-icon slot="start"/>
					<ion-label position="floating">{{ $t('fields.employeesNumberLimit') }}</ion-label>
					<ion-input v-model="form.employeesNumberLimit" :min="0" type="number" name="employeesNumberLimit" required class="no-arrows"/>
				</ion-item>
				<ion-item>
					<ion-icon :icon="$ionicons.appsOutline" slot="start" class="ion-align-self-center"/>
					<ion-label position="floating">{{ $t('fields.featureAccess') }}</ion-label>
					<ion-select v-model="featureAccess" multiple :ok-text="$t('actions.ok')" :cancel-text="$t('actions.cancel')" required>
						<ion-select-option v-for="o in featureAccessOptions" :key="o.text" :value="o.value">{{ o.text }}</ion-select-option>
					</ion-select>
				</ion-item>
				<ion-item>
					<ion-icon :icon="$ionicons.cubeOutline" slot="start" class="ion-align-self-center"/>
					<ion-label position="floating">{{ $t('fields.companyAccess') }}</ion-label>
					<ion-select v-model="companyAccess" multiple :ok-text="$t('actions.ok')" :cancel-text="$t('actions.cancel')" required>
						<ion-select-option v-for="o in companyOptions" :key="o.text" :value="o.value">{{ o.text }}</ion-select-option>
					</ion-select>
				</ion-item>
			</ion-list>
			<div class="ion-text-center">
				<loading-btn color="success" type="submit" :loading="acceptLoading" :text="$t('actions.accept')" :loadingText="$t('actions.accepting')"/>
				<loading-btn @click="rejectRequest" color="danger" :loading="rejectLoading" :text="$t('actions.reject')" :loadingText="$t('actions.rejecting')"/>
			</div>
		</form>
	</ion-grid>
</template>
<script>
	import { mapActions, mapGetters } from 'vuex';
	// import { Storage } from 'aws-amplify';
	import { API, graphqlOperation } from 'aws-amplify';
	import { getS3Object } from '@/graphql/custom-queries';
	import loadingBtn from '@/components/structure/loadingBtn';
	import IonDatetimeCustom from '@/components/structure/ionDatetimeCustom';

	export default {
		name: 'NotificationDetails',
		components: {
			IonDatetimeCustom,
			loadingBtn,
		},
		data() {
			return {
				request: {},
				user: {},
				featureAccess: [],
				companyAccess: [],
				form: {
					managerModelPermissions: [
						'OFFICE_INFO_QUERY',
						'OFFICE_INFO_MUTATE',
						'VEHICLES_QUERY',
						'VEHICLES_MUTATE',
						'CONTRACTS_QUERY',
						'CONTRACTS_MUTATE',
						'CUSTOMERS_QUERY',
						'CUSTOMERS_MUTATE',
						'EMPLOYEE_ADD',
						'EMPLOYEE_REMOVE',
						'CONTRACTOR_ADD',
						'CONTRACTOR_REMOVE',
						'OFFICE_CONN_CREATE',
						'OFFICE_CONN_DELETE',
					],
					managerPagePermissions: JSON.stringify([
						'AccountingReceipts',
						'AccountingRegisters',
						'AccountingTodaysIncome',
						'AccountingCommissionsUncollected',
						'AccountingCommissionsCollected',
						'AccountingMutualAccount',
						'VehicleCards',
						'VehicleCardsDetails',
						'CustomerCards',
						'ContractsFile',
						'UncollectedContracts',
						'CollectedContracts',
						'ContractAdditionalActs',
						'GreenCardContracts',
						'UnclaimedContracts',
						'InvalidContracts',
						'NewContract',
						'SupplierContractors',
						'ContractorsExternalContractors',
						'VehiclePricing',
						'IndustrialLiabilityPricing',
						'FirePricing',
						'LifePricing',
						'ProcessingDueDateRegister',
						'ProcessingDuePayment',
						'ProcessingPaid',
						'ProcessingLosses',
						'ContractApproval',
						'Payment',
						'Bank',
						'Collaboration',
						'Wallet',
						'Library',
					]),
					subscriptionExpirationDate: '',
					partnersNumberLimit: '',
					employeesNumberLimit: '',
					insuranceCompanies: [],
				},
				acceptLoading: false,
				rejectLoading: false,
			};
		},
		async created() {
			const requestId = this.$route.params.id;
			this.request = Object.assign({}, this.$store.getters['request/requestForMeById'](requestId));
			this.user = await this.$store.dispatch('auth/getUserProfileByUsername', this.request.senderUsername);

			const pageDesc = ` - ${this.request.payload.createOfficePayload.officeName}: ${this.user.family_name} ${this.user.name} ${this.user.fathers_name}`;
			this.$store.commit('pageStructure/setPageTitle', () => window.vm.$t('views.notifications.pageTitle') + pageDesc);
			this.$store.commit('pageStructure/setPageBackButton', true);
			this.$store.commit('pageStructure/setBackButtonDefaultHref', this.$router.resolve({ name: 'AdminNotifications' }).fullPath);
		},
		methods: {
			...mapActions('request', ['resolveRequest']),
			async openFile(file) {
				const response = await API.graphql(graphqlOperation(getS3Object, { obj: file }));
				const fileData = response.data.getS3Object;
				this.downloadBase64File(fileData.content, file.filename, file.contentType);
			},
			downloadBase64File(contentBase64, fileName, contentType) {
				const linkSource = `data:${contentType};base64,${contentBase64}`;
				const downloadLink = document.createElement('a');
				document.body.appendChild(downloadLink);

				downloadLink.href = linkSource;
				downloadLink.target = '_self';
				downloadLink.download = fileName;
				downloadLink.click();
			},
			acceptRequest() {
				this.acceptLoading = true;
				this.form.insuranceCompanies = [];
				for (const company of this.companyAccess) {
					this.form.insuranceCompanies.push({
						name: company,
						code: '',
					});
				}

				const payload = Object.assign({}, this.form);
				payload.subscriptionExpirationDate = payload.subscriptionExpirationDate.split('T')[0];

				this.resolveRequest({ id: this.request.id, decision: 'ACCEPT', payload: { createOfficePayload: payload } })
					.then(() => {
						this.$toast.saveSuccess();
						this.$router.push({ name: 'AdminNotifications' });
					})
					.catch((err) => this.$toast.error(err))
					.finally(() => this.acceptLoading = false);
			},
			rejectRequest() {
				this.rejectLoading = true;
				this.resolveRequest({ id: this.request.id, decision: 'REJECT' })
					.then(() => {
						this.$toast.saveSuccess();
						this.$router.push({ name: 'AdminNotifications' });
					})
					.catch((err) => this.$toast.error(err))
					.finally(() => this.rejectLoading = false);
			},
		},
		computed: {
			...mapGetters('platformData', [
				'featureAccessOptions',
				'companyOptions',
			]),
		},
	};
</script>
