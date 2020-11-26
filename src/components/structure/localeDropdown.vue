<template>
	<mdb-tooltip material trigger="hover" :options="{ placement: 'left' }">
		<span slot="tip">{{ $t('language') }}</span>
		<mdb-dropdown slot="reference" tag="li" class="black-text">
			<mdb-dropdown-toggle tag="a" navLink slot="toggle" waves-fixed class="pr-0">
				<mdb-icon icon="globe" class="black-text" />
			</mdb-dropdown-toggle>
			<mdb-dropdown-menu style="min-width: unset">
				<mdb-dropdown-item v-for="locale in $i18n.availableLocales" :key="locale" @click="$root.changeLanguage(locale)">{{
					locale
				}}</mdb-dropdown-item>
			</mdb-dropdown-menu>
		</mdb-dropdown>
	</mdb-tooltip>
</template>

<script>
	export default {
		name: 'LocaleDropdown',
	};
</script>
