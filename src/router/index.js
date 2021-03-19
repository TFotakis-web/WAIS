import { createRouter, createWebHistory } from '@ionic/vue-router';

import { store } from '@/store';
import dynamicRoutes from '@/router/routes';

const routes = [
	{
		path: '',
		redirect: '/folder/Inbox',
	},
	{
		path: '/folder/:id',
		component: () => import('../views/Folder.vue'),
	},

	{
		path: '/auth/signIn',
		component: () => import('../views/auth/AuthPage.vue'),
	},
	// { path: '/404-page-not-found', alias: '*', name: 'NotFound', component: () => import('@/views/errorPages/NotFound') },
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

router.$loadRoutesAsync = async function () {
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
