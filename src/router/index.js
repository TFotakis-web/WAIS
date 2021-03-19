import { createRouter, createWebHistory } from '@ionic/vue-router';

import { store } from '@/store';
import dynamicRoutes from '@/router/routes';

const routes = [
	{ path: '/folder/:id', name: 'folder', component: () => import('@/views/Folder.vue'), meta: { permissions: ['read_folder'] } },
	{ path: '/', name: 'Home', component: () => import('@/views/home/Home.vue') },
	{ name: 'SignIn', path: '/auth/signIn', component: () => import('@/views/auth/AuthPage.vue') },
	{ path: '/:catchAll(.*)', name: 'NotFound', component: () => import('@/views/errorPages/NotFound') },
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

function hasPermissions(route) {
	let flag = true;
	const permissions = store.getters['auth/permissions'];

	flag &= permissions[route.name]?.read;
	flag &= permissions[route.name]?.write;

	// for (const permission of route.meta.permissions) {
	// 	flag &= permissions.includes(permission);
	// }

	return flag;
}

router.beforeEach((to, from, next) => {
	if (to.meta.permissions?.length) {
		if (store.getters['auth/user']) {
			if (!hasPermissions(to)) {
				next({ name: 'Home' });
			} else {
				next();
			}
		} else {
			next({ name: 'SignIn' });
		}
	} else {
		next();
	}
});

export default router;
