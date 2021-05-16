<template>
	<ion-card>
		<ion-card-header>
			<ion-card-title>{{ $t('fields.filters') }}</ion-card-title>
			<ion-row>
				<ion-col size="12" size-md="4">
					<ion-item>
						<ion-label position="floating">{{ $t('fields.role') }}</ion-label>
						<ion-select v-model="filters.roles" multiple>
							<ion-select-option value="supplier">{{ $t('fields.supplier') }}</ion-select-option>
							<ion-select-option value="externalContractor">{{ $t('fields.externalContractor') }}</ion-select-option>
						</ion-select>
					</ion-item>
				</ion-col>
				<ion-col size="12" size-md="4">
					<ion-input-item v-model="filters.officeName" :config="$inputConfigs.officeName"/>
				</ion-col>
				<ion-col size="12" size-md="4">
					<ion-input-item v-model="filters.tin" :config="$inputConfigs.tin"/>
				</ion-col>
			</ion-row>
			<ion-item-divider/>
		</ion-card-header>
		<ion-card-content>
			<ion-list>
				<ion-item v-for="partner in filteredPartnerList" :key="partner.id" :router-link="{name: 'PartnerDetails', params: {id: partner.id}}" button>
					<ion-avatar slot="start">
						<s3-ion-img :s3-object="partner.office_logo" :default-url="$store.getters['platformData/defaultOfficeLogo']"/>
					</ion-avatar>
					<ion-label>
						<h2>{{ partner.officeName }} • {{ partner.ownerUsername }}</h2>
						<p>{{ partner.office_email }} • {{ partner.phone }}, {{ partner.mobile }}</p>
						<p>{{ partner.address }}, {{ partner.zip_code }}</p>
					</ion-label>
				</ion-item>
			</ion-list>
		</ion-card-content>
	</ion-card>
</template>
<script>
	import IonInputItem from '@/components/structure/ionInputItem';
	import S3IonImg from '@/components/structure/S3IonImg';


	export default {
		name: 'partnerManagementCard',
		components: { IonInputItem, S3IonImg },
		data() {
			return {
				filters: {
					roles: [],
					officeName: '',
					tin: '',
				},
			};
		},
		mounted() {
		},
		computed: {
			partnersList: () => [
				{
					id: '8bf0e0c4-ee1a-4a73-99c1-011143aeabee',
					office_logo: null,
					officeName: 'Tzanis Copr',
					address: 'Chania',
					zip_code: '73133',
					chamberRecordNumber: '0987654321',
					tin: '1234567890',
					mobile: '1234567890',
					phone: '0987654321',
					office_email: 'info@tzaniscorp.com',
					ownerUsername: 'tfotakismanager',
					roles: ['supplier', 'externalContractor'],
				},
				{
					id: '8bf0e0c4-ee1a-4a73-99c1-011143aeab11',
					office_logo: null,
					officeName: 'Tzanis Copr Heraklion',
					address: 'Heraklion',
					zip_code: '73000',
					chamberRecordNumber: '0987654321',
					tin: '1234567890',
					mobile: '1234567890',
					phone: '0987654321',
					office_email: 'info@tzaniscorpheraklion.com',
					ownerUsername: 'tfotakispartner',
					roles: ['externalContractor'],
				},
			],
			filteredPartnerList() {
				return this.$filterList(this.partnersList, this.filters);
			},
		},
	};
</script>
