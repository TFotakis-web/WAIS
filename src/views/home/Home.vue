<template>
	<ion-grid fixed>
		<create-office-card v-if="$store.getters['auth/role'] === 'UNKNOWN' && !$store.getters['auth/isAdmin']" class="ion-text-center ion-margin-top"/>
		<template v-else>
			<newsfeed-card/>
			<h1 class="ion-text-center">{{ $t('various.underConstruction') }}</h1>
			<!--	<base-layout :page-title="$t('views.homePage.pageTitle')">
					<div style="text-align: center; position: absolute; left: 0; right: 0; top: 50%; transform: translateY(-50%);">
						<h1>{{ $t('various.underConstruction') }}</h1>
					</div>
				</base-layout>-->
			<!--	<div class="text-center pt-5">
					<h1>{{ $t('views.homePage.pageTitle') }}</h1>
					<h5 class="text-info mb-5">{{ $t('various.underConstruction') }}</h5>
					<mdb-container fluid>
						<mdb-row class="mb-5">
							<mdb-col>
								<calendarCard/>
							</mdb-col>
						</mdb-row>
						<mdb-row class="mb-5">
							<mdb-col>
								<performanceCard :max-content-height="300"/>
							</mdb-col>
							<mdb-col>
								<newsfeedCard :max-content-height="300"/>
							</mdb-col>
						</mdb-row>
						<mdb-row>
							<mdb-col>
								<mdb-card color="primary-color">
									<mdb-card-body>
										<mdb-btn tag="a" floating disabled class="grey lighten-5 z-depth-0">
											<mdb-icon icon="check" class="text-primary"/>
										</mdb-btn>
										<h3 class="text-white">
											<mdb-icon icon="euro-sign"/>
											800,011
										</h3>
										<mdb-card class="rgba-white-light z-depth-0">
											<mdb-card-body class="text-left">
												<h5 class="text-white">
													<mdb-icon icon="euro-sign"/>
													<span>501,011</span>
												</h5>
												<p class="text-white">Closed</p>
												<hr class="white"/>
												<h5 class="text-white">
													<mdb-icon icon="euro-sign"/>
													<span>299,011</span>
												</h5>
												<p class="text-white mb-0">Closed</p>
											</mdb-card-body>
										</mdb-card>
									</mdb-card-body>
								</mdb-card>
							</mdb-col>
							<mdb-col>
								<mdb-row class="mb-3">
									<mdb-col>
										<mdb-card color="info-color" class="w-100">
											<mdb-card-body>
												<mdb-btn tag="a" floating disabled class="grey lighten-5 z-depth-0">
													<mdb-icon icon="lightbulb" class="text-info"/>
												</mdb-btn>
												<h3 class="text-white">
													<mdb-icon icon="euro-sign"/>
													<span>2318</span>
												</h3>
												<p class="text-white">New Opportunity</p>
											</mdb-card-body>
										</mdb-card>
									</mdb-col>
								</mdb-row>
								<mdb-row>
									<mdb-col>
										<mdb-card color="secondary-color" class="w-100">
											<mdb-card-body>
												<mdb-btn tag="a" floating disabled class="grey lighten-5 z-depth-0">
													<mdb-icon icon="envelope" class="text-secondary"/>
												</mdb-btn>
												<h3 class="text-white">
													<mdb-icon icon="euro-sign"/>
													<span>5192</span>
												</h3>
												<p class="text-white">Emails received</p>
											</mdb-card-body>
										</mdb-card>
									</mdb-col>
								</mdb-row>
							</mdb-col>
						</mdb-row>
					</mdb-container>
				</div>-->
		</template>
	</ion-grid>
</template>
<script>
	import createOfficeCard from '@/views/home/createOfficeCard';
	// import calendarCard from '@/views/home/calendarCard';
	// import performanceCard from '@/views/home/performanceCard';
	import newsfeedCard from '@/views/home/newsfeedCard';

	export default {
		name: 'Home',
		components: {
			createOfficeCard,
			// calendarCard,
			// performanceCard,
			newsfeedCard,
		},
		mounted() {
			this.$store.commit('pageStructure/setPageTitle', () => window.vm.$t('views.homePage.pageTitle'));
			this.$store.commit('pageStructure/setPageBackButton', false);
		},
	};
</script>
