<template>
	<ion-card>
		<ion-item lines="full">
			<ion-card-title>{{ $t('views.Office.companyInfo') }}</ion-card-title>
		</ion-item>
		<ion-card-content>
			<form @submit.prevent="save">
				<ion-input-item v-model="myOffice.office_logo" :config="$inputConfigs.office_logo" input-group="companyInfo"/>
				<ion-list>
					<ion-input-item v-model="myOffice.officeName" :config="$inputConfigs.officeName" input-group="companyInfo"/>
					<ion-row>
						<ion-col size="12" size-md="6">
							<ion-input-item v-model="myOffice.tin" :config="$inputConfigs.tin" input-group="companyInfo"/>
						</ion-col>
						<ion-col size="12" size-md="6">
							<ion-input-item v-model="myOffice.chamberRecordNumber" :config="$inputConfigs.chamberRecordNumber" input-group="companyInfo"/>
						</ion-col>
					</ion-row>
					<ion-row>
						<ion-col size="12" size-md="4">
							<ion-input-item v-model="myOffice.professionStartDate" :config="$inputConfigs.professionStartDate" input-group="companyInfo"/>
						</ion-col>
						<ion-col size="12" size-md="4">
							<ion-input-item v-model="myOffice.insuranceLicenseExpirationDate" :config="$inputConfigs.insuranceLicenseExpirationDate" icon-classes="ion-hide-md-up" input-group="companyInfo"/>
						</ion-col>
						<ion-col size="12" size-md="4">
							<ion-input-item v-model="myOffice.civilLiabilityExpirationDate" :config="$inputConfigs.civilLiabilityExpirationDate" icon-classes="ion-hide-md-up" input-group="companyInfo"/>
						</ion-col>
					</ion-row>
					<ion-row>
						<ion-col size="12" size-md="8">
							<ion-input-item v-model="myOffice.address" :config="$inputConfigs.address" input-group="companyInfo"/>
						</ion-col>
						<ion-col size="12" size-md="4">
							<ion-input-item v-model="myOffice.zip_code" :config="$inputConfigs.zip_code" input-group="companyInfo"/>
						</ion-col>
					</ion-row>
					<ion-row>
						<ion-col size="12" size-md="6">
							<ion-input-item v-model="myOffice.phone" :config="$inputConfigs.phone" input-group="companyInfo"/>
						</ion-col>
						<ion-col size="12" size-md="6">
							<ion-input-item v-model="myOffice.mobile" :config="$inputConfigs.mobile" input-group="companyInfo"/>
						</ion-col>
					</ion-row>
					<ion-input-item v-model="myOffice.office_email" :config="$inputConfigs.office_email" input-group="companyInfo"/>
				</ion-list>
				<ion-list>
					<ion-list-header>
						<h2><strong>{{ $t('views.Office.companyAccounts') }}</strong></h2>
						<ion-button @click="addCompanyAccount" fill="clear">
							<ion-icon :icon="$ionicons.addOutline" slot="icon-only"/>
						</ion-button>
					</ion-list-header>
					<ion-item v-if="(myOffice.bankAccountInfo || []).length === 0">
						<ion-text>{{ $t('fields.noCompanyAccounts') }}</ion-text>
					</ion-item>
					<ion-row class="ion-no-padding ion-align-items-center" v-for="(account, i) in myOffice.bankAccountInfo" :key="'bankAccounts' + i">
						<ion-col>
							<ion-row>
								<ion-col size="12" size-md="6">
									<ion-input-item v-model="selectedBanks[i]" :config="$inputConfigs.companyBankAccountsSelect" input-group="companyInfo"/>
									<ion-input-item v-if="selectedBanks[i] === 'Other'" v-model="account.name" :config="$inputConfigs.companyBankAccountsOtherName" input-group="companyInfo"/>
								</ion-col>
								<ion-col size="12" size-md="6">
									<ion-input-item v-model="account.iban" :config="$inputConfigs.companyBankAccountsIban" input-group="companyInfo"/>
								</ion-col>
							</ion-row>
						</ion-col>
						<ion-col size="auto" class="ion-no-padding">
							<ion-button @click="deleteCompanyAccount(i)" fill="clear" size="small" color="danger">
								<ion-icon :icon="$ionicons.closeOutline" slot="icon-only"/>
							</ion-button>
						</ion-col>
					</ion-row>
				</ion-list>
				<ion-list>
					<ion-list-header>
						<h2><strong>{{ $t('views.Office.companyCodes') }}</strong></h2>
						<ion-button @click="addInsuranceCompanies" fill="clear">
							<ion-icon :icon="$ionicons.addOutline" slot="icon-only"/>
						</ion-button>
					</ion-list-header>
					<ion-item v-if="myOffice.insuranceCompanies.length === 0">
						<ion-text>{{ $t('fields.noInsuranceCompanies') }}</ion-text>
					</ion-item>
					<ion-row class="ion-no-padding ion-align-items-center" v-for="(companyCode, i) in myOffice.insuranceCompanies" :key="'companyCodes' + i">
						<ion-col>
							<ion-row>

								<ion-col size="12" size-md="6">
									<ion-input-item v-model="companyCode.name" :config="$inputConfigs.insuranceCompaniesSelect" input-group="companyInfo"/>
								</ion-col>
								<ion-col size="12" size-md="6">
									<ion-input-item v-model="companyCode.code" :config="$inputConfigs.insuranceCompaniesCode" input-group="companyInfo"/>
								</ion-col>
							</ion-row>
						</ion-col>
						<ion-col size="auto" class="ion-no-padding">
							<ion-button @click="deleteInsuranceCompanies(i)" fill="clear" size="small" color="danger">
								<ion-icon :icon="$ionicons.closeOutline" slot="icon-only"/>
							</ion-button>
						</ion-col>
					</ion-row>
				</ion-list>
				<ion-list>
					<ion-list-header>
						<h2><strong>{{ $t('views.Office.companyFiles') }}</strong></h2>
<!--						<ion-button fill="clear">-->
<!--							<ion-icon :icon="$ionicons.addOutline" slot="icon-only"/>-->
<!--						</ion-button>-->
					</ion-list-header>
					<ion-item v-if="myOffice.files.length === 0">
						<ion-text>{{ $t('fields.noCompanyFiles') }}</ion-text>
					</ion-item>
					<ion-item v-for="(file, i) in myOffice.files" :key="'companyFiles' + i">
						<s3-object :s3-object="file" :disable-delete="true"/>
					</ion-item>
				</ion-list>
				<div class="ion-margin-top">
					<loading-btn type="submit" :loading="loading" :text="$t('actions.save')" :loadingText="$t('actions.saving')"/>
				</div>
			</form>
		</ion-card-content>
	</ion-card>
</template>
<script>
	import IonInputItem from '@/components/structure/ionInputItem';
	import loadingBtn from '@/components/structure/loadingBtn';
	import { mapGetters } from 'vuex';
	import S3Object from '@/components/structure/S3Object';


	export default {
		name: 'OfficeInfoCard',
		components: {
			IonInputItem,
			S3Object,
			loadingBtn,
		},
		data() {
			return {
				selectedBanks: [],
				loading: false,
			};
		},
		mounted() {
			const bankNames = Array.from(this.bankOptions, o => o.value);
			for (const account of this.myOffice.bankAccountInfo) {
				if (bankNames.includes(account.name)) {
					this.selectedBanks.push(account.name);
				} else {
					this.selectedBanks.push('Other');
				}
			}
		},
		beforeUnmount() {
			this.myOffice.bankAccountInfo = this.myOffice.bankAccountInfo.filter(el => el.name !== '' && el.iban !== '');
			this.myOffice.insuranceCompanies = this.myOffice.insuranceCompanies.filter(el => el.name !== '' && el.code !== '');
		},
		methods: {
			save() {
				this.loading = true;

				for (const i in this.myOffice.bankAccountInfo) {
					if (this.selectedBanks[i] === 'Other') {
						continue;
					}
					this.myOffice.bankAccountInfo[i].name = this.selectedBanks[i];
				}

				this.$store.dispatch('office/updateOfficeDetails')
					.then(() => {
						this.$toast.saveSuccess();
						this.$mitt.emit('markInputClean:all');
					})
					.catch(this.$toast.error)
					.finally(() => this.loading = false);
			},
			addCompanyAccount() {
				this.myOffice.bankAccountInfo.push({
					name: '',
					iban: '',
				});
			},
			deleteCompanyAccount(i) {
				this.myOffice.bankAccountInfo.splice(i, 1);
			},
			addInsuranceCompanies() {
				this.myOffice.insuranceCompanies.push({
					name: '',
					code: '',
				});
			},
			deleteInsuranceCompanies(i) {
				this.myOffice.insuranceCompanies.splice(i, 1);
			},
		},
		computed: {
			...mapGetters('platformData', ['bankOptions']),
			...mapGetters('office', ['myOffice']),
		},
	};
</script>
