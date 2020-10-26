<template>
	<mdb-side-nav-2
		:value="true"
		:data="navigation"
		side
		slim
		expand-on-hover
		:slim-collapsed="collapsed"
		@toggleSlim="collapsed = $event"
		sidenav-class="unique-color-dark"
		color="white"
	>
		<div slot="header">
			<div
				class="d-flex align-items-center my-4"
				:class="
					collapsed
						? 'justify-content-center'
						: 'justify-content-start'
				"
			>
				<mdb-avatar :width="40" style="flex: 0 0 auto">
					<img
						src="https://mdbootstrap.com/img/Photos/Avatars/avatar-7.jpg"
						class="img-fluid rounded-circle z-depth-1"
					/>
				</mdb-avatar>
				<p
					class="m-t mb-0 ml-4 p-0"
					style="flex: 0 2 auto"
					v-show="!collapsed"
				>
					<strong
						>John Smith
						<mdb-icon
							color="success"
							icon="circle"
							class="ml-2"
							size="sm"
					/></strong>
				</p>
			</div>
			<hr class="w-100" />
		</div>
		<div slot="content" class="mt-5 d-flex justify-content-center">
			<mdb-btn
				tag="a"
				class="mx-0"
				size="sm"
				transparent
				floating
				:icon="collapsed ? 'chevron-right' : 'chevron-left'"
				icon-class="white-text"
				@click="collapsed = !collapsed"
			></mdb-btn>
		</div>

		<mdb-navbar
			slot="nav"
			tag="div"
			:toggler="false"
			position="top"
			dark
			color="unique-color-dark"
		>
			<mdb-navbar-nav class="nav-flex-icons" right>
				<mdb-nav-item
					to="/navigation/pro/double-navigation-v1"
					waves-fixed
					icon="code-branch"
					><span class="ml-1">v.1</span></mdb-nav-item
				>
				<mdb-nav-item
					to="/navigation/pro/double-navigation-v2"
					waves-fixed
					icon="eye"
					><span class="ml-1">v.2</span></mdb-nav-item
				>
				<mdb-nav-item
					to="/navigation/pro/double-navigation-v3"
					waves-fixed
					icon="file-code"
					far
					><span class="ml-1">v.3</span></mdb-nav-item
				>
				<mdb-nav-item
					to="/navigation/pro/double-navigation-v4"
					waves-fixed
					icon="terminal"
					><span class="ml-1">v.4</span></mdb-nav-item
				>
				<mdb-nav-item
					active
					to="/navigation/pro/double-navigation-v5"
					waves-fixed
					icon="smile"
					far
					><span class="ml-1">v.5</span></mdb-nav-item
				>
				<mdb-nav-item
					to="/navigation/pro/double-navigation-v6"
					waves-fixed
					icon="user"
					far
					><span class="ml-1">v.6</span></mdb-nav-item
				>
				<mdb-nav-item
					waves-fixed
					icon="sign-out-alt"
					@click="signOut"
				>
					<span>{{ $t('Sign Out') }}</span>
				</mdb-nav-item>
			</mdb-navbar-nav>
		</mdb-navbar>

		<div class="pt-5" slot="main" style="min-height: 100vh">
			<router-view />
		</div>
	</mdb-side-nav-2>
</template>

<script>
import { waves } from "mdbvue";
import { Auth } from "aws-amplify";

export default {
	name: "navigation",
	data() {
		return {
			show: true,
			collapsed: true,
			navigation: [
				{
					name: "Double navigation",
					icon: "bars",
					children: [
						{
							name: "Version 1",
							to: "/navigation/pro/double-navigation-v1"
						},
						{
							name: "Version 2",
							to: "/navigation/pro/double-navigation-v2"
						},
						{
							name: "Version 3",
							to: "/navigation/pro/double-navigation-v3"
						},
						{
							name: "Version 4",
							to: "/navigation/pro/double-navigation-v4"
						},
						{
							name: "Version 5",
							to: "/navigation/pro/double-navigation-v5"
						},
						{
							name: "Version 6",
							to: "/navigation/pro/double-navigation-v6"
						}
					]
				},
				{
					name: "Getting started",
					icon: "mdb",
					fab: true,
					children: [
						{
							name: "Quick start",
							href:
								"https://mdbootstrap.com/docs/vue/getting-started/quick-start/"
						},
						{
							name: "Technical Support",
							href: "https://mdbootstrap.com/support/"
						}
					]
				},
				{
					name: "Documentation",
					icon: "graduation-cap",
					href: "https://mdbootstrap.com/docs/vue/"
				}
			]
		};
	},
	mounted() {
		this.$store.commit("toggleDocs", false);
	},
	beforeDestroy() {
		this.$store.commit("toggleDocs", true);
	},
	mixins: [waves],
	methods: {
		signOut: async () => {
			await Auth.signOut();
		}
	}
};
</script>

<style scoped>
.navbar i {
	cursor: pointer;
	color: white;
}
</style>
