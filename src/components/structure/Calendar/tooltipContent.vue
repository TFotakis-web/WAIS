<template>
	<div>
		<p class="mb-1 font-weight-bold">{{ event.title }}</p>
		<p class="mb-0 small">
			<span v-if="!isAllDayEvent(event) && !isSingleDayEvent(event)">
				{{ event.start }} - {{ event.end }}
				<!-- {{ event.start | moment('DD/MM/YYYY HH:mm') }} - {{ event.end | moment('DD/MM/YYYY HH:mm') }} -->
			</span>
			<span v-else-if="!isAllDayEvent(event) && isSingleDayEvent(event)">
				{{ event.start }} - {{ event.end }}
				<!-- {{ event.start | moment('DD/MM/YYYY HH:mm') }} - {{ event.end | moment('HH:mm') }} -->
			</span>
			<span v-else-if="isAllDayEvent(event) && !isSingleDayEvent(event)">
				{{ event.start }} - {{ event.end }}
				<!-- {{ event.start | moment('DD/MM/YYYY') }} - {{ event.end | moment('DD/MM/YYYY') }} -->
			</span>
			<span v-else-if="isAllDayEvent(event) && isSingleDayEvent(event)">
				{{ event.start }}
				<!-- {{ event.start | moment('DD/MM/YYYY') }} -->
			</span>
		</p>
	</div>
</template>
<script>
	export default {
		name: 'tooltipContent',
		props: {
			event: {
				type: Object,
				default: () => {
				},
			},
		},
		methods: {
			isAllDayEvent(event) {
				const startTime = this.$moment(event.start).format('HH:mm:ss');
				const endTime = this.$moment(event.end).format('HH:mm:ss');
				return startTime === '00:00:00' && endTime === '23:59:59';
			},
			isSingleDayEvent(event) {
				const startDate = this.$moment(event.start).format('YYYYMMDD');
				const endDate = this.$moment(event.end).format('YYYYMMDD');
				return startDate === endDate;
			},
		},
	};
</script>
