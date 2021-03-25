<template>
	<IonSplitPane content-id="main-content">
		<side-navigation/>
		<ion-page id="main-content">
			<toolbar :page-title="$store.getters['pageStructure/pageTitle']" :show-back-button="$store.getters['pageStructure/pageBackButton']"/>
			<ion-content :fullscreen="true">
				<router-view/>
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
		props: {
			pageTitle: {
				type: String,
				default: ''
			}
		}
	};
</script>
