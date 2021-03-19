<template>
	<div class="pt-5">
		<!-- <h1>{{ $t('components.navigation.sidenav.contracts.new') }}</h1> -->
		<h5 class="text-info text-center mb-5">{{ $t('various.underConstruction') }}</h5>
		<mdb-container>
			<mdb-card cascade narrow>
				<mdb-row>
					<mdb-col xl="6" lg="12" class="mx-auto">
						<div class="view view-cascade gradient-card-header blue lighten-1">
							<h2 class="h2-responsive mb-0">{{ $t('components.navigation.sidenav.contracts.new') }}</h2>
						</div>
					</mdb-col>
				</mdb-row>
				<mdb-card-body cascade>
					<form @submit.prevent="submit">
						<mdb-row class="mb-4">
							<mdb-col>
								<mdb-select search v-model="collaboratorOptions" :placeholder="$t('fields.collaborator')" outline required class="my-2"/>
							</mdb-col>
						</mdb-row>
						<mdb-row>
							<mdb-col>
								<h6 class="text">{{ $t('views.newContract.personalInfo') }}</h6>
							</mdb-col>
						</mdb-row>
						<mdb-row class="mb-4">
							<mdb-col sm="6" md="4">
								<mdb-input v-model="fields.tin" :label="$t('fields.tin')" :small="validation.tin" type="text" name="tin" autocomplete="tin" outline required class="my-2"/>
							</mdb-col>
							<mdb-col sm="6" md="4">
								<mdb-input v-model="fields.name" :label="$t('fields.name')" :small="validation.name" type="text" name="name" autocomplete="given-name" outline required class="my-2"/>
							</mdb-col>
							<mdb-col sm="6" md="4">
								<mdb-input v-model="fields.surname" :label="$t('fields.surname')" :small="validation.surname" type="text" name="fname" autocomplete="family-name" outline required class="my-2"/>
							</mdb-col>
							<mdb-col sm="6" md="4">
								<mdb-input v-model="fields.address" :label="$t('fields.address')" :small="validation.address" type="text" name="address" autocomplete="street-address" outline required class="my-2"/>
							</mdb-col>
							<mdb-col sm="6" md="4">
								<mdb-input v-model="fields.city" :label="$t('fields.city')" :small="validation.city" type="text" name="city" autocomplete="address-level2" outline required class="my-2"/>
							</mdb-col>
							<mdb-col sm="6" md="4">
								<mdb-input v-model="fields.district" :label="$t('fields.district')" :small="validation.district" type="text" name="province" autocomplete="district" outline required class="my-2"/>
							</mdb-col>
							<mdb-col sm="6" md="4">
								<mdb-input v-model="fields.phone" :label="$t('fields.phone')" :small="validation.phone" type="text" name="phone" autocomplete="tel" outline required class="my-2"/>
							</mdb-col>
							<mdb-col sm="6" md="4">
								<mdb-input v-model="fields.mobile" :label="$t('fields.mobile')" :small="validation.mobile" type="text" name="mobile" autocomplete="tel" outline required class="my-2"/>
							</mdb-col>
							<mdb-col sm="6" md="4">
								<mdb-input v-model="fields.email" :label="$t('fields.email')" :small="validation.email" type="text" name="email" autocomplete="email" outline required class="my-2"/>
							</mdb-col>
							<mdb-col sm="6" md="4">
								<mdb-input v-model="fields.birthDate" :label="$t('fields.birthdate')" :small="validation.birthDate" type="text" outline required class="my-2"/>
							</mdb-col>
							<mdb-col sm="6" md="4">
								<mdb-input v-model="fields.driversLicenseIssueDate" :label="$t('fields.driversLicenseIssueDate')" :small="validation.driversLicenseIssueDate" type="text" outline required class="my-2"/>
							</mdb-col>
						</mdb-row>
						<mdb-row>
							<mdb-col>
								<h6 class="text">{{ $t('views.newContract.vehicleInfo') }}</h6>
							</mdb-col>
						</mdb-row>
						<mdb-row class="mb-4">
							<mdb-col sm="6" md="4">
								<mdb-input v-model="fields.numberPlate" :label="$t('fields.numberPlate')" :small="validation.numberPlate" type="text" outline required class="my-2"/>
							</mdb-col>
							<mdb-col sm="6" md="4">
								<mdb-select id="tzanis" search v-model="branchOptions" :label="$t('fields.branch')" :small="validation.branch" type="text" name="branch" autocomplete="branch" outline required class="my-2"/>
							</mdb-col>
							<mdb-col sm="6" md="4">
								<mdb-select search v-model="usageOptions" :label="$t('fields.usage')" :small="validation.usage" type="text" name="usage" autocomplete="usage" outline required class="my-2"/>
							</mdb-col>
							<mdb-col sm="6" md="4">
								<mdb-select search v-model="manufacturerOptions" :label="$t('fields.manufacturer')" :small="validation.manufacturer" type="text" outline required class="my-2"/>
							</mdb-col>
							<mdb-col sm="6" md="4">
								<mdb-select search v-model="modelOptions" :label="$t('fields.model')" :small="validation.model" type="text" name="model" autocomplete="model" outline required class="my-2"/>
							</mdb-col>
							<mdb-col sm="6" md="4">
								<mdb-select search v-model="typeOptions" :label="$t('fields.type')" :small="validation.type" type="text" name="type" autocomplete="type" outline required class="my-2"/>
							</mdb-col>
							<mdb-col sm="6" md="4">
								<mdb-select search v-model="colorOptions" :label="$t('fields.color')" :small="validation.color" type="text" name="color" autocomplete="color" outline required class="my-2"/>
							</mdb-col>
							<mdb-col sm="6" md="4">
								<mdb-select search v-model="fuelOptionsType" :label="$t('fields.fuelType')" :small="validation.fuelType" type="text" name="fuelType" autocomplete="fuelType" outline required class="my-2"/>
							</mdb-col>
							<mdb-col sm="6" md="4">
								<mdb-select search v-model="ownerOptions" :label="$t('fields.owner')" :small="validation.owner" type="text" name="owner" autocomplete="owner" outline required class="my-2"/>
							</mdb-col>
						</mdb-row>
						<mdb-row>
							<mdb-col>
								<h6 class="text">{{ $t('views.newContract.contractInfo') }}</h6>
							</mdb-col>
						</mdb-row>
						<mdb-row class="mb-4">
							<mdb-col sm="6" md="4">
								<mdb-select search v-model="companyOptions" :label="$t('fields.company')" :small="validation.company" type="text" name="company" autocomplete="company" outline required class="my-2"/>
							</mdb-col>
							<mdb-col sm="6" md="4">
								<mdb-select search v-model="packageOptions" :label="$t('fields.package')" :small="validation.package" type="text" name="package" autocomplete="package" outline required class="my-2"/>
							</mdb-col>
							<mdb-col sm="6" md="4">
								<mdb-input v-model="fields.contractNumber" :label="$t('fields.contractNumber')" :small="validation.contractNumber" type="text" outline required class="my-2"/>
							</mdb-col>
							<mdb-col sm="6" md="4">
								<mdb-input v-model="fields.issueDate" :label="$t('fields.issueDate')" :small="validation.issueDate" type="text" outline required class="my-2"/>
							</mdb-col>
							<mdb-col sm="6" md="4">
								<mdb-select search v-model="durationOptions" :label="$t('fields.duration')" :small="validation.duration" type="text" name="duration" autocomplete="duration" outline required class="my-2"/>
							</mdb-col>
							<mdb-col sm="6" md="4">
								<mdb-select search v-model="discountOptions" :label="$t('fields.discount')" :small="validation.discount" type="text" name="discount" autocomplete="discount" outline required class="my-2"/>
							</mdb-col>
							<mdb-col sm="6" md="4">
								<mdb-input v-model="fields.grossIncome" :label="$t('fields.grossIncome')" :small="validation.grossIncome" type="text" outline required class="my-2"/>
							</mdb-col>
							<mdb-col sm="6" md="4">
								<mdb-input v-model="fields.netIncome" :label="$t('fields.netIncome')" :small="validation.netIncome" type="text" outline required class="my-2"/>
							</mdb-col>
						</mdb-row>
						<mdb-row>
							<mdb-col class="text-center">
								<hr/>
								<mdb-btn outline="primary" darkWaves rounded type="submit">{{ $t('actions.submit') }}</mdb-btn>
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
		name: 'NewContract',
		data() {
			return {
				collaboratorOptions: [
					{ text: 'Option nr 1', value: 'Option 1' },
					{ text: 'Option nr 2', value: 'Option 2' },
					{ text: 'Option nr 3', value: 'Option 3' },
					{ text: 'Option nr 4', value: 'Option 4' },
					{ text: 'Option nr 5', value: 'Option 5' },
				],
				branchOptions: [
					{ text: 'Option nr 1', value: 'Option 1' },
					{ text: 'Option nr 2', value: 'Option 2' },
					{ text: 'Option nr 3', value: 'Option 3' },
					{ text: 'Option nr 4', value: 'Option 4' },
					{ text: 'Option nr 5', value: 'Option 5' },
				],
				usageOptions: [
					{ text: 'Option nr 1', value: 'Option 1' },
					{ text: 'Option nr 2', value: 'Option 2' },
					{ text: 'Option nr 3', value: 'Option 3' },
					{ text: 'Option nr 4', value: 'Option 4' },
					{ text: 'Option nr 5', value: 'Option 5' },
				],
				manufacturerOptions: [
					{ text: 'Option nr 1', value: 'Option 1' },
					{ text: 'Option nr 2', value: 'Option 2' },
					{ text: 'Option nr 3', value: 'Option 3' },
					{ text: 'Option nr 4', value: 'Option 4' },
					{ text: 'Option nr 5', value: 'Option 5' },
				],
				modelOptions: [
					{ text: 'Option nr 1', value: 'Option 1' },
					{ text: 'Option nr 2', value: 'Option 2' },
					{ text: 'Option nr 3', value: 'Option 3' },
					{ text: 'Option nr 4', value: 'Option 4' },
					{ text: 'Option nr 5', value: 'Option 5' },
				],
				typeOptions: [
					{ text: 'Option nr 1', value: 'Option 1' },
					{ text: 'Option nr 2', value: 'Option 2' },
					{ text: 'Option nr 3', value: 'Option 3' },
					{ text: 'Option nr 4', value: 'Option 4' },
					{ text: 'Option nr 5', value: 'Option 5' },
				],
				colorOptions: [
					{ text: 'Option nr 1', value: 'Option 1' },
					{ text: 'Option nr 2', value: 'Option 2' },
					{ text: 'Option nr 3', value: 'Option 3' },
					{ text: 'Option nr 4', value: 'Option 4' },
					{ text: 'Option nr 5', value: 'Option 5' },
				],
				fuelOptionsType: [
					{ text: 'Option nr 1', value: 'Option 1' },
					{ text: 'Option nr 2', value: 'Option 2' },
					{ text: 'Option nr 3', value: 'Option 3' },
					{ text: 'Option nr 4', value: 'Option 4' },
					{ text: 'Option nr 5', value: 'Option 5' },
				],
				ownerOptions: [
					{ text: 'Option nr 1', value: 'Option 1' },
					{ text: 'Option nr 2', value: 'Option 2' },
					{ text: 'Option nr 3', value: 'Option 3' },
					{ text: 'Option nr 4', value: 'Option 4' },
					{ text: 'Option nr 5', value: 'Option 5' },
				],
				companyOptions: [
					{ text: 'Option nr 1', value: 'Option 1' },
					{ text: 'Option nr 2', value: 'Option 2' },
					{ text: 'Option nr 3', value: 'Option 3' },
					{ text: 'Option nr 4', value: 'Option 4' },
					{ text: 'Option nr 5', value: 'Option 5' },
				],
				packageOptions: [
					{ text: 'Option nr 1', value: 'Option 1' },
					{ text: 'Option nr 2', value: 'Option 2' },
					{ text: 'Option nr 3', value: 'Option 3' },
					{ text: 'Option nr 4', value: 'Option 4' },
					{ text: 'Option nr 5', value: 'Option 5' },
				],
				durationOptions: [
					{ text: 'Option nr 1', value: 'Option 1' },
					{ text: 'Option nr 2', value: 'Option 2' },
					{ text: 'Option nr 3', value: 'Option 3' },
					{ text: 'Option nr 4', value: 'Option 4' },
					{ text: 'Option nr 5', value: 'Option 5' },
				],
				discountOptions: [
					{ text: 'Option nr 1', value: 'Option 1' },
					{ text: 'Option nr 2', value: 'Option 2' },
					{ text: 'Option nr 3', value: 'Option 3' },
					{ text: 'Option nr 4', value: 'Option 4' },
					{ text: 'Option nr 5', value: 'Option 5' },
				],
				fields: {
					tin: '',
					name: '',
					surname: '',
					address: '',
					city: '',
					district: '',
					phone: '',
					mobile: '',
					email: '',
					birthDate: '',
					driversLicenseIssueDate: '',
					numberPlate: '',
					branch: '',
					usage: '',
					manufacturer: '',
					model: '',
					type: '',
					color: '',
					fuelType: '',
					owner: '',
					company: '',
					package: '',
					contractNumber: '',
					issueDate: '',
					duration: '',
					discount: '',
					grossIncome: '',
					netIncome: '',
				},
				validation: {
					tin: '',
					name: '',
					surname: '',
					address: '',
					city: '',
					district: '',
					phone: '',
					mobile: '',
					email: '',
					birthDate: '',
					driversLicenseIssueDate: '',
					numberPlate: '',
					branch: '',
					usage: '',
					manufacturer: '',
					model: '',
					type: '',
					color: '',
					fuelType: '',
					owner: '',
					company: '',
					package: '',
					contractNumber: '',
					issueDate: '',
					duration: '',
					discount: '',
					grossIncome: '',
					netIncome: '',
				},
			};
		},
		methods: {
			submit() {
				console.log('Submitted.');
			},
		},
	};
</script>
