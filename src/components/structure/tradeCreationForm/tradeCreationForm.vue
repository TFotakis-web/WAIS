<template>
	<mdb-container>
		<mdb-row class="h-100 justify-content-center align-items-center my-5">
			<mdb-col md="10" lg="8">
				<mdb-card>
					<mdb-card-header class="blue-gradient m-0">
						<mdb-row class="d-flex justify-content-center">
							<h3 class="white-text m-0 p-5 font-weight-bold">{{ $t('views.tradeCreationForm.createYourTrade') }}</h3>
						</mdb-row>
					</mdb-card-header>
					<mdb-card-body>
						<form @submit.prevent="save">
							<mdb-row>
								<mdb-col>
									<h4 class="text-center font-weight-bold my-4">{{ $store.getters['auth/username'] }}</h4>
									<h5 class="font-weight-bold pl-0 my-4">{{ $t('views.tradeCreationForm.personalInfo') }}</h5>
								</mdb-col>
							</mdb-row>
							<mdb-row>
								<mdb-col md="4">
									<mdb-input type="text" :label="$t('fields.surname')" v-model="form.surname" far icon="user" class="my-0" required outline/>
								</mdb-col>
								<mdb-col md="4">
									<mdb-input type="text" :label="$t('fields.name')" v-model="form.name" far icon="-" class="mt-0 d-md-none" required outline/>
									<mdb-input type="text" :label="$t('fields.name')" v-model="form.name" far class="mt-0 d-none d-md-block" required outline/>
								</mdb-col>
								<mdb-col md="4">
									<mdb-input type="text" :label="$t('fields.fathersName')" v-model="form.fathersName" far icon="-" class="my-0 d-md-none" required outline/>
									<mdb-input type="text" :label="$t('fields.fathersName')" v-model="form.fathersName" far class="my-0 d-none d-md-block" required outline/>
								</mdb-col>
							</mdb-row>
							<mdb-row>
								<mdb-col>
									<h5 class="font-weight-bold pl-0 my-4">{{ $t('views.tradeCreationForm.professionalInfo') }}</h5>
								</mdb-col>
							</mdb-row>
							<mdb-row>
								<mdb-col>
									<mdb-input type="text" :label="$t('fields.trade')" v-model="form.tradeName" far icon="building" required outline/>
								</mdb-col>
							</mdb-row>
							<mdb-row>
								<mdb-col md="6">
									<mdb-input type="text" :label="$t('fields.mobile')" v-model="form.mobile" icon="mobile-alt" required outline/>
								</mdb-col>
								<mdb-col md="6">
									<mdb-input type="text" :label="$t('fields.phone')" v-model="form.phone" icon="phone" required outline/>
								</mdb-col>
							</mdb-row>
							<mdb-row>
								<mdb-col md="6">
									<mdb-input type="text" :label="$t('fields.address')" v-model="form.address" icon="map-marker-alt" required outline/>
								</mdb-col>
								<mdb-col md="6">
									<!-- Todo: Enable postcode select -->
									<!-- <mdb-select search v-model="$root.PostcodeOptions" :label="$t('fields.postcode')" :placeholder="$t('fields.chooseYourPostcode')" icon="crosshairs" /> -->
									<mdb-input type="text" :label="$t('fields.postcode')" v-model="form.postcode" icon="crosshairs" required outline/>
								</mdb-col>
							</mdb-row>
							<mdb-row>
								<mdb-col lg="6">
									<mdb-input type="text" :label="$t('fields.tin')" v-model="form.tin" far icon="id-badge" required outline/>
								</mdb-col>
								<mdb-col lg="6">
									<mdb-input type="text" :label="$t('fields.chamberRecordNumber')" v-model="form.chamberRegistryNumber" icon="book" required outline/>
								</mdb-col>
							</mdb-row>
							<mdb-row>
								<mdb-col lg="6">
									<mdb-date-picker :label="$t('fields.professionStartDate')" v-model="form.professionStartDate" autoHide disabledFuture :option="$datepickerOptions()" far icon="calendar-alt" required outline/>
								</mdb-col>
								<mdb-col lg="6">
									<mdb-date-picker :label="$t('fields.insuranceLicenseExpirationDate')" v-model="form.licenseExpirationDate" autoHide disabledPast :option="$datepickerOptions()" far icon="-" class="d-lg-none" required outline/>
									<mdb-date-picker :label="$t('fields.insuranceLicenseExpirationDate')" v-model="form.licenseExpirationDate" autoHide disabledPast :option="$datepickerOptions()" class="d-none d-lg-block" required outline/>
								</mdb-col>
							</mdb-row>
							<mdb-row>
								<mdb-col col="12">
									<mdb-file-input textFieldTitle="File type 1" @getValue="getFileInputValue($event, 'File type 1')" sm btnColor="primary" icon="cloud-upload-alt"/>
								</mdb-col>
								<mdb-col col="12">
									<mdb-file-input textFieldTitle="File type 2" @getValue="getFileInputValue($event, 'File type 2')" sm btnColor="primary" icon="cloud-upload-alt"/>
								</mdb-col>
								<mdb-col col="12">
									<mdb-file-input textFieldTitle="File type 3" @getValue="getFileInputValue($event, 'File type 3')" sm btnColor="primary" icon="cloud-upload-alt"/>
								</mdb-col>
								<mdb-col col="12">
									<mdb-file-input textFieldTitle="Other files" @getValue="getFileInputValue" multiple sm btnColor="primary" icon="cloud-upload-alt"/>
								</mdb-col>
							</mdb-row>
							<mdb-row>
								<mdb-col>
									<mdb-input type="textarea" :label="$t('fields.comments')" v-model="form.message" icon="pencil-alt" required outline class="my-4"/>
								</mdb-col>
							</mdb-row>
							<mdb-row>
								<mdb-col>
									<h3 class="font-weight-bold pl-0 my-4">
										<strong>{{ $t('views.tradeCreationForm.termsAndConditions') }}</strong>
									</h3>
								</mdb-col>
							</mdb-row>
							<mdb-row>
								<mdb-col>
									<mdb-input type="checkbox" :label="$t('views.tradeCreationForm.iAgreeToTheTermsAndConditions')" v-model="form.condition" true-value="true" false-value="false" id="termsAndConditions" required/>
								</mdb-col>
							</mdb-row>
							<mdb-row>
								<mdb-col>
									<hr/>
									<div class="text-center">
										<loadingBtn
											:text="$t('actions.save')"
											:loading="loading"
											:loadingText="$t('actions.saving')"
											color="primary"
											type="submit"
											rounded
											class="my-3"
										/>
										<p v-if="error !== {}" class="text-danger">{{ error.message }}</p>
										<localeDropdown/>
										<mdb-btn flat darkWaves @click.native="signOut" icon="sign-out-alt">
											{{ $t('components.navigation.navbar-item.signOut') }}
										</mdb-btn>
									</div>
								</mdb-col>
							</mdb-row>
						</form>
					</mdb-card-body>
				</mdb-card>
			</mdb-col>
		</mdb-row>
	</mdb-container>
</template>
<script>
	import { mapActions } from 'vuex';
	import { Storage } from 'aws-amplify';
	import loadingBtn from '@/components/structure/loadingBtn';
	import localeDropdown from '@/components/structure/localeDropdown';

	export default {
		name: 'tradeCreationForm',
		components: {
			loadingBtn,
			localeDropdown,
		},
		data() {
			return {
				form: {
					userId: this.$store.getters['auth/user'].id,
					username: this.$store.getters['auth/user'].username,
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
					chamberRegistryNumber: '',
					professionStartDate: '',
					licenseExpirationDate: '',
					message: '',
					condition: false,
					files: []
				},
				files: [],
				loading: false,
				error: {
					message: '',
				},
			}
		},
		methods: {
			...mapActions('auth', ['signOut']),
			...mapActions('request', ['sendRequest']),
			async save() {
				this.loading = true;
				try {
					for (const i in this.form.files) {
						const response = await Storage.put(this.form.files[i].name, this.form.files[i].data, {
							level: 'private',
							contentType: this.form.files[i].type,
						});
						this.form.files[i] = `private/${this.$store.getters['auth/user'].id}/${response.key}`;
					}

					await this.sendRequest({ requestType: 'CREATE_TRADE', payload: this.form });
					this.loading = false;
					console.log(this.form);
				} catch (error) {
					this.loading = false;
					console.error(error);
				}
			},
			async getFileInputValue(fileInput, filename) {
				const sizeLimitInMBs = 10; // File size in MB
				const sizeLimitInBs = sizeLimitInMBs * 2 ** 20;
				for (const file of fileInput) {
					if (file.size > sizeLimitInBs) {
						this.error.message += this.error.message === '' ? '' : ' ';
						this.error.message += `File ${file.name} exceeds ${sizeLimitInMBs} MBs.`;
						continue;
					}
					const data = await this.$toBase64(file);
					let name = '';
					if (filename) {
						let extension = file.name.split('.');
						extension = extension[extension.length - 1];
						name = filename + '.' + extension;
					} else {
						name = file.name;
					}
					this.form.files.push({ name, data, type: file.type });
				}
			},
			// Todo: Remove redundant methods
			listPublic() {
				Storage.list('') // for listing ALL files without prefix, pass '' instead
					.then((result) => console.log(result))
					.catch((err) => console.log(err));
			},
			listProtected() {
				Storage.list('', { level: 'protected' }) // for listing ALL files without prefix, pass '' instead
					.then((result) => console.log(result))
					.catch((err) => console.log(err));
			},
			listPrivate() {
				Storage.list('', { level: 'private' })
					.then((result) => console.log(result))
					.catch((err) => console.log(err));
			},
		},
	};
</script>
