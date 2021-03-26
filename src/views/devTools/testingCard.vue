<template>
	<ion-card cascade narrow>
		<ion-card-header>
			<ion-card-title>Testing</ion-card-title>
		</ion-card-header>
		<ion-card-content>
			<ion-list>
				<ion-item>
					<ion-button @click="testAll" :disabled="testAllDisabled" class="ion-margin-end">Test All</ion-button>
					<span>{{ testAllMessage }}</span>
				</ion-item>
				<ion-item v-for="(test, testName) in tests" :key="testName">
					<ion-button @click="test.testFunc" :disabled="test.disabled" class="ion-margin-end">{{ testName }}</ion-button>
					<span>{{ test.message }}</span>
				</ion-item>
			</ion-list>
		</ion-card-content>
	</ion-card>
</template>
<script>
	export default {
		name: 'testingCard',
		data() {
			return {
				testAllMessage: '',
				testAllDisabled: false,
				tests: {
					'Template Test': {
						message: '',
						disabled: false,
						testFunc: () => {
							this.tests['Template Test'].disabled = true;
							this.tests['Template Test'].message = 'Running...';

							console.log('Test Passed!');

							this.tests['Template Test'].message = 'OK';
							this.tests['Template Test'].disabled = false;
							return 0;
						},
					},
					'Echo': {
						message: '',
						disabled: false,
						testFunc: () => {
							this.tests['Echo'].disabled = true;
							this.tests['Echo'].message = 'Running...';

							this.$store.dispatch('echo');

							console.log('Test Passed!');

							this.tests['Echo'].message = 'OK';
							this.tests['Echo'].disabled = false;
							return 0;
						},
					},
					'Me': {
						message: '',
						disabled: false,
						testFunc: () => {
							this.tests['Me'].disabled = true;
							this.tests['Me'].message = 'Running...';

							this.$store.dispatch('me');

							console.log('Test Passed!');

							this.tests['Me'].message = 'OK';
							this.tests['Me'].disabled = false;
							return 0;
						},
					},
				},
			};
		},
		methods: {
			testAll() {
				this.testAllDisabled = true;
				let errorCount = 0;
				for (let test in this.tests) {
					this.testAllMessage = 'Running ' + test;
					errorCount += this.tests[test].testFunc();
				}
				if (errorCount !== 0) {
					this.testAllMessage = 'Errors in ' + errorCount.toString() + 'tests';
				} else {
					this.testAllMessage = 'OK';
				}
				this.testAllDisabled = false;
			},
		},
	};
</script>
<style scoped>
</style>
