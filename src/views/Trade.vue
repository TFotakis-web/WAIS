<template>
	<div class="pt-5">
		<!-- <h1>{{ $t('views.Trade.pageTitle') }}</h1> -->
		<h5 class="text-info text-center mb-5">{{ $t('various.underConstruction') }}</h5>
		<mdb-container>
			<!-- <mdb-card cascade narrow>
				<mdb-row>
					<mdb-col xl="6" lg="12" class="mx-auto">
						<div class="view view-cascade gradient-card-header blue lighten-1">
							<h2 class="h2-responsive mb-0">{{ $t('views.Trade.pageTitle') }}</h2>
						</div>
					</mdb-col>
				</mdb-row> -->
			<mdb-card cascade>
				<mdb-view cascade class="blue lighten-1 p-3">
					<div class="mx-auto tradeImg" :style="{ 'background-image': 'url(' + fields.tradeLogo + ')' }"></div>
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
							<mdb-col sm="6">
								<h6>
									<span>{{ $t('views.Trade.companyAccounts') }}</span>
									<mdb-icon icon="plus" class="float-right"/>
								</h6>
							</mdb-col>
							<mdb-col sm="6">
								<h6>
									<span>{{ $t('views.Trade.companyCodes') }}</span>
									<mdb-icon icon="plus" class="float-right"/>
								</h6>
							</mdb-col>
						</mdb-row>
						<mdb-row>
							<mdb-col sm="6">
								<h6>
									<span>{{ $t('views.Trade.companyFiles') }}</span>
									<mdb-icon icon="plus" class="float-right"/>
								</h6>
							</mdb-col>
						</mdb-row>
						<mdb-row class="mb-4">
							<mdb-col>

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
					companyAccounts: '',
					companyCodes: '',
					companyFiles: '',
				},
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
