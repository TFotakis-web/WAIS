<template>
	<ion-grid fixed>
		<ion-row class="ion-justify-content-center">
			<ion-col size-sm="10" size-md="8" size-lg="6" size-xl="6">
				<ion-card>
					<ion-card-content>
						<form @submit.prevent="save">
							<ion-list>
								<ion-list-header>{{ $t('fields.personalInfo') }}</ion-list-header>
								<ion-input-item v-model="this.$store.getters['auth/userProfile'].family_name" :config="$inputConfigs.family_name" input-group="userProfile"/>
								<ion-input-item v-model="this.$store.getters['auth/userProfile'].name" :config="$inputConfigs.name" input-group="userProfile"/>
								<ion-input-item v-model="this.$store.getters['auth/userProfile'].fathers_name" :config="$inputConfigs.fathers_name" input-group="userProfile"/>
							</ion-list>
							<ion-list>
								<ion-list-header>{{ $t('fields.professionalInfo') }}</ion-list-header>
								<ion-input-item v-model="payload.officeName" :config="$inputConfigs.officeName" input-group="office"/>
								<ion-input-item v-model="payload.mobile" :config="$inputConfigs.mobile" input-group="office"/>
								<ion-input-item v-model="payload.phone" :config="$inputConfigs.phone" input-group="office"/>
								<ion-input-item v-model="payload.office_email" :config="$inputConfigs.office_email" input-group="office"/>
								<ion-input-item v-model="payload.address" :config="$inputConfigs.address" input-group="office"/>
								<ion-input-item v-model="payload.zip_code" :config="$inputConfigs.zip_code" input-group="office"/>
								<ion-input-item v-model="payload.tin" :config="$inputConfigs.tin" input-group="office"/>
								<ion-input-item v-model="payload.chamberRecordNumber" :config="$inputConfigs.chamberRecordNumber" input-group="office"/>
								<ion-input-item v-model="payload.professionStartDate" :config="$inputConfigs.professionStartDate" input-group="office"/>
								<ion-input-item v-model="payload.insuranceLicenseExpirationDate" :config="$inputConfigs.insuranceLicenseExpirationDate" input-group="office"/>
								<ion-input-item v-model="payload.civilLiabilityExpirationDate" :config="$inputConfigs.civilLiabilityExpirationDate" input-group="office"/>
								<ion-input-item v-model="specificFiles.profession_start" :config="$inputConfigs.files.profession_start" input-group="office"/>
								<ion-input-item v-model="specificFiles.chamber_certificate" :config="$inputConfigs.files.chamber_certificate" input-group="office"/>
								<ion-input-item v-model="specificFiles.liability_insurance" :config="$inputConfigs.files.liability_insurance" input-group="office"/>
								<ion-input-item v-model="specificFiles.company_articles_of_association" :config="$inputConfigs.files.company_articles_of_association" input-group="office"/>
								<ion-input-item v-model="otherFiles" :config="$inputConfigs.otherFiles" input-group="office"/>
								<ion-input-item v-model="payload.comments" :config="$inputConfigs.comments" input-group="office"/>
							</ion-list>
							<ion-list>
								<ion-list-header>{{ $t('views.officeCreationForm.termsAndConditions') }}</ion-list-header>
								<ion-input-item v-model="condition" :config="$inputConfigs.checkbox" input-group="office"/>
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
	import IonInputItem from '@/components/structure/ionInputItem';


	export default {
		name: 'officeCreationForm',
		components: {
			IonInputItem,
			loadingBtn,
		},
		data() {
			return {
				payload: {
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
				specificFiles: {
					profession_start: {},
					chamber_certificate: {},
					liability_insurance: {},
					company_articles_of_association: {},
				},
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
				Object.assign(this.payload, payload);

				for (const filename in this.specificFiles) {
					this.specificFiles[filename] = this.payload.files.find((el) => el.filename.match(filename)) || {};
				}

				this.otherFiles = this.payload.files.filter((el) => {
					let flag = false;

					for (const filename in this.specificFiles) {
						flag |= Boolean(el.filename.match(filename));
					}

					return !flag;
				});
				this.condition = true;
			}
		},
		methods: {
			...mapActions('auth', ['updateUserProfile']),
			...mapActions('request', ['createOfficeRequest', 'updateRequest']),
			save() {
				this.loading = true;
				this.updateUserProfile()
					.then(() => {
						this.$mitt.emit('markInputClean:userProfile');
					});

				let files = [];

				for (const file in this.specificFiles) {
					if (Object.keys(this.specificFiles[file]).length) {
						files.push(this.specificFiles[file]);
					}
				}

				if (this.otherFiles.length) {
					files = files.concat(this.otherFiles);
				}
				this.payload.files = files;

				if (Object.keys(this.request).length === 0) {
					this.createOfficeRequest(this.payload)
						.then((response) => {
							this.request = response;
							this.$toast.saveSuccess();
							this.$mitt.emit('markInputClean:office');
						})
						.catch(this.$toast.error)
						.finally(() => (this.loading = false));
				} else {
					this.request.payload.createOfficePayload = this.payload;
					this.updateRequest(this.request)
						.then((response) => {
							this.request = response;
							this.$toast.saveSuccess();
							this.$mitt.emit('markInputClean:office');
						})
						.catch(this.$toast.error)
						.finally(() => (this.loading = false));
				}
			},
		},
	};
</script>
