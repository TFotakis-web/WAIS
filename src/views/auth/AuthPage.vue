<template>
	<ion-page>
		<ion-content>
			<h1>Login</h1>
			<auth/>
		</ion-content>
	</ion-page>
</template>
<script>
	import { IonPage, IonContent } from '@ionic/vue';
	import auth from '@/components/auth/auth.vue';

	export default {
		name: 'AuthPage',
		components: {
			IonPage,
			IonContent,
			auth,
		},
	};
</script>
