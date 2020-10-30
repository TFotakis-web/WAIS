<template>
	<div class="text-center pt-5">
		<h1>{{ $t("Home page") }}</h1>
		<h5 class="text-info">{{ $t("Under Construction") }}</h5>

		<mdb-container>
			<mdbCalendar :events="events" />
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
			]
		}
	}
};
</script>
