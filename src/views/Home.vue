<template>
	<div class="text-center pt-5">
		<h1>{{ $t("Home page") }}</h1>
		<h5 class="text-info mb-5">{{ $t("Under Construction") }}</h5>

		<mdb-container>
			<mdb-row class="mb-5">
				<mdb-col>
					<mdb-card>
						<mdb-card-body>
							<mdbCalendar :events="events" />
						</mdb-card-body>
					</mdb-card>
				</mdb-col>
			</mdb-row>
			<mdb-row>
				<mdb-col>
					<mdb-card cascade narrow>
						<mdb-view cascade class="gradient-card-header blue"
							><h5 class="mb-0">Performance</h5></mdb-view
						>
						<mdb-card-body>
							<mdb-line-chart
								:data="lineChartData2"
								:options="lineChartOptions2"
								:height="300"
							></mdb-line-chart>
						</mdb-card-body>
					</mdb-card>
				</mdb-col>
				<mdb-col>
					<mdb-row>
						<mdb-col>
							<mdb-card color="primary-color">
								<mdb-card-body>
									<mdb-btn
										tag="a"
										floating
										disabled
										class="grey lighten-5 z-depth-0"
									>
										<mdb-icon
											icon="check"
											class="text-primary"
										/>
									</mdb-btn>
									<h3 class="text-white">
										<mdb-icon icon="euro-sign" /> 800,011
									</h3>
									<mdb-card
										class="rgba-white-light z-depth-0"
									>
										<mdb-card-body class="text-left">
											<h5 class="text-white">
												<mdb-icon icon="euro-sign" />
												501,011
											</h5>
											<p class="text-white">Closed</p>
											<hr class="white" />
											<h5 class="text-white">
												<mdb-icon icon="euro-sign" />
												299,011
											</h5>
											<p class="text-white mb-0">
												Closed
											</p>
										</mdb-card-body>
									</mdb-card>
								</mdb-card-body>
							</mdb-card>
						</mdb-col>
						<mdb-col>
							<mdb-row class="mb-3">
								<mdb-card color="info-color" class="w-100">
									<mdb-card-body>
										<mdb-btn
											tag="a"
											floating
											disabled
											class="grey lighten-5 z-depth-0"
										>
											<mdb-icon
												icon="lightbulb"
												class="text-info"
											/>
										</mdb-btn>
										<h3 class="text-white">
											<mdb-icon icon="euro-sign" />
											2318
										</h3>
										<p class="text-white">New Opportunity</p>
									</mdb-card-body>
								</mdb-card>
							</mdb-row>
							<mdb-row>
								<mdb-card color="secondary-color" class="w-100">
									<mdb-card-body>
										<mdb-btn
											tag="a"
											floating
											disabled
											class="grey lighten-5 z-depth-0"
										>
											<mdb-icon
												icon="envelope"
												class="text-secondary"
											/>
										</mdb-btn>
										<h3 class="text-white">
											<mdb-icon icon="euro-sign" />
											5192
										</h3>
										<p class="text-white">Emails received</p>
									</mdb-card-body>
								</mdb-card>
							</mdb-row>
						</mdb-col>
					</mdb-row>
				</mdb-col>
			</mdb-row>
		</mdb-container>
	</div>
</template>

<script>
// @ is an alias to /src
// import mdbCalendar from '@/components/admin-pro-components/Calendar/Calendar.vue';
import mdbCalendar from '@/components/structure/Calendar/Calendar.vue';
export default {
	name: 'Home',
	components: {
		mdbCalendar
	},
	data() {
		return {
			events: [
				{
					title: 'Meeting',
					start: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7),
					end: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 8, 23, 59, 59),
					color: 'warning'
				},
				{
					title: 'Front-End Conference',
					start: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1),
					end: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 3, 23, 59, 59),
					color: 'danger'
				},
				{
					title: 'Feedback',
					start: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 13),
					end: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 13, 23, 59, 59),
					color: 'success'
				}
			],
			lineChartData2: {
				labels: [
					"January",
					"February",
					"March",
					"April",
					"May",
					"June",
					"July"
				],
				datasets: [
					{
						label: "Ασφάλειες Αυτοκινήτου (‎€)",
						backgroundColor: "rgba(255, 99, 132, 0.1)",
						borderColor: "rgba(255, 99, 132, 1)",
						borderWidth: 0.7,
						data: [6500, 5900, 8000, 8100, 5600, 5500, 4000]
					},
					{
						label: "Ασφάλειες Ζωής (‎€)",
						backgroundColor: "rgba(151,187,205,0.2)",
						borderColor: "rgba(151,187,205,1)",
						borderWidth: 0.8,
						data: [2800, 4800, 4000, 1900, 8600, 2700, 9000]
					}
				]
			},
			lineChartOptions2: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					xAxes: [
						{
							gridLines: {
								display: true,
								color: "rgba(0, 0, 0, 0.1)"
							},
							ticks: {
								fontColor: "black"
							}
						}
					],
					yAxes: [
						{
							gridLines: {
								display: true,
								color: "rgba(0, 0, 0, 0.1)"
							},
							ticks: {
								fontColor: "black"
							}
						}
					]
				},
				legend: {
					labels: {
						fontColor: "black"
					}
				}
			},

		}
	}
};
</script>
