<template>
	<div id="app" style="background-color: #fafafa">
		<navigation v-if="authState === 'signedin'" />
		<!-- <router-view v-else/> -->
		<mdb-container fluid style="height: 100vh">
			<mdb-row class="h-100 justify-content-center align-items-center">
				<amplify-authenticator class="mt-5"/>
			</mdb-row>
		</mdb-container>
	</div>
</template>

<script>
import navigation from './components/structure/navigation';
import { onAuthUIStateChange } from '@aws-amplify/ui-components'

export default {
	name: 'App',
	components: {
		navigation,
	},
	created() {
		onAuthUIStateChange((authState, authData) => {
			this.authState = authState;
			this.user = authData;
		})
	},
	data() {
		return {
			user: undefined,
			authState: undefined
		}
	},
	beforeDestroy() {
		return onAuthUIStateChange;
	}
};
</script>
