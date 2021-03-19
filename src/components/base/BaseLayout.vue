<template>
	<IonSplitPane content-id="main-content">
		<side-navigation/>
		<ion-page id="main-content">
			<toolbar/>
			<ion-content :fullscreen="true">
				<slot/>
			</ion-content>
		</ion-page>
	</IonSplitPane>
</template>
<script>
	import {
		IonContent,
		IonSplitPane,
		IonPage,
	} from '@ionic/vue';
	import SideNavigation from '@/components/base/SideNavigation';
	import Toolbar from '@/components/base/Toolbar';

	export default {
		name: 'BaseLayout',
		components: {
			IonContent,
			IonSplitPane,
			IonPage,
			SideNavigation,
			Toolbar,
		},
	};
</script>
