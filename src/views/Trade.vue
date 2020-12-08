<template>
	<div class="pt-5">
		<h5 class="text-info text-center mb-5">{{ $t('various.underConstruction') }}</h5>
		<mdb-container>
			<mdb-card cascade>
				<mdb-view cascade class="blue lighten-1 p-3">
					<div class="mx-auto tradeImg" :style="{ 'background-image': 'url(' + fields.tradeLogo + ')' }">
						<mdb-view hover class="h-100 w-100 rounded-circle">
							<mdb-mask flex-center overlay="black-strong" :text="$t('actions.edit')" class="clickable" @click.native="save" style=" overflow-wrap: anywhere; text-align: center;" />
						</mdb-view>
					</div>
				</mdb-view>
				<mdb-card-body>
					<form @submit.prevent="save">
						<mdb-row class="mb-4">
							<mdb-col sm="6" offsetSm="3" md="4" offsetMd="4">
								<mdb-input v-model="fields.trade" :label="$t('fields.trade')" :small="validation.trade" type="text" outline required class="my-2 white" />
							</mdb-col>
						</mdb-row>
						<mdb-row>
							<mdb-col>
								<h6 class="text-left">{{ $t('views.Trade.companyInfo') }}</h6>
							</mdb-col>
						</mdb-row>
						<mdb-row class="mb-4">
							<mdb-col sm="6">
								<mdb-input v-model="fields.registrationNumber" :label="$t('fields.registrationNumber')" :small="validation.registrationNumber" type="text" outline required class="my-2" />
							</mdb-col>
							<mdb-col sm="6">
								<mdb-input v-model="fields.tin" :label="$t('fields.tin')" :small="validation.tin" type="text" outline required class="my-2" />
							</mdb-col>
							<mdb-col sm="6">
								<mdb-input v-model="fields.professionStartDate" :label="$t('fields.professionStartDate')" :small="validation.professionStartDate" type="text" outline required class="my-2" />
							</mdb-col>
							<mdb-col sm="6">
								<mdb-input v-model="fields.licenseExpirationDate" :label="$t('fields.licenseExpirationDate')" :small="validation.licenseExpirationDate" type="text" outline required class="my-2" />
							</mdb-col>
							<mdb-col sm="6">
								<mdb-input v-model="fields.address" :label="$t('fields.address')" :small="validation.address" type="text" name="address" autocomplete="street-address" outline required class="my-2" />
							</mdb-col>
							<mdb-col sm="6">
								<mdb-input v-model="fields.city" :label="$t('fields.city')" :small="validation.city" type="text" name="city" autocomplete="address-level2" outline required class="my-2" />
							</mdb-col>
							<mdb-col sm="6">
								<mdb-input v-model="fields.phone" :label="$t('fields.phone')" :small="validation.phone" type="text" name="phone" autocomplete="tel" outline required class="my-2" />
							</mdb-col>
							<mdb-col sm="6">
								<mdb-input v-model="fields.mobile" :label="$t('fields.mobile')" :small="validation.mobile" type="text" name="mobile" autocomplete="tel" outline required class="my-2" />
							</mdb-col>
							<mdb-col sm="6">
								<mdb-input v-model="fields.email" :label="$t('fields.email')" :small="validation.email" type="text" name="email" autocomplete="email" outline required class="my-2" />
							</mdb-col>
						</mdb-row>
						<mdb-row class="mb-4">
							<mdb-col lg="6">
								<mdb-row>
									<mdb-col>
										<h6>
											<span>{{ $t('views.Trade.companyAccounts') }}</span>
											<mdb-icon icon="plus" class="ml-3" />
										</h6>
									</mdb-col>
								</mdb-row>
								<div v-for="(account, i) in companyAccounts" :key="'companyAccounts' + i" class="d-flex flex-row mb-2 align-items-baseline">
									<mdb-input v-model="account.name" :label="$t('fields.name')" :small="validation.companyAccounts[i].name" type="text" outline class="flex-fill mr-2" />
									<mdb-input v-model="account.iban" :label="$t('fields.iban')" :small="validation.companyAccounts[i].iban" type="text" outline class="flex-fill mr-2" />
									<mdb-icon icon="trash" class="clickable" />
								</div>
							</mdb-col>
							<mdb-col lg="6">
								<mdb-row>
									<mdb-col>
										<h6>
											<span>{{ $t('views.Trade.companyCodes') }}</span>
											<mdb-icon icon="plus" class="ml-3" />
										</h6>
									</mdb-col>
								</mdb-row>
								<div v-for="(companyCode, i) in companyCodes" :key="'companyCodes' + i" class="d-flex flex-row mb-2 align-items-baseline">
									<mdb-select search v-model="companyOptions" :label="$t('fields.company')" :small="validation.companyCodes[i].name" type="text" outline required class="flex-fill mr-2" />
									<mdb-input v-model="companyCode.code" :label="$t('fields.code')" :small="validation.companyCodes[i].code" type="text" outline class="flex-fill mr-2" />
									<mdb-icon icon="trash" class="clickable" />
								</div>
							</mdb-col>
						</mdb-row>
						<mdb-row>
							<mdb-col sm="6">
								<h6>
									<span>{{ $t('views.Trade.companyFiles') }}</span>
									<mdb-icon icon="plus" class="ml-3" />
								</h6>
							</mdb-col>
						</mdb-row>
						<mdb-row>
							<mdb-col sm="6" md="4" lg="3" v-for="(file, i) in companyFiles" :key="'companyCodes' + i">
								<mdb-list-group-item>
									<a :href="file.url" target="_blank">{{ file.name }}</a>
									<mdb-icon icon="trash" class="clickable float-right" />
								</mdb-list-group-item>
							</mdb-col>
						</mdb-row>
						<mdb-row>
							<mdb-col class="text-center">
								<hr />
								<mdb-btn outline="primary" darkWaves rounded type="submit">{{ $t('actions.save') }}</mdb-btn>
							</mdb-col>
						</mdb-row>
					</form>
				</mdb-card-body>
			</mdb-card>
		</mdb-container>
	</div>
</template>

<script>
	export default {
		name: 'Trade',
		data() {
			return {
				companyOptions: [
					{ text: 'Option nr 1', value: 'Option 1' },
					{ text: 'Option nr 2', value: 'Option 2' },
					{ text: 'Option nr 3', value: 'Option 3' },
					{ text: 'Option nr 4', value: 'Option 4' },
					{ text: 'Option nr 5', value: 'Option 5' },
				],
				fields: {
					trade: '',
					tradeLogo: 'https://tppwebsolutions.com/wp-content/uploads/logo-demo3.png',
					registrationNumber: '',
					tin: '',
					professionStartDate: '',
					licenseExpirationDate: '',
					address: '',
					city: '',
					phone: '',
					mobile: '',
					email: '',
					companyAccounts: [],
					companyCodes: [],
					companyFiles: [],
				},
				validation: {
					trade: '',
					tradeLogo: '',
					registrationNumber: '',
					tin: '',
					professionStartDate: '',
					licenseExpirationDate: '',
					address: '',
					city: '',
					phone: '',
					mobile: '',
					email: '',
					companyAccounts: [
						{ name: '', iban: '' },
						{ name: '', iban: '' },
					],
					companyCodes: [
						{ name: '', code: '' },
						{ name: '', code: '' },
					],
					companyFiles: [
						{ name: '', url: '' },
						{ name: '', url: '' },
					],
				},
				companyAccounts: [
					{ name: 'Account 1', iban: 'GR111222333444555666777888999' },
					{ name: 'Account 2', iban: 'GR000111222333444555666777888' },
				],
				companyCodes: [
					{ name: 'Company 1', code: '12345' },
					{ name: 'Company 2', code: '67890' },
				],
				companyFiles: [
					{ name: 'File 1', url: '#file1' },
					{ name: 'File 2', url: '#file2' },
				],
			};
		},
		methods: {
			save() {
				console.log('Saved.');
			},
		},
	};
</script>

<style>
	.tradeImg {
		height: 88px;
		width: 88px;
		background-size: cover;
		background-repeat: inherit;
		background-position: 50% center;
		border-radius: 50% !important;
		border: 5px solid white;
	}
</style>
