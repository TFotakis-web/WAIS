export default [
	{
		path: '/cards',
		name: 'Cards',
		component: () => import('@/components/structure/passThroughRouterView'),
		children: [
			{
				path: 'vehicle',
				name: 'VehicleCards',
				component: () => import('@/views/cards/Vehicle'),
				meta: {
					requiresAuth: true,
					requiresPagePermission: true,
				},
			},
			{
				path: 'vehicle/:id',
				name: 'VehicleCardsDetails',
				component: () => import('@/views/cards/VehicleDetails'),
				meta: {
					requiresAuth: true,
					requiresPagePermission: true,
				},
			},
			{
				path: 'customers',
				name: 'CustomerCards',
				component: () => import('@/views/cards/Customer'),
				meta: {
					requiresAuth: true,
					requiresPagePermission: true,
				},
			},
		],
	},
];
