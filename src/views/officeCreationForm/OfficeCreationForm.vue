<template>
	<ion-grid fixed>
		<ion-row class="ion-justify-content-center">
			<ion-col size-sm="10" size-md="8" size-lg="6" size-xl="6">
				<ion-card>
					<ion-card-content>
						<form @submit.prevent="save">
							<ion-list>
								<ion-list-header>{{ $t('fields.personalInfo') }}</ion-list-header>
								<ion-item>
									<ion-icon :icon="$ionicons.personOutline" slot="start" class="ion-align-self-center"/>
									<ion-label position="floating">{{ $t('fields.family_name') }}</ion-label>
									<ion-input v-model="this.$store.getters['auth/userProfile'].family_name" type="text" name="fname" autocomplete="family-name" required/>
								</ion-item>
								<ion-item>
									<ion-icon slot="start"/>
									<ion-label position="floating">{{ $t('fields.name') }}</ion-label>
									<ion-input v-model="this.$store.getters['auth/userProfile'].name" type="text" name="name" autocomplete="given-name" required/>
								</ion-item>
								<ion-item>
									<ion-icon slot="start"/>
									<ion-label position="floating">{{ $t('fields.fathersName') }}</ion-label>
									<ion-input v-model="this.$store.getters['auth/userProfile'].fathers_name" type="text" name="name" autocomplete="additional-name" required/>
								</ion-item>
							</ion-list>
							<ion-list>
								<ion-list-header>{{ $t('fields.professionalInfo') }}</ion-list-header>
								<ion-item>
									<ion-icon :icon="$ionicons.businessOutline" slot="start" class="ion-align-self-center"/>
									<ion-label position="floating">{{ $t('fields.office') }}</ion-label>
									<ion-input v-model="CreateOfficeRequestPayloadInput.officeName" type="text" name="officeName" required/>
								</ion-item>
								<ion-item>
									<ion-icon :icon="$ionicons.phonePortraitOutline" slot="start" class="ion-align-self-center"/>
									<ion-label position="floating">{{ $t('fields.mobile') }}</ion-label>
									<ion-input v-model="CreateOfficeRequestPayloadInput.mobile" type="number" name="mobile" autocomplete="tel" required class="no-arrows"/>
								</ion-item>
								<ion-item>
									<ion-icon :icon="$ionicons.callOutline" slot="start" class="ion-align-self-center"/>
									<ion-label position="floating">{{ $t('fields.phone') }}</ion-label>
									<ion-input v-model="CreateOfficeRequestPayloadInput.phone" type="number" name="phone" autocomplete="tel" required class="no-arrows"/>
								</ion-item>
								<ion-item>
									<ion-icon :icon="$ionicons.mailOutline" slot="start" class="ion-align-self-center"/>
									<ion-label position="floating">{{ $t('fields.email') }}</ion-label>
									<ion-input v-model="CreateOfficeRequestPayloadInput.office_email" type="email" name="email" autocomplete="email" required/>
								</ion-item>
								<ion-item>
									<ion-icon :icon="$ionicons.locationOutline" slot="start" class="ion-align-self-center"/>
									<ion-label position="floating">{{ $t('fields.address') }}</ion-label>
									<ion-input v-model="CreateOfficeRequestPayloadInput.address" type="text" name="address" autocomplete="street-address"/>
								</ion-item>
								<ion-item>
									<ion-icon :icon="$ionicons.locateOutline" slot="start" class="ion-align-self-center"/>
									<ion-label position="floating">{{ $t('fields.zip_code') }}</ion-label>
									<ion-input v-model="CreateOfficeRequestPayloadInput.zip_code" type="number" name="postal" autocomplete="postal-code" class="no-arrows"/>
								</ion-item>
								<ion-item>
									<ion-icon :icon="$ionicons.idCardOutline" slot="start" class="ion-align-self-center"/>
									<ion-label position="floating">{{ $t('fields.tin') }}</ion-label>
									<ion-input v-model="CreateOfficeRequestPayloadInput.tin" type="text" name="tin"/>
								</ion-item>
								<ion-item>
									<ion-icon :icon="$ionicons.bookOutline" slot="start" class="ion-align-self-center"/>
									<ion-label position="floating">{{ $t('fields.chamberRecordNumber') }}</ion-label>
									<ion-input v-model="CreateOfficeRequestPayloadInput.chamberRecordNumber" type="text" name="chamberRecordNumber"/>
								</ion-item>
								<ion-item>
									<ion-icon :icon="$ionicons.calendarOutline" slot="start" class="ion-align-self-center"/>
									<ion-label position="floating">{{ $t('fields.professionStartDate') }}</ion-label>
									<ion-datetime-custom v-model="CreateOfficeRequestPayloadInput.professionStartDate" :disable-future="true" name="professionStartDate" :return-date="true"/>
								</ion-item>
								<ion-item>
									<ion-icon slot="start"/>
									<ion-label position="floating">{{ $t('fields.insuranceLicenseExpirationDate') }}</ion-label>
									<ion-datetime-custom v-model="CreateOfficeRequestPayloadInput.insuranceLicenseExpirationDate" :disable-past="true" name="insuranceLicenseExpirationDate" :return-date="true"/>
								</ion-item>
								<ion-item>
									<ion-icon slot="start"/>
									<ion-label position="floating">{{ $t('fields.civilLiabilityExpirationDate') }}</ion-label>
									<ion-datetime-custom v-model="CreateOfficeRequestPayloadInput.civilLiabilityExpirationDate" :disable-past="true" name="civilLiabilityExpirationDate" :return-date="true"/>
								</ion-item>
								<ion-item v-for="file in specificFiles" :key="file.filename">
									<file-input color="primary" :text="file.text()" :rename-to="file.filename" :file-path="file.filepath" v-model="file.data" :sizeLimitInMBs="10" size="small"/>
								</ion-item>
								<ion-item>
									<file-input color="primary" text="Other files" file-path="createOfficeRequest" v-model="otherFiles" :sizeLimitInMBs="10" multiple size="small"/>
								</ion-item>
								<ion-item>
									<ion-icon :icon="$ionicons.chatbubbleOutline" slot="start" class="ion-align-self-center"/>
									<ion-label position="floating">{{ $t('fields.comments') }}</ion-label>
									<ion-textarea v-model="CreateOfficeRequestPayloadInput.comments" :auto-grow="true" name="comments"/>
								</ion-item>
							</ion-list>
							<ion-list>
								<ion-list-header>{{ $t('views.officeCreationForm.termsAndConditions') }}</ion-list-header>
								<ion-item>
									<ion-checkbox v-model="condition" slot="start" required/>
									<ion-label>{{ $t('views.officeCreationForm.iAgreeToTheTermsAndConditions') }}</ion-label>
								</ion-item>
							</ion-list>
							<div class="ion-margin-top">
								<loading-btn color="primary" :disabled="!condition" expand="block" type="submit" :loading="loading" :text="$t('actions.save')" :loadingText="$t('actions.saving')" class="ion-margin-bottom"/>
								<p v-if="error !== {}" class="text-danger"><strong>{{ error.message }}</strong></p>
							</div>
						</form>
					</ion-card-content>
				</ion-card>
			</ion-col>
		</ion-row>
	</ion-grid>
</template>
<script>
	import { mapActions } from 'vuex';
	import loadingBtn from '@/components/structure/loadingBtn';
	import fileInput from '@/components/structure/fileInput/fileInput';
	import IonDatetimeCustom from '@/components/structure/ionDatetimeCustom';

	export default {
		name: 'officeCreationForm',
		components: {
			IonDatetimeCustom,
			loadingBtn,
			fileInput,
		},
		data() {
			return {
				CreateOfficeRequestPayloadInput: {
					officeName: '',
					address: '',
					office_email: '',
					zip_code: '',
					mobile: '',
					phone: '',
					tin: '',
					professionStartDate: '',
					chamberRecordNumber: '',
					insuranceLicenseExpirationDate: '',
					civilLiabilityExpirationDate: '',
					comments: '',
					files: [],
				},
				request: {},
				files: [],
				loading: false,
				error: {
					message: '',
				},
				specificFiles: [
					{
						filename: 'profession_start',
						filepath: 'createOfficeRequest',
						text: () => this.$t('files.professionStart'),
						data: {},
					},
					{
						filename: 'chamber_certificate',
						filepath: 'createOfficeRequest',
						text: () => this.$t('files.chamberCertificate'),
						data: {},
					},
					{
						filename: 'liability_insurance',
						filepath: 'createOfficeRequest',
						text: () => this.$t('files.liabilityInsurance'),
						data: {},
					},
					{
						filename: 'company_articles_of_association',
						filepath: 'createOfficeRequest',
						text: () => this.$t('files.companyArticlesOfAssociation'),
						data: {},
					},
				],
				otherFiles: [],
				condition: false,
			};
		},
		mounted() {
			this.$store.commit('pageStructure/setPageTitle', () => window.vm.$t('views.officeCreationForm.createYourOffice'));
			this.$store.commit('pageStructure/setPageBackButton', false);

			const requestsForNewOffice = this.$store.getters['request/requestsForNewOfficeSent'];
			if (requestsForNewOffice.length) {
				this.request = requestsForNewOffice[0];
				const payload = this.request.payload.createOfficePayload;
				Object.assign(this.CreateOfficeRequestPayloadInput, payload);

				for (const file of this.specificFiles) {
					file.data = this.CreateOfficeRequestPayloadInput.files.find((el) => el.filename.match(file.filename)) || {};
				}

				this.otherFiles = this.CreateOfficeRequestPayloadInput.files.filter((el) => {
					let flag = false;

					for (const file of this.specificFiles) {
						flag |= Boolean(el.filename.match(file.filename));
					}

					return !flag;
				});
				this.condition = true;
			}
		},
		methods: {
			...mapActions('auth', ['updateUserProfile', 'signOut']),
			...mapActions('request', ['createOfficeRequest', 'updateRequest']),
			async save() {
				this.loading = true;

				let files = [];

				for (const file of this.specificFiles) {
					if (Object.keys(file).length) {
						files.push(file.data);
					}
				}

				if (this.otherFiles.length) {
					files = files.concat(this.otherFiles);
				}
				this.CreateOfficeRequestPayloadInput.files = files;
				this.updateUserProfile();

				let payload = Object.assign({}, this.CreateOfficeRequestPayloadInput);
				payload.professionStartDate = payload.professionStartDate.split('T')[0];
				if (payload.professionStartDate === '') payload.professionStartDate = null;
				payload.insuranceLicenseExpirationDate = payload.insuranceLicenseExpirationDate.split('T')[0];
				if (payload.insuranceLicenseExpirationDate === '') payload.insuranceLicenseExpirationDate = null;
				payload.civilLiabilityExpirationDate = payload.civilLiabilityExpirationDate.split('T')[0];
				if (payload.civilLiabilityExpirationDate === '') payload.civilLiabilityExpirationDate = null;
				if (Object.keys(this.request).length === 0) {
					this.createOfficeRequest(payload)
						.then((response) => {
							this.request = response;
							this.$toast.saveSuccess();
						})
						.catch(this.$toast.error)
						.finally(() => (this.loading = false));
				} else {
					this.request.payload.createOfficePayload = payload;
					this.updateRequest(this.request)
						.then((response) => {
							this.request = response;
							this.$toast.saveSuccess();
						})
						.catch(this.$toast.error)
						.finally(() => (this.loading = false));
				}
			},
		},
	};
</script>
