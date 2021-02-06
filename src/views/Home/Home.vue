<template>
	<div class="text-center pt-5">
		<h1>{{ $t('views.homePage.pageTitle') }}</h1>
		<h5 class="text-info mb-5">{{ $t('various.underConstruction') }}</h5>
		<mdb-container fluid>
			<mdb-row class="mb-5">
				<mdb-col>
					<mdbCalendar :events="events" />
				</mdb-col>
			</mdb-row>
			<mdb-row>
				<mdb-col>
					<performanceCard/>
				</mdb-col>
				<mdb-col>
					<mdb-row>
						<mdb-col>
							<mdb-card color="primary-color">
								<mdb-card-body>
									<mdb-btn tag="a" floating disabled class="grey lighten-5 z-depth-0">
										<mdb-icon icon="check" class="text-primary" />
									</mdb-btn>
									<h3 class="text-white"><mdb-icon icon="euro-sign" />800,011</h3>
									<mdb-card class="rgba-white-light z-depth-0">
										<mdb-card-body class="text-left">
											<h5 class="text-white">
												<mdb-icon icon="euro-sign" />
												<span>501,011</span>
											</h5>
											<p class="text-white">Closed</p>
											<hr class="white" />
											<h5 class="text-white">
												<mdb-icon icon="euro-sign" />
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
												<mdb-icon icon="lightbulb" class="text-info" />
											</mdb-btn>
											<h3 class="text-white">
												<mdb-icon icon="euro-sign" />
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
												<mdb-icon icon="envelope" class="text-secondary" />
											</mdb-btn>
											<h3 class="text-white">
												<mdb-icon icon="euro-sign" />
												<span>5192</span>
											</h3>
											<p class="text-white">Emails received</p>
										</mdb-card-body>
									</mdb-card>
								</mdb-col>
							</mdb-row>
						</mdb-col>
					</mdb-row>
				</mdb-col>
			</mdb-row>
		</mdb-container>
	</div>
</template>

<script>
	import mdbCalendar from '@/components/structure/Calendar/Calendar.vue';
	import performanceCard from "@/views/Home/performanceCard";
	export default {
		name: 'Home',
		components: {
			mdbCalendar,
			performanceCard
		},
		data() {
			return {
				events: [
					{
						title: 'Meeting',
						start: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7),
						end: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 8, 23, 59, 59),
						color: 'warning',
					},
					{
						title: 'Front-End Conference',
						start: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1),
						end: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 3, 23, 59, 59),
						color: 'danger',
					},
					{
						title: 'Feedback',
						start: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 13),
						end: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 13, 23, 59, 59),
						color: 'success',
					},
				],
			};
		},
	};
</script>
