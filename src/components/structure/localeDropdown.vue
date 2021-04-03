<template>
	<ion-item lines="none">
		<ion-icon :icon="$ionicons.languageOutline" slot="start" class="ion-align-self-center"/>
		<ion-label>{{ $t('components.localeDropdown.language') }}</ion-label>
		<ion-select :ok-text="$t('actions.ok')" :cancel-text="$t('actions.cancel')" interface="popover" :ionChange="$i18n.$loadLanguageAsync(selectedLocale)" v-model="selectedLocale">
			<ion-select-option v-for="locale in $i18n.availableLocales" :key="locale" :value="locale">{{ locale }}</ion-select-option>
		</ion-select>
	</ion-item>
</template>
<script>
	export default {
		name: 'LocaleDropdown',
		data() {
			return {
				selectedLocale: this.$i18n.locale,
			};
		},
	};
</script>
