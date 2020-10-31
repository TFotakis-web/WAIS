<template>
	<div class="mdb-week-view">
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
					color="info"
					darkWaves
					@click.native="changeView('week')"
					>Week</mdb-btn
				>
				<mdb-btn
					outline="info"
					darkWaves
					@click.native="changeView('list')"
					>List</mdb-btn
				>
			</mdb-btn-group>
		</div>
		<table>
			<thead>
				<tr>
					<th></th>
					<th
						v-for="(weekDay, index) in dayNames"
						:key="index"
						:class="{
							'light-blue lighten-5':
								new Date(
									firstDay.getFullYear(),
									firstDay.getMonth(),
									firstDay.getDate() + index
								).toDateString() === new Date().toDateString(),
						}"
					>
						{{ weekDay }}
						{{
							new Date(
								firstDay.getFullYear(),
								firstDay.getMonth(),
								firstDay.getDate() + index
							).getMonth() + 1
						}}/{{
							new Date(
								firstDay.getFullYear(),
								firstDay.getMonth(),
								firstDay.getDate() + index
							).getDate()
						}}
					</th>
				</tr>
				<tr>
					<th class="text-center font-weight-bold">All day</th>
					<drop
						tag="td"
						v-for="(weekDay, index) in dayNames"
						:key="index"
						@click.native.stop="
							addAllDayEvent(
								$event,
								new Date(
									firstDay.getFullYear(),
									firstDay.getMonth(),
									firstDay.getDate() + index
								),
								new Date(
									firstDay.getFullYear(),
									firstDay.getMonth(),
									firstDay.getDate() + index,
									23,
									59,
									59
								)
							)
						"
						@drop="
							handleDrop(
								$event,
								new Date(
									firstDay.getFullYear(),
									firstDay.getMonth(),
									firstDay.getDate() + index
								)
							)
						"
						:class="[
							{
								'rgba-mdb-color-light':
									new Date(
										firstDay.getFullYear(),
										firstDay.getMonth(),
										firstDay.getDate() + index
									) >= newEventRangeStart &&
									new Date(
										firstDay.getFullYear(),
										firstDay.getMonth(),
										firstDay.getDate() + index
									) <= newEventRangeEnd,
								'light-blue lighten-5':
									new Date(
										firstDay.getFullYear(),
										firstDay.getMonth(),
										firstDay.getDate() + index
									).toDateString() ===
									new Date().toDateString(),
								'rgba-mdb-color-slight':
									new Date(
										firstDay.getFullYear(),
										firstDay.getMonth(),
										firstDay.getDate() + index
									).getDay() === 0 ||
									new Date(
										firstDay.getFullYear(),
										firstDay.getMonth(),
										firstDay.getDate() + index
									).getDay() === 6,
							},
							'pb-4',
						]"
						@mouseover.native="
							tdHover(
								new Date(
									firstDay.getFullYear(),
									firstDay.getMonth(),
									firstDay.getDate() + index
								)
							)
						"
					>
						<div
							v-for="(event, eventIndex) in events"
							:key="eventIndex"
						>
							<mdb-tooltip
								v-if="
									event.start <=
										new Date(
											firstDay.getFullYear(),
											firstDay.getMonth(),
											firstDay.getDate() + index
										) &&
									event.end >=
										new Date(
											firstDay.getFullYear(),
											firstDay.getMonth(),
											firstDay.getDate() + index,
											23,
											59,
											59
										)
								"
								:options="{ placement: 'top' }"
							>
								<div class="tooltip">
									<p class="mb-1 font-weight-bold">
										{{ event.title }}
									</p>
									<p
										v-if="
											event.start.toDateString() ===
												event.end.toDateString() &&
											event.start.toLocaleTimeString() ===
												'00:00:00' &&
											event.end.toLocaleTimeString() ===
												'23:59:59'
										"
										class="mb-0 small"
									>
										{{ event.start.toLocaleDateString() }}
									</p>
									<p v-else class="mb-0 small">
										<span
											v-if="
												event.start.toDateString() ===
												event.end.toDateString()
											"
										>
											<span
												v-if="
													event.start.toLocaleTimeString() ===
														'00:00:00' &&
													event.end.toLocaleTimeString() ===
														'23:59:59'
												"
												>{{
													event.start.toLocaleDateString()
												}}</span
											>
											<span v-else
												>{{
													event.start.toLocaleDateString()
												}},
												{{
													event.start.toLocaleTimeString()
												}}
												-
												{{
													event.end.toLocaleTimeString()
												}}</span
											>
										</span>
										<span v-else>
											<span
												v-if="
													event.start.toLocaleTimeString() ===
														'00:00:00' &&
													event.end.toLocaleTimeString() ===
														'23:59:59'
												"
												>{{
													event.start.toLocaleDateString()
												}}
												-
												{{
													event.end.toLocaleDateString()
												}}</span
											>
											<span v-else
												>{{
													event.start.toLocaleDateString()
												}},
												{{
													event.start.toLocaleTimeString()
												}}
												-
												{{
													event.end.toLocaleDateString()
												}},
												{{
													event.end.toLocaleTimeString()
												}}</span
											>
										</span>
									</p>
								</div>
								<drag
									:transfer-data="event"
									slot="reference"
									:class="
										eventClass(
											event,
											new Date(
												firstDay.getFullYear(),
												firstDay.getMonth(),
												firstDay.getDate() + index
											)
										)
									"
									@click.native.stop="editEvent(eventIndex)"
									>{{ event.title }}</drag
								>
							</mdb-tooltip>
						</div>
					</drop>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(hour, index) in timeline" :key="index">
					<th>{{ hour }}</th>
					<drop
						tag="td"
						@click.native.stop="
							addEvent(
								$event,
								new Date(
									firstDay.getFullYear(),
									firstDay.getMonth(),
									firstDay.getDate(),
									index
								)
							)
						"
						@drop="
							handleDrop(
								$event,
								new Date(
									firstDay.getFullYear(),
									firstDay.getMonth(),
									firstDay.getDate(),
									index
								)
							)
						"
						:class="[
							{
								'rgba-mdb-color-light':
									new Date(
										firstDay.getFullYear(),
										firstDay.getMonth(),
										firstDay.getDate(),
										index
									) >= newEventRangeStart &&
									new Date(
										firstDay.getFullYear(),
										firstDay.getMonth(),
										firstDay.getDate(),
										index
									) <= newEventRangeEnd,
								'light-blue lighten-5':
									new Date(
										firstDay.getFullYear(),
										firstDay.getMonth(),
										firstDay.getDate()
									).toDateString() ===
									new Date().toDateString(),
							},
							'rgba-mdb-color-slight',
						]"
						@mouseover.native="
							tdHover(
								new Date(
									firstDay.getFullYear(),
									firstDay.getMonth(),
									firstDay.getDate(),
									index
								)
							)
						"
					>
						<div
							v-for="(event, eventIndex) in events"
							:key="eventIndex"
						>
							<mdb-tooltip
								v-if="
									(event.start <=
										new Date(
											firstDay.getFullYear(),
											firstDay.getMonth(),
											firstDay.getDate(),
											index
										) &&
										event.end >=
											new Date(
												firstDay.getFullYear(),
												firstDay.getMonth(),
												firstDay.getDate(),
												index
											) &&
										event.start >
											new Date(
												firstDay.getFullYear(),
												firstDay.getMonth(),
												firstDay.getDate()
											)) ||
									(event.end >=
										new Date(
											firstDay.getFullYear(),
											firstDay.getMonth(),
											firstDay.getDate(),
											index
										) &&
										event.start <=
											new Date(
												firstDay.getFullYear(),
												firstDay.getMonth(),
												firstDay.getDate(),
												index
											) &&
										event.end <
											new Date(
												firstDay.getFullYear(),
												firstDay.getMonth(),
												firstDay.getDate(),
												23,
												59,
												59
											))
								"
								:options="{ placement: 'top' }"
							>
								<div class="tooltip">
									<p class="mb-1 font-weight-bold">
										{{ event.title }}
									</p>
									<p
										v-if="
											event.start.toDateString() ===
												event.end.toDateString() &&
											event.start.toLocaleTimeString() ===
												'00:00:00' &&
											event.end.toLocaleTimeString() ===
												'23:59:59'
										"
										class="mb-0 small"
									>
										{{ event.start.toLocaleDateString() }}
									</p>
									<p v-else class="mb-0 small">
										<span
											v-if="
												event.start.toDateString() ===
												event.end.toDateString()
											"
										>
											<span
												v-if="
													event.start.toLocaleTimeString() ===
														'00:00:00' &&
													event.end.toLocaleTimeString() ===
														'23:59:59'
												"
												>{{
													event.start.toLocaleDateString()
												}}</span
											>
											<span v-else
												>{{
													event.start.toLocaleDateString()
												}},
												{{
													event.start.toLocaleTimeString()
												}}
												-
												{{
													event.end.toLocaleTimeString()
												}}</span
											>
										</span>
										<span v-else>
											<span
												v-if="
													event.start.toLocaleTimeString() ===
														'00:00:00' &&
													event.end.toLocaleTimeString() ===
														'23:59:59'
												"
												>{{
													event.start.toLocaleDateString()
												}}
												-
												{{
													event.end.toLocaleDateString()
												}}</span
											>
											<span v-else
												>{{
													event.start.toLocaleDateString()
												}},
												{{
													event.start.toLocaleTimeString()
												}}
												-
												{{
													event.end.toLocaleDateString()
												}},
												{{
													event.end.toLocaleTimeString()
												}}</span
											>
										</span>
									</p>
								</div>
								<drag
									:transfer-data="event"
									slot="reference"
									:class="
										timeEventClass(
											event,
											new Date(
												firstDay.getFullYear(),
												firstDay.getMonth(),
												firstDay.getDate() + 0,
												index
											)
										)
									"
									@click.native.stop="editEvent(eventIndex)"
								>
									<span>{{ event.title }}</span>
								</drag>
							</mdb-tooltip>
						</div>
					</drop>
					<drop
						tag="td"
						@click.native.stop="
							addEvent(
								$event,
								new Date(
									firstDay.getFullYear(),
									firstDay.getMonth(),
									firstDay.getDate() + 1,
									index
								)
							)
						"
						@drop="
							handleDrop(
								$event,
								new Date(
									firstDay.getFullYear(),
									firstDay.getMonth(),
									firstDay.getDate() + 1,
									index
								)
							)
						"
						:class="[
							{
								'rgba-mdb-color-light':
									new Date(
										firstDay.getFullYear(),
										firstDay.getMonth(),
										firstDay.getDate() + 1,
										index
									) >= newEventRangeStart &&
									new Date(
										firstDay.getFullYear(),
										firstDay.getMonth(),
										firstDay.getDate() + 1,
										index
									) <= newEventRangeEnd,
								'light-blue lighten-5':
									new Date(
										firstDay.getFullYear(),
										firstDay.getMonth(),
										firstDay.getDate() + 1
									).toDateString() ===
									new Date().toDateString(),
							},
						]"
						@mouseover.native="
							tdHover(
								new Date(
									firstDay.getFullYear(),
									firstDay.getMonth(),
									firstDay.getDate() + 1,
									index
								)
							)
						"
					>
						<div
							v-for="(event, eventIndex) in events"
							:key="eventIndex"
						>
							<mdb-tooltip
								v-if="
									(event.start <=
										new Date(
											firstDay.getFullYear(),
											firstDay.getMonth(),
											firstDay.getDate() + 1,
											index
										) &&
										event.end >=
											new Date(
												firstDay.getFullYear(),
												firstDay.getMonth(),
												firstDay.getDate() + 1,
												index
											) &&
										event.start >
											new Date(
												firstDay.getFullYear(),
												firstDay.getMonth(),
												firstDay.getDate() + 1
											)) ||
									(event.end >=
										new Date(
											firstDay.getFullYear(),
											firstDay.getMonth(),
											firstDay.getDate() + 1,
											index
										) &&
										event.start <=
											new Date(
												firstDay.getFullYear(),
												firstDay.getMonth(),
												firstDay.getDate() + 1,
												index
											) &&
										event.end <
											new Date(
												firstDay.getFullYear(),
												firstDay.getMonth(),
												firstDay.getDate() + 1,
												23,
												59,
												59
											))
								"
								:options="{ placement: 'top' }"
							>
								<div class="tooltip">
									<p class="mb-1 font-weight-bold">
										{{ event.title }}
									</p>
									<p
										v-if="
											event.start.toDateString() ===
												event.end.toDateString() &&
											event.start.toLocaleTimeString() ===
												'00:00:00' &&
											event.end.toLocaleTimeString() ===
												'23:59:59'
										"
										class="mb-0 small"
									>
										{{ event.start.toLocaleDateString() }}
									</p>
									<p v-else class="mb-0 small">
										<span
											v-if="
												event.start.toDateString() ===
												event.end.toDateString()
											"
										>
											<span
												v-if="
													event.start.toLocaleTimeString() ===
														'00:00:00' &&
													event.end.toLocaleTimeString() ===
														'23:59:59'
												"
												>{{
													event.start.toLocaleDateString()
												}}</span
											>
											<span v-else
												>{{
													event.start.toLocaleDateString()
												}},
												{{
													event.start.toLocaleTimeString()
												}}
												-
												{{
													event.end.toLocaleTimeString()
												}}</span
											>
										</span>
										<span v-else>
											<span
												v-if="
													event.start.toLocaleTimeString() ===
														'00:00:00' &&
													event.end.toLocaleTimeString() ===
														'23:59:59'
												"
												>{{
													event.start.toLocaleDateString()
												}}
												-
												{{
													event.end.toLocaleDateString()
												}}</span
											>
											<span v-else
												>{{
													event.start.toLocaleDateString()
												}},
												{{
													event.start.toLocaleTimeString()
												}}
												-
												{{
													event.end.toLocaleDateString()
												}},
												{{
													event.end.toLocaleTimeString()
												}}</span
											>
										</span>
									</p>
								</div>
								<drag
									:transfer-data="event"
									slot="reference"
									:class="
										timeEventClass(
											event,
											new Date(
												firstDay.getFullYear(),
												firstDay.getMonth(),
												firstDay.getDate() + 1,
												index
											)
										)
									"
									@click.native.stop="editEvent(eventIndex)"
								>
									<span>{{ event.title }}</span>
								</drag>
							</mdb-tooltip>
						</div>
					</drop>
					<drop
						tag="td"
						@click.native.stop="
							addEvent(
								$event,
								new Date(
									firstDay.getFullYear(),
									firstDay.getMonth(),
									firstDay.getDate() + 2,
									index
								)
							)
						"
						@drop="
							handleDrop(
								$event,
								new Date(
									firstDay.getFullYear(),
									firstDay.getMonth(),
									firstDay.getDate() + 2,
									index
								)
							)
						"
						:class="[
							{
								'rgba-mdb-color-light':
									new Date(
										firstDay.getFullYear(),
										firstDay.getMonth(),
										firstDay.getDate() + 2,
										index
									) >= newEventRangeStart &&
									new Date(
										firstDay.getFullYear(),
										firstDay.getMonth(),
										firstDay.getDate() + 2,
										index
									) <= newEventRangeEnd,
								'light-blue lighten-5':
									new Date(
										firstDay.getFullYear(),
										firstDay.getMonth(),
										firstDay.getDate() + 2
									).toDateString() ===
									new Date().toDateString(),
							},
						]"
						@mouseover.native="
							tdHover(
								new Date(
									firstDay.getFullYear(),
									firstDay.getMonth(),
									firstDay.getDate() + 2,
									index
								)
							)
						"
					>
						<div
							v-for="(event, eventIndex) in events"
							:key="eventIndex"
						>
							<mdb-tooltip
								v-if="
									(event.start <=
										new Date(
											firstDay.getFullYear(),
											firstDay.getMonth(),
											firstDay.getDate() + 2,
											index
										) &&
										event.end >=
											new Date(
												firstDay.getFullYear(),
												firstDay.getMonth(),
												firstDay.getDate() + 2,
												index
											) &&
										event.start >
											new Date(
												firstDay.getFullYear(),
												firstDay.getMonth(),
												firstDay.getDate() + 2
											)) ||
									(event.end >=
										new Date(
											firstDay.getFullYear(),
											firstDay.getMonth(),
											firstDay.getDate() + 2,
											index
										) &&
										event.start <=
											new Date(
												firstDay.getFullYear(),
												firstDay.getMonth(),
												firstDay.getDate() + 2,
												index
											) &&
										event.end <
											new Date(
												firstDay.getFullYear(),
												firstDay.getMonth(),
												firstDay.getDate() + 2,
												23,
												59,
												59
											))
								"
								:options="{ placement: 'top' }"
							>
								<div class="tooltip">
									<p class="mb-1 font-weight-bold">
										{{ event.title }}
									</p>
									<p
										v-if="
											event.start.toDateString() ===
												event.end.toDateString() &&
											event.start.toLocaleTimeString() ===
												'00:00:00' &&
											event.end.toLocaleTimeString() ===
												'23:59:59'
										"
										class="mb-0 small"
									>
										{{ event.start.toLocaleDateString() }}
									</p>
									<p v-else class="mb-0 small">
										<span
											v-if="
												event.start.toDateString() ===
												event.end.toDateString()
											"
										>
											<span
												v-if="
													event.start.toLocaleTimeString() ===
														'00:00:00' &&
													event.end.toLocaleTimeString() ===
														'23:59:59'
												"
												>{{
													event.start.toLocaleDateString()
												}}</span
											>
											<span v-else
												>{{
													event.start.toLocaleDateString()
												}},
												{{
													event.start.toLocaleTimeString()
												}}
												-
												{{
													event.end.toLocaleTimeString()
												}}</span
											>
										</span>
										<span v-else>
											<span
												v-if="
													event.start.toLocaleTimeString() ===
														'00:00:00' &&
													event.end.toLocaleTimeString() ===
														'23:59:59'
												"
												>{{
													event.start.toLocaleDateString()
												}}
												-
												{{
													event.end.toLocaleDateString()
												}}</span
											>
											<span v-else
												>{{
													event.start.toLocaleDateString()
												}},
												{{
													event.start.toLocaleTimeString()
												}}
												-
												{{
													event.end.toLocaleDateString()
												}},
												{{
													event.end.toLocaleTimeString()
												}}</span
											>
										</span>
									</p>
								</div>
								<drag
									:transfer-data="event"
									slot="reference"
									:class="
										timeEventClass(
											event,
											new Date(
												firstDay.getFullYear(),
												firstDay.getMonth(),
												firstDay.getDate() + 2,
												index
											)
										)
									"
									@click.native.stop="editEvent(eventIndex)"
								>
									<span>{{ event.title }}</span>
								</drag>
							</mdb-tooltip>
						</div>
					</drop>
					<drop
						tag="td"
						@click.native.stop="
							addEvent(
								$event,
								new Date(
									firstDay.getFullYear(),
									firstDay.getMonth(),
									firstDay.getDate() + 3,
									index
								)
							)
						"
						@drop="
							handleDrop(
								$event,
								new Date(
									firstDay.getFullYear(),
									firstDay.getMonth(),
									firstDay.getDate() + 3,
									index
								)
							)
						"
						:class="[
							{
								'rgba-mdb-color-light':
									new Date(
										firstDay.getFullYear(),
										firstDay.getMonth(),
										firstDay.getDate() + 3,
										index
									) >= newEventRangeStart &&
									new Date(
										firstDay.getFullYear(),
										firstDay.getMonth(),
										firstDay.getDate() + 3,
										index
									) <= newEventRangeEnd,
								'light-blue lighten-5':
									new Date(
										firstDay.getFullYear(),
										firstDay.getMonth(),
										firstDay.getDate() + 3
									).toDateString() ===
									new Date().toDateString(),
							},
						]"
						@mouseover.native="
							tdHover(
								new Date(
									firstDay.getFullYear(),
									firstDay.getMonth(),
									firstDay.getDate() + 3,
									index
								)
							)
						"
					>
						<div
							v-for="(event, eventIndex) in events"
							:key="eventIndex"
						>
							<mdb-tooltip
								v-if="
									(event.start <=
										new Date(
											firstDay.getFullYear(),
											firstDay.getMonth(),
											firstDay.getDate() + 3,
											index
										) &&
										event.end >=
											new Date(
												firstDay.getFullYear(),
												firstDay.getMonth(),
												firstDay.getDate() + 3,
												index
											) &&
										event.start >
											new Date(
												firstDay.getFullYear(),
												firstDay.getMonth(),
												firstDay.getDate() + 3
											)) ||
									(event.end >=
										new Date(
											firstDay.getFullYear(),
											firstDay.getMonth(),
											firstDay.getDate() + 3,
											index
										) &&
										event.start <=
											new Date(
												firstDay.getFullYear(),
												firstDay.getMonth(),
												firstDay.getDate() + 3,
												index
											) &&
										event.end <
											new Date(
												firstDay.getFullYear(),
												firstDay.getMonth(),
												firstDay.getDate() + 3,
												23,
												59,
												59
											))
								"
								:options="{ placement: 'top' }"
							>
								<div class="tooltip">
									<p class="mb-1 font-weight-bold">
										{{ event.title }}
									</p>
									<p
										v-if="
											event.start.toDateString() ===
												event.end.toDateString() &&
											event.start.toLocaleTimeString() ===
												'00:00:00' &&
											event.end.toLocaleTimeString() ===
												'23:59:59'
										"
										class="mb-0 small"
									>
										{{ event.start.toLocaleDateString() }}
									</p>
									<p v-else class="mb-0 small">
										<span
											v-if="
												event.start.toDateString() ===
												event.end.toDateString()
											"
										>
											<span
												v-if="
													event.start.toLocaleTimeString() ===
														'00:00:00' &&
													event.end.toLocaleTimeString() ===
														'23:59:59'
												"
												>{{
													event.start.toLocaleDateString()
												}}</span
											>
											<span v-else
												>{{
													event.start.toLocaleDateString()
												}},
												{{
													event.start.toLocaleTimeString()
												}}
												-
												{{
													event.end.toLocaleTimeString()
												}}</span
											>
										</span>
										<span v-else>
											<span
												v-if="
													event.start.toLocaleTimeString() ===
														'00:00:00' &&
													event.end.toLocaleTimeString() ===
														'23:59:59'
												"
												>{{
													event.start.toLocaleDateString()
												}}
												-
												{{
													event.end.toLocaleDateString()
												}}</span
											>
											<span v-else
												>{{
													event.start.toLocaleDateString()
												}},
												{{
													event.start.toLocaleTimeString()
												}}
												-
												{{
													event.end.toLocaleDateString()
												}},
												{{
													event.end.toLocaleTimeString()
												}}</span
											>
										</span>
									</p>
								</div>
								<drag
									:transfer-data="event"
									slot="reference"
									:class="
										timeEventClass(
											event,
											new Date(
												firstDay.getFullYear(),
												firstDay.getMonth(),
												firstDay.getDate() + 3,
												index
											)
										)
									"
									@click.native.stop="editEvent(eventIndex)"
								>
									<span>{{ event.title }}</span>
								</drag>
							</mdb-tooltip>
						</div>
					</drop>
					<drop
						tag="td"
						@click.native.stop="
							addEvent(
								$event,
								new Date(
									firstDay.getFullYear(),
									firstDay.getMonth(),
									firstDay.getDate() + 4,
									index
								)
							)
						"
						@drop="
							handleDrop(
								$event,
								new Date(
									firstDay.getFullYear(),
									firstDay.getMonth(),
									firstDay.getDate() + 4,
									index
								)
							)
						"
						:class="[
							{
								'rgba-mdb-color-light':
									new Date(
										firstDay.getFullYear(),
										firstDay.getMonth(),
										firstDay.getDate() + 4,
										index
									) >= newEventRangeStart &&
									new Date(
										firstDay.getFullYear(),
										firstDay.getMonth(),
										firstDay.getDate() + 4,
										index
									) <= newEventRangeEnd,
								'light-blue lighten-5':
									new Date(
										firstDay.getFullYear(),
										firstDay.getMonth(),
										firstDay.getDate() + 4
									).toDateString() ===
									new Date().toDateString(),
							},
						]"
						@mouseover.native="
							tdHover(
								new Date(
									firstDay.getFullYear(),
									firstDay.getMonth(),
									firstDay.getDate() + 4,
									index
								)
							)
						"
					>
						<div
							v-for="(event, eventIndex) in events"
							:key="eventIndex"
						>
							<mdb-tooltip
								v-if="
									(event.start <=
										new Date(
											firstDay.getFullYear(),
											firstDay.getMonth(),
											firstDay.getDate() + 4,
											index
										) &&
										event.end >=
											new Date(
												firstDay.getFullYear(),
												firstDay.getMonth(),
												firstDay.getDate() + 4,
												index
											) &&
										event.start >
											new Date(
												firstDay.getFullYear(),
												firstDay.getMonth(),
												firstDay.getDate() + 4
											)) ||
									(event.end >=
										new Date(
											firstDay.getFullYear(),
											firstDay.getMonth(),
											firstDay.getDate() + 4,
											index
										) &&
										event.start <=
											new Date(
												firstDay.getFullYear(),
												firstDay.getMonth(),
												firstDay.getDate() + 4,
												index
											) &&
										event.end <
											new Date(
												firstDay.getFullYear(),
												firstDay.getMonth(),
												firstDay.getDate() + 4,
												23,
												59,
												59
											))
								"
								:options="{ placement: 'top' }"
							>
								<div class="tooltip">
									<p class="mb-1 font-weight-bold">
										{{ event.title }}
									</p>
									<p
										v-if="
											event.start.toDateString() ===
												event.end.toDateString() &&
											event.start.toLocaleTimeString() ===
												'00:00:00' &&
											event.end.toLocaleTimeString() ===
												'23:59:59'
										"
										class="mb-0 small"
									>
										{{ event.start.toLocaleDateString() }}
									</p>
									<p v-else class="mb-0 small">
										<span
											v-if="
												event.start.toDateString() ===
												event.end.toDateString()
											"
										>
											<span
												v-if="
													event.start.toLocaleTimeString() ===
														'00:00:00' &&
													event.end.toLocaleTimeString() ===
														'23:59:59'
												"
												>{{
													event.start.toLocaleDateString()
												}}</span
											>
											<span v-else
												>{{
													event.start.toLocaleDateString()
												}},
												{{
													event.start.toLocaleTimeString()
												}}
												-
												{{
													event.end.toLocaleTimeString()
												}}</span
											>
										</span>
										<span v-else>
											<span
												v-if="
													event.start.toLocaleTimeString() ===
														'00:00:00' &&
													event.end.toLocaleTimeString() ===
														'23:59:59'
												"
												>{{
													event.start.toLocaleDateString()
												}}
												-
												{{
													event.end.toLocaleDateString()
												}}</span
											>
											<span v-else
												>{{
													event.start.toLocaleDateString()
												}},
												{{
													event.start.toLocaleTimeString()
												}}
												-
												{{
													event.end.toLocaleDateString()
												}},
												{{
													event.end.toLocaleTimeString()
												}}</span
											>
										</span>
									</p>
								</div>
								<drag
									:transfer-data="event"
									slot="reference"
									:class="
										timeEventClass(
											event,
											new Date(
												firstDay.getFullYear(),
												firstDay.getMonth(),
												firstDay.getDate() + 4,
												index
											)
										)
									"
									@click.native.stop="editEvent(eventIndex)"
								>
									<span>{{ event.title }}</span>
								</drag>
							</mdb-tooltip>
						</div>
					</drop>
					<drop
						tag="td"
						@click.native.stop="
							addEvent(
								$event,
								new Date(
									firstDay.getFullYear(),
									firstDay.getMonth(),
									firstDay.getDate() + 5,
									index
								)
							)
						"
						@drop="
							handleDrop(
								$event,
								new Date(
									firstDay.getFullYear(),
									firstDay.getMonth(),
									firstDay.getDate() + 5,
									index
								)
							)
						"
						:class="[
							{
								'rgba-mdb-color-light':
									new Date(
										firstDay.getFullYear(),
										firstDay.getMonth(),
										firstDay.getDate() + 5,
										index
									) >= newEventRangeStart &&
									new Date(
										firstDay.getFullYear(),
										firstDay.getMonth(),
										firstDay.getDate() + 5,
										index
									) <= newEventRangeEnd,
								'light-blue lighten-5':
									new Date(
										firstDay.getFullYear(),
										firstDay.getMonth(),
										firstDay.getDate() + 5
									).toDateString() ===
									new Date().toDateString(),
							},
						]"
						@mouseover.native="
							tdHover(
								new Date(
									firstDay.getFullYear(),
									firstDay.getMonth(),
									firstDay.getDate() + 5,
									index
								)
							)
						"
					>
						<div
							v-for="(event, eventIndex) in events"
							:key="eventIndex"
						>
							<mdb-tooltip
								v-if="
									(event.start <=
										new Date(
											firstDay.getFullYear(),
											firstDay.getMonth(),
											firstDay.getDate() + 5,
											index
										) &&
										event.end >=
											new Date(
												firstDay.getFullYear(),
												firstDay.getMonth(),
												firstDay.getDate() + 5,
												index
											) &&
										event.start >
											new Date(
												firstDay.getFullYear(),
												firstDay.getMonth(),
												firstDay.getDate() + 5
											)) ||
									(event.end >=
										new Date(
											firstDay.getFullYear(),
											firstDay.getMonth(),
											firstDay.getDate() + 5,
											index
										) &&
										event.start <=
											new Date(
												firstDay.getFullYear(),
												firstDay.getMonth(),
												firstDay.getDate() + 5,
												index
											) &&
										event.end <
											new Date(
												firstDay.getFullYear(),
												firstDay.getMonth(),
												firstDay.getDate() + 5,
												23,
												59,
												59
											))
								"
								:options="{ placement: 'top' }"
							>
								<div class="tooltip">
									<p class="mb-1 font-weight-bold">
										{{ event.title }}
									</p>
									<p
										v-if="
											event.start.toDateString() ===
												event.end.toDateString() &&
											event.start.toLocaleTimeString() ===
												'00:00:00' &&
											event.end.toLocaleTimeString() ===
												'23:59:59'
										"
										class="mb-0 small"
									>
										{{ event.start.toLocaleDateString() }}
									</p>
									<p v-else class="mb-0 small">
										<span
											v-if="
												event.start.toDateString() ===
												event.end.toDateString()
											"
										>
											<span
												v-if="
													event.start.toLocaleTimeString() ===
														'00:00:00' &&
													event.end.toLocaleTimeString() ===
														'23:59:59'
												"
												>{{
													event.start.toLocaleDateString()
												}}</span
											>
											<span v-else
												>{{
													event.start.toLocaleDateString()
												}},
												{{
													event.start.toLocaleTimeString()
												}}
												-
												{{
													event.end.toLocaleTimeString()
												}}</span
											>
										</span>
										<span v-else>
											<span
												v-if="
													event.start.toLocaleTimeString() ===
														'00:00:00' &&
													event.end.toLocaleTimeString() ===
														'23:59:59'
												"
												>{{
													event.start.toLocaleDateString()
												}}
												-
												{{
													event.end.toLocaleDateString()
												}}</span
											>
											<span v-else
												>{{
													event.start.toLocaleDateString()
												}},
												{{
													event.start.toLocaleTimeString()
												}}
												-
												{{
													event.end.toLocaleDateString()
												}},
												{{
													event.end.toLocaleTimeString()
												}}</span
											>
										</span>
									</p>
								</div>
								<drag
									:transfer-data="event"
									slot="reference"
									:class="
										timeEventClass(
											event,
											new Date(
												firstDay.getFullYear(),
												firstDay.getMonth(),
												firstDay.getDate() + 5,
												index
											)
										)
									"
									@click.native.stop="editEvent(eventIndex)"
								>
									<span>{{ event.title }}</span>
								</drag>
							</mdb-tooltip>
						</div>
					</drop>
					<drop
						tag="td"
						@click.native.stop="
							addEvent(
								$event,
								new Date(
									firstDay.getFullYear(),
									firstDay.getMonth(),
									firstDay.getDate() + 6,
									index
								)
							)
						"
						@drop="
							handleDrop(
								$event,
								new Date(
									firstDay.getFullYear(),
									firstDay.getMonth(),
									firstDay.getDate() + 6,
									index
								)
							)
						"
						:class="[
							{
								'rgba-mdb-color-light':
									new Date(
										firstDay.getFullYear(),
										firstDay.getMonth(),
										firstDay.getDate() + 6,
										index
									) >= newEventRangeStart &&
									new Date(
										firstDay.getFullYear(),
										firstDay.getMonth(),
										firstDay.getDate() + 6,
										index
									) <= newEventRangeEnd,
								'light-blue lighten-5':
									new Date(
										firstDay.getFullYear(),
										firstDay.getMonth(),
										firstDay.getDate() + 6
									).toDateString() ===
									new Date().toDateString(),
							},
							'rgba-mdb-color-slight',
						]"
						@mouseover.native="
							tdHover(
								new Date(
									firstDay.getFullYear(),
									firstDay.getMonth(),
									firstDay.getDate() + 6,
									index
								)
							)
						"
					>
						<div
							v-for="(event, eventIndex) in events"
							:key="eventIndex"
						>
							<mdb-tooltip
								v-if="
									(event.start <=
										new Date(
											firstDay.getFullYear(),
											firstDay.getMonth(),
											firstDay.getDate() + 6,
											index
										) &&
										event.end >=
											new Date(
												firstDay.getFullYear(),
												firstDay.getMonth(),
												firstDay.getDate() + 6,
												index
											) &&
										event.start >
											new Date(
												firstDay.getFullYear(),
												firstDay.getMonth(),
												firstDay.getDate() + 6
											)) ||
									(event.end >=
										new Date(
											firstDay.getFullYear(),
											firstDay.getMonth(),
											firstDay.getDate() + 6,
											index
										) &&
										event.start <=
											new Date(
												firstDay.getFullYear(),
												firstDay.getMonth(),
												firstDay.getDate() + 6,
												index
											) &&
										event.end <
											new Date(
												firstDay.getFullYear(),
												firstDay.getMonth(),
												firstDay.getDate() + 6,
												23,
												59,
												59
											))
								"
								:options="{ placement: 'top' }"
							>
								<div class="tooltip">
									<p class="mb-1 font-weight-bold">
										{{ event.title }}
									</p>
									<p
										v-if="
											event.start.toDateString() ===
												event.end.toDateString() &&
											event.start.toLocaleTimeString() ===
												'00:00:00' &&
											event.end.toLocaleTimeString() ===
												'23:59:59'
										"
										class="mb-0 small"
									>
										{{ event.start.toLocaleDateString() }}
									</p>
									<p v-else class="mb-0 small">
										<span
											v-if="
												event.start.toDateString() ===
												event.end.toDateString()
											"
										>
											<span
												v-if="
													event.start.toLocaleTimeString() ===
														'00:00:00' &&
													event.end.toLocaleTimeString() ===
														'23:59:59'
												"
												>{{
													event.start.toLocaleDateString()
												}}</span
											>
											<span v-else
												>{{
													event.start.toLocaleDateString()
												}},
												{{
													event.start.toLocaleTimeString()
												}}
												-
												{{
													event.end.toLocaleTimeString()
												}}</span
											>
										</span>
										<span v-else>
											<span
												v-if="
													event.start.toLocaleTimeString() ===
														'00:00:00' &&
													event.end.toLocaleTimeString() ===
														'23:59:59'
												"
												>{{
													event.start.toLocaleDateString()
												}}
												-
												{{
													event.end.toLocaleDateString()
												}}</span
											>
											<span v-else
												>{{
													event.start.toLocaleDateString()
												}},
												{{
													event.start.toLocaleTimeString()
												}}
												-
												{{
													event.end.toLocaleDateString()
												}},
												{{
													event.end.toLocaleTimeString()
												}}</span
											>
										</span>
									</p>
								</div>
								<drag
									:transfer-data="event"
									slot="reference"
									:class="
										timeEventClass(
											event,
											new Date(
												firstDay.getFullYear(),
												firstDay.getMonth(),
												firstDay.getDate() + 6,
												index
											)
										)
									"
									@click.native.stop="editEvent(eventIndex)"
								>
									<span>{{ event.title }}</span>
								</drag>
							</mdb-tooltip>
						</div>
					</drop>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import { Drag, Drop } from "vue-drag-drop";

const mdbWeekView = {
	name: "mdbWeekView",
	components: {
		Drag,
		Drop
	},
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
			title: null,
			timeline: [],
			ctrl: false,
			newEventRangeStart: false,
			newEventRangeEnd: false
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
		let i = 0;
		for (i; i < 24; i++) this.timeline.push(i + ":00");
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
		eventClass(event, day) {
			return [
				"mdb-event text-white small px-1",
				event.color ? "bg-" + event.color : "bg-info",
				event.start.toDateString() === day.toDateString() &&
					event.start.toDateString() === event.end.toDateString() ? "mdb-event-single" : day.getDay() === 0 && event.start.getDay() !== 0 ? "mdb-event-continuation" : event.start < day ? new Date(
						event.end.getFullYear(),
						event.end.getMonth(),
						event.end.getDate(),
						event.end.getHours(),
						event.end.getMinutes(),
						event.end.getSeconds()
					) > new Date(
						day.getFullYear(),
						day.getMonth(),
						day.getDate(),
						23,
						59,
						59
					) ? "mdb-event-long" : "mdb-event-end" : "mdb-event-start"
			];
		},
		timeEventClass(event, date) {
			return [
				"mdb-event text-white small px-1",
				event.color ? "bg-" + event.color : "bg-info",
				event.start.getTime() === date.getTime() &&
				event.end <
				new Date(
					event.start.getFullYear(),
					event.start.getMonth(),
					event.start.getDate(),
					event.start.getHours() + 1
				) &&
				"mdb-vertical-single-event",
				event.start.getTime() === date.getTime() &&
				event.end >=
				new Date(
					event.start.getFullYear(),
					event.start.getMonth(),
					event.start.getDate(),
					event.start.getHours() + 1
				) &&
				"mdb-vertical-event-start",
				event.start.getTime() !== date.getTime() &&
				event.end <
				new Date(
					date.getFullYear(),
					date.getMonth(),
					date.getDate(),
					date.getHours() + 1
				) &&
				"mdb-vertical-event-end",
				event.start.getTime() < date.getTime() &&
				event.end >
				new Date(
					date.getFullYear(),
					date.getMonth(),
					date.getDate(),
					date.getHours() + 1
				) &&
				"mdb-vertical-event-long"
			];
		},
		editEvent(eventIndex) {
			this.$emit("editEvent", eventIndex);
		},
		addEvent(event, date) {
			if (event.ctrlKey && this.ctrl) {
				this.ctrl = false;
				this.$emit(
					"addEvent",
					this.newEventRangeStart,
					new Date(
						date.getFullYear(),
						date.getMonth(),
						date.getDate(),
						date.getHours(),
						date.getMinutes() + 59,
						date.getSeconds() + 59
					)
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
					"addEvent",
					date,
					new Date(
						date.getFullYear(),
						date.getMonth(),
						date.getDate(),
						date.getHours(),
						date.getMinutes() + 59,
						date.getSeconds() + 59
					)
				);
			}
		},
		addAllDayEvent(event, start, end) {
			if (event.ctrlKey && this.ctrl) {
				this.ctrl = false;
				this.$emit("addEvent", this.newEventRangeStart, end);
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
				this.$emit("addEvent", start, end);
			}
		},
		tdHover(date) {
			if (this.ctrl) this.newEventRangeEnd = date;
		},
		handleDrop(event, day) {
			let length = event.end.getTime() - event.start.getTime();
			event.start = day;
			event.end = new Date(day.getTime() + length);
			this.$emit("eventsUpdate", this.events);
		}
	},
	watch: {
		defaultDate(newVal) {
			this.date = newVal;
		}
	}
};

export default mdbWeekView;
export { mdbWeekView };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mdb-week-view {
	width: 100%;
	height: 100%;
	/* margin-bottom: 50px; */
}
.mdb-week-view table {
	table-layout: fixed;
	width: 100%;
}
.mdb-week-view table th,
.mdb-week-view table td {
	border: 1px solid #ddd;
}
.mdb-week-view table thead tr:last-child {
	border-bottom: 5px solid #ddd;
}
.mdb-week-view table th {
	text-align: center;
	height: 30px;
	font-weight: bold;
}
.mdb-week-view table td {
	vertical-align: top;
	position: relative;
	cursor: pointer;
}
.mdb-week-view table td:hover {
	background-color: rgba(69, 82, 110, 0.05) !important;
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
