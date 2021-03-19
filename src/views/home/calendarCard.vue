<template>
	<mdbCalendar :events="events" @eventsUpdade="eventsUpdate"/>
</template>
<script>
	import mdbCalendar from '@/components/structure/Calendar/Calendar';

	export default {
		name: 'calendarCard',
		components: {
			mdbCalendar,
		},
		data() {
			return {
				events: [],
			};
		},
		mounted() {
			this.loadEvents();
		},
		methods: {
			loadEvents() {
				this.events.push({
					title: 'Meeting',
					start: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7),
					end: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 8, 23, 59, 59),
					color: 'warning',
				});
				this.events.push({
					title: 'Front-End Conference',
					start: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1),
					end: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 3, 23, 59, 59),
					color: 'danger',
				});
				this.events.push({
					title: 'Feedback',
					start: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 13),
					end: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 13, 23, 59, 59),
					color: 'success',
				});
			},
			eventsUpdate(events) {
				console.log('Events updated', events);
			},
		},
	};
</script>
