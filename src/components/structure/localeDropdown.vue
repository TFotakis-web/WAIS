<template>
	<mdb-dropdown tag="li" class="black-text">
		<mdb-dropdown-toggle tag="a" navLink slot="toggle" waves-fixed class="pr-0">
			<mdb-icon icon="globe" class="black-text" />
		</mdb-dropdown-toggle>
		<mdb-dropdown-menu style="min-width: unset">
			<mdb-dropdown-item v-for="locale in $i18n.availableLocales" :key="locale" @click="$root.changeLanguage(locale)">{{
				locale
			}}</mdb-dropdown-item>
		</mdb-dropdown-menu>
	</mdb-dropdown>
</template>

<script>
	export default {
		name: 'LocaleDropdown',
	};
</script>
