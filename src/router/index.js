import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import SignUp from '@/views/SignUp.vue';

Vue.use(VueRouter);

const routes = [
	{ path: '/', name: 'Home', component: Home, meta: { requiresAuth: true } },
	{ path: '/signup', name: "SignUp", component: SignUp }
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
	scrollBehavior: function (to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		}
		return { x: 0, y: 0 };
	},
	linkActiveClass: 'active'
});
export default router;
