<template>
	<mdb-card cascade narrow>
		<mdb-row>
			<mdb-col xl="6" lg="12" class="mx-auto">
				<div class="view view-cascade gradient-card-header light-blue lighten-1">
					<h2 class="h2-responsive mb-0">{{ monthNames[date.getMonth()] }} {{ date.getFullYear() }}</h2>
				</div>
			</mdb-col>
		</mdb-row>
		<mdb-card-body cascade>
			<div class="mdb-month-view">
				<div class="d-flex justify-content-between mb-3">
					<mdb-btn-group size="sm">
						<mdb-btn size="sm" outline="info" icon="chevron-left" darkWaves @click.native="changeMonth('prev')"></mdb-btn>
						<mdb-btn size="sm" outline="info" icon="chevron-right" darkWaves @click.native="changeMonth('next')"></mdb-btn>
						<mdb-btn class="px-3" outline="info" darkWaves @click.native="changeMonth('today')">{{ todayText }} </mdb-btn>
					</mdb-btn-group>
					<mdb-btn-group>
						<mdb-btn color="info" darkWaves @click.native="changeView('month')">{{ $t('Month') }} </mdb-btn>
						<mdb-btn outline="info" darkWaves @click.native="changeView('week')">{{ $t('Week') }} </mdb-btn>
						<mdb-btn outline="info" darkWaves @click.native="changeView('list')">{{ $t('List') }} </mdb-btn>
					</mdb-btn-group>
				</div>
				<table>
					<thead>
						<tr>
							<th v-for="index in 7" :key="index">
								{{ dayNames[(index - 1 + firstDayOfWeek) % 7] }}
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<drop
								tag="td"
								v-for="(day, index) in monthData.slice(0, 7)"
								@drop="handleDrop($event, day)"
								@mouseover.native="tdHover(day.date)"
								:key="index"
								:class="{
									'light-blue lighten-5': day.today === true,
									'rgba-mdb-color-light': day.date >= newEventRangeStart && day.date <= newEventRangeEnd,
									'rgba-mdb-color-slight': day.date.getDay() === 0 || day.date.getDay() === 6,
								}"
								@click.native.stop="addEvent($event, day.date)"
							>
								<div :class="[{ 'text-light': day.type === 'light' }, 'mdb-day-field']">
									{{ day.day }}
								</div>
								<div v-for="(event, eventIndex) in events" :key="eventIndex">
									<div @click.stop="editEvent(eventIndex)">
										<mdb-tooltip
											v-if="
												event.start <=
													new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDate(), 23, 59, 59) &&
													event.end >= day.date
											"
											:options="{ placement: 'top' }"
										>
											<div class="tooltip">
												<p class="mb-1 font-weight-bold">
													{{ event.title }}
												</p>
												<p
													v-if="
														event.start.toDateString() === event.end.toDateString() &&
															event.start.toLocaleTimeString() === '00:00:00' &&
															event.end.toLocaleTimeString() === '23:59:59'
													"
													class="mb-0 small"
												>
													{{ event.start.toLocaleDateString() }}
												</p>
												<p v-else class="mb-0 small">
													<span v-if="event.start.toDateString() === event.end.toDateString()">
														<span
															v-if="
																event.start.toLocaleTimeString() === '00:00:00' &&
																	event.end.toLocaleTimeString() === '23:59:59'
															"
															>{{ event.start.toLocaleDateString() }}</span
														>
														<span v-else
															>{{ event.start.toLocaleDateString() }}, {{ event.start.toLocaleTimeString() }}-
															{{ event.end.toLocaleTimeString() }}
														</span>
													</span>
													<span v-else>
														<span
															v-if="
																event.start.toLocaleTimeString() === '00:00:00' &&
																	event.end.toLocaleTimeString() === '23:59:59'
															"
															>{{ event.start.toLocaleDateString() }}
															-
															{{ event.end.toLocaleDateString() }}</span
														>
														<span v-else
															>{{ event.start.toLocaleDateString() }},
															{{ event.start.toLocaleTimeString() }}
															-
															{{ event.end.toLocaleDateString() }}, {{ event.end.toLocaleTimeString() }}</span
														>
													</span>
												</p>
											</div>
											<drag :transfer-data="event" :class="eventClass(event, day)" slot="reference">{{ event.title }} </drag>
										</mdb-tooltip>
									</div>
								</div>
							</drop>
						</tr>
						<tr>
							<drop
								tag="td"
								v-for="(day, index) in monthData.slice(7, 14)"
								@drop="handleDrop($event, day)"
								@mouseover.native="tdHover(day.date)"
								:key="index"
								:class="{
									'light-blue lighten-5': day.today === true,
									'rgba-mdb-color-light': day.date >= newEventRangeStart && day.date <= newEventRangeEnd,
									'rgba-mdb-color-slight': day.date.getDay() === 0 || day.date.getDay() === 6,
								}"
								@click.native.stop="addEvent($event, day.date)"
							>
								<div :class="[{ 'text-light': day.type === 'light' }, 'mdb-day-field']">
									{{ day.day }}
								</div>
								<div v-for="(event, eventIndex) in events" :key="eventIndex">
									<div @click.stop="editEvent(eventIndex)">
										<mdb-tooltip
											v-if="
												event.start <=
													new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDate(), 23, 59, 59) &&
													event.end >= day.date
											"
											:options="{ placement: 'top' }"
										>
											<div class="tooltip">
												<p class="mb-1 font-weight-bold">
													{{ event.title }}
												</p>
												<p
													v-if="
														event.start.toDateString() === event.end.toDateString() &&
															event.start.toLocaleTimeString() === '00:00:00' &&
															event.end.toLocaleTimeString() === '23:59:59'
													"
													class="mb-0 small"
												>
													{{ event.start.toLocaleDateString() }}
												</p>
												<p v-else class="mb-0 small">
													<span v-if="event.start.toDateString() === event.end.toDateString()">
														<span
															v-if="
																event.start.toLocaleTimeString() === '00:00:00' &&
																	event.end.toLocaleTimeString() === '23:59:59'
															"
															>{{ event.start.toLocaleDateString() }}</span
														>
														<span v-else
															>{{ event.start.toLocaleDateString() }},
															{{ event.start.toLocaleTimeString() }}
															-
															{{ event.end.toLocaleTimeString() }}</span
														>
													</span>
													<span v-else>
														<span
															v-if="
																event.start.toLocaleTimeString() === '00:00:00' &&
																	event.end.toLocaleTimeString() === '23:59:59'
															"
															>{{ event.start.toLocaleDateString() }}
															-
															{{ event.end.toLocaleDateString() }}</span
														>
														<span v-else
															>{{ event.start.toLocaleDateString() }},
															{{ event.start.toLocaleTimeString() }}
															-
															{{ event.end.toLocaleDateString() }}, {{ event.end.toLocaleTimeString() }}</span
														>
													</span>
												</p>
											</div>
											<drag :transfer-data="event" :class="eventClass(event, day)" slot="reference">{{ event.title }} </drag>
										</mdb-tooltip>
									</div>
								</div>
							</drop>
						</tr>
						<tr>
							<drop
								tag="td"
								v-for="(day, index) in monthData.slice(14, 21)"
								@drop="handleDrop($event, day)"
								@mouseover.native="tdHover(day.date)"
								:key="index"
								:class="{
									'light-blue lighten-5': day.today === true,
									'rgba-mdb-color-light': day.date >= newEventRangeStart && day.date <= newEventRangeEnd,
									'rgba-mdb-color-slight': day.date.getDay() === 0 || day.date.getDay() === 6,
								}"
								@click.native.stop="addEvent($event, day.date)"
							>
								<div :class="[{ 'text-light': day.type === 'light' }, 'mdb-day-field']">
									{{ day.day }}
								</div>
								<div v-for="(event, eventIndex) in events" :key="eventIndex">
									<div @click.stop="editEvent(eventIndex)">
										<mdb-tooltip
											v-if="
												event.start <=
													new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDate(), 23, 59, 59) &&
													event.end >= day.date
											"
											:options="{ placement: 'top' }"
										>
											<div class="tooltip">
												<p class="mb-1 font-weight-bold">
													{{ event.title }}
												</p>
												<p
													v-if="
														event.start.toDateString() === event.end.toDateString() &&
															event.start.toLocaleTimeString() === '00:00:00' &&
															event.end.toLocaleTimeString() === '23:59:59'
													"
													class="mb-0 small"
												>
													{{ event.start.toLocaleDateString() }}
												</p>
												<p v-else class="mb-0 small">
													<span v-if="event.start.toDateString() === event.end.toDateString()">
														<span
															v-if="
																event.start.toLocaleTimeString() === '00:00:00' &&
																	event.end.toLocaleTimeString() === '23:59:59'
															"
															>{{ event.start.toLocaleDateString() }}</span
														>
														<span v-else
															>{{ event.start.toLocaleDateString() }},
															{{ event.start.toLocaleTimeString() }}
															-
															{{ event.end.toLocaleTimeString() }}</span
														>
													</span>
													<span v-else>
														<span
															v-if="
																event.start.toLocaleTimeString() === '00:00:00' &&
																	event.end.toLocaleTimeString() === '23:59:59'
															"
															>{{ event.start.toLocaleDateString() }}
															-
															{{ event.end.toLocaleDateString() }}</span
														>
														<span v-else
															>{{ event.start.toLocaleDateString() }},
															{{ event.start.toLocaleTimeString() }}
															-
															{{ event.end.toLocaleDateString() }}, {{ event.end.toLocaleTimeString() }}</span
														>
													</span>
												</p>
											</div>
											<drag :transfer-data="event" :class="eventClass(event, day)" slot="reference">{{ event.title }} </drag>
										</mdb-tooltip>
									</div>
								</div>
							</drop>
						</tr>
						<tr>
							<drop
								tag="td"
								v-for="(day, index) in monthData.slice(21, 28)"
								@drop="handleDrop($event, day)"
								@mouseover.native="tdHover(day.date)"
								:key="index"
								:class="{
									'light-blue lighten-5': day.today === true,
									'rgba-mdb-color-light': day.date >= newEventRangeStart && day.date <= newEventRangeEnd,
									'rgba-mdb-color-slight': day.date.getDay() === 0 || day.date.getDay() === 6,
								}"
								@click.native.stop="addEvent($event, day.date)"
							>
								<div :class="[{ 'text-light': day.type === 'light' }, 'mdb-day-field']">
									{{ day.day }}
								</div>
								<div v-for="(event, eventIndex) in events" :key="eventIndex">
									<div @click.stop="editEvent(eventIndex)">
										<mdb-tooltip
											v-if="
												event.start <=
													new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDate(), 23, 59, 59) &&
													event.end >= day.date
											"
											:options="{ placement: 'top' }"
										>
											<div class="tooltip">
												<p class="mb-1 font-weight-bold">
													{{ event.title }}
												</p>
												<p
													v-if="
														event.start.toDateString() === event.end.toDateString() &&
															event.start.toLocaleTimeString() === '00:00:00' &&
															event.end.toLocaleTimeString() === '23:59:59'
													"
													class="mb-0 small"
												>
													{{ event.start.toLocaleDateString() }}
												</p>
												<p v-else class="mb-0 small">
													<span v-if="event.start.toDateString() === event.end.toDateString()">
														<span
															v-if="
																event.start.toLocaleTimeString() === '00:00:00' &&
																	event.end.toLocaleTimeString() === '23:59:59'
															"
															>{{ event.start.toLocaleDateString() }}</span
														>
														<span v-else
															>{{ event.start.toLocaleDateString() }},
															{{ event.start.toLocaleTimeString() }}
															-
															{{ event.end.toLocaleTimeString() }}</span
														>
													</span>
													<span v-else>
														<span
															v-if="
																event.start.toLocaleTimeString() === '00:00:00' &&
																	event.end.toLocaleTimeString() === '23:59:59'
															"
															>{{ event.start.toLocaleDateString() }}
															-
															{{ event.end.toLocaleDateString() }}</span
														>
														<span v-else
															>{{ event.start.toLocaleDateString() }},
															{{ event.start.toLocaleTimeString() }}
															-
															{{ event.end.toLocaleDateString() }}, {{ event.end.toLocaleTimeString() }}</span
														>
													</span>
												</p>
											</div>
											<drag :transfer-data="event" :class="eventClass(event, day)" slot="reference">{{ event.title }} </drag>
										</mdb-tooltip>
									</div>
								</div>
							</drop>
						</tr>
						<tr>
							<drop
								tag="td"
								v-for="(day, index) in monthData.slice(28, 35)"
								@drop="handleDrop($event, day)"
								@mouseover.native="tdHover(day.date)"
								:key="index"
								:class="{
									'light-blue lighten-5': day.today === true,
									'rgba-mdb-color-light': day.date >= newEventRangeStart && day.date <= newEventRangeEnd,
									'rgba-mdb-color-slight': day.date.getDay() === 0 || day.date.getDay() === 6,
								}"
								@click.native.stop="addEvent($event, day.date)"
							>
								<div :class="[{ 'text-light': day.type === 'light' }, 'mdb-day-field']">
									{{ day.day }}
								</div>
								<div v-for="(event, eventIndex) in events" :key="eventIndex">
									<div @click.stop="editEvent(eventIndex)">
										<mdb-tooltip
											v-if="
												event.start <=
													new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDate(), 23, 59, 59) &&
													event.end >= day.date
											"
											:options="{ placement: 'top' }"
										>
											<div class="tooltip">
												<p class="mb-1 font-weight-bold">
													{{ event.title }}
												</p>
												<p
													v-if="
														event.start.toDateString() === event.end.toDateString() &&
															event.start.toLocaleTimeString() === '00:00:00' &&
															event.end.toLocaleTimeString() === '23:59:59'
													"
													class="mb-0 small"
												>
													{{ event.start.toLocaleDateString() }}
												</p>
												<p v-else class="mb-0 small">
													<span v-if="event.start.toDateString() === event.end.toDateString()">
														<span
															v-if="
																event.start.toLocaleTimeString() === '00:00:00' &&
																	event.end.toLocaleTimeString() === '23:59:59'
															"
															>{{ event.start.toLocaleDateString() }}</span
														>
														<span v-else
															>{{ event.start.toLocaleDateString() }},
															{{ event.start.toLocaleTimeString() }}
															-
															{{ event.end.toLocaleTimeString() }}</span
														>
													</span>
													<span v-else>
														<span
															v-if="
																event.start.toLocaleTimeString() === '00:00:00' &&
																	event.end.toLocaleTimeString() === '23:59:59'
															"
															>{{ event.start.toLocaleDateString() }}
															-
															{{ event.end.toLocaleDateString() }}</span
														>
														<span v-else
															>{{ event.start.toLocaleDateString() }},
															{{ event.start.toLocaleTimeString() }}
															-
															{{ event.end.toLocaleDateString() }}, {{ event.end.toLocaleTimeString() }}</span
														>
													</span>
												</p>
											</div>
											<drag :transfer-data="event" :class="eventClass(event, day)" slot="reference">{{ event.title }} </drag>
										</mdb-tooltip>
									</div>
								</div>
							</drop>
						</tr>
						<tr>
							<drop
								tag="td"
								v-for="(day, index) in monthData.slice(35, 42)"
								@drop="handleDrop($event, day)"
								@mouseover.native="tdHover(day.date)"
								:key="index"
								:class="{
									'light-blue lighten-5': day.today === true,
									'rgba-mdb-color-light': day.date >= newEventRangeStart && day.date <= newEventRangeEnd,
									'rgba-mdb-color-slight': day.date.getDay() === 0 || day.date.getDay() === 6,
								}"
								@click.native.stop="addEvent($event, day.date)"
							>
								<div :class="[{ 'text-light': day.type === 'light' }, 'mdb-day-field']">
									{{ day.day }}
								</div>
								<div v-for="(event, eventIndex) in events" :key="eventIndex">
									<div @click.stop="editEvent(eventIndex)">
										<mdb-tooltip
											v-if="
												event.start <=
													new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDate(), 23, 59, 59) &&
													event.end >= day.date
											"
											:options="{ placement: 'top' }"
										>
											<div class="tooltip">
												<p class="mb-1 font-weight-bold">
													{{ event.title }}
												</p>
												<p
													v-if="
														event.start.toDateString() === event.end.toDateString() &&
															event.start.toLocaleTimeString() === '00:00:00' &&
															event.end.toLocaleTimeString() === '23:59:59'
													"
													class="mb-0 small"
												>
													{{ event.start.toLocaleDateString() }}
												</p>
												<p v-else class="mb-0 small">
													<span v-if="event.start.toDateString() === event.end.toDateString()">
														<span
															v-if="
																event.start.toLocaleTimeString() === '00:00:00' &&
																	event.end.toLocaleTimeString() === '23:59:59'
															"
															>{{ event.start.toLocaleDateString() }}</span
														>
														<span v-else
															>{{ event.start.toLocaleDateString() }},
															{{ event.start.toLocaleTimeString() }}
															-
															{{ event.end.toLocaleTimeString() }}</span
														>
													</span>
													<span v-else>
														<span
															v-if="
																event.start.toLocaleTimeString() === '00:00:00' &&
																	event.end.toLocaleTimeString() === '23:59:59'
															"
															>{{ event.start.toLocaleDateString() }}
															-
															{{ event.end.toLocaleDateString() }}</span
														>
														<span v-else
															>{{ event.start.toLocaleDateString() }},
															{{ event.start.toLocaleTimeString() }}
															-
															{{ event.end.toLocaleDateString() }}, {{ event.end.toLocaleTimeString() }}</span
														>
													</span>
												</p>
											</div>
											<drag :transfer-data="event" :class="eventClass(event, day)" slot="reference">{{ event.title }} </drag>
										</mdb-tooltip>
									</div>
								</div>
							</drop>
						</tr>
					</tbody>
				</table>
			</div>
		</mdb-card-body>
	</mdb-card>
</template>

<script>
	import { Drag, Drop } from 'vue-drag-drop';

	const mdbMonthView = {
		name: 'mdbMonthView',
		components: {
			Drag,
			Drop,
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
				monthData: [],
				ctrl: false,
				newEventRangeStart: false,
				newEventRangeEnd: false,
			};
		},
		created() {
			this.date = this.defaultDate;
			this.buildMonthData();
		},
		methods: {
			getDaysInMonth(month, year) {
				let date = new Date(year, month, 1);
				let days = [];
				while (date.getMonth() === month) {
					days.push(new Date(date).getDate());
					date.setDate(date.getDate() + 1);
				}
				return days;
			},
			buildMonthData() {
				let newData = [];
				let firstDayOfMonth = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
				let daysInMonth = this.getDaysInMonth(this.date.getMonth(), this.date.getYear());
				let prevMonth = this.date.getMonth() === 0 ? 11 : this.date.getMonth() - 1;
				let prevYear = prevMonth === 12 ? this.date.getYear() - 1 : this.date.getYear();
				let daysInPrevMonth = this.getDaysInMonth(prevMonth, prevYear);
				let lastDayOfPrevMonth = daysInPrevMonth.pop();
				let j = 0;
				if (firstDayOfMonth >= this.firstDayOfWeek) {
					for (let i = 0; i < 42; i++) {
						if (i + this.firstDayOfWeek >= firstDayOfMonth) {
							if (daysInMonth[i + this.firstDayOfWeek - firstDayOfMonth]) {
								let currentDate = new Date(
									this.date.getFullYear(),
									this.date.getMonth(),
									i + this.firstDayOfWeek - firstDayOfMonth + 1,
								);
								let checkToday = currentDate.toDateString() === new Date().toDateString();
								newData.push({
									day: daysInMonth[i + this.firstDayOfWeek - firstDayOfMonth],
									date: currentDate,
									today: checkToday,
								});
							} else {
								j++;
								newData.push({
									day: j,
									date: new Date(this.date.getFullYear(), this.date.getMonth() + 1, j),
									type: 'light',
								});
							}
						} else {
							newData.push({
								day: lastDayOfPrevMonth - firstDayOfMonth + i + 1 + this.firstDayOfWeek,
								date: new Date(
									this.date.getFullYear(),
									this.date.getMonth() - 1,
									lastDayOfPrevMonth - firstDayOfMonth + i + 1 + this.firstDayOfWeek,
								),
								type: 'light',
							});
						}
					}
				} else {
					for (let i = 0; i < 42; i++) {
						if (i >= 7 - this.firstDayOfWeek) {
							if (daysInMonth[i - (7 - this.firstDayOfWeek)]) {
								let currentDate = new Date(this.date.getFullYear(), this.date.getMonth(), i - (7 - this.firstDayOfWeek) + 1);
								let checkToday = currentDate.toDateString() === new Date().toDateString();
								newData.push({
									day: daysInMonth[i - (7 - this.firstDayOfWeek)],
									date: currentDate,
									today: checkToday,
								});
							} else {
								j++;
								newData.push({
									day: j,
									date: new Date(this.date.getFullYear(), this.date.getMonth() + 1, j),
									type: 'light',
								});
							}
						} else {
							newData.push({
								day: lastDayOfPrevMonth - (7 - this.firstDayOfWeek) + i + 1,
								date: new Date(
									this.date.getFullYear(),
									this.date.getMonth() - 1,
									lastDayOfPrevMonth - (7 - this.firstDayOfWeek) + i + 1,
								),
								type: 'light',
							});
						}
					}
				}
				this.monthData = newData;
			},
			tdHover(date) {
				if (this.ctrl) this.newEventRangeEnd = date;
			},
			changeMonth(target) {
				if (target === 'prev') {
					this.date = new Date(this.date.getFullYear(), this.date.getMonth() - 1);
					this.buildMonthData();
					this.$emit('dateChange', this.date);
				}
				if (target === 'next') {
					this.date = new Date(this.date.getFullYear(), this.date.getMonth() + 1);
					this.buildMonthData();
					this.$emit('dateChange', this.date);
				}
				if (target === 'today') {
					this.date = new Date();
					this.buildMonthData();
					this.$emit('dateChange', this.date);
				}
			},
			eventClass(event, day) {
				return [
					'mdb-event text-white small px-1',
					event.color ? 'bg-' + event.color : 'bg-info',
					event.start.toDateString() === day.date.toDateString() && event.start.toDateString() === event.end.toDateString()
						? 'mdb-event-single'
						: event.start < day.date
						? new Date(
								event.end.getFullYear(),
								event.end.getMonth(),
								event.end.getDate(),
								event.end.getHours(),
								event.end.getMinutes(),
								event.end.getSeconds(),
						) > new Date(day.date.getFullYear(), day.date.getMonth(), day.date.getDate(), 23, 59, 59)
							? 'mdb-event-long'
							: 'mdb-event-end'
						: 'mdb-event-start',
				];
			},
			editEvent(eventIndex) {
				this.$emit('editEvent', eventIndex);
			},
			addEvent(event, date) {
				if (event.ctrlKey && this.ctrl) {
					this.ctrl = false;
					this.$emit('addEvent', this.newEventRangeStart, new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59));
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
					this.$emit('addEvent', date, new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59));
				}
			},
			changeView(view) {
				this.$emit('changeView', view);
			},
			handleDrop(event, day) {
				let length = event.end.getTime() - event.start.getTime();
				event.start = day.date;
				event.end = new Date(day.date.getTime() + length);
				this.$emit('eventsUpdate', this.events);
			},
		},
		watch: {
			defaultDate(newVal) {
				this.date = newVal;
				this.buildMonthData();
			},
		},
	};
	export default mdbMonthView;
	export { mdbMonthView };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.mdb-month-view {
		width: 100%;
		height: 100%;
		/* margin-bottom: 50px; */
	}

	.mdb-month-view table {
		table-layout: fixed;
		width: 100%;
	}

	.mdb-month-view table th,
	.mdb-month-view table td {
		border: 1px solid #ddd;
	}

	.mdb-month-view table th {
		text-align: center;
		height: 30px;
		font-weight: bold;
	}

	.mdb-month-view table td {
		height: 12vh;
		padding-top: 25px;
		vertical-align: top;
		position: relative;
		cursor: pointer;
	}

	.mdb-month-view table td:hover {
		background-color: rgba(69, 82, 110, 0.05) !important;
	}

	.mdb-day-field {
		position: absolute;
		right: 8px;
		top: 5px;
	}

	.mdb-event {
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

	.tooltip {
		font-size: 0.75rem;
	}
</style>
