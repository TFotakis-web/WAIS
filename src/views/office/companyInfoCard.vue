<template>
	<ion-card>
		<ion-card-content>
			<ion-item>
				<ion-thumbnail class="ion-margin-end">
					<ion-img :src="form.officeLogo"/>
				</ion-thumbnail>
				<!--						Todo: Enable when backend is ready -->
				<!--						<file-input @update:downloadUrls="fields.officeLogo = $event" color="primary" :text="$t('actions.edit')" rename-to="officeLogo" file-path="office/" level="protected" v-model="form.officeLogo" :sizeLimitInMBs="10" size="small"/>-->
			</ion-item>
			<form @submit.prevent="save">
				<ion-list>
					<ion-list-header>
						<h1>{{ $t('views.Office.companyInfo') }}</h1>
					</ion-list-header>
					<ion-item>
						<ion-icon :icon="$ionicons.businessOutline" slot="start" class="ion-align-self-center"/>
						<ion-label position="floating">{{ $t('fields.office') }}</ion-label>
						<ion-input v-model="form.office" type="text" name="officeName" required/>
					</ion-item>
					<ion-item>
						<ion-icon :icon="$ionicons.bookOutline" slot="start" class="ion-align-self-center"/>
						<ion-label position="floating">{{ $t('fields.chamberRecordNumber') }}</ion-label>
						<ion-input v-model="form.chamberRecordNumber" type="text" name="chamberRecordNumber"/>
					</ion-item>
					<ion-item>
						<ion-icon :icon="$ionicons.idCardOutline" slot="start" class="ion-align-self-center"/>
						<ion-label position="floating">{{ $t('fields.tin') }}</ion-label>
						<ion-input v-model="form.tin" type="text" name="tin"/>
					</ion-item>
					<ion-item>
						<ion-icon :icon="$ionicons.calendarOutline" slot="start" class="ion-align-self-center"/>
						<ion-label position="floating">{{ $t('fields.professionStartDate') }}</ion-label>
						<ion-datetime v-model="form.professionStartDate" display-format="DD MMM YYYY" :max="new Date().toISOString()" name="professionStartDate"/>
					</ion-item>
					<ion-item>
						<ion-icon slot="start"/>
						<ion-label position="floating">{{ $t('fields.insuranceLicenseExpirationDate') }}</ion-label>
						<ion-datetime v-model="form.insuranceLicenseExpirationDate" display-format="DD MMM YYYY" :min="(new Date()).toISOString()" :max="new Date(new Date().getFullYear() + 50, 1, 1).toISOString()" name="insuranceLicenseExpirationDate"/>
					</ion-item>
					<ion-item>
						<ion-icon :icon="$ionicons.locationOutline" slot="start" class="ion-align-self-center"/>
						<ion-label position="floating">{{ $t('fields.address') }}</ion-label>
						<ion-input v-model="form.address" type="text" name="address" autocomplete="street-address"/>
					</ion-item>
					<ion-item>
						<ion-icon slot="start"/>
						<ion-label position="floating">{{ $t('fields.city') }}</ion-label>
						<ion-input v-model="form.city" type="text" name="city" autocomplete="address-level2"/>
					</ion-item>
					<ion-item>
						<ion-icon :icon="$ionicons.locateOutline" slot="start" class="ion-align-self-center"/>
						<ion-label position="floating">{{ $t('fields.zip_code') }}</ion-label>
						<ion-input v-model="form.zip_code" type="number" name="postal" autocomplete="postal-code" class="no-arrows"/>
					</ion-item>
					<ion-item>
						<ion-icon :icon="$ionicons.callOutline" slot="start" class="ion-align-self-center"/>
						<ion-label position="floating">{{ $t('fields.phone') }}</ion-label>
						<ion-input v-model="form.phone" type="number" name="phone" autocomplete="tel" required class="no-arrows"/>
					</ion-item>
					<ion-item>
						<ion-icon :icon="$ionicons.phonePortraitOutline" slot="start" class="ion-align-self-center"/>
						<ion-label position="floating">{{ $t('fields.mobile') }}</ion-label>
						<ion-input v-model="form.mobile" type="number" name="mobile" autocomplete="tel" required class="no-arrows"/>
					</ion-item>
					<ion-item>
						<ion-icon :icon="$ionicons.mailOutline" slot="start" class="ion-align-self-center"/>
						<ion-label position="floating">{{ $t('fields.email') }}</ion-label>
						<ion-input v-model="form.email" type="email" name="email" autocomplete="email" required/>
					</ion-item>
				</ion-list>
				<ion-list class="ion-margin-top">
					<ion-list-header>
						<h1>{{ $t('views.Office.companyAccounts') }}</h1>
						<ion-button fill="clear">
							<ion-icon :icon="$ionicons.addOutline" slot="icon-only"/>
						</ion-button>
					</ion-list-header>
					<ion-row v-for="(account, i) in form.companyAccounts" :key="'companyAccounts' + i" class="ion-align-items-end">
						<ion-col>
							<ion-item>
								<ion-label position="floating">{{ $t('fields.name') }}</ion-label>
								<ion-input v-model="account.name" type="text" required/>
							</ion-item>
						</ion-col>
						<ion-col>
							<ion-item>
								<ion-label position="floating">{{ $t('fields.iban') }}</ion-label>
								<ion-input v-model="account.iban" type="text" required/>
							</ion-item>
						</ion-col>
						<ion-col>
							<ion-item>
								<ion-button fill="clear" class="ion-align-self-center">
									<ion-icon :icon="$ionicons.closeOutline" slot="icon-only"/>
								</ion-button>
							</ion-item>
						</ion-col>
					</ion-row>
				</ion-list>
				<ion-list>
					<ion-list-header>
						<h1>{{ $t('views.Office.companyCodes') }}</h1>
						<ion-button fill="clear">
							<ion-icon :icon="$ionicons.addOutline" slot="icon-only"/>
						</ion-button>
					</ion-list-header>

					<ion-row v-for="(companyCode, i) in form.companyCodes" :key="'companyCodes' + i" class="ion-align-items-end">
						<ion-col>
							<ion-item>
								<ion-label position="floating">{{ $t('fields.company') }}</ion-label>
								<ion-select v-model="companyCode.company" required>
									<ion-select-option v-for="o in companyOptions" :key="o.text" :value="o.value">{{ o.text }}</ion-select-option>
								</ion-select>
							</ion-item>
						</ion-col>
						<ion-col>
							<ion-item>
								<ion-label position="floating">{{ $t('fields.code') }}</ion-label>
								<ion-input v-model="companyCode.code" type="text" required/>
							</ion-item>
						</ion-col>
						<ion-col>
							<ion-item>
								<ion-button fill="clear" class="ion-align-self-center">
									<ion-icon :icon="$ionicons.closeOutline" slot="icon-only"/>
								</ion-button>
							</ion-item>
						</ion-col>
					</ion-row>
				</ion-list>
				<ion-list>
					<ion-list-header>
						<h1>{{ $t('views.Office.companyFiles') }}</h1>
						<ion-button fill="clear">
							<ion-icon :icon="$ionicons.addOutline" slot="icon-only"/>
						</ion-button>
					</ion-list-header>
					<ion-item v-for="(file, i) in form.companyFiles" :key="'companyCodes' + i">
						<ion-button :href="file.url" target="_blank" fill="clear" size="small">{{ file.filename }}</ion-button>
						<ion-button fill="clear" size="small">
							<ion-icon :icon="$ionicons.closeOutline" slot="icon-only"/>
						</ion-button>
					</ion-item>
				</ion-list>
				<div class="ion-margin-top">
					<loadingBtn type="submit" :loading="loading" :text="$t('actions.save')" :loadingText="$t('actions.saving')"/>
				</div>
			</form>
		</ion-card-content>
	</ion-card>
</template>
<script>
	import loadingBtn from '@/components/structure/loadingBtn';

	export default {
		name: 'CompanyInfoCard',
		components: {
			loadingBtn,
		},
		data() {
			return {
				loading: false,
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
				form: {
					office: '',
					officeLogo: 'https://tppwebsolutions.com/wp-content/uploads/logo-demo3.png',
					chamberRecordNumber: '',
					tin: '',
					professionStartDate: '',
					insuranceLicenseExpirationDate: '',
					address: '',
					city: '',
					zip_code: '',
					phone: '',
					mobile: '',
					email: '',
					companyAccounts: [
						{ name: 'Account 1', iban: 'GR111222333444555666777888999' },
						{ name: 'Account 2', iban: 'GR000111222333444555666777888' },
					],
					companyCodes: [
						{ company: 'Generali', code: '12345' },
						{ company: 'Oracle', code: '67890' },
					],
					companyFiles: [
						{ filename: 'File 1.pdf', url: '#file1' },
						{ filename: 'File 2.pdf', url: '#file2' },
					],
				},
			};
		},
		methods: {
			save() {
				this.loading = true;
				console.log('Saved.');
				this.loading = false;
				this.$toast.saveSuccess();
			},
		},
	};
</script>
