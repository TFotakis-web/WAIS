<template>
	<div class="mdb-list-view">
		<div class="d-flex justify-content-between mb-3">
			<mdb-btn-group size="sm">
				<mdb-btn
					size="sm"
					outline="info"
					icon="chevron-left"
					darkWaves
					@click.native="changeWeek('prev')"
				></mdb-btn>
				<mdb-btn
					size="sm"
					outline="info"
					icon="chevron-right"
					darkWaves
					@click.native="changeWeek('next')"
				></mdb-btn>
				<mdb-btn
					class="px-3"
					outline="info"
					darkWaves
					@click.native="changeWeek('today')"
					>{{ todayText }}</mdb-btn
				>
			</mdb-btn-group>
			<h2>{{ title }}</h2>
			<mdb-btn-group>
				<mdb-btn
					outline="info"
					darkWaves
					@click.native="changeView('month')"
					>Month</mdb-btn
				>
				<mdb-btn
					outline="info"
					darkWaves
					@click.native="changeView('week')"
					>Week</mdb-btn
				>
				<mdb-btn
					color="info"
					darkWaves
					@click.native="changeView('list')"
					>List</mdb-btn
				>
			</mdb-btn-group>
		</div>
		<table>
			<tbody v-for="(event, index) in events" :key="index">
				<tr
					v-if="
						event.start <
							new Date(
								firstDay.getFullYear(),
								firstDay.getMonth(),
								firstDay.getDate() + 7
							) &&
						event.end >=
							new Date(
								firstDay.getFullYear(),
								firstDay.getMonth(),
								firstDay.getDate()
							)
					"
					class="grey lighten-4"
				>
					<th
						v-if="
							event.start.toDateString() ===
							event.end.toDateString()
						"
						class="font-weight-bold"
					>
						<mdb-icon icon="calendar-alt" class="pr-2" />
						{{ event.start.toLocaleDateString() }}
					</th>
					<th v-else class="font-weight-bold">
						<mdb-icon icon="calendar-alt" class="pr-2" />
						{{ event.start.toLocaleDateString() }} -
						{{ event.end.toLocaleDateString() }}
					</th>
					<th
						v-if="
							event.start.toLocaleTimeString() === '00:00:00' &&
							event.end.toLocaleTimeString() === '23:59:59'
						"
						class="text-right font-weight-bold"
					>
						<mdb-icon icon="clock" class="pr-1" />all-day
					</th>
					<th v-else class="text-right font-weight-bold">
						<mdb-icon icon="clock" class="pr-1" />
						{{ event.start.toLocaleTimeString() }} -
						{{ event.end.toLocaleTimeString() }}
					</th>
				</tr>
				<tr
					v-if="
						event.start <
							new Date(
								firstDay.getFullYear(),
								firstDay.getMonth(),
								firstDay.getDate() + 7
							) &&
						event.end >=
							new Date(
								firstDay.getFullYear(),
								firstDay.getMonth(),
								firstDay.getDate()
							)
					"
				>
					<td
						colspan="2"
						class="mdb-list-event"
						@click="editEvent(index)"
					>
						<mdb-icon
							icon="circle"
							:color="event.color"
							class="pr-2"
						/>
						{{ event.title }}
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
// import { mdbBtn } from "../../Components/Button";
// import { mdbBtnGroup } from "../../Components/ButtonGroup";
// import { mdbIcon } from "../../Content/Fa";

const mdbListView = {
	name: "mdbListView",
	// components: {
	// 	mdbBtn,
	// 	mdbBtnGroup,
	// 	mdbIcon
	// },
	props: {
		defaultDate: {
			type: Date
		},
		dayNames: {
			type: Array
		},
		monthNames: {
			type: Array
		},
		todayText: {
			type: String
		},
		events: {
			type: [Array, Boolean]
		}
	},
	data() {
		return {
			firstDay: null,
			lastDay: null,
			title: null
		};
	},
	created() {
		this.date = this.defaultDate;
		let currentDayOfWeek = this.date.getDay();
		this.firstDay = new Date(
			this.date.getFullYear(),
			this.date.getMonth(),
			this.date.getDate() - currentDayOfWeek
		);
		this.lastDay = new Date(
			this.date.getFullYear(),
			this.date.getMonth(),
			this.date.getDate() - currentDayOfWeek + 6
		);
		this.updateTitle();
	},
	methods: {
		changeView(view) {
			this.$emit("changeView", view);
		},
		updateTitle() {
			this.title =
				this.monthNames[this.firstDay.getMonth()] +
				" " +
				this.firstDay.getDate() +
				" - " +
				this.monthNames[this.lastDay.getMonth()] +
				" " +
				this.lastDay.getDate() +
				", " +
				this.date.getFullYear();
		},
		changeWeek(target) {
			if (target === "prev") {
				this.firstDay = new Date(
					this.firstDay.getFullYear(),
					this.firstDay.getMonth(),
					this.firstDay.getDate() - 7
				);
				this.lastDay = new Date(
					this.lastDay.getFullYear(),
					this.lastDay.getMonth(),
					this.lastDay.getDate() - 7
				);
				this.updateTitle();
				this.$emit("dateChange", this.firstDay);
			}
			if (target === "next") {
				this.firstDay = new Date(
					this.firstDay.getFullYear(),
					this.firstDay.getMonth(),
					this.firstDay.getDate() + 7
				);
				this.lastDay = new Date(
					this.lastDay.getFullYear(),
					this.lastDay.getMonth(),
					this.lastDay.getDate() + 7
				);
				this.updateTitle();
				this.$emit("dateChange", this.firstDay);
			}
			if (target === "today") {
				let currentDayOfWeek = new Date().getDay();
				this.firstDay = new Date(
					new Date().getFullYear(),
					new Date().getMonth(),
					new Date().getDate() - currentDayOfWeek
				);
				this.lastDay = new Date(
					new Date().getFullYear(),
					new Date().getMonth(),
					new Date().getDate() - currentDayOfWeek + 6
				);
				this.updateTitle();
				this.$emit("dateChange", this.firstDay);
			}
		},
		editEvent(eventIndex) {
			this.$emit("editEvent", eventIndex);
		}
	}
};

export default mdbListView;
export { mdbListView };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mdb-list-view {
	width: 100%;
	height: 100%;
	margin-bottom: 50px;
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
