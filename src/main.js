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
app.config.globalProperties.$parseJwt = function(token) {
	const base64Url = token.split('.')[1];
	const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	const jsonPayload = decodeURIComponent(
		atob(base64)
			.split('')
			.map(function(c) {
				return (
					'%' +
					('00' + c.charCodeAt(0).toString(16)).slice(-2)
				);
			})
			.join(''),
	);

	return JSON.parse(jsonPayload);
};
app.config.globalProperties.$clearCookies = function() {
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
						handler: cancelCallback
					}
				],
			});
		return toast.present();
	},
};
app.config.globalProperties.$mitt = mitt();

// -------------- Mount --------------
store.commit('pageStructure/increaseGlobalPendingPromises');
router.isReady().then(() => {
	store.commit('pageStructure/decreaseGlobalPendingPromises');
});
app.mount('#app');
