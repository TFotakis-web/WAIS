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
				<ion-badge v-if="office.state === 'pending'" color="warning">Pending</ion-badge>
				<ion-button v-if="$store.getters['auth/role'] === 'MANAGER'" @click="deleteOffice" fill="clear" slot="end" color="danger">
					<ion-icon :icon="$ionicons.trashOutline" slot="start"/>
					<span>{{ $t('actions.delete') }}</span>
				</ion-button>
			</ion-item>
			<ion-card-content>
				<form @submit.prevent="save">
					<ion-item v-if="$store.getters['auth/role'] === 'MANAGER'">
						<ion-label position="floating">{{ $t('fields.companyAccess') }}</ion-label>
						<ion-select v-model="office.companyAccess" multiple required>
							<ion-select-option v-for="o in companyOptions" :key="o.value" :value="o.value">{{ o.text }}</ion-select-option>
						</ion-select>
					</ion-item>
					<div class="ion-margin-top">
						<loading-btn type="submit" :loading="loading" :text="$t('actions.save')" :loadingText="$t('actions.saving')"/>
					</div>
				</form>
			</ion-card-content>
		</ion-card>
	</ion-grid>
</template>
<script>
	import { mapGetters } from 'vuex';
	import LoadingBtn from '@/components/structure/loadingBtn';

	export default {
		name: 'ManageOffice',
		components: { LoadingBtn },
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
			...mapGetters('platformData', ['companyOptions']),
		},
	};
</script>

