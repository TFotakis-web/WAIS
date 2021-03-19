<template>
	<div>
		<ion-item button @click="shown = !shown" detail="false">
			<ion-icon :icon="route.icon" slot="start"></ion-icon>
			<ion-label>{{ route.name }}</ion-label>
			<ion-icon :icon="shown ? ionicons.chevronDownOutline : ionicons.chevronForwardOutline" slot="end"/>
		</ion-item>
		<ion-list v-if="shown">
			<ion-menu-toggle auto-hide="false" v-for="(p, i) in route.children" :key="i">
				<ion-item @click="selectedIndex = i" router-direction="root" :router-link="p.url" lines="none" detail="false" class="hydrated" :class="{ selected: isSelected(p) }"><!-- <ion-icon slot="start" :icon="p.icon" /> -->
					<ion-label>{{ p.name }}</ion-label>
				</ion-item>
			</ion-menu-toggle>
		</ion-list>
	</div>
</template>
<script>
	import { IonIcon, IonItem, IonLabel, IonList, IonMenuToggle } from '@ionic/vue';
	import { chevronForwardOutline, chevronDownOutline } from 'ionicons/icons';

	export default {
		name: 'SideNavigationCategory',
		components: { IonIcon, IonItem, IonLabel, IonList, IonMenuToggle },
		props: ['route'],
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
				return false && route;
			},
		},
	};
</script>
