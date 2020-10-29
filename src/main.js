import Vue from 'vue';
import axios from "axios";
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Amplify from 'aws-amplify';
import '@aws-amplify/ui-vue';
import aws_exports from './aws-exports';
import i18n from './i18n';
import Notifications from 'vue-notification';
import VueCookies from 'vue-cookies';
import VueHead from 'vue-head';
import { toGreeklish } from 'greek-utils';
import * as mdbvue from 'mdbvue';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbvue/lib/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import VueAnalytics from 'vue-analytics';

Amplify.configure(aws_exports);

Vue.use(Notifications);
Vue.use(VueCookies);
Vue.use(VueHead);

for (const component in mdbvue) {
	Vue.component(component, mdbvue[component]);
}

Vue.use(VueAnalytics, {
	id: 'UA-154936697-1',
	router
});

Vue.config.productionTip = false;

const v = {
	router,
	store,
	i18n,
	render: h => h(App),
	data: function () {
		return {
			enumData: {}
		};
	},
	methods: {
		toGreeklish,
		initLocale: function () {
			const localeCookie = this.$cookies.get('locale');
			if (localeCookie) {
				this.$i18n.locale = localeCookie;
				return;
			}
			const userLang = navigator.language || navigator.userLanguage;
			if (userLang && userLang.match('el')) this.$i18n.locale = 'gr';
			this.$cookies.set('locale', this.$i18n.locale);
		},
		changeLanguage: function () {
			this.$i18n.locale = this.$i18n.locale === 'en' ? 'gr' : 'en';
			this.$cookies.set('locale', this.$i18n.locale);
		},
		parseJwt: function (token) {
			const base64Url = token.split('.')[1];
			const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
			const jsonPayload = decodeURIComponent(
				atob(base64)
					.split('')
					.map(function (c) {
						return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
					})
					.join('')
			);

			return JSON.parse(jsonPayload);
		},
		clearCookies: function () {
			for (const cookie of this.$cookies.keys()) {
				this.$cookies.remove(cookie);
			}
		},
		loadEnumData: function () {
			this.$http.get('/enumData.json')
				.then(res => {
					this.$root.enumData = res.data;
				})
				.catch(err => {
					console.error(err);
				});
		}
	},
	mounted: function() {
		this.loadEnumData();
	}
};

// -------------- Prototype expansion ----------------------------------
Vue.prototype.$http = axios;
Vue.prototype.$notifyAction = {
	error: err => {
		// eslint-disable-next-line no-console
		console.error(err);
		vm.$notify({
			text: vm.$t('Something went wrong...'),
			type: 'error'
		});
	},
	errorPermanent: err => {
		// eslint-disable-next-line no-console
		console.error(err);
		vm.$notify({
			text: vm.$t('Something went wrong...'),
			type: 'error',
			duration: -1
		});
	},
	saveSuccess: () => {
		vm.$notify({
			text: vm.$t('Saved successfully!'),
			type: 'success'
		});
	},
	deleteSuccess: () => {
		vm.$notify({
			text: vm.$t('Deleted successfully!'),
			type: 'success'
		});
	}
};
Vue.prototype.$datepickerOptions = function () {
	return {
		week: [
			vm.$t('Mo'),
			vm.$t('Tu'),
			vm.$t('We'),
			vm.$t('Th'),
			vm.$t('Fr'),
			vm.$t('Sa'),
			vm.$t('Su'),
		],
		month: [
			vm.$t('January'),
			vm.$t('February'),
			vm.$t('March'),
			vm.$t('April'),
			vm.$t('May'),
			vm.$t('June'),
			vm.$t('July'),
			vm.$t('August'),
			vm.$t('September'),
			vm.$t('October'),
			vm.$t('November'),
			vm.$t('December'),
		],
		format: 'YYYY-MM-DD',
	};
};
Vue.prototype.$headData = {
	defaultMetaDict: {
		GeneralDescription: { name: 'description', content: '', id: 'metaDescription' },
		GeneralKeywords: { name: 'keywords', content: '', id: 'metaKeywords' },
		GooglePlusName: { itemprop: 'name', content: 'Wais', id: 'metaGooglePlusName' },
		GooglePlusDescription: { itemprop: 'description', content: '', id: 'metaGooglePlusDescription' },
		GooglePlusImage: { itemprop: 'image', content: 'https://wais.com/static/app/img/WaisLogoSocial.png', id: 'metaGooglePlusImage' },
		TwitterCard: { name: 'twitter:card', content: 'summary', id: 'metaTwitterCard' },
		TwitterSite: { name: 'twitter:site', content: '@Wais', id: 'metaTwitterSite' },
		TwitterTitle: { name: 'twitter:title', content: 'Wais', id: 'metaTwitterTitle' },
		TwitterDescription: { name: 'twitter:description', content: '', id: 'metaTwitterDescription' },
		TwitterCreator: { name: 'twitter:creator', content: '@Wais', id: 'metaTwitterCreator' },
		TwitterImage: { name: 'twitter:image:src', content: 'https://wais.com/static/app/img/WaisLogoSocial.png', id: 'metaTwitterImage' },
		OpenGraphTitle: { property: 'og:title', content: 'Wais', id: 'metaOpenGraphTitle' },
		OpenGraphType: { property: 'og:type', content: 'article', id: 'metaOpenGraphType' },
		OpenGraphUrl: { property: 'og:url', content: 'https://wais.com', id: 'metaOpenGraphUrl' },
		OpenGraphImage: { property: 'og:image', content: 'https://wais.com/static/app/img/WaisLogoSocial.png', id: 'metaOpenGraphImage' },
		OpenGraphDescription: { property: 'og:description', content: '', id: 'metaOpenGraphDescription' },
		OpenGraphSiteName: { property: 'og:site_name', content: 'Wais', id: 'metaOpenGraphSiteName' },
		OpenGraphPublishedTime: { property: 'article:published_time', content: '', id: 'metaOpenGraphPublishedTime' },
		OpenGraphModifiedTime: { property: 'article:modified_time', content: '', id: 'metaOpenGraphModifiedTime' },
		OpenGraphSection: { property: 'article:section', content: '', id: 'metaOpenGraphSection' },
		OpenGraphTag: { property: 'article:tag', content: '', id: 'metaOpenGraphTag' },
		OpenGraphAdmins: { property: 'fb:admins', content: '', id: 'metaOpenGraphAdmins' }
	},
	defaultMeta: () => Object.values(vm.$headData.defaultMetaDict),
	defaultHead: {
		title: '',
		meta: () => vm.$headData.defaultMeta(),
	},
	updateMeta: function (dict) {
		const res = Object.assign({}, vm.$headData.defaultMetaDict);
		for (const key in dict) {
			res[key].content = dict[key];
		}
		return Object.values(res);
	}
};


// -------------- Assignments ------------------------------------------
const vm = new Vue(v);
window.WaisVue = vm;

// -------------- Mount --------------
vm.$mount('#app');
