<template>
	<ion-item>
		<ion-icon :icon="$ionicons.languageOutline" slot="start" class="ion-align-self-center"/>
		<ion-label>{{ $t('components.localeDropdown.language') }}</ion-label>
		<ion-select :ok-text="$t('actions.ok')" :cancel-text="$t('actions.cancel')" interface="popover" :ionChange="$i18n.$loadLanguageAsync(selectedLocale)" v-model="selectedLocale">
			<ion-select-option v-for="locale in $i18n.availableLocales" :key="locale" :value="locale">{{ locale }}</ion-select-option>
		</ion-select>
	</ion-item>
</template>
<script>
	import { languageOutline } from 'ionicons/icons';
	import {
		IonItem,
		IonIcon,
		IonLabel,
		IonSelect,
		IonSelectOption,
	} from '@ionic/vue';

	export default {
		name: 'LocaleDropdown',
		components: {
			IonItem,
			IonIcon,
			IonLabel,
			IonSelect,
			IonSelectOption,
		},
		data() {
			return {
				selectedLocale: this.$i18n.locale,
				ionicons: {
					languageOutline,
				},
			};
		},
	};
</script>
