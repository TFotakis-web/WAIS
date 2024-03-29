import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/plugins/router/router';
import i18n from '@/plugins/i18n';
import axios from '@/plugins/axios';
import VueAxios from 'vue-axios';
import Cookies from 'js-cookie';
import { store } from '@/plugins/store/store';
import mitt from 'mitt';

import Amplify from 'aws-amplify';
import { Auth } from '@aws-amplify/auth';
import { API } from '@aws-amplify/api';
import aws_exports from '@/aws-exports';
// import '@aws-amplify/ui-vue';

import { toGreeklish } from 'greek-utils';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import '@/theme/variables.css';


Amplify.configure(aws_exports);
Auth.configure(aws_exports);
API.configure(aws_exports);

// Add ID Token on every request (contains email on identity.claims and more)
Amplify.configure({
	API: {
		graphql_headers: async () => {
			const session = await Auth.currentSession();
			return {
				Authorization: session.getIdToken().getJwtToken(),
			};
		},
	},
});

const app = createApp(App);
app.use(IonicVue);
app.use(router);
app.use(store);
app.use(i18n);
app.use(VueAxios, axios);

import * as IonComponents from '@ionic/vue';


Object.keys(IonComponents).forEach(key => {
	if (/^Ion[A-Z]\w+$/.test(key)) {
		app.component(key, IonComponents[key]);
	}
});

import * as Ionicons from 'ionicons/icons';


const ioniconsOutline = {};
Object.keys(Ionicons).forEach(key => {
	if (/[a-zA-Z]+Outline/.test(key)) {
		ioniconsOutline[key] = Ionicons[key];
	}
});

// -------------- Prototype expansion ----------------------------------
app.config.globalProperties.$ionicons = ioniconsOutline;
app.config.globalProperties.$http = axios;
app.config.globalProperties.$cookies = Cookies;
app.config.globalProperties.$toBase64 = file => new Promise((resolve, reject) => {
	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = () => resolve(reader.result);
	reader.onerror = error => reject(error);
});
app.config.globalProperties.$toGreeklish = toGreeklish;
app.config.globalProperties.$parseJwt = function (token) {
	const base64Url = token.split('.')[1];
	const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	const jsonPayload = decodeURIComponent(
		atob(base64)
			.split('')
			.map(function (c) {
				return (
					'%' +
					('00' + c.charCodeAt(0).toString(16)).slice(-2)
				);
			})
			.join(''),
	);

	return JSON.parse(jsonPayload);
};
app.config.globalProperties.$clearCookies = function () {
	for (const cookie of this.$cookies.keys()) {
		this.$cookies.remove(cookie);
	}
};
app.config.globalProperties.$toast = {
	error: async err => {
		// eslint-disable-next-line no-console
		console.error(err);
		const toast = await IonComponents.toastController
			.create({
				message: window.vm.$t('defaultNotification.somethingWentWrong'),
				duration: 10000,
				color: 'danger',
				position: 'bottom',
			});
		return toast.present();
	},
	saveSuccess: async () => {
		const toast = await IonComponents.toastController
			.create({
				message: window.vm.$t('defaultNotification.saveSuccess'),
				duration: 10000,
				color: 'success',
				position: 'bottom',
			});
		return toast.present();
	},
	deleteSuccess: async () => {
		const toast = await IonComponents.toastController
			.create({
				message: window.vm.$t('defaultNotification.deleteSuccess'),
				duration: 10000,
				color: 'success',
				position: 'bottom',
			});
		return toast.present();
	},
	preventRoutePush: async (discardCallback, cancelCallback) => {
		const toast = await IonComponents.toastController
			.create({
				header: window.vm.$t('defaultNotification.youHaveUnsavedChanges'),
				duration: 30000,
				color: 'warning',
				position: 'bottom',
				buttons: [
					{
						text: window.vm.$t('actions.discardChanges'),
						handler: discardCallback,
					},
					{
						text: window.vm.$t('actions.cancel'),
						role: 'cancel',
						handler: cancelCallback,
					},
				],
			});
		return toast.present();
	},
};
app.config.globalProperties.$mitt = mitt();
app.config.globalProperties.$inputConfigs = {
	family_name: {
		type: 'text',
		name: 'fname',
		autocomplete: 'family-name',
		required: true,
		icon: ioniconsOutline.personOutline,
		label: () => window.vm.$t('fields.family_name'),
	},
	name: {
		type: 'text',
		name: 'name',
		autocomplete: 'given-name',
		required: true,
		iconPlaceholder: true,
		label: () => window.vm.$t('fields.name'),
	},
	fathers_name: {
		type: 'text',
		name: 'name',
		autocomplete: 'additional-name',
		required: true,
		iconPlaceholder: true,
		label: () => window.vm.$t('fields.fathersName'),
	},
	officeName: {
		type: 'text',
		name: 'officeName',
		required: true,
		icon: ioniconsOutline.businessOutline,
		label: () => window.vm.$t('fields.office'),
	},
	mobile: {
		type: 'number',
		noArrows: true,
		name: 'mobile',
		autocomplete: 'tel',
		required: true,
		icon: ioniconsOutline.phonePortraitOutline,
		label: () => window.vm.$t('fields.mobile'),
	},
	phone: {
		type: 'number',
		noArrows: true,
		name: 'phone',
		autocomplete: 'tel',
		required: true,
		icon: ioniconsOutline.callOutline,
		label: () => window.vm.$t('fields.phone'),
	},
	email: {
		type: 'email',
		name: 'email',
		autocomplete: 'email',
		required: true,
		icon: ioniconsOutline.mailOutline,
		label: () => window.vm.$t('fields.email'),
	},
	office_email: {
		type: 'email',
		name: 'email',
		autocomplete: 'email',
		required: true,
		icon: ioniconsOutline.mailOutline,
		label: () => window.vm.$t('fields.email'),
	},
	address: {
		type: 'text',
		name: 'address',
		autocomplete: 'street-address',
		icon: ioniconsOutline.locationOutline,
		label: () => window.vm.$t('fields.address'),
	},
	city: {
		type: 'text',
		name: 'city',
		autocomplete: 'address-level2',
		iconPlaceholder: true,
		label: () => window.vm.$t('fields.city'),
	},
	zip_code: {
		type: 'number',
		noArrows: true,
		name: 'postal',
		autocomplete: 'postal-code',
		icon: ioniconsOutline.locateOutline,
		label: () => window.vm.$t('fields.zip_code'),
	},
	tin: {
		type: 'text',
		name: 'tin',
		icon: ioniconsOutline.idCardOutline,
		label: () => window.vm.$t('fields.tin'),
	},
	chamberRecordNumber: {
		type: 'text',
		name: 'chamberRecordNumber',
		icon: ioniconsOutline.bookOutline,
		label: () => window.vm.$t('fields.chamberRecordNumber'),
	},
	professionStartDate: {
		type: 'date',
		disableFuture: true,
		name: 'professionStartDate',
		icon: ioniconsOutline.calendarOutline,
		label: () => window.vm.$t('fields.professionStartDate'),
	},
	insuranceLicenseExpirationDate: {
		type: 'date',
		disablePast: true,
		name: 'insuranceLicenseExpirationDate',
		iconPlaceholder: true,
		label: () => window.vm.$t('fields.insuranceLicenseExpirationDate'),
	},
	civilLiabilityExpirationDate: {
		type: 'date',
		disablePast: true,
		name: 'civilLiabilityExpirationDate',
		iconPlaceholder: true,
		label: () => window.vm.$t('fields.civilLiabilityExpirationDate'),
	},
	comments: {
		type: 'textarea',
		autoGrow: true,
		name: 'comments',
		icon: ioniconsOutline.chatbubbleOutline,
		label: () => window.vm.$t('fields.comments'),
	},
	checkbox: {
		type: 'checkbox',
		slot: 'start',
		required: true,
		label: () => window.vm.$t('views.officeCreationForm.iAgreeToTheTermsAndConditions'),
	},
	files: {
		profession_start: {
			type: 'file',
			color: 'primary',
			renameTo: 'profession_start',
			filePath: 'createOfficeRequest',
			text: () => window.vm.$t('files.profession_start'),
			sizeLimitInMBs: 10,
			size: 'small',
		},
		chamber_certificate: {
			type: 'file',
			color: 'primary',
			renameTo: 'chamber_certificate',
			filePath: 'createOfficeRequest',
			text: () => window.vm.$t('files.chamber_certificate'),
			sizeLimitInMBs: 10,
			size: 'small',
		},
		liability_insurance: {
			type: 'file',
			color: 'primary',
			renameTo: 'liability_insurance',
			filePath: 'createOfficeRequest',
			text: () => window.vm.$t('files.liability_insurance'),
			sizeLimitInMBs: 10,
			size: 'small',
		},
		company_articles_of_association: {
			type: 'file',
			color: 'primary',
			renameTo: 'company_articles_of_association',
			filePath: 'createOfficeRequest',
			text: () => window.vm.$t('files.company_articles_of_association'),
			sizeLimitInMBs: 10,
			size: 'small',
		},
	},
	otherFiles: {
		type: 'file',
		color: 'primary',
		text: () => window.vm.$t('files.other'),
		filePath: 'createOfficeRequest',
		sizeLimitInMBs: 10,
		multiple: true,
		size: 'small',
	},
	profilePicture: {
		type: 'file',
		color: 'primary',
		text: () => window.vm.$t('actions.edit'),
		renameTo: 'profile',
		filePath: 'profile',
		level: 'protected',
		sizeLimitInMBs: 10,
		size: 'small',
		showAvatar: true,
		defaultUrl: store.getters['platformData/defaultProfilePicture'],
	},
	subscriptionExpirationDate: {
		type: 'date',
		disablePast: true,
		name: 'subscriptionExpirationDate',
		icon: ioniconsOutline.calendarOutline,
		label: () => window.vm.$t('fields.subscriptionExpirationDate'),
		required: true,
	},
	partnersNumberLimit: {
		type: 'number',
		min: 0,
		noArrows: true,
		name: 'partnersNumberLimit',
		icon: ioniconsOutline.peopleOutline,
		label: () => window.vm.$t('fields.partnersNumberLimit'),
		required: true,
	},
	employeesNumberLimit: {
		type: 'number',
		min: 0,
		noArrows: true,
		name: 'employeesNumberLimit',
		iconPlaceholder: true,
		label: () => window.vm.$t('fields.employeesNumberLimit'),
		required: true,
	},
	featureAccess: {
		type: 'select',
		icon: ioniconsOutline.appsOutline,
		label: () => window.vm.$t('fields.featureAccess'),
		multiple: true,
		name: 'featureAccess',
		required: true,
		selectOptions: () => store.getters['platformData/featureAccessOptions'],
	},
	companyAccess: {
		type: 'select',
		icon: ioniconsOutline.cubeOutline,
		label: () => window.vm.$t('fields.companyAccess'),
		multiple: true,
		name: 'companyAccess',
		required: true,
		selectOptions: () => store.getters['platformData/companyOptions'],
	},
	office_logo: {
		type: 'file',
		color: 'primary',
		text: () => window.vm.$t('actions.edit'),
		renameTo: 'officeLogo',
		filePath: 'office',
		level: 'protected',
		sizeLimitInMBs: 10,
		size: 'small',
		showAvatar: true,
		defaultUrl: store.getters['platformData/defaultOfficeLogo'],
	},
	companyBankAccountsSelect: {
		type: 'select',
		label: () => window.vm.$t('fields.bank'),
		interface: 'popover',
		required: true,
		selectOptions: () => store.getters['platformData/bankOptions'],
	},
	companyBankAccountsIban: {
		type: 'text',
		label: () => window.vm.$t('fields.iban'),
		required: true,
	},
	companyBankAccountsOtherName: {
		type: 'text',
		label: () => window.vm.$t('fields.iban'),
		required: true,
	},
	insuranceCompaniesSelect: {
		type: 'select',
		label: () => window.vm.$t('fields.company'),
		interface: 'popover',
		required: true,
		selectOptions: () => store.getters['platformData/companyOptionsAvailable'],
	},
	officeInsuranceCompaniesSelect: {
		type: 'select',
		label: () => window.vm.$t('fields.companyAccess'),
		interface: 'popover',
		required: true,
		selectOptions: () => store.getters['platformData/officeInsuranceCompanyOptions'],
	},
	insuranceCompaniesCode: {
		type: 'text',
		label: () => window.vm.$t('fields.code'),
		required: true,
	},
	role: {
		type: 'select',
		label: () => window.vm.$t('fields.role'),
		interface: 'popover',
		required: true,
		selectOptions: () => store.getters['platformData/roleOptions'],
	},
	permissions: {
		type: 'select',
		label: () => window.vm.$t('fields.permissions'),
		interface: 'popover',
		multiple: true,
		required: true,
		selectOptions: () => store.getters['platformData/permissionOptions'],
	},
	collaboratorSelect: {
		type: 'select',
		label: () => window.vm.$t('fields.collaborator'),
		interface: 'popover',
		required: true,
		selectOptions: () => store.getters['platformData/collaboratorOptions'],
	},
	birthdate: {
		type: 'date',
		disableFuture: true,
		name: 'birthdate',
		icon: ioniconsOutline.calendarOutline,
		label: () => window.vm.$t('fields.birthdate'),
	},
	driversLicenseIssueDate: {
		type: 'date',
		disableFuture: true,
		name: 'driversLicenseIssueDate',
		iconPlaceholder: true,
		label: () => window.vm.$t('fields.driversLicenseIssueDate'),
	},
	numberPlate: {
		type: 'text',
		label: () => window.vm.$t('fields.numberPlate'),
		required: true,
	},
	branchSelect: {
		type: 'select',
		label: () => window.vm.$t('fields.branch'),
		interface: 'popover',
		required: true,
		selectOptions: () => store.getters['platformData/branchOptions'],
	},
	usageSelect: {
		type: 'select',
		label: () => window.vm.$t('fields.usage'),
		interface: 'popover',
		required: true,
		selectOptions: () => store.getters['platformData/usageOptions'],
	},
	manufacturerSelect: {
		type: 'select',
		label: () => window.vm.$t('fields.manufacturer'),
		interface: 'popover',
		required: true,
		selectOptions: () => store.getters['platformData/manufacturerOptions'],
	},
	modelSelect: {
		type: 'select',
		label: () => window.vm.$t('fields.model'),
		interface: 'popover',
		required: true,
		selectOptions: () => store.getters['platformData/modelOptions'],
	},
	typeSelect: {
		type: 'select',
		label: () => window.vm.$t('fields.type'),
		interface: 'popover',
		required: true,
		selectOptions: () => store.getters['platformData/typeOptions'],
	},
	colorSelect: {
		type: 'select',
		label: () => window.vm.$t('fields.color'),
		interface: 'popover',
		required: true,
		selectOptions: () => store.getters['platformData/colorOptions'],
	},
	fuelTypeSelect: {
		type: 'select',
		label: () => window.vm.$t('fields.fuelType'),
		interface: 'popover',
		required: true,
		selectOptions: () => store.getters['platformData/fuelTypeOptions'],
	},
	ownerSelect: {
		type: 'select',
		label: () => window.vm.$t('fields.owner'),
		interface: 'popover',
		required: true,
		selectOptions: () => store.getters['platformData/ownerOptions'],
	},
	companySelect: {
		type: 'select',
		label: () => window.vm.$t('fields.company'),
		interface: 'popover',
		required: true,
		selectOptions: () => store.getters['platformData/officeInsuranceCompanyOptions'],
	},
	packageSelect: {
		type: 'select',
		label: () => window.vm.$t('fields.package'),
		interface: 'popover',
		required: true,
		selectOptions: () => store.getters['platformData/packageOptions'],
	},
	contractNumber: {
		type: 'number',
		noArrows: true,
		name: 'contractNumber',
		label: () => window.vm.$t('fields.contractNumber'),
		required: true,
	},
	issueDate: {
		type: 'date',
		disablePast: true,
		name: 'issueDate',
		label: () => window.vm.$t('fields.issueDate'),
		required: true,
	},
	durationSelect: {
		type: 'select',
		label: () => window.vm.$t('fields.duration'),
		interface: 'popover',
		required: true,
		selectOptions: () => store.getters['platformData/durationOptions'],
	},
	discountSelect: {
		type: 'select',
		label: () => window.vm.$t('fields.discount'),
		interface: 'popover',
		required: true,
		selectOptions: () => store.getters['platformData/discountOptions'],
	},
	grossIncome: {
		type: 'number',
		noArrows: true,
		name: 'grossIncome',
		label: () => window.vm.$t('fields.grossIncome'),
		required: true,
	},
	netIncome: {
		type: 'number',
		noArrows: true,
		name: 'netIncome',
		label: () => window.vm.$t('fields.netIncome'),
		required: true,
	},
};
app.config.globalProperties.$filterList = (list, filters) => list.filter(el => {
	let flag = true;
	for (const filterName in filters) {
		let filterValue = filters[filterName];
		switch (typeof filterValue) {
			case 'boolean':
				if (!filterValue) {
					continue;
				}
				flag &= el[filterName] === filterValue;
				break;
			case 'number':
			case 'string':
				filterValue = filterValue.toString().toLowerCase();
				if (filterValue === '') {
					continue;
				}
				flag &= el[filterName].toLowerCase().match(filterValue) !== null;
				break;
			default:
				if (Array.isArray(filterValue)) {
					for (const filterEl of filterValue) {
						flag &= el[filterName].includes(filterEl);
					}
				}
		}
	}
	return flag;
});

// -------------- Mount --------------
store.commit('pageStructure/increaseGlobalPendingPromises');
router.isReady().then(() => {
	store.commit('pageStructure/decreaseGlobalPendingPromises');
});
app.mount('#app');
