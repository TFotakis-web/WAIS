<template>
	<mdb-card cascade narrow>
		<mdb-view cascade class="gradient-card-header blue">
			<h5 class="mb-0">Performance</h5>
		</mdb-view>
		<mdb-card-body>
			<mdb-line-chart :data="lineChartData" :options="lineChartOptions" :height="300"/>
		</mdb-card-body>
	</mdb-card>
</template>
<script>
export default {
	name: "performanceCard",
	data() {
		return {
			lineChartData: {
				labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
				datasets: [
					{
						label: 'Ασφάλειες Αυτοκινήτου (‎€)',
						backgroundColor: 'rgba(255, 99, 132, 0.1)',
						borderColor: 'rgba(255, 99, 132, 1)',
						borderWidth: 0.7,
						data: [6500, 5900, 8000, 8100, 5600, 5500, 4000],
					},
					{
						label: 'Ασφάλειες Ζωής (‎€)',
						backgroundColor: 'rgba(151,187,205,0.2)',
						borderColor: 'rgba(151,187,205,1)',
						borderWidth: 0.8,
						data: [2800, 4800, 4000, 1900, 8600, 2700, 9000],
					},
				],
			},
			lineChartOptions: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					xAxes: [
						{
							gridLines: {
								display: true,
								color: 'rgba(0, 0, 0, 0.1)',
							},
							ticks: {
								fontColor: 'black',
							},
						},
					],
					yAxes: [
						{
							gridLines: {
								display: true,
								color: 'rgba(0, 0, 0, 0.1)',
							},
							ticks: {
								fontColor: 'black',
							},
						},
					],
				},
				legend: {
					labels: {
						fontColor: 'black',
					},
				},
			},
		}
	},
}
</script>
