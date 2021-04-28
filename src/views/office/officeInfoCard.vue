<template>
	<ion-card>
		<ion-item lines="full">
			<ion-card-title>{{ $t('views.Office.companyInfo') }}</ion-card-title>
		</ion-item>
		<ion-card-content>
			<ion-item>
				<ion-avatar class="ion-margin-end">
					<s3-ion-img :s3-object="myOffice.office_logo" :default-url="$store.getters['platformData/defaultOfficeLogo']"/>
				</ion-avatar>
				<file-input color="primary" :text="$t('actions.edit')" rename-to="officeLogo" file-path="office" level="protected" v-model="myOffice.office_logo" :sizeLimitInMBs="10" size="small"/>
			</ion-item>
			<form @submit.prevent="save">
				<ion-list>
					<ion-item>
						<ion-icon :icon="$ionicons.businessOutline" slot="start" class="ion-align-self-center"/>
						<ion-label position="floating">{{ $t('fields.office') }}</ion-label>
						<ion-input v-model="myOffice.officeName" type="text" name="officeName" required/>
					</ion-item>
					<ion-row>
						<ion-col size="12" size-md="6">
							<ion-item>
								<ion-icon :icon="$ionicons.idCardOutline" slot="start" class="ion-align-self-center"/>
								<ion-label position="floating">{{ $t('fields.tin') }}</ion-label>
								<ion-input v-model="myOffice.tin" type="text" name="tin"/>
							</ion-item>
						</ion-col>
						<ion-col size="12" size-md="6">
							<ion-item>
								<ion-icon :icon="$ionicons.bookOutline" slot="start" class="ion-align-self-center"/>
								<ion-label position="floating">{{ $t('fields.chamberRecordNumber') }}</ion-label>
								<ion-input v-model="myOffice.chamberRecordNumber" type="text" name="chamberRecordNumber"/>
							</ion-item>
						</ion-col>
					</ion-row>
					<ion-row>
						<ion-col size="12" size-md="4">
							<ion-item>
								<ion-icon :icon="$ionicons.calendarOutline" slot="start" class="ion-align-self-center"/>
								<ion-label position="floating">{{ $t('fields.professionStartDate') }}</ion-label>
								<ion-datetime-custom v-model="myOffice.professionStartDate" :disable-future="true" name="professionStartDate" :return-date="true"/>
							</ion-item>
						</ion-col>
						<ion-col size="12" size-md="4">
							<ion-item>
								<ion-icon slot="start" class="ion-hide-md-up"/>
								<ion-label position="floating">{{ $t('fields.insuranceLicenseExpirationDate') }}</ion-label>
								<ion-datetime-custom v-model="myOffice.insuranceLicenseExpirationDate" :disable-past="true" name="insuranceLicenseExpirationDate" :return-date="true"/>
							</ion-item>
						</ion-col>
						<ion-col size="12" size-md="4">
							<ion-item>
								<ion-icon slot="start" class="ion-hide-md-up"/>
								<ion-label position="floating">{{ $t('fields.civilLiabilityExpirationDate') }}</ion-label>
								<ion-datetime-custom v-model="myOffice.civilLiabilityExpirationDate" :disable-past="true" name="civilLiabilityExpirationDate" :return-date="true"/>
							</ion-item>
						</ion-col>
					</ion-row>
					<ion-row>
						<ion-col size="12" size-md="8">
							<ion-item>
								<ion-icon :icon="$ionicons.locationOutline" slot="start" class="ion-align-self-center"/>
								<ion-label position="floating">{{ $t('fields.address') }}</ion-label>
								<ion-input v-model="myOffice.address" type="text" name="address" autocomplete="street-address"/>
							</ion-item>
						</ion-col>
						<!--						<ion-col size="12" size-md="4">-->
						<!--							<ion-item>-->
						<!--								<ion-icon slot="start" class="ion-hide-md-up"/>-->
						<!--								<ion-label position="floating">{{ $t('fields.city') }}</ion-label>-->
						<!--								<ion-input v-model="myOffice.city" type="text" name="city" autocomplete="address-level2"/>-->
						<!--							</ion-item>-->
						<!--						</ion-col>-->
						<ion-col size="12" size-md="4">
							<ion-item>
								<ion-icon slot="start" class="ion-hide-md-up"/>
								<ion-label position="floating">{{ $t('fields.zip_code') }}</ion-label>
								<ion-input v-model="myOffice.zip_code" type="number" name="postal" autocomplete="postal-code" class="no-arrows"/>
							</ion-item>
						</ion-col>
					</ion-row>
					<ion-row>
						<ion-col size="12" size-md="6">
							<ion-item>
								<ion-icon :icon="$ionicons.callOutline" slot="start" class="ion-align-self-center"/>
								<ion-label position="floating">{{ $t('fields.phone') }}</ion-label>
								<ion-input v-model="myOffice.phone" type="number" name="phone" autocomplete="tel" required class="no-arrows"/>
							</ion-item>
						</ion-col>
						<ion-col size="12" size-md="6">
							<ion-item>
								<ion-icon :icon="$ionicons.phonePortraitOutline" slot="start" class="ion-align-self-center"/>
								<ion-label position="floating">{{ $t('fields.mobile') }}</ion-label>
								<ion-input v-model="myOffice.mobile" type="number" name="mobile" autocomplete="tel" required class="no-arrows"/>
							</ion-item>
						</ion-col>
					</ion-row>
					<ion-item>
						<ion-icon :icon="$ionicons.mailOutline" slot="start" class="ion-align-self-center"/>
						<ion-label position="floating">{{ $t('fields.email') }}</ion-label>
						<ion-input v-model="myOffice.office_email" type="email" name="email" autocomplete="email" required/>
					</ion-item>
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
									<ion-item>
										<ion-label position="floating">{{ $t('fields.bank') }}</ion-label>
										<ion-select v-model="selectedBanks[i]" required interface="popover">
											<ion-select-option v-for="o in bankOptions" :key="o.value" :value="o.value">{{ o.text }}</ion-select-option>
										</ion-select>
									</ion-item>
									<ion-item v-if="selectedBanks[i] === 'Other'">
										<ion-label position="floating">{{ $t('fields.bank') }}</ion-label>
										<ion-input v-model="account.name" type="text" required/>
									</ion-item>
								</ion-col>
								<ion-col size="12" size-md="6">
									<ion-item>
										<ion-label position="floating">{{ $t('fields.iban') }}</ion-label>
										<ion-input v-model="account.iban" type="text" required/>
									</ion-item>
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
									<ion-item>
										<ion-label position="floating">{{ $t('fields.company') }}</ion-label>
										<ion-select v-model="companyCode.name" required interface="popover">
											<ion-select-option v-for="o in companyOptionsAvailable" :key="o.value" :value="o.value">{{ o.text }}</ion-select-option>
										</ion-select>
									</ion-item>
								</ion-col>
								<ion-col size="12" size-md="6">
									<ion-item>
										<ion-label position="floating">{{ $t('fields.code') }}</ion-label>
										<ion-input v-model="companyCode.code" type="text" required/>
									</ion-item>
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
	import loadingBtn from '@/components/structure/loadingBtn';
	import S3IonImg from '@/components/structure/S3IonImg';
	import FileInput from '@/components/structure/fileInput/fileInput';
	import { mapGetters } from 'vuex';
	import IonDatetimeCustom from '@/components/structure/ionDatetimeCustom';
	import S3Object from '@/components/structure/S3Object';

	export default {
		name: 'OfficeInfoCard',
		components: {
			S3Object,
			IonDatetimeCustom,
			FileInput,
			S3IonImg,
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
					.then(this.$toast.saveSuccess)
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
			...mapGetters('platformData', ['companyOptions', 'bankOptions']),
			...mapGetters('office', ['myOffice']),
			companyOptionsAvailable() {
				return this.companyOptions.filter(el => this.myOffice.insuranceCompaniesAvailable.includes(el.value));
			},
		},
	};
</script>
