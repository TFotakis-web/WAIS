<template>
	<mdb-card cascade narrow>
		<mdb-view cascade class="gradient-card-header blue">
			<h5 class="mb-0">Testing</h5>
		</mdb-view>
		<mdb-card-body>
			<div>
				<mdb-btn @click.native="testAll" :disabled="testAllDisabled" outline="primary">Test All</mdb-btn>
				<span>{{ testAllMessage }}</span>
			</div>

			<div v-for="(test, testName) in tests" :key="testName">
				<mdb-btn @click.native="test.testFunc" :disabled="test.disabled" color="primary">{{ testName }}</mdb-btn>
				<span>{{ test.message }}</span>
			</div>
		</mdb-card-body>
	</mdb-card>
</template>
<script>
export default {
	name: "testingCard",
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

            console.log("Test Passed!");

            this.tests['Template Test'].message = 'OK';
            this.tests['Template Test'].disabled = false;
            return 0;
          }
        },
        'Echo': {
          message: '',
          disabled: false,
          testFunc: () => {
            this.tests['Echo'].disabled = true;
            this.tests['Echo'].message = 'Running...';

            this.$store.dispatch('echo');

            console.log("Test Passed!");

            this.tests['Echo'].message = 'OK';
            this.tests['Echo'].disabled = false;
            return 0;
          }
        },
			}
		}
	},
	methods: {
		testAll() {
			this.testAllDisabled = true;
			let errorCount = 0;
			for(let test in this.tests) {
				this.testAllMessage = 'Running ' + test;
				errorCount += this.tests[test].testFunc();
			}
			if(errorCount !== 0) {
				this.testAllMessage = 'Errors in ' + errorCount.toString() + 'tests';
			} else {
				this.testAllMessage = 'OK';
			}
			this.testAllDisabled = false;
		}
	},
}
</script>
<style scoped>
</style>