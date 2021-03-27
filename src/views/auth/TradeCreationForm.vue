<template>
	<ion-page>
		<ion-content>
			<ion-grid fixed>
				<ion-row class="ion-justify-content-center">
					<ion-col size-sm="10" size-md="8" size-lg="6" size-xl="6">
						<ion-card>
							<ion-card-header>
								<ion-card-title>{{ $t('views.tradeCreationForm.createYourTrade') }}</ion-card-title>
							</ion-card-header>
							<ion-card-content>
								<form @submit.prevent="save">
									<ion-title>{{ $store.getters['auth/username'] }}</ion-title>
									<ion-list>
										<ion-list-header>{{ $t('views.tradeCreationForm.personalInfo') }}</ion-list-header>
										<ion-item>
											<ion-icon :icon="$ionicons.personOutline" slot="start" class="ion-align-self-center"/>
											<ion-label position="floating">{{ $t('fields.surname') }}</ion-label>
											<ion-input v-model="form.surname" type="text" name="fname" autocomplete="family-name" required/>
										</ion-item>
										<ion-item>
											<ion-icon slot="start"/>
											<ion-label position="floating">{{ $t('fields.name') }}</ion-label>
											<ion-input v-model="form.name" type="text" name="name" autocomplete="given-name" required/>
										</ion-item>
										<ion-item>
											<ion-icon slot="start"/>
											<ion-label position="floating">{{ $t('fields.fathersName') }}</ion-label>
											<ion-input v-model="form.fathersName" type="text" name="name" autocomplete="additional-name" required/>
										</ion-item>
									</ion-list>
									<ion-list>
										<ion-list-header>{{ $t('views.tradeCreationForm.professionalInfo') }}</ion-list-header>
										<ion-item>
											<ion-icon :icon="$ionicons.businessOutline" slot="start" class="ion-align-self-center"/>
											<ion-label position="floating">{{ $t('fields.trade') }}</ion-label>
											<ion-input v-model="form.tradeName" type="text" name="tradeName" required/>
										</ion-item>
										<ion-item>
											<ion-icon :icon="$ionicons.phonePortraitOutline" slot="start" class="ion-align-self-center"/>
											<ion-label position="floating">{{ $t('fields.mobile') }}</ion-label>
											<ion-input v-model="form.mobile" type="number" name="mobile" autocomplete="tel" required class="no-arrows"/>
										</ion-item>
										<ion-item>
											<ion-icon :icon="$ionicons.callOutline" slot="start" class="ion-align-self-center"/>
											<ion-label position="floating">{{ $t('fields.phone') }}</ion-label>
											<ion-input v-model="form.phone" type="number" name="phone" autocomplete="tel" required class="no-arrows"/>
										</ion-item>
										<ion-item>
											<ion-icon :icon="$ionicons.locationOutline" slot="start" class="ion-align-self-center"/>
											<ion-label position="floating">{{ $t('fields.address') }}</ion-label>
											<ion-input v-model="form.address" type="text" name="address" autocomplete="street-address"/>
										</ion-item>
										<ion-item>
											<ion-icon :icon="$ionicons.locateOutline" slot="start" class="ion-align-self-center"/>
											<ion-label position="floating">{{ $t('fields.postcode') }}</ion-label>
											<ion-input v-model="form.postcode" type="number" name="postal" autocomplete="postal-code" class="no-arrows"/>
										</ion-item>
										<ion-item>
											<ion-icon :icon="$ionicons.idCardOutline" slot="start" class="ion-align-self-center"/>
											<ion-label position="floating">{{ $t('fields.tin') }}</ion-label>
											<ion-input v-model="form.tin" type="text" name="tin"/>
										</ion-item>
										<ion-item>
											<ion-icon :icon="$ionicons.bookOutline" slot="start" class="ion-align-self-center"/>
											<ion-label position="floating">{{ $t('fields.chamberRecordNumber') }}</ion-label>
											<ion-input v-model="form.chamberRecordNumber" type="text" name="chamberRecordNumber"/>
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
											<file-input color="primary" text="File type 1" rename-to="File type 1" file-path="createTradeRequest/" v-model="fileType1" :sizeLimitInMBs="10" size="small"/>
										</ion-item>
										<ion-item>
											<file-input color="primary" text="File type 2" rename-to="File type 2" file-path="createTradeRequest/" v-model="fileType2" :sizeLimitInMBs="10" size="small"/>
										</ion-item>
										<ion-item>
											<file-input color="primary" text="File type 3" rename-to="File type 3" file-path="createTradeRequest/" v-model="fileType3" :sizeLimitInMBs="10" size="small"/>
										</ion-item>
										<ion-item>
											<file-input color="primary" text="Other files" file-path="createTradeRequest/" v-model="otherFiles" :sizeLimitInMBs="10" multiple size="small"/>
										</ion-item>
										<ion-item>
											<ion-icon :icon="$ionicons.chatbubbleOutline" slot="start" class="ion-align-self-center"/>
											<ion-label position="floating">{{ $t('fields.comments') }}</ion-label>
											<ion-textarea v-model="form.comments" :auto-grow="true" name="comments"/>
										</ion-item>
									</ion-list>
									<ion-list>
										<ion-list-header>{{ $t('views.tradeCreationForm.termsAndConditions') }}</ion-list-header>
										<ion-item>
											<ion-checkbox v-model="form.condition" slot="start" required/>
											<ion-label>{{ $t('views.tradeCreationForm.iAgreeToTheTermsAndConditions') }}</ion-label>
										</ion-item>
									</ion-list>
									<div class="ion-margin-top">
										<loadingBtn color="primary" expand="block" type="submit" :loading="loading" :text="$t('actions.save')" :loadingText="$t('actions.saving')" class="ion-margin-bottom"/>
										<p v-if="error !== {}" class="text-danger">{{ error.message }}</p>
										<hr class="ion-margin-vertical"/>
										<localeDropdown class="ion-margin-top"/>
										<div class="ion-text-center">
											<ion-button @click="signOut" fill="clear" class="ion-margin-vertical">
												<ion-icon :icon="$ionicons.logOutOutline" slot="start"/>
												<span>{{ $t('components.navigation.navbar-item.signOut') }}</span>
											</ion-button>
										</div>
									</div>
								</form>
							</ion-card-content>
						</ion-card>
					</ion-col>
				</ion-row>
			</ion-grid>
		</ion-content>
	</ion-page>
</template>
<script>
	import { mapActions, mapMutations } from 'vuex';
	import loadingBtn from '@/components/structure/loadingBtn';
	import localeDropdown from '@/components/structure/localeDropdown';
	import fileInput from '@/components/structure/fileInput/fileInput';

	export default {
		name: 'tradeCreationForm',
		components: {
			loadingBtn,
			localeDropdown,
			fileInput,
		},
		data() {
			return {
				form: {
					userId: this.$store.getters['auth/user'].id,
					username: this.$store.getters['auth/user'].username,
					office_email: this.$store.getters['auth/email'],
					type: 'Registration',
					tradeName: '',
					surname: '',
					name: '',
					fathersName: '',
					mobile: '',
					phone: '',
					address: '',
					postcode: '',
					tin: '',
					chamberRecordNumber: '',
					professionStartDate: '',
					licenseExpirationDate: '',
					comments: '',
					condition: false,
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
			};
		},
		mounted() {
			this.$store.commit('pageStructure/setPageTitle', this.$t('views.tradeCreationForm.createYourTrade'));
			this.$store.commit('pageStructure/setPageBackButton', false);

			const requestsSentByMe = this.$store.getters['auth/userProfile'].requestsSentByMe.items || [];
			const requestsForNewTrade = requestsSentByMe.filter(el => el.type === 'CREATE_TRADE');
			if (requestsForNewTrade.length) {
				this.request = requestsForNewTrade[0];
				const payload = JSON.parse(this.request.payload);
				Object.assign(this.form, payload);

				this.fileType1 = this.form.files.find(el => el.filename.match('File type 1')) || {};
				this.fileType2 = this.form.files.find(el => el.filename.match('File type 2')) || {};
				this.fileType3 = this.form.files.find(el => el.filename.match('File type 3')) || {};

				this.otherFiles = this.form.files.filter(el => {
					let flag = false;
					flag |= Boolean(el.filename.match('File type 1'));
					flag |= Boolean(el.filename.match('File type 2'));
					flag |= Boolean(el.filename.match('File type 3'));
					return !flag;
				});
			}
		},
		methods: {
			...mapActions('auth', ['signOut']),
			...mapActions('request', ['sendRequest', 'updateRequest', 'getRequest']),
			...mapMutations('auth', ['pushRequestsSentByMe']),
			async save() {
				this.loading = true;

				let files = [];
				if (Object.keys(this.fileType1).length) files.push(this.fileType1);
				if (Object.keys(this.fileType2).length) files.push(this.fileType2);
				if (Object.keys(this.fileType3).length) files.push(this.fileType3);
				if (this.otherFiles.length) {
					files = files.concat(this.otherFiles);
				}
				this.form.files = files;

				if (Object.keys(this.request).length === 0) {
					this.sendRequest({ requestType: 'CREATE_TRADE', payload: this.form })
						.then((res) => {
							this.$toast.saveSuccess();
							this.getRequest(res.id)
								.then((res) => {
									this.pushRequestsSentByMe(res);
									this.request = res;
								});
						})
						.catch((error) => console.error(error))
						.finally(() => this.loading = false);
				} else {
					this.request.payload = JSON.stringify(this.form);
					this.updateRequest({ request: this.request })
						.then(() => this.$toast.saveSuccess())
						.catch((error) => console.error(error))
						.finally(() => this.loading = false);
				}
			},
		},
	};
</script>
