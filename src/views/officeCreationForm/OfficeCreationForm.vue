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
									<ion-icon :icon="$ionicons.locationOutline" slot="start" class="ion-align-self-center"/>
									<ion-label position="floating">{{ $t('fields.address') }}</ion-label>
									<ion-input v-model="CreateOfficeRequestPayloadInput.address" type="text" name="address" autocomplete="street-address"/>
								</ion-item>
								<ion-item>
									<ion-icon :icon="$ionicons.locateOutline" slot="start" class="ion-align-self-center"/>
									<ion-label position="floating">{{ $t('fields.postcode') }}</ion-label>
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
									<ion-datetime v-model="CreateOfficeRequestPayloadInput.professionStartDate" display-format="DD MMM YYYY" :max="new Date().toISOString()" name="professionStartDate"/>
								</ion-item>
								<ion-item>
									<ion-icon slot="start"/>
									<ion-label position="floating">{{ $t('fields.insuranceLicenseExpirationDate') }}</ion-label>
									<ion-datetime v-model="CreateOfficeRequestPayloadInput.insuranceLicenseExpirationDate" display-format="DD MMM YYYY" :min="new Date().toISOString()" :max="new Date(new Date().getFullYear() + 50, 1, 1).toISOString()" name="insuranceLicenseExpirationDate"/>
								</ion-item>
								<ion-item>
									<ion-icon slot="start"/>
									<ion-label position="floating">{{ $t('fields.civilLiabilityExpirationDate') }}</ion-label>
									<ion-datetime v-model="CreateOfficeRequestPayloadInput.civilLiabilityExpirationDate" display-format="DD MMM YYYY" :min="new Date().toISOString()" :max="new Date(new Date().getFullYear() + 50, 1, 1).toISOString()" name="civilLiabilityExpirationDate"/>
								</ion-item>
								<ion-item>
									<file-input color="primary" text="File type 1" rename-to="File type 1" file-path="createOfficeRequest/" v-model="fileType1" :sizeLimitInMBs="10" size="small"/>
								</ion-item>
								<ion-item>
									<file-input color="primary" text="File type 2" rename-to="File type 2" file-path="createOfficeRequest/" v-model="fileType2" :sizeLimitInMBs="10" size="small"/>
								</ion-item>
								<ion-item>
									<file-input color="primary" text="File type 3" rename-to="File type 3" file-path="createOfficeRequest/" v-model="fileType3" :sizeLimitInMBs="10" size="small"/>
								</ion-item>
								<ion-item>
									<file-input color="primary" text="Other files" file-path="createOfficeRequest/" v-model="otherFiles" :sizeLimitInMBs="10" multiple size="small"/>
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
								<loadingBtn color="primary" :disabled="!condition" expand="block" type="submit" :loading="loading" :text="$t('actions.save')" :loadingText="$t('actions.saving')" class="ion-margin-bottom"/>
								<p v-if="error !== {}" class="text-danger">{{ error.message }}</p>
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

	export default {
		name: 'officeCreationForm',
		components: {
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
				fileType1: {},
				fileType2: {},
				fileType3: {},
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

				this.fileType1 = this.CreateOfficeRequestPayloadInput.files.find((el) => el.filename.match('File type 1')) || {};
				this.fileType2 = this.CreateOfficeRequestPayloadInput.files.find((el) => el.filename.match('File type 2')) || {};
				this.fileType3 = this.CreateOfficeRequestPayloadInput.files.find((el) => el.filename.match('File type 3')) || {};

				this.otherFiles = this.CreateOfficeRequestPayloadInput.files.filter((el) => {
					let flag = false;
					flag |= Boolean(el.filename.match('File type 1'));
					flag |= Boolean(el.filename.match('File type 2'));
					flag |= Boolean(el.filename.match('File type 3'));
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
				if (Object.keys(this.fileType1).length) files.push(this.fileType1);
				if (Object.keys(this.fileType2).length) files.push(this.fileType2);
				if (Object.keys(this.fileType3).length) files.push(this.fileType3);
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
