<template>
	<ion-card>
		<ion-item lines="full">
			<ion-card-title>{{ $t('views.Office.userManagementTableCard.cardTitle') }}</ion-card-title>
			<ion-button :router-link="{name: 'InviteUser'}" fill="clear" slot="end">
				<ion-icon :icon="$ionicons.addOutline" slot="start"/>
				<span>{{ $t('actions.invite') }}</span>
			</ion-button>
		</ion-item>
		<ion-card-content>
			<ion-item v-for="user in users" :key="user.username" :router-link="{name: 'ManageUser', params: {username: user.username}}" button>
				<ion-avatar slot="start">
					<ion-img :src="user.profilePicture"/>
				</ion-avatar>
				<ion-label>
					<h3>{{ user.fullName }}</h3>
					<p>{{ user.username }} • {{ user.role }}</p>
				</ion-label>
				<ion-badge v-if="user.state === 'pending'" color="warning">Pending</ion-badge>
			</ion-item>
		</ion-card-content>
	</ion-card>
</template>
<script>
	export default {
		name: 'userManagementTableCard',
		data() {
			return {
				loading: false,
				users: (() => {
					const arr = [];
					for (let i = 0; i < 20; i++) {
						arr.push({
							fullName: `Name${i} Surname${i}`,
							username: `user${i}`,
							role: i % 2 === 0 ? 'Employee' : 'Contractor',
							state: i % 3 === 0 ? 'pending' : undefined,
							profilePicture: 'https://www.w3schools.com/howto/img_avatar.png',
							permissions: [],
						});
					}
					return arr;
				})(),
			};
		},
		methods: {
			addUser() {
				console.log('Add User.');
			},
			save() {
				this.loading = true;
				console.log('Saved.');
				this.loading = false;
				this.$toast.saveSuccess();
			},
		},
	};
</script>
