<template>
	<ion-card>
		<ion-card-header>
			<ion-card-title>News Feed</ion-card-title>
		</ion-card-header>
		<ion-card-content>
			<ion-list :style="{'min-height': maxContentHeight + 'px', 'max-height': maxContentHeight + 'px'}" style="overflow-y: scroll">
				<ion-item v-for="item in news" :key="'newsItems' + item.id.toString()">
					<ion-label class="ion-text-wrap ion-margin-vertical">
						<h3>{{ item.heading }}</h3>
						<small>{{ item.releaseDate }}</small>
						<p>{{ item.middleText }}</p>
						<small>{{ item.lowerText }}</small>
					</ion-label>
				</ion-item>
			</ion-list>
		</ion-card-content>
	</ion-card>
</template>
<script>
	export default {
		name: 'newsfeedCard',
		props: {
			maxContentHeight: {
				type: Number,
				default: 300,
			},
		},
		data() {
			return {
				news: [],
			};
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
					{
						id: 3,
						heading: 'List group item heading',
						releaseDate: '3 days ago',
						middleText: 'Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.',
						lowerText: 'Donec id elit non mi porta.',
					},
					{
						id: 4,
						heading: 'List group item heading',
						releaseDate: '3 days ago',
						middleText: 'Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.',
						lowerText: 'Donec id elit non mi porta.',
					},
				];
			},
		},
	};
</script>
