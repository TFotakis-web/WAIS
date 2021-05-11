<template>
	<ion-grid fixed>
		<form @submit.prevent="create">
			<ion-list class="ion-margin-bottom">
				<ion-row>
					<ion-col size="12" size-md="4">
						<ion-input-item v-model="form.collaborator" :config="$inputConfigs.collaboratorSelect"/>
					</ion-col>
				</ion-row>
			</ion-list>
			<ion-list class="ion-margin-bottom">
				<ion-list-header>
					<h3>{{ $t('fields.personalInfo') }}</h3>
				</ion-list-header>
				<ion-row>
					<ion-col size="12" size-md="4">
						<ion-input-item v-model="form.tin" :config="$inputConfigs.tin"/>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-input-item v-model="form.family_name" :config="$inputConfigs.family_name"/>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-input-item v-model="form.name" :config="$inputConfigs.name" icon-classes="ion-hide-md-up"/>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-input-item v-model="form.address" :config="$inputConfigs.address"/>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-input-item v-model="form.city" :config="$inputConfigs.city" icon-classes="ion-hide-md-up"/>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-input-item v-model="form.zip_code" :config="$inputConfigs.zip_code" icon-classes="ion-hide-md-up"/>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-input-item v-model="form.mobile" :config="$inputConfigs.mobile"/>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-input-item v-model="form.phone" :config="$inputConfigs.phone"/>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-input-item v-model="form.email" :config="$inputConfigs.email"/>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-input-item v-model="form.birthdate" :config="$inputConfigs.birthdate"/>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-input-item v-model="form.driversLicenseIssueDate" :config="$inputConfigs.driversLicenseIssueDate" icon-classes="ion-hide-md-up"/>
					</ion-col>
				</ion-row>
			</ion-list>
			<ion-list class="ion-margin-bottom">
				<ion-list-header>
					<h3>{{ $t('fields.vehicleInfo') }}</h3>
				</ion-list-header>
				<ion-row>
					<ion-col size="12" size-md="4">
						<ion-input-item v-model="form.numberPlate" :config="$inputConfigs.numberPlate"/>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-input-item v-model="form.branch" :config="$inputConfigs.branchSelect"/>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-input-item v-model="form.usage" :config="$inputConfigs.usageSelect"/>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-input-item v-model="form.manufacturer" :config="$inputConfigs.manufacturerSelect"/>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-input-item v-model="form.model" :config="$inputConfigs.modelSelect"/>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-input-item v-model="form.type" :config="$inputConfigs.typeSelect"/>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-input-item v-model="form.color" :config="$inputConfigs.colorSelect"/>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-input-item v-model="form.fuelType" :config="$inputConfigs.fuelTypeSelect"/>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-input-item v-model="form.owner" :config="$inputConfigs.ownerSelect"/>
					</ion-col>
				</ion-row>
			</ion-list>
			<ion-list class="ion-margin-bottom">
				<ion-list-header>
					<h3>{{ $t('fields.contractInfo') }}</h3>
				</ion-list-header>
				<ion-row>
					<ion-col size="12" size-md="4">
						<ion-input-item v-model="form.company" :config="$inputConfigs.companySelect"/>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-input-item v-model="form.package" :config="$inputConfigs.packageSelect"/>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-input-item v-model="form.contractNumber" :config="$inputConfigs.contractNumber"/>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-input-item v-model="form.issueDate" :config="$inputConfigs.issueDate"/>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-input-item v-model="form.duration" :config="$inputConfigs.durationSelect"/>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-input-item v-model="form.discount" :config="$inputConfigs.discountSelect"/>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-input-item v-model="form.grossIncome" :config="$inputConfigs.grossIncome"/>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-input-item v-model="form.netIncome" :config="$inputConfigs.netIncome"/>
					</ion-col>
				</ion-row>
			</ion-list>
			<div class="ion-margin-top ion-text-center">
				<loading-btn color="primary" type="submit" :loading="loading" :text="$t('actions.save')" :loadingText="$t('actions.saving')"/>
			</div>
		</form>
	</ion-grid>
</template>
<script>
	import IonInputItem from '@/components/structure/ionInputItem';
	import loadingBtn from '@/components/structure/loadingBtn';
	import { mapGetters } from 'vuex';
	import IonDatetimeCustom from '@/components/structure/ionDatetimeCustom';


	export default {
		name: 'NewContract',
		components: {
			IonInputItem,
			IonDatetimeCustom,
			loadingBtn,
		},
		mounted() {
			this.$store.commit('pageStructure/setPageTitle', () => window.vm.$t('components.navigation.sidenav.contracts.new'));
			this.$store.commit('pageStructure/setPageBackButton', false);
		},
		data() {
			return {
				form: {
					collaborator: '',
					tin: '',
					name: '',
					family_name: '',
					address: '',
					city: '',
					zip_code: '',
					mobile: '',
					telephone: '',
					email: '',
					birthdate: '',
					driversLicenseIssueDate: '',
					numberPlate: '',
					branch: '',
					usage: '',
					manufacturer: '',
					model: '',
					type: '',
					color: '',
					fuelType: '',
					owner: '',
					company: '',
					package: '',
					contractNumber: '',
					issueDate: '',
					duration: '',
					discount: '',
					grossIncome: '',
					netIncome: '',
				},
				loading: false,
			};
		},
		methods: {
			create() {
				console.log('Created.');
			},
		},
		computed: {
			...mapGetters('platformData', [
				'collaboratorOptions',
				'branchOptions',
				'usageOptions',
				'manufacturerOptions',
				'modelOptions',
				'typeOptions',
				'colorOptions',
				'fuelTypeOptions',
				'ownerOptions',
				'companyOptions',
				'packageOptions',
				'durationOptions',
				'discountOptions',
			]),
		},
	};
</script>
