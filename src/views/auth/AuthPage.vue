<template>
	<ion-page>
		<ion-content>
			<router-view/>
		</ion-content>
	</ion-page>
</template>
<script>
	import { IonPage, IonContent } from '@ionic/vue';

	export default {
		name: 'AuthPage',
		components: {
			IonPage,
			IonContent,
		},
	};
</script>
