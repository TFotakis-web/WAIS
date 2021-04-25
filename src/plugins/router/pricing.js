export default [
	{
		path: '/pricing',
		name: 'Pricing',
		component: () => import('@/components/structure/passThroughRouterView'),
		children: [
			{
				path: 'vehicle',
				name: 'VehiclePricing',
				component: () => import('@/views/pricing/Vehicle'),
				meta: {
					requiresAuth: true,
					requiresPagePermission: true,
					freeAccessForManager: true,
				},
			},
			{
				path: 'industrialLiability',
				name: 'IndustrialLiabilityPricing',
				component: () => import('@/views/pricing/IndustrialLiability'),
				meta: {
					requiresAuth: true,
					requiresPagePermission: true,
					freeAccessForManager: true,
				},
			},
			{
				path: 'fire',
				name: 'FirePricing',
				component: () => import('@/views/pricing/Fire'),
				meta: {
					requiresAuth: true,
					requiresPagePermission: true,
					freeAccessForManager: true,
				},
			},
			{
				path: 'life',
				name: 'LifePricing',
				component: () => import('@/views/pricing/Life'),
				meta: {
					requiresAuth: true,
					requiresPagePermission: true,
					freeAccessForManager: true,
				},
			},
		],
	},
];
