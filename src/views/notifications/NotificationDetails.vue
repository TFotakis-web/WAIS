<template>
	<ion-grid fixed>
		<h1 class="ion-text-center">{{ $t('various.underConstruction') }}</h1>
		<strong>{{ $t('fields.office') }}: </strong>
		<span>{{ request.payload.createOfficePayload.officeName }}</span>
		<br>
		<strong>{{ $t('fields.username') }}: </strong>
		<span>{{ request.payload.createOfficePayload.username }}</span>
		<br>
		<strong>{{ $t('fields.full_name') }}: </strong>
		<span>{{ request.payload.createOfficePayload.family_name + ' ' + request.payload.createOfficePayload.name + ' ' + request.payload.createOfficePayload.fathersName }}</span>
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
		<a v-for="file in request.payload.createOfficePayload.files" :key="file.url" :href="file.url" target="_blank" class="ion-margin-end">{{ file.filename }}</a>
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
					<ion-select v-model="form.featureAccess" multiple :ok-text="$t('actions.ok')" :cancel-text="$t('actions.cancel')" required>
						<ion-select-option v-for="o in featureAccessOptions" :key="o.text" :value="o.value">{{ o.text }}</ion-select-option>
					</ion-select>
				</ion-item>
				<ion-item>
					<ion-icon :icon="$ionicons.cubeOutline" slot="start" class="ion-align-self-center"/>
					<ion-label position="floating">{{ $t('fields.companyAccess') }}</ion-label>
					<ion-select v-model="form.companyAccess" multiple :ok-text="$t('actions.ok')" :cancel-text="$t('actions.cancel')" required>
						<ion-select-option v-for="o in companyOptions" :key="o.text" :value="o.value">{{ o.text }}</ion-select-option>
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
	import { mapActions } from 'vuex';
	// import { Storage } from 'aws-amplify';
	import { API, graphqlOperation } from 'aws-amplify';
	import { getS3Object } from '@/graphql/custom-queries';
	import loadingBtn from '@/components/structure/loadingBtn';

	export default {
		name: 'NotificationDetails',
		components: {
			loadingBtn,
		},
		data() {
			return {
				form: {
					decision: 'ACCEPT',
					subscriptionExpirationDate: '',
					partnersNumberLimit: '',
					employeesNumberLimit: '',
					featureAccess: [],
					companyAccess: [],
				},
				featureAccessOptions: [
					{ text: this.$t('fields.billing'), value: 'Billing' },
					{ text: this.$t('fields.issuing'), value: 'Issuing' },
				],
				companyOptions: [
					{ text: 'Am Trust', value: 'Am Trust' },
					{ text: 'Brokers Union / Ergo', value: 'Brokers Union / Ergo' },
					{ text: 'Brokers Union / Prime', value: 'Brokers Union / Prime' },
					{ text: 'Cromar/Lloyds', value: 'Cromar/Lloyds' },
					{ text: 'Euroins', value: 'Euroins' },
					{ text: 'Europrotection / Am Trust', value: 'Europrotection / Am Trust' },
					{ text: 'Europrotection / Eurolife', value: 'Europrotection / Eurolife' },
					{ text: 'Express Ηρακλειου', value: 'Express Ηρακλειου' },
					{ text: 'Express Χανίων', value: 'Express Χανίων' },
					{ text: 'Generali', value: 'Generali' },
					{ text: 'Interamerican', value: 'Interamerican' },
					{ text: 'Interlife', value: 'Interlife' },
					{ text: 'Intersalonica', value: 'Intersalonica' },
					{ text: 'Oracle', value: 'Oracle' },
					{ text: 'Personal Brokers / Generali', value: 'Personal Brokers / Generali' },
					{ text: 'Personal Brokers / Interamerican', value: 'Personal Brokers / Interamerican' },
					{ text: 'Personal Brokers / Intersalonica', value: 'Personal Brokers / Intersalonica' },
					{ text: 'Personal Brokers / Ατλαντική Ένωση', value: 'Personal Brokers / Ατλαντική Ένωση' },
					{ text: 'Personal Insurance', value: 'Personal Insurance' },
					{ text: 'Εθνική', value: 'Εθνική' },
					{ text: 'Ευρωπαϊκή Πίστη', value: 'Ευρωπαϊκή Πίστη' },
				],
				acceptLoading: false,
				rejectLoading: false,
			};
		},
		mounted() {
			const pageDesc = ` - ${this.request.payload.createOfficePayload.officeName}: ${this.request.payload.createOfficePayload.family_name} ${this.request.payload.createOfficePayload.name} ${this.request.payload.createOfficePayload.fathersName}`;
			this.$store.commit('pageStructure/setPageTitle', () => window.vm.$t('views.notifications.pageTitle') + pageDesc);
			this.$store.commit('pageStructure/setPageBackButton', true);
			this.$store.commit('pageStructure/setBackButtonDefaultHref', this.$router.resolve({ name: 'Notifications' }).fullPath);
			for (const file of this.request.payload.createOfficePayload.files) {
				// Storage.get(file.filePath + file.filename, { level: file.level, identityId: file.idToken })
				// 	.then(response => file.url = response);
				API.graphql(graphqlOperation(getS3Object, { obj: file }))
					.then(response => file.url = response.data.getS3Object);
			}
		},
		methods: {
			...mapActions('request', ['resolveRequest']),
			acceptRequest() {
				this.acceptLoading = true;
				this.resolveRequest({ id: this.request.id, payload: this.form })
					.then(() => {
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
						this.$toast.saveSuccess();
						this.$router.push({ name: 'Notifications' });
					})
					.catch((err) => this.$toast.error(err))
					.finally(() => this.rejectLoading = false);
			},
		},
		computed: {
			request() {
				const requestId = this.$route.params.id;
				return this.$store.getters['request/requestForMeById'](requestId);
			},
		},
	};
</script>
