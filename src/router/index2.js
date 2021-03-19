import Vue from 'vue';
import VueRouter from 'vue-router';
import dynamicRoutes from '@/router/routes';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
	{ path: '/404-page-not-found', alias: '*', name: 'NotFound', component: () => import('@/views/errorPages/NotFound') },
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
	linkActiveClass: 'active',
});

VueRouter.prototype.$loadRoutesAsync = async function () {
	const permissions = store.getters['auth/permissions'];

	for (const p in permissions) {
		if (permissions[p].read && permissions[p].write) {
			const route = dynamicRoutes[p].route;
			router.addRoute(route);
		}
	}
	return Promise.resolve();
};

export default router;
