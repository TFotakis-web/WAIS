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
			<mdb-row id="buttons-row">
				<mdb-col>
					<div class="d-flex justify-content-between mb-3">
						<mdb-btn-group size="sm">
							<mdb-btn size="sm" outline="info" icon="chevron-left" darkWaves @click.native="changeWeek('prev')" class="ml-0"></mdb-btn>
							<mdb-btn size="sm" outline="info" icon="chevron-right" darkWaves @click.native="changeWeek('next')"></mdb-btn>
							<mdb-btn class="px-3" outline="info" darkWaves @click.native="changeWeek('today')">{{ todayText }}</mdb-btn>
						</mdb-btn-group>
						<mdb-btn-group>
							<mdb-btn outline="info" darkWaves @click.native="changeView('month')">{{ $t('components.calendar.month') }}</mdb-btn>
							<mdb-btn color="info" darkWaves @click.native="changeView('week')">{{ $t('components.calendar.week') }}</mdb-btn>
							<mdb-btn outline="info" darkWaves @click.native="changeView('list')" class="mr-0">{{ $t('components.calendar.list') }}</mdb-btn>
						</mdb-btn-group>
					</div>
				</mdb-col>
			</mdb-row>
			<mdb-row id="calendar-row">
				<mdb-col>
					<div class="mdb-week-view h-100 w-100">
						<mdb-col id="calendar-head" style="padding-right: 32px;">
							<mdb-row>
								<mdb-col class="px-0">
									<div class="h-100 w-100"></div>
								</mdb-col>
								<mdb-col
									v-for="(weekDay, index) in dayNames"
									:key="index"
									:class="{ 'rgba-blue-slight': isToday(index) }"
									class="px-0">
									<div class="h-100 w-100">
										{{ dayNames[(firstDay.getDay() + index) % 7] }}
										{{ new Date(firstDay.getFullYear(), firstDay.getMonth(), firstDay.getDate() + index) | moment('DD/MM') }}
									</div>
								</mdb-col>
							</mdb-row>
							<mdb-row>
								<mdb-col class="text-center font-weight-bold px-0">
									<div class="h-100 w-100">{{ $t('components.calendar.allDay') }}</div>
								</mdb-col>
								<mdb-col v-for="(weekDay, dayIndex) in dayNames" :key="dayIndex" class="px-0">
									<div class="mdb-week-view-cell">
										<drop
											tag="div"
											@click.native.stop="addAllDayEventClick($event, dayIndex)"
											@drop="handleDrop($event, dayIndex, 0)"
											:class="getClassesDropTBody(dayIndex)"
											class="pb-4 h-100 w-100"
											@mouseover.native="tdHover(dayIndex, 0)"
										>
											<div v-for="(event, eventIndex) in events" :key="eventIndex">
												<mdb-tooltip v-if="showTooltip(event, dayIndex)" material trigger="hover" :options="{ placement: 'top' }">
													<div slot="tip">
														<tooltipContent :event="event"/>
													</div>
													<drag
														:transfer-data="event"
														slot="reference"
														:class="eventClass(event, dayIndex)"
														@click.native.stop="editEvent(eventIndex)"
													>{{ event.title }}
													</drag>
												</mdb-tooltip>
											</div>
										</drop>
									</div>
								</mdb-col>
							</mdb-row>
						</mdb-col>
						<mdb-col id="calendar-body" class="mdb-week-view-calendar-body">
							<mdb-row v-for="(hour, hourIndex) in 24" :key="hourIndex">
								<mdb-col class="px-0">
									<div class="h-100 w-100">{{ hour }}:00</div>
								</mdb-col>
								<mdb-col v-for="(day, dayIndex) in 7" :key="dayIndex" class="px-0">
									<div class="mdb-week-view-cell">
										<drop
											tag="div"
											@click.native.stop="addEvent($event, dayIndex, hourIndex)"
											@drop="handleDrop($event, dayIndex, hourIndex)"
											:class="getClassesDropTBody(dayIndex)"
											class="pb-4 h-100 w-100"
											@mouseover.native="tdHover(dayIndex, hourIndex)"
										>
											<div v-for="(event, eventIndex) in events" :key="eventIndex">
												<mdb-tooltip
													v-if="showHourTooltip(event, dayIndex, hourIndex)"
													material
													trigger="hover"
													:options="{ placement: 'top' }"
												>
													<div slot="tip">
														<tooltipContent :event="event"/>
													</div>
													<drag
														:transfer-data="event"
														slot="reference"
														:class="timeEventClass(event, dayIndex, hourIndex)"
														@click.native.stop="editEvent(eventIndex)"
													>
														<span>{{ event.title }}</span>
													</drag>
												</mdb-tooltip>
											</div>
										</drop>
									</div>
								</mdb-col>
							</mdb-row>
						</mdb-col>
					</div>
				</mdb-col>
			</mdb-row>
		</mdb-card-body>
	</mdb-card>
</template>
<script>
import {Drag, Drop} from 'vue-drag-drop';
import tooltipContent from '@/components/structure/Calendar/tooltipContent.vue';

const mdbWeekView = {
	name: 'mdbWeekView',
	components: {
		Drag,
		Drop,
		tooltipContent,
	},
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
			ctrl: false,
			newEventRangeStart: false,
			newEventRangeEnd: false,
		};
	},
	created() {
		this.date = this.defaultDate;
		this.setFirstAndLastDayToDate(this.date);
		this.updateTitle();
	},
	mounted() {
		const calendarBody = document.querySelector('.mdb-week-view-calendar-body');
		calendarBody.scrollTop = 200;
	},
	methods: {
		showHourTooltip(event, dayIndex, hourIndex) {
			const dateTime = new Date(this.firstDay.getFullYear(), this.firstDay.getMonth(), this.firstDay.getDate() + dayIndex, hourIndex);
			const dateTimeMorning = new Date(this.firstDay.getFullYear(), this.firstDay.getMonth(), this.firstDay.getDate() + dayIndex);
			const dateTimeNight = new Date(this.firstDay.getFullYear(), this.firstDay.getMonth(), this.firstDay.getDate() + dayIndex, 23, 59, 59);
			return (
				(event.start <= dateTime && event.end >= dateTime && event.start > dateTimeMorning) ||
				(event.end >= dateTime && event.start <= dateTime && event.end < dateTimeNight)
			);
		},
		getClassesDropTBody(dayIndex) {
			if (this.isToday(dayIndex)) {
				return 'rgba-blue-slight';
			} else if (!this.isWeekDay(dayIndex)) {
				return 'rgba-mdb-color-slight';
			}
		},
		isWeekDay(dayIndex) {
			const day = new Date(this.firstDay.getFullYear(), this.firstDay.getMonth(), this.firstDay.getDate() + dayIndex);
			return day.getDay() >= 1 && day.getDay() <= 5;
		},
		isToday(index) {
			const thisDay = new Date(this.firstDay.getFullYear(), this.firstDay.getMonth(), this.firstDay.getDate() + index).toDateString();
			const today = new Date().toDateString();
			return thisDay === today;
		},
		isSingleDayEvent(event) {
			const startDate = this.$moment(event.start).format('YYYYMMDD');
			const endDate = this.$moment(event.end).format('YYYYMMDD');
			return startDate === endDate;
		},
		isAllDayEvent(event) {
			const startTime = this.$moment(event.start).format('HH:mm:ss');
			const endTime = this.$moment(event.end).format('HH:mm:ss');
			return startTime === '00:00:00' && endTime === '23:59:59';
		},
		showTooltip(event, index) {
			return (
				event.start <= new Date(this.firstDay.getFullYear(), this.firstDay.getMonth(), this.firstDay.getDate() + index) &&
				event.end >= new Date(this.firstDay.getFullYear(), this.firstDay.getMonth(), this.firstDay.getDate() + index, 23, 59, 59)
			);
		},
		addAllDayEventClick($event, index) {
			return this.addAllDayEvent(
				$event,
				new Date(this.firstDay.getFullYear(), this.firstDay.getMonth(), this.firstDay.getDate() + index),
				new Date(this.firstDay.getFullYear(), this.firstDay.getMonth(), this.firstDay.getDate() + index, 23, 59, 59),
			);
		},
		getClasses(index) {
			if (
				new Date(this.firstDay.getFullYear(), this.firstDay.getMonth(), this.firstDay.getDate() + index) >= this.newEventRangeStart &&
				new Date(this.firstDay.getFullYear(), this.firstDay.getMonth(), this.firstDay.getDate() + index) <= this.newEventRangeEnd
			) {
				return 'rgba-mdb-color-light';
			} else if (
				new Date(this.firstDay.getFullYear(), this.firstDay.getMonth(), this.firstDay.getDate() + index).toDateString() ===
				new Date().toDateString()
			) {
				return 'rgba-blue-slight';
			} else if (
				new Date(this.firstDay.getFullYear(), this.firstDay.getMonth(), this.firstDay.getDate() + index).getDay() === 0 ||
				new Date(this.firstDay.getFullYear(), this.firstDay.getMonth(), this.firstDay.getDate() + index).getDay() === 6
			) {
				return 'rgba-mdb-color-slight';
			}
		},
		changeView(view) {
			this.$emit('changeView', view);
		},
		updateTitle() {
			if (this.firstDay.getMonth() === this.lastDay.getMonth()) {
				this.title = this.monthNames[this.firstDay.getMonth()] + ' ' + this.firstDay.getFullYear();
			} else if (this.firstDay.getFullYear() === this.lastDay.getFullYear()) {
				this.title =
					this.shortMonthNames[this.firstDay.getMonth()] +
					' - ' +
					this.shortMonthNames[this.lastDay.getMonth()] +
					' ' +
					this.firstDay.getFullYear();
			} else {
				this.title =
					this.shortMonthNames[this.firstDay.getMonth()] +
					' ' +
					this.firstDay.getFullYear() +
					' - ' +
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
		eventClass(event, index) {
			const day = new Date(this.firstDay.getFullYear(), this.firstDay.getMonth(), this.firstDay.getDate() + index);
			let arr = ['mdb-event text-white small px-1'];
			let el = event.color ? 'bg-' + event.color : 'bg-info';
			arr.push(el);

			if (event.start.toDateString() === day.toDateString() && this.isSingleDayEvent(event)) {
				arr.push('mdb-event-single');
			} else if (day.getDay() === this.firstDayOfWeek && event.start.getDay() !== this.firstDayOfWeek) {
				arr.push('mdb-event-continuation');
			} else if (event.start < day) {
				if (event.end > new Date(day.getFullYear(), day.getMonth(), day.getDate(), 23, 59, 59)) {
					arr.push('mdb-event-long');
				} else {
					arr.push('mdb-event-end');
				}
			} else {
				arr.push('mdb-event-start');
			}
			return arr;
		},
		timeEventClass(event, dayIndex, hourIndex) {
			const date = new Date(this.firstDay.getFullYear(), this.firstDay.getMonth(), this.firstDay.getDate() + dayIndex, hourIndex);
			return [
				'mdb-event text-white small px-1',
				event.color ? 'bg-' + event.color : 'bg-info',
				event.start.getTime() === date.getTime() &&
				event.end < new Date(event.start.getFullYear(), event.start.getMonth(), event.start.getDate(), event.start.getHours() + 1) &&
				'mdb-vertical-single-event',
				event.start.getTime() === date.getTime() &&
				event.end >= new Date(event.start.getFullYear(), event.start.getMonth(), event.start.getDate(), event.start.getHours() + 1) &&
				'mdb-vertical-event-start',
				event.start.getTime() !== date.getTime() &&
				event.end < new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() + 1) &&
				'mdb-vertical-event-end',
				event.start.getTime() < date.getTime() &&
				event.end > new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() + 1) &&
				'mdb-vertical-event-long',
			];
		},
		editEvent(eventIndex) {
			this.$emit('editEvent', eventIndex);
		},
		addEvent(event, dayIndex, hourIndex) {
			const date = new Date(this.firstDay.getFullYear(), this.firstDay.getMonth(), this.firstDay.getDate() + dayIndex, hourIndex);
			if (event.ctrlKey && this.ctrl) {
				this.ctrl = false;
				this.$emit(
					'addEvent',
					this.newEventRangeStart,
					new Date(
						date.getFullYear(),
						date.getMonth(),
						date.getDate(),
						date.getHours(),
						date.getMinutes() + 59,
						date.getSeconds() + 59,
					),
				);
				this.newEventRangeStart = false;
				this.newEventRangeEnd = false;
			} else if (event.ctrlKey && !this.ctrl) {
				this.ctrl = true;
				this.newEventRangeStart = date;
				this.newEventRangeEnd = date;
			} else {
				this.ctrl = false;
				this.newEventRangeStart = false;
				this.newEventRangeEnd = false;
				this.$emit(
					'addEvent',
					date,
					new Date(
						date.getFullYear(),
						date.getMonth(),
						date.getDate(),
						date.getHours(),
						date.getMinutes() + 59,
						date.getSeconds() + 59,
					),
				);
			}
		},
		addAllDayEvent(event, start, end) {
			if (event.ctrlKey && this.ctrl) {
				this.ctrl = false;
				this.$emit('addEvent', this.newEventRangeStart, end);
				this.newEventRangeStart = false;
				this.newEventRangeEnd = false;
			} else if (event.ctrlKey && !this.ctrl) {
				this.ctrl = true;
				this.newEventRangeStart = start;
				this.newEventRangeEnd = end;
			} else {
				this.ctrl = false;
				this.newEventRangeStart = false;
				this.newEventRangeEnd = false;
				this.$emit('addEvent', start, end);
			}
		},
		tdHover(dayIndex, hourIndex) {
			const date = new Date(this.firstDay.getFullYear(), this.firstDay.getMonth(), this.firstDay.getDate() + dayIndex, hourIndex);
			if (this.ctrl) this.newEventRangeEnd = date;
		},
		handleDrop(event, dayIndex, hourIndex) {
			const day = new Date(this.firstDay.getFullYear(), this.firstDay.getMonth(), this.firstDay.getDate() + dayIndex, hourIndex);
			let length = event.end.getTime() - event.start.getTime();
			event.start = day;
			event.end = new Date(day.getTime() + length);
			this.$emit('eventsUpdate', this.events);
		},
	},
	watch: {
		defaultDate(newVal) {
			this.date = newVal;
		},
	},
};

export default mdbWeekView;
export {mdbWeekView};
</script>
<style scoped>
.mdb-week-view {
	border-top: 1px solid #CCC;
	border-left: 1px solid #CCC;
}

.mdb-week-view .col{
	border-right: 1px solid #CCC;
}

.mdb-week-view .row{
	border-bottom: 1px solid #CCC;
}

.mdb-week-view-calendar-body {
	max-height: 22em;
	overflow-y: scroll;
}

.mdb-week-view-cell {
	height: 100%;
	width: 100%;
	vertical-align: top;
	cursor: pointer;
}

.mdb-week-view-cell:hover {
	background-color: rgba(69, 82, 110, 0.1) !important;
}

.mdb-event {
	margin: 1px;
	cursor: pointer;
	font-weight: bold;
}

.mdb-event:hover {
	opacity: 0.7;
}

.mdb-event-single {
	margin: 1px 2px;
}

.mdb-event-start {
	margin: 1px 0;
	margin-left: 2px;
	margin-right: -2px;

	height: 19px;
	overflow: hidden;
}

.mdb-event-continuation {
	margin: 1px 0;
	margin-left: -2px;
	margin-right: -2px;
}

.mdb-event-long {
	margin: 1px 0;
	margin-left: -2px;
	margin-right: -2px;
	text-indent: -9999px;
}

.mdb-event-end {
	margin: 1px 0;
	margin-left: -2px;
	margin-right: 2px;
	text-indent: -9999px;
}

.mdb-vertical-event-start {
	margin: 2px 1px;
	margin-bottom: -2px;
	float: left;
	width: 17px;
	height: 88px;
}

.mdb-vertical-single-event {
	margin: 2px 1px;
	float: left;
	width: 17px;
	height: 84px;
}

.mdb-vertical-event-long {
	margin: -2px 1px;
	float: left;
	width: 17px;
	height: 92px;
	text-indent: -9999px;
}

.mdb-vertical-event-end {
	margin: 2px 1px;
	margin-top: -2px;
	float: left;
	width: 17px;
	height: 88px;
	text-indent: -9999px;
}

.mdb-vertical-event-start span,
.mdb-vertical-single-event span {
	display: block;
	transform: rotate(90deg);
	white-space: nowrap;
}

.tooltip {
	font-size: 0.75rem;
}
</style>
