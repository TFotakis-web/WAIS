<template>
	<ion-grid fixed>
		<h1 class="ion-text-center">{{ $t('various.underConstruction') }}</h1>
		<strong>{{ $t('fields.trade') }}: </strong>
		<span>{{ request.payload.tradeName }}</span>
		<br>
		<strong>{{ $t('fields.username') }}: </strong>
		<span>{{ request.payload.username }}</span>
		<br>
		<strong>{{ $t('fields.full_name') }}: </strong>
		<span>{{ request.payload.surname + ' ' + request.payload.name + ' ' + request.payload.fathersName }}</span>
		<br>
		<strong>{{ $t('fields.mobile') }}: </strong>
		<span>{{ request.payload.mobile }}</span>
		<br>
		<strong>{{ $t('fields.phone') }}: </strong>
		<span>{{ request.payload.phone }}</span>
		<br>
		<strong>{{ $t('fields.address') }}: </strong>
		<span>{{ request.payload.address + ', ' + request.payload.postcode }}</span>
		<br>
		<strong>{{ $t('fields.tin') }}: </strong>
		<span>{{ request.payload.tin }}</span>
		<br>
		<strong>{{ $t('fields.chamberRecordNumber') }}: </strong>
		<span>{{ request.payload.chamberRecordNumber }}</span>
		<br>
		<strong>{{ $t('fields.professionStartDate') }}: </strong>
		<span>{{ request.payload.professionStartDate }}</span>
		<br>
		<strong>{{ $t('fields.licenseExpirationDate') }}: </strong>
		<span>{{ request.payload.licenseExpirationDate }}</span>
		<br>
		<strong>{{ $t('fields.comments') }}: </strong>
		<span>{{ request.payload.comments }}</span>
		<br>
		<strong>{{ $t('fields.files') }}: </strong>
		<a v-for="file in request.payload.files" :key="file.url" :href="file.url" target="_blank" class="ion-margin-end">{{ file.filename }}</a>
		<form @submit.prevent="acceptRequest">
			<ion-list>
				<ion-item>
					<ion-icon :icon="$ionicons.calendarOutline" slot="start" class="ion-align-self-center"/>
					<ion-label position="floating">{{ $t('fields.subscriptionExpirationDate') }}</ion-label>
					<ion-datetime v-model="form.subscriptionExpirationDate" display-format="DD MMM YYYY" :min="new Date().toISOString()" :max="new Date(new Date().getFullYear() + 50, 1, 1).toISOString()" name="subscriptionExpirationDate" required/>
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
					<ion-select multiple :ok-text="$t('actions.ok')" :cancel-text="$t('actions.cancel')" required>
						<ion-select-option v-for="o in form.featureAccessOptions" :key="o.text" :value="o.value">{{ o.text }}</ion-select-option>
					</ion-select>
				</ion-item>
				<ion-item>
					<ion-icon :icon="$ionicons.cubeOutline" slot="start" class="ion-align-self-center"/>
					<ion-label position="floating">{{ $t('fields.companyAccess') }}</ion-label>
					<ion-select multiple :ok-text="$t('actions.ok')" :cancel-text="$t('actions.cancel')" required>
						<ion-select-option v-for="o in form.companyOptions" :key="o.text" :value="o.value">{{ o.text }}</ion-select-option>
					</ion-select>
				</ion-item>
			</ion-list>
			<div class="ion-text-center">
				<loadingBtn color="success" type="submit" :loading="acceptLoading" :text="$t('actions.accept')" :loadingText="$t('actions.accepting')"/>
				<loadingBtn @click="rejectRequest" color="danger" :loading="rejectLoading" :text="$t('actions.reject')" :loadingText="$t('actions.rejecting')"/>
			</div>
		</form>
	</ion-grid>
</template>
<script>
	import { mapActions, mapGetters } from 'vuex';
	import { Storage } from 'aws-amplify';
	import loadingBtn from '@/components/structure/loadingBtn';

	export default {
		name: 'NotificationDetails',
		components: {
			loadingBtn
		},
		data() {
			return {
				form: {
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
				},
				acceptLoading: false,
				rejectLoading: false,
			};
		},
		mounted() {
			this.$store.commit('pageStructure/setPageTitle', `${this.$t('views.notifications.pageTitle')} - ${this.request.payload.tradeName}: ${this.request.payload.surname} ${this.request.payload.name} ${this.request.payload.fathersName}`);
			this.$store.commit('pageStructure/setPageBackButton', true);
			this.$store.commit('pageStructure/setBackButtonDefaultHref', this.$router.resolve({ name: 'Notifications' }).fullPath);
			for (const file of this.request.payload.files) {
				Storage.get(file.filePath + file.filename, { level: file.level, identityId: file.idToken })
					.then(response => file.url = response);
			}
		},
		methods: {
			...mapActions('request', ['resolveRequest']),
			acceptRequest() {
				this.acceptLoading = true;
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
					subscriptionExpirationDate: this.form.subscriptionExpirationDate,
					partnersNumberLimit: this.form.partnersNumberLimit,
					employeesNumberLimit: this.form.employeesNumberLimit,
					featureAccess,
					companyAccess,
				};

				this.resolveRequest({ id: this.request.id, payload })
					.then(() => {
						this.$store.commit('auth/removeRequestForMe', this.request);
						this.$toast.saveSuccess();
						this.$router.push({ name: 'Notifications' });
					})
					.catch((err) => this.$toast.error(err))
					.finally(() => this.acceptLoading = false);
			},
			rejectRequest() {
				this.rejectLoading = true;
				const payload = { decision: 'REJECT' };
				this.resolveRequest({ id: this.request.id, payload })
					.then(() => {
						this.$store.commit('auth/removeRequestForMe', this.request);
						this.$toast.saveSuccess();
						this.$router.push({ name: 'Notifications' });
					})
					.catch((err) => this.$toast.error(err))
					.finally(() => this.rejectLoading = false);
			},
		},
		computed: {
			...mapGetters('auth', ['requestsForMe']),
			request() {
				const requestId = this.$route.params.id;
				const requests = this.requestsForMe.filter(el => el.id === requestId) || [];
				return requests[0];
			},
		},
	};
</script>
