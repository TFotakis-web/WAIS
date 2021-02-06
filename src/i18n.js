import Vue from 'vue';
import VueI18n from 'vue-i18n';
import $http from '@/axios';
import $store from '@/store';
import VueCookies from 'vue-cookies';

Vue.use(VueI18n);

const $i18n = new VueI18n({
	fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
	messages: {
		'en': {},
		'el': {},
	}
});

const loadedLanguages = []; // our default language that is preloaded

function setI18nLanguage(lang) {
	$i18n.locale = lang;
	$http.defaults.headers.common['Accept-Language'] = lang;
	document.querySelector('html').setAttribute('lang', lang);
	VueCookies.set('locale', lang);
	return lang;
}

VueI18n.prototype.$loadLanguageAsync = async function (lang) {
	// Handle en-US, el-GR and similar coding
	lang = lang.split('-')[0]

	// If the language hasn't been loaded yet
	if (!loadedLanguages.includes(lang)) {
		$store.commit('setLocalesLoaded', false);
		const messages = await $http.get(`/locales/${lang}.json`);
		$store.commit('setLocalesLoaded', true);
		$i18n.setLocaleMessage(lang, messages.data);
		loadedLanguages.push(lang);
	}

	return Promise.resolve(setI18nLanguage(lang));
}

export default $i18n;
