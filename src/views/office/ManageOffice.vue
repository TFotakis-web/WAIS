<template>
	<ion-grid fixed>
		<ion-card>
			<ion-item lines="full">
				<ion-avatar slot="start">
					<ion-img :src="office.office_logo"/>
				</ion-avatar>
				<ion-label>
					<h3>{{ office.name }}</h3>
					<p>{{ office.managerUsername }} • {{ office.address }}</p>
				</ion-label>
				<ion-badge v-if="office.state === 'pending'" color="warning">{{ $t('actions.pending') }}</ion-badge>
				<ion-button v-if="$store.getters['auth/role'] === 'MANAGER'" @click="deleteOffice" fill="clear" slot="end" color="danger">
					<ion-icon :icon="$ionicons.trashOutline" slot="start"/>
					<span>{{ $t('actions.delete') }}</span>
				</ion-button>
			</ion-item>
			<ion-card-content>
				<form @submit.prevent="save">
					<ion-input-item v-if="$store.getters['auth/role'] === 'MANAGER'" v-model="office.companyAccess" :config="$inputConfigs.officeInsuranceCompaniesSelect"/>
					<div class="ion-margin-top">
						<loading-btn type="submit" :loading="loading" :text="$t('actions.save')" :loadingText="$t('actions.saving')"/>
					</div>
				</form>
			</ion-card-content>
		</ion-card>
	</ion-grid>
</template>
<script>
	import IonInputItem from '@/components/structure/ionInputItem';
	import LoadingBtn from '@/components/structure/loadingBtn';


	export default {
		name: 'ManageOffice',
		components: { IonInputItem, LoadingBtn },
		data() {
			return {
				loading: false,
				office: {},
			};
		},
		mounted() {
			this.$store.commit('pageStructure/setPageTitle', () => window.vm.$t('views.Office.manageOffice.pageTitle'));
			this.$store.commit('pageStructure/setPageBackButton', true);

			this.office = {
				id: this.id,
				name: `Office${this.id}`,
				managerUsername: `Manager${this.id}`,
				address: `Address${this.id}`,
				state: this.id % 3 === 0 ? 'pending' : undefined,
				office_logo: this.$store.getters['platformData/defaultOfficeLogo'],
				companyAccess: [],
			};
		},
		methods: {
			save() {
				this.loading = true;
				this.$toast.saveSuccess();
				this.loading = false;
			},
			deleteOffice() {
				console.log('Delete office.');
			},
		},
		computed: {
			id() {
				return this.$route.params.id;
			},
		},
	};
</script>

