import { createI18n } from 'vue-i18n';
import $http from '@/plugins/axios';
import { store } from '@/plugins/store/store';
import Cookies from 'js-cookie';

const $i18n = createI18n({
	fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
	messages: {
		'en': {},
		'el': {},
	},
});

const loadedLanguages = []; // our default language that is preloaded

function setI18nLanguage(lang) {
	$i18n.global.locale = lang;
	$http.defaults.headers.common['Accept-Language'] = lang;
	document.querySelector('html').setAttribute('lang', lang);
	Cookies.set('locale', lang);
}

$i18n.global.$loadLanguageAsync = async function (lang) {
	// Handle en-US, el-GR and similar coding
	lang = lang.split('-')[0];

	// If the language hasn't been loaded yet
	if (!loadedLanguages.includes(lang)) {
		store.commit('setLocalesLoaded', false);
		const messages = await $http.get(`/locales/${lang}.json`);
		$i18n.global.setLocaleMessage(lang, messages.data);
		loadedLanguages.push(lang);
		store.commit('setLocalesLoaded', true);
	}

	setI18nLanguage(lang);
};

export default $i18n;
