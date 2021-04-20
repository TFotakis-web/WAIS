export default [
	{
		path: '/admin',
		name: 'Admin',
		component: () => import('@/components/structure/passThroughRouterView'),
		children: [
			{
				path: '',
				name: 'AdminHome',
				component: () => import('@/views/home/Home'),
				meta: {
					requiresAuth: true,
					isAdmin: true,
				},
			},
			{
				path: '/notifications',
				component: () => import('@/components/structure/passThroughRouterView'),
				children: [
					{
						path: '',
						name: 'AdminNotifications',
						component: () => import('@/views/notifications/Notifications'),
						meta: {
							requiresAuth: true,
							isAdmin: true,
						},
					},
					{
						path: 'createOffice/:id',
						name: 'AdminCreateOfficeNotificationDetails',
						component: () => import('@/views/notifications/AdminCreateOfficeNotificationDetails'),
						meta: {
							requiresAuth: true,
							isAdmin: true,
						},
					},
				],
			},
			{
				path: 'platformData',
				name: 'PlatformData',
				component: () => import('@/views/platformData/PlatformData'),
				meta: {
					requiresAuth: true,
					isAdmin: true,
				},
			},
			{
				path: 'devTools',
				name: 'DevTools',
				component: () => import('@/views/devTools/DevTools'),
				meta: {
					requiresAuth: true,
					isAdmin: true,
				},
			},
		],
	},
];
