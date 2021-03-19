<template>
	<mdb-card cascade narrow>
		<mdb-row>
			<mdb-col xl="6" lg="12" class="mx-auto">
				<div class="view view-cascade gradient-card-header light-blue lighten-1">
					<h2 class="h2-responsive mb-0">{{ title }}</h2>
				</div>
			</mdb-col>
		</mdb-row>
		<mdb-card-body cascade>
			<div class="mdb-list-view">
				<div class="d-flex justify-content-between mb-3">
					<mdb-btn-group size="sm">
						<mdb-btn size="sm" outline="info" icon="chevron-left" darkWaves @click="changeWeek('prev')"></mdb-btn>
						<mdb-btn size="sm" outline="info" icon="chevron-right" darkWaves @click="changeWeek('next')"></mdb-btn>
						<mdb-btn class="px-3" outline="info" darkWaves @click="changeWeek('today')">{{ todayText }}</mdb-btn>
					</mdb-btn-group>
					<mdb-btn-group>
						<mdb-btn outline="info" darkWaves @click="changeView('month')">{{ $t('components.calendar.month') }}</mdb-btn>
						<mdb-btn outline="info" darkWaves @click="changeView('week')">{{ $t('components.calendar.week') }}</mdb-btn>
						<mdb-btn color="info" darkWaves @click="changeView('list')">{{ $t('components.calendar.list') }}</mdb-btn>
					</mdb-btn-group>
				</div>
				<div style="height: 25em; overflow-y: scroll">
					<table>
						<tbody v-for="(event, index) in events" :key="index">
						<tr v-if="event.start < new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() + 7) && event.end >= new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate())" class="grey lighten-4">
							<th v-if="event.start.toDateString() === event.end.toDateString()" class="font-weight-bold">
								<mdb-icon icon="calendar-alt" class="pr-2"/>
								{{ event.start.toLocaleDateString() }}
							</th>
							<th v-else class="font-weight-bold">
								<mdb-icon icon="calendar-alt" class="pr-2"/>
								{{ event.start.toLocaleDateString() }} -
								{{ event.end.toLocaleDateString() }}
							</th>
							<th v-if="event.start.toLocaleTimeString() === '00:00:00' && event.end.toLocaleTimeString() === '23:59:59'" class="text-right font-weight-bold">
								<mdb-icon icon="clock" class="pr-1"/>
								{{ $t('components.calendar.allDay') }}
							</th>
							<th v-else class="text-right font-weight-bold">
								<mdb-icon icon="clock" class="pr-1"/>
								{{ event.start.toLocaleTimeString() }} -
								{{ event.end.toLocaleTimeString() }}
							</th>
						</tr>
						<tr v-if=" event.start < new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() + 7) && event.end >= new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate())">
							<td colspan="2" class="mdb-list-event" @click="editEvent(index)">
								<mdb-icon icon="circle" :color="event.color" class="pr-2"/>
								{{ event.title }}
							</td>
						</tr>
						</tbody>
					</table>
				</div>
			</div>
		</mdb-card-body>
	</mdb-card>
</template>
<script>
	const mdbListView = {
		name: 'mdbListView',
		props: {
			defaultDate: {
				type: Date,
			},
			dayNames: {
				type: Array,
			},
			monthNames: {
				type: Array,
			},
			shortMonthNames: {
				type: Array,
			},
			todayText: {
				type: String,
			},
			events: {
				type: [Array, Boolean],
			},
			firstDayOfWeek: {
				type: Number,
				default: 0,
			},
		},
		data() {
			return {
				firstDay: null,
				lastDay: null,
				title: null,
			};
		},
		created() {
			this.date = this.defaultDate;
			this.setFirstAndLastDayToDate(this.date);
			this.updateTitle();
		},
		methods: {
			changeView(view) {
				this.$emit('changeView', view);
			},
			updateTitle() {
				if (this.firstDay.getMonth() == this.lastDay.getMonth()) {
					this.title =
						this.firstDay.getDate() +
						' - ' +
						this.lastDay.getDate() +
						' ' +
						this.monthNames[this.firstDay.getMonth()] +
						' ' +
						this.firstDay.getFullYear();
				} else if (this.firstDay.getFullYear() == this.lastDay.getFullYear()) {
					this.title =
						this.firstDay.getDate() +
						' ' +
						this.shortMonthNames[this.firstDay.getMonth()] +
						' - ' +
						this.lastDay.getDate() +
						' ' +
						this.shortMonthNames[this.lastDay.getMonth()] +
						' ' +
						this.firstDay.getFullYear();
				} else {
					this.title =
						this.firstDay.getDate() +
						' ' +
						this.shortMonthNames[this.firstDay.getMonth()] +
						' ' +
						this.firstDay.getFullYear() +
						' - ' +
						this.lastDay.getDate() +
						' ' +
						this.shortMonthNames[this.lastDay.getMonth()] +
						' ' +
						this.lastDay.getFullYear();
				}
			},
			setFirstAndLastDayToDate(date) {
				let currentDayOfWeek = date.getDay();
				if (currentDayOfWeek >= this.firstDayOfWeek) {
					this.firstDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() - currentDayOfWeek + this.firstDayOfWeek);
				} else {
					this.firstDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7 - currentDayOfWeek + this.firstDayOfWeek);
				}
				this.lastDay = new Date(this.firstDay.getFullYear(), this.firstDay.getMonth(), this.firstDay.getDate() + 6);
			},
			changeWeek(target) {
				if (target === 'prev') {
					this.firstDay = new Date(this.firstDay.getFullYear(), this.firstDay.getMonth(), this.firstDay.getDate() - 7);
					this.lastDay = new Date(this.lastDay.getFullYear(), this.lastDay.getMonth(), this.lastDay.getDate() - 7);
				}
				if (target === 'next') {
					this.firstDay = new Date(this.firstDay.getFullYear(), this.firstDay.getMonth(), this.firstDay.getDate() + 7);
					this.lastDay = new Date(this.lastDay.getFullYear(), this.lastDay.getMonth(), this.lastDay.getDate() + 7);
				}
				if (target === 'today') {
					this.setFirstAndLastDayToDate(new Date());
				}
				this.updateTitle();
				this.$emit('dateChange', this.firstDay);
			},
			editEvent(eventIndex) {
				this.$emit('editEvent', eventIndex);
			},
		},
	};

	export default mdbListView;
	export { mdbListView };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.mdb-list-view {
		width: 100%;
		height: 100%;
		/* margin-bottom: 50px; */
	}

	.mdb-list-view table {
		width: 100%;
		border: 1px solid #ddd;
	}

	.mdb-list-view table tr td,
	.mdb-list-view table tr th {
		padding: 8px 10px;
		border-top: 1px solid #ddd;
		border-bottom: 1px solid #ddd;
	}

	.mdb-list-event {
		cursor: pointer;
	}

	.mdb-list-event:hover {
		background-color: rgba(69, 82, 110, 0.05);
	}
</style>
