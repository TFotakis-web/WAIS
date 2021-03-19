<template>
	<ion-item v-if="routeCategory.children" button @click="shown = !shown" detail="false">
		<ion-icon :icon="routeCategory.icon" slot="start"/>
		<ion-label>{{ routeCategory.name }}</ion-label>
		<ion-icon :icon="shown ? ionicons.chevronDownOutline : ionicons.chevronForwardOutline" slot="end"/>
	</ion-item>
	<ion-item v-else :router-link="routeCategory.to" button detail="false" :class="{ selected: isSelected(routeCategory) }">
		<ion-icon :icon="routeCategory.icon" slot="start"/>
		<ion-label>{{ routeCategory.name }}</ion-label>
	</ion-item>
	<ion-list v-if="shown && routeCategory.children">
		<ion-menu-toggle auto-hide="false" v-for="(route, i) in routeCategory.children" :key="i">
			<ion-item button router-direction="root" :router-link="route.to" lines="none" detail="false" class="hydrated" :class="{ selected: isSelected(route) }">
				<ion-icon slot="start"/>
				<ion-label>{{ route.name }}</ion-label>
			</ion-item>
		</ion-menu-toggle>
	</ion-list>
</template>
<script>
	import { IonIcon, IonItem, IonLabel, IonList, IonMenuToggle } from '@ionic/vue';
	import { chevronForwardOutline, chevronDownOutline } from 'ionicons/icons';

	export default {
		name: 'SideNavigationCategory',
		components: { IonIcon, IonItem, IonLabel, IonList, IonMenuToggle },
		props: ['routeCategory'],
		data() {
			return {
				shown: false,
				ionicons: {
					chevronForwardOutline,
					chevronDownOutline,
				},
			};
		},
		methods: {
			isSelected(route) {
				return this.$router.currentRoute.value.name === route.to.name;
			},
		},
	};
</script>
<style>
	ion-menu.md ion-item.selected {
		--background: rgba(var(--ion-color-primary-rgb), 0.14);
	}

	ion-menu.md ion-item.selected ion-icon {
		color: var(--ion-color-primary);
	}

	ion-menu.ios ion-item.selected ion-icon {
		color: var(--ion-color-primary);
	}

	ion-item.selected {
		--color: var(--ion-color-primary);
	}
</style>
