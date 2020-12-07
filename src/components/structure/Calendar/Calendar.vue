<template>
	<div class="mdb-calendar">
		<mdb-month-view
			v-if="view === 'month'"
			:defaultDate="date"
			:dayNames="shortDayNames"
			:monthNames="monthNames"
			:todayText="todayText"
			:events="newEvents"
			@editEvent="editEvent"
			@addEvent="addEvent"
			@dateChange="dateChange"
			@eventsUpdate="eventsUpdate"
			@changeView="changeView"
			:firstDayOfWeek="firstDayOfWeek"
		/>

		<mdb-week-view
			v-if="view === 'week'"
			:defaultDate="date"
			:dayNames="shortDayNames"
			:monthNames="monthNames"
			:shortMonthNames="shortMonthNames"
			:events="newEvents"
			:todayText="todayText"
			@editEvent="editEvent"
			@addEvent="addEvent"
			@dateChange="dateChange"
			@eventsUpdate="eventsUpdate"
			@changeView="changeView"
			:firstDayOfWeek="firstDayOfWeek"
		/>

		<mdb-list-view
			v-if="view === 'list'"
			:defaultDate="date"
			:dayNames="dayNames"
			:monthNames="monthNames"
			:shortMonthNames="shortMonthNames"
			:events="newEvents"
			:todayText="todayText"
			@changeView="changeView"
			@editEvent="editEvent"
			@dateChange="dateChange"
			:firstDayOfWeek="firstDayOfWeek"
		/>

		<mdb-modal :show="editEventModal" @close="editEventModal = false" @keydown.esc.native="editEventModal = false">
			<mdb-modal-header>
				<mdb-modal-title tag="h4">
					<strong>Edit event</strong>
				</mdb-modal-title>
			</mdb-modal-header>
			<mdb-modal-body v-if="editEventModal">
				<mdb-input label="Title" :value="activeEvent.title" @input="updateEvent($event, 'title')" />
				<mdb-input
					label="Start"
					:value="
						activeEventData.startDate +
							'.' +
							activeEventData.startMonth +
							'.' +
							activeEvent.start.getFullYear() +
							', ' +
							activeEventData.startHours +
							':' +
							activeEventData.startMinutes +
							':' +
							activeEventData.startSeconds
					"
					@change="updateEvent($event, 'start')"
				/>
				<mdb-input
					label="End"
					:value="
						activeEventData.endDate +
							'.' +
							activeEventData.endMonth +
							'.' +
							activeEvent.start.getFullYear() +
							', ' +
							activeEventData.endHours +
							':' +
							activeEventData.endMinutes +
							':' +
							activeEventData.endSeconds
					"
					@change="updateEvent($event, 'end')"
				/>
				<p class="mb-0">Color</p>
				<div class="custom-control custom-radio custom-control-inline font-weight-bold">
					<input type="radio" value="info" class="custom-control-input" name="color-radio" id="info-radio" v-model="activeEvent.color" @change="updateEvents()" />
					<label class="custom-control-label text-info" for="info-radio">Info</label>
				</div>
				<div class="custom-control custom-radio custom-control-inline font-weight-bold">
					<input type="radio" value="success" class="custom-control-input" name="color-radio" id="success-radio" v-model="activeEvent.color" @change="updateEvents()" />
					<label class="custom-control-label text-success" for="success-radio">Success</label>
				</div>
				<div class="custom-control custom-radio custom-control-inline font-weight-bold">
					<input type="radio" value="warning" class="custom-control-input" name="color-radio" id="warning-radio" v-model="activeEvent.color" @change="updateEvents()" />
					<label class="custom-control-label text-warning" for="warning-radio">Warning</label>
				</div>
				<br />
				<div class="custom-control custom-radio custom-control-inline font-weight-bold">
					<input type="radio" value="danger" class="custom-control-input" name="color-radio" id="danger-radio" v-model="activeEvent.color" @change="updateEvents()" />
					<label class="custom-control-label text-danger" for="danger-radio">Danger</label>
				</div>
				<div class="custom-control custom-radio custom-control-inline font-weight-bold">
					<input type="radio" value="primary" class="custom-control-input" name="color-radio" id="primary-radio" v-model="activeEvent.color" @change="updateEvents()" />
					<label class="custom-control-label text-primary" for="primary-radio">Primary</label>
				</div>
				<div class="custom-control custom-radio custom-control-inline font-weight-bold">
					<input type="radio" value="secondary" class="custom-control-input" name="color-radio" id="secondary-radio" v-model="activeEvent.color" @change="updateEvents()" />
					<label class="custom-control-label text-secondary" for="secondary-radio">Secondary</label>
				</div>
			</mdb-modal-body>
			<mdb-modal-footer>
				<mdb-btn color="danger" @click.native="deleteEvent">Delete</mdb-btn>
				<mdb-btn color="info" @click.native="editEventModal = false">Close</mdb-btn>
			</mdb-modal-footer>
		</mdb-modal>

		<mdb-modal :show="addEventModal" @close="addEventModal = false" @keydown.esc.native="addEventModal = false">
			<form @submit.prevent>
				<mdb-modal-header>
					<mdb-modal-title tag="h4">
						<strong>Add event</strong>
					</mdb-modal-title>
				</mdb-modal-header>
				<mdb-modal-body v-if="addEventModal">
					<mdb-input label="Title" :value="newEvent.title" @input="updateNewEvent($event, 'title')" required />
					<mdb-input
						label="Start"
						:value="
							newEventData.startDate +
								'.' +
								newEventData.startMonth +
								'.' +
								newEvent.start.getFullYear() +
								', ' +
								newEventData.startHours +
								':' +
								newEventData.startMinutes +
								':' +
								newEventData.startSeconds
						"
						@change="updateNewEvent($event, 'start')"
					/>
					<mdb-input
						label="End"
						:value="
							newEventData.endDate +
								'.' +
								newEventData.endMonth +
								'.' +
								newEvent.start.getFullYear() +
								', ' +
								newEventData.endHours +
								':' +
								newEventData.endMinutes +
								':' +
								newEventData.endSeconds
						"
						@change="updateNewEvent($event, 'end')"
					/>
					<p class="mb-0">Color</p>
					<div class="custom-control custom-radio custom-control-inline font-weight-bold">
						<input type="radio" value="info" class="custom-control-input" name="color-radio" id="info-radio" v-model="newEvent.color" />
						<label class="custom-control-label text-info" for="info-radio">Info</label>
					</div>
					<div class="custom-control custom-radio custom-control-inline font-weight-bold">
						<input type="radio" value="success" class="custom-control-input" name="color-radio" id="success-radio" v-model="newEvent.color" />
						<label class="custom-control-label text-success" for="success-radio">Success</label>
					</div>
					<div class="custom-control custom-radio custom-control-inline font-weight-bold">
						<input type="radio" value="warning" class="custom-control-input" name="color-radio" id="warning-radio" v-model="newEvent.color" />
						<label class="custom-control-label text-warning" for="warning-radio">Warning</label>
					</div>
					<br />
					<div class="custom-control custom-radio custom-control-inline font-weight-bold">
						<input type="radio" value="danger" class="custom-control-input" name="color-radio" id="danger-radio" v-model="newEvent.color" />
						<label class="custom-control-label text-danger" for="danger-radio">Danger</label>
					</div>
					<div class="custom-control custom-radio custom-control-inline font-weight-bold">
						<input type="radio" value="primary" class="custom-control-input" name="color-radio" id="primary-radio" v-model="newEvent.color" />
						<label class="custom-control-label text-primary" for="primary-radio">Primary</label>
					</div>
					<div class="custom-control custom-radio custom-control-inline font-weight-bold">
						<input type="radio" value="secondary" class="custom-control-input" name="color-radio" id="secondary-radio" v-model="newEvent.color" />
						<label class="custom-control-label text-secondary" for="secondary-radio">Secondary</label>
					</div>
				</mdb-modal-body>
				<mdb-modal-footer>
					<mdb-btn color="info" @click.native="addEventModal = false">Close</mdb-btn>
					<mdb-btn type="submit" color="success" @click.native="pushEvent">Add</mdb-btn>
				</mdb-modal-footer>
			</form>
		</mdb-modal>
	</div>
</template>

<script>
	import { mdbMonthView } from './MonthView';
	import { mdbWeekView } from './WeekView';
	import { mdbListView } from './ListView';

	const Calendar = {
		name: 'mdbCalendar',
		components: {
			mdbMonthView,
			mdbWeekView,
			mdbListView,
		},
		props: {
			defaultView: {
				type: String,
				default: 'week',
			},
			defaultDate: {
				type: Date,
				default: () => new Date(),
			},
			events: {
				type: [Array, Boolean],
				default: false,
			},
			firstDayOfWeek: {
				type: Number,
				default: 1,
			},
		},
		data() {
			return {
				view: this.defaultView,
				date: this.defaultDate,
				newEvents: this.$lodash.orderBy(this.events, ['start', 'end'], ['asc', 'desc']),
				editEventModal: false,
				editEventIndex: 0,
				addEventModal: false,
				activeEvent: {},
				newEvent: {},
				activeEventData: {},
				newEventData: {},
			};
		},
		methods: {
			editEvent(eventIndex) {
				this.activeEvent = {};
				this.editEventIndex = eventIndex;
				this.activeEvent = this.newEvents[eventIndex];
				this.editEventModal = true;
			},
			addEvent(start, end) {
				this.newEvent = {};
				this.newEvent.title = 'New event';
				this.newEvent.start = start;
				this.newEvent.end = end;
				this.newEvent.color = 'info';
				this.addEventModal = true;
			},
			updateEvent(value, key) {
				if (key === 'title') this.activeEvent.title = value;
				if (key === 'start') {
					let newDateAndTime = value.split(',');
					let newDate = newDateAndTime[0].split('.');
					let newTime = newDateAndTime[1].split(':');
					this.activeEvent.start = new Date(newDate[2], newDate[1] - 1, newDate[0], newTime[0], newTime[1], newTime[2]);
				}
				if (key === 'end') {
					let newDateAndTime = value.split(', ');
					let newDate = newDateAndTime[0].split('.');
					let newTime = newDateAndTime[1].split(':');
					this.activeEvent.end = new Date(newDate[2], newDate[1] - 1, newDate[0], newTime[0], newTime[1], newTime[2]);
				}
				this.newEvents = this.$lodash.orderBy(this.newEvents, ['start', 'end'], ['asc', 'desc']);
			},
			updateEvents() {
				this.newEvents = this.$lodash.orderBy(this.newEvents, ['start', 'end'], ['asc', 'desc']);
			},
			updateNewEvent(value, key) {
				if (key === 'title') this.newEvent.title = value;
				if (key === 'start') {
					let newDateAndTime = value.split(',');
					let newDate = newDateAndTime[0].split('.');
					let newTime = newDateAndTime[1].split(':');
					this.newEvent.start = new Date(newDate[2], newDate[1] - 1, newDate[0], newTime[0], newTime[1], newTime[2]);
				}
				if (key === 'end') {
					let newDateAndTime = value.split(', ');
					let newDate = newDateAndTime[0].split('.');
					let newTime = newDateAndTime[1].split(':');
					this.newEvent.end = new Date(newDate[2], newDate[1] - 1, newDate[0], newTime[0], newTime[1], newTime[2]);
				}
			},
			pushEvent() {
				if (this.newEvent.start >= this.newEvent.end) return;
				this.newEvents.push(this.newEvent);
				this.newEvent = {};
				this.newEvents = this.$lodash.orderBy(this.newEvents, ['start', 'end'], ['asc', 'desc']);
				this.addEventModal = false;
			},
			deleteEvent() {
				this.newEvents.splice(this.editEventIndex, 1);
				this.newEvents = this.$lodash.orderBy(this.newEvents, ['start', 'end'], ['asc', 'desc']);
				this.editEventModal = false;
			},
			changeView(view) {
				this.view = view;
			},
			dateChange(date) {
				this.date = date;
			},
			eventsUpdate(events) {
				this.newEvents = events;
				this.newEvents = this.$lodash.orderBy(this.newEvents, ['start', 'end'], ['asc', 'desc']);
			},
		},
		computed: {
			name() {
				return this.data;
			},
			monthNames() {
				return [
					this.$t('dates.months.January'),
					this.$t('dates.months.February'),
					this.$t('dates.months.March'),
					this.$t('dates.months.April'),
					this.$t('dates.months.May'),
					this.$t('dates.months.June'),
					this.$t('dates.months.July'),
					this.$t('dates.months.August'),
					this.$t('dates.months.September'),
					this.$t('dates.months.October'),
					this.$t('dates.months.November'),
					this.$t('dates.months.December'),
				];
			},
			shortMonthNames() {
				return [
					this.$t('dates.months.Jan'),
					this.$t('dates.months.Feb'),
					this.$t('dates.months.Mar'),
					this.$t('dates.months.Apr'),
					this.$t('dates.months.May'),
					this.$t('dates.months.Jun'),
					this.$t('dates.months.Jul'),
					this.$t('dates.months.Aug'),
					this.$t('dates.months.Sep'),
					this.$t('dates.months.Oct'),
					this.$t('dates.months.Nov'),
					this.$t('dates.months.Dec'),
				];
			},
			dayNames() {
				return [
					this.$t('dates.days.Sunday'),
					this.$t('dates.days.Monday'),
					this.$t('dates.days.Tuesday'),
					this.$t('dates.days.Wednesday'),
					this.$t('dates.days.Thursday'),
					this.$t('dates.days.Friday'),
					this.$t('dates.days.Saturday'),
				];
			},
			shortDayNames() {
				return [
					this.$t('dates.days.Sun'),
					this.$t('dates.days.Mon'),
					this.$t('dates.days.Tue'),
					this.$t('dates.days.Wed'),
					this.$t('dates.days.Thu'),
					this.$t('dates.days.Fri'),
					this.$t('dates.days.Sat'),
				];
			},
			todayText() {
				return this.$t('components.calendar.today');
			},
		},
		watch: {
			defaultDate(newVal) {
				this.date = newVal;
			},
			newEvents() {
				this.$emit('getEvents', this.newEvents);
			},
			activeEvent() {
				this.activeEvent.start.getDate() < 10 ? (this.activeEventData.startDate = '0' + this.activeEvent.start.getDate()) : (this.activeEventData.startDate = this.activeEvent.start.getDate());
				this.activeEvent.start.getMonth() < 10
					? (this.activeEventData.startMonth = '0' + (this.activeEvent.start.getMonth() + 1))
					: (this.activeEventData.startMonth = this.activeEvent.start.getMonth() + 1);
				this.activeEvent.start.getHours() < 10
					? (this.activeEventData.startHours = '0' + this.activeEvent.start.getHours())
					: (this.activeEventData.startHours = this.activeEvent.start.getHours());
				this.activeEvent.start.getMinutes() < 10
					? (this.activeEventData.startMinutes = '0' + this.activeEvent.start.getMinutes())
					: (this.activeEventData.startMinutes = this.activeEvent.start.getMinutes());
				this.activeEvent.start.getSeconds() < 10
					? (this.activeEventData.startSeconds = '0' + this.activeEvent.start.getSeconds())
					: (this.activeEventData.startSeconds = this.activeEvent.start.getSeconds());
				this.activeEvent.end.getDate() < 10 ? (this.activeEventData.endDate = '0' + this.activeEvent.end.getDate()) : (this.activeEventData.endDate = this.activeEvent.end.getDate());
				this.activeEvent.end.getMonth() < 10
					? (this.activeEventData.endMonth = '0' + (this.activeEvent.end.getMonth() + 1))
					: (this.activeEventData.endMonth = this.activeEvent.end.getMonth() + 1);
				this.activeEvent.end.getHours() < 10 ? (this.activeEventData.endHours = '0' + this.activeEvent.end.getHours()) : (this.activeEventData.endHours = this.activeEvent.end.getHours());
				this.activeEvent.end.getMinutes() < 10
					? (this.activeEventData.endMinutes = '0' + this.activeEvent.end.getMinutes())
					: (this.activeEventData.endMinutes = this.activeEvent.end.getMinutes());
				this.activeEvent.end.getSeconds() < 10
					? (this.activeEventData.endSeconds = '0' + this.activeEvent.end.getSeconds())
					: (this.activeEventData.endSeconds = this.activeEvent.end.getSeconds());
			},
			newEvent() {
				if (this.newEvent.start) {
					this.newEvent.start.getDate() < 10 ? (this.newEventData.startDate = '0' + this.newEvent.start.getDate()) : (this.newEventData.startDate = this.newEvent.start.getDate());
					this.newEvent.start.getMonth() < 10
						? (this.newEventData.startMonth = '0' + (this.newEvent.start.getMonth() + 1))
						: (this.newEventData.startMonth = this.newEvent.start.getMonth() + 1);
					this.newEvent.start.getHours() < 10 ? (this.newEventData.startHours = '0' + this.newEvent.start.getHours()) : (this.newEventData.startHours = this.newEvent.start.getHours());
					this.newEvent.start.getMinutes() < 10
						? (this.newEventData.startMinutes = '0' + this.newEvent.start.getMinutes())
						: (this.newEventData.startMinutes = this.newEvent.start.getMinutes());
					this.newEvent.start.getSeconds() < 10
						? (this.newEventData.startSeconds = '0' + this.newEvent.start.getSeconds())
						: (this.newEventData.startSeconds = this.newEvent.start.getSeconds());
					this.newEvent.end.getDate() < 10 ? (this.newEventData.endDate = '0' + this.newEvent.end.getDate()) : (this.newEventData.endDate = this.newEvent.end.getDate());
					this.newEvent.end.getMonth() < 10 ? (this.newEventData.endMonth = '0' + (this.newEvent.end.getMonth() + 1)) : (this.newEventData.endMonth = this.newEvent.end.getMonth() + 1);
					this.newEvent.end.getHours() < 10 ? (this.newEventData.endHours = '0' + this.newEvent.end.getHours()) : (this.newEventData.endHours = this.newEvent.end.getHours());
					this.newEvent.end.getMinutes() < 10 ? (this.newEventData.endMinutes = '0' + this.newEvent.end.getMinutes()) : (this.newEventData.endMinutes = this.newEvent.end.getMinutes());
					this.newEvent.end.getSeconds() < 10 ? (this.newEventData.endSeconds = '0' + this.newEvent.end.getSeconds()) : (this.newEventData.endSeconds = this.newEvent.end.getSeconds());
				}
			},
		},
	};

	export default Calendar;
	export { Calendar as mdbCalendar };
</script>
