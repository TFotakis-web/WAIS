<template>
	<mdb-card cascade narrow>
		<mdb-view cascade class="gradient-card-header blue">
			<h5 class="mb-0">News Feed</h5>
		</mdb-view>
		<mdb-card-body>
			<mdb-list-group :style="{'min-height': maxContentHeight + 'px', 'max-height': maxContentHeight + 'px'}" style="overflow-y: scroll">
				<mdb-list-group-item v-for="item in news" :key="'newsItems' + item.id.toString()">
					<div>
						<div class="d-flex w-100 justify-content-between">
							<h5 class="mb-2 h5">{{ item.heading }}</h5>
							<small>{{ item.releaseDate }}</small>
						</div>
						<p class="mb-2">{{ item.middleText }}</p>
						<small>{{ item.lowerText }}</small>
					</div>
				</mdb-list-group-item>
			</mdb-list-group>
		</mdb-card-body>
	</mdb-card>
</template>
<script>
export default {
	name: "newsfeedCard",
	props: {
		maxContentHeight: {
			type: Number,
			default: 300
		},
	},
	data() {
		return {
			news: []
		}
	},
	mounted() {
		this.getNews();
	},
	methods: {
		getNews() {
			this.news = [
				{
					id: 0,
					heading: 'List group item heading',
					releaseDate: '3 days ago',
					middleText: 'Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.',
					lowerText: 'Donec id elit non mi porta.',
				},
				{
					id: 1,
					heading: 'List group item heading',
					releaseDate: '3 days ago',
					middleText: 'Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.',
					lowerText: 'Donec id elit non mi porta.',
				},
				{
					id: 2,
					heading: 'List group item heading',
					releaseDate: '3 days ago',
					middleText: 'Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.',
					lowerText: 'Donec id elit non mi porta.',
				},
			];
		}
	},
}
</script>
