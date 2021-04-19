<template>
	<ion-grid fixed>
		<form @submit.prevent="create">
			<ion-list class="ion-margin-bottom">
				<ion-row>
					<ion-col size="12" size-md="4">
						<ion-item>
							<ion-label position="floating">{{ $t('fields.collaborator') }}</ion-label>
							<ion-select v-model="form.collaborator" required interface="popover">
								<ion-select-option v-for="o in collaboratorOptions" :key="o.value" :value="o">{{ o.text }}</ion-select-option>
							</ion-select>
						</ion-item>
					</ion-col>
				</ion-row>
			</ion-list>
			<ion-list class="ion-margin-bottom">
				<ion-list-header>
					<h3>{{ $t('fields.personalInfo') }}</h3>
				</ion-list-header>
				<ion-row>
					<ion-col size="12" size-md="4">
						<ion-item>
							<ion-icon :icon="$ionicons.idCardOutline" slot="start" class="ion-align-self-center"/>
							<ion-label position="floating">{{ $t('fields.tin') }}</ion-label>
							<ion-input v-model="form.tin" type="text" name="tin"/>
						</ion-item>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-item>
							<ion-icon :icon="$ionicons.personOutline" slot="start" class="ion-align-self-center"/>
							<ion-label position="floating">{{ $t('fields.name') }}</ion-label>
							<ion-input v-model="form.name" type="text" name="name" autocomplete="given-name" required/>
						</ion-item>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-item>
							<ion-icon slot="start" class="ion-hide-md-up"/>
							<ion-label position="floating">{{ $t('fields.family_name') }}</ion-label>
							<ion-input v-model="form.family_name" type="text" name="fname" autocomplete="family-name" required/>
						</ion-item>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-item>
							<ion-icon :icon="$ionicons.locationOutline" slot="start" class="ion-align-self-center"/>
							<ion-label position="floating">{{ $t('fields.address') }}</ion-label>
							<ion-input v-model="form.address" type="text" name="address" autocomplete="street-address"/>
						</ion-item>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-item>
							<ion-icon slot="start" class="ion-hide-md-up"/>
							<ion-label position="floating">{{ $t('fields.city') }}</ion-label>
							<ion-input v-model="form.city" type="text" name="city" autocomplete="address-level2"/>
						</ion-item>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-item>
							<ion-icon slot="start" class="ion-hide-md-up"/>
							<ion-label position="floating">{{ $t('fields.zip_code') }}</ion-label>
							<ion-input v-model="form.zip_code" type="number" name="postal" autocomplete="postal-code" class="no-arrows"/>
						</ion-item>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-item>
							<ion-icon :icon="$ionicons.phonePortraitOutline" slot="start" class="ion-align-self-center"/>
							<ion-label position="floating">{{ $t('fields.mobile') }}</ion-label>
							<ion-input v-model="form.mobile" type="number" name="mobile" autocomplete="tel" required class="no-arrows"/>
						</ion-item>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-item>
							<ion-icon :icon="$ionicons.callOutline" slot="start" class="ion-align-self-center"/>
							<ion-label position="floating">{{ $t('fields.phone') }}</ion-label>
							<ion-input v-model="form.telephone" type="number" name="phone" autocomplete="tel" required class="no-arrows"/>
						</ion-item>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-item>
							<ion-icon :icon="$ionicons.mailOutline" slot="start" class="ion-align-self-center"/>
							<ion-label position="floating">{{ $t('fields.email') }}</ion-label>
							<ion-input v-model="form.email" type="email" name="email" autocomplete="email" required/>
						</ion-item>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-item>
							<ion-icon :icon="$ionicons.calendarOutline" slot="start" class="ion-align-self-center"/>
							<ion-label position="floating">{{ $t('fields.birthdate') }}</ion-label>
							<ion-datetime v-model="form.birthdate" display-format="DD MMM YYYY" :max="new Date().toISOString()" name="birthdate" required/>
						</ion-item>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-item>
							<ion-icon slot="start" class="ion-hide-md-up"/>
							<ion-label position="floating">{{ $t('fields.driversLicenseIssueDate') }}</ion-label>
							<ion-datetime v-model="form.driversLicenseIssueDate" display-format="DD MMM YYYY" :max="new Date().toISOString()" name="driversLicenseIssueDate" required/>
						</ion-item>
					</ion-col>
				</ion-row>
			</ion-list>
			<ion-list class="ion-margin-bottom">
				<ion-list-header>
					<h3>{{ $t('fields.vehicleInfo') }}</h3>
				</ion-list-header>
				<ion-row>
					<ion-col size="12" size-md="4">
						<ion-item>
							<ion-label position="floating">{{ $t('fields.numberPlate') }}</ion-label>
							<ion-input v-model="form.numberPlate" type="number" name="numberPlate" class="no-arrows"/>
						</ion-item>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-item>
							<ion-label position="floating">{{ $t('fields.branch') }}</ion-label>
							<ion-select v-model="form.branch" required interface="popover">
								<ion-select-option v-for="o in branchOptions" :key="o.value" :value="o">{{ o.text }}</ion-select-option>
							</ion-select>
						</ion-item>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-item>
							<ion-label position="floating">{{ $t('fields.usage') }}</ion-label>
							<ion-select v-model="form.usage" required interface="popover">
								<ion-select-option v-for="o in usageOptions" :key="o.value" :value="o">{{ o.text }}</ion-select-option>
							</ion-select>
						</ion-item>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-item>
							<ion-label position="floating">{{ $t('fields.manufacturer') }}</ion-label>
							<ion-select v-model="form.manufacturer" required interface="popover">
								<ion-select-option v-for="o in manufacturerOptions" :key="o.value" :value="o">{{ o.text }}</ion-select-option>
							</ion-select>
						</ion-item>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-item>
							<ion-label position="floating">{{ $t('fields.model') }}</ion-label>
							<ion-select v-model="form.model" required interface="popover">
								<ion-select-option v-for="o in modelOptions" :key="o.value" :value="o">{{ o.text }}</ion-select-option>
							</ion-select>
						</ion-item>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-item>
							<ion-label position="floating">{{ $t('fields.type') }}</ion-label>
							<ion-select v-model="form.type" required interface="popover">
								<ion-select-option v-for="o in typeOptions" :key="o.value" :value="o">{{ o.text }}</ion-select-option>
							</ion-select>
						</ion-item>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-item>
							<ion-label position="floating">{{ $t('fields.color') }}</ion-label>
							<ion-select v-model="form.color" required interface="popover">
								<ion-select-option v-for="o in colorOptions" :key="o.value" :value="o">{{ o.text }}</ion-select-option>
							</ion-select>
						</ion-item>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-item>
							<ion-label position="floating">{{ $t('fields.fuelType') }}</ion-label>
							<ion-select v-model="form.fuelType" required interface="popover">
								<ion-select-option v-for="o in fuelTypeOptions" :key="o.value" :value="o">{{ o.text }}</ion-select-option>
							</ion-select>
						</ion-item>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-item>
							<ion-label position="floating">{{ $t('fields.owner') }}</ion-label>
							<ion-select v-model="form.owner" required interface="popover">
								<ion-select-option v-for="o in ownerOptions" :key="o.value" :value="o">{{ o.text }}</ion-select-option>
							</ion-select>
						</ion-item>
					</ion-col>
				</ion-row>
			</ion-list>
			<ion-list class="ion-margin-bottom">
				<ion-list-header>
					<h3>{{ $t('fields.contractInfo') }}</h3>
				</ion-list-header>
				<ion-row>
					<ion-col size="12" size-md="4">
						<ion-item>
							<ion-label position="floating">{{ $t('fields.company') }}</ion-label>
							<ion-select v-model="form.company" required interface="popover">
								<ion-select-option v-for="o in companyOptions" :key="o.value" :value="o">{{ o.text }}</ion-select-option>
							</ion-select>
						</ion-item>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-item>
							<ion-label position="floating">{{ $t('fields.package') }}</ion-label>
							<ion-select v-model="form.package" required interface="popover">
								<ion-select-option v-for="o in packageOptions" :key="o.value" :value="o">{{ o.text }}</ion-select-option>
							</ion-select>
						</ion-item>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-item>
							<ion-label position="floating">{{ $t('fields.contractNumber') }}</ion-label>
							<ion-input v-model="form.contractNumber" type="number" name="contractNumber" required class="no-arrows"/>
						</ion-item>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-item>
							<ion-label position="floating">{{ $t('fields.issueDate') }}</ion-label>
							<ion-datetime v-model="form.issueDate" display-format="DD MMM YYYY" :min="new Date().toISOString()" :max="new Date(new Date().getFullYear() + 50, 1, 1).toISOString()" name="issuedate" required/>
						</ion-item>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-item>
							<ion-label position="floating">{{ $t('fields.duration') }}</ion-label>
							<ion-select v-model="form.duration" required interface="popover">
								<ion-select-option v-for="o in durationOptions" :key="o.value" :value="o">{{ o.text }}</ion-select-option>
							</ion-select>
						</ion-item>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-item>
							<ion-label position="floating">{{ $t('fields.discount') }}</ion-label>
							<ion-select v-model="form.discount" required interface="popover">
								<ion-select-option v-for="o in discountOptions" :key="o.value" :value="o">{{ o.text }}</ion-select-option>
							</ion-select>
						</ion-item>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-item>
							<ion-label position="floating">{{ $t('fields.grossIncome') }}</ion-label>
							<ion-input v-model="form.grossIncome" type="number" name="grossIncome" required class="no-arrows"/>
						</ion-item>
					</ion-col>
					<ion-col size="12" size-md="4">
						<ion-item>
							<ion-label position="floating">{{ $t('fields.netIncome') }}</ion-label>
							<ion-input v-model="form.netIncome" type="number" name="netIncome" required class="no-arrows"/>
						</ion-item>
					</ion-col>
				</ion-row>
			</ion-list>
			<div class="ion-margin-top ion-text-center">
				<loadingBtn color="primary" type="submit" :loading="loading" :text="$t('actions.save')" :loadingText="$t('actions.saving')"/>
			</div>
		</form>
	</ion-grid>
</template>
<script>
	import loadingBtn from '@/components/structure/loadingBtn';

	export default {
		name: 'NewContract',
		components: {
			loadingBtn,
		},
		mounted() {
			this.$store.commit('pageStructure/setPageTitle', () => window.vm.$t('components.navigation.sidenav.contracts.new'));
			this.$store.commit('pageStructure/setPageBackButton', false);
		},
		data() {
			return {
				form: {
					collaborator: '',
					tin: '',
					name: '',
					family_name: '',
					address: '',
					city: '',
					zip_code: '',
					mobile: '',
					telephone: '',
					email: '',
					birthdate: '',
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
				loading: false,
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
				fuelTypeOptions: [
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
			};
		},
		methods: {
			create() {
				console.log('Created.');
			},
		},
	};
</script>
