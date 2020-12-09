import Vue from 'vue';
import VueI18n from 'vue-i18n';
import $http from '@/axios';

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
	return lang;
}

VueI18n.prototype.$loadLanguageAsync = async function (lang) {
	// If the same language
	console.log("Load language async");
	if ($i18n.locale === lang) {
		return Promise.resolve(setI18nLanguage(lang));
	}

	// If the language was already loaded
	if (loadedLanguages.includes(lang)) {
		return Promise.resolve(setI18nLanguage(lang));
	}

	// If the language hasn't been loaded yet
	const a = performance.now();
	const messages = await $http.get(`/locales/${lang}.json`);
	const b = performance.now();
	console.log(b - a);
	$i18n.setLocaleMessage(lang, messages.data);
	loadedLanguages.push(lang);
	return setI18nLanguage(lang);
}

export default $i18n;
