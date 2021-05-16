export default [
	{
		path: '/partners',
		component: () => import('@/components/structure/passThroughRouterView'),
		children: [
			{
				path: '',
				name: 'Partners',
				component: () => import('@/views/partners/Partners'),
				meta: {
					requiresAuth: true,
					requiresPagePermission: true,
					freeAccessForManager: true,
				},
			},
			{
				path: ':id',
				name: 'PartnerDetails',
				component: () => import('@/views/partners/PartnerDetails'),
				meta: {
					requiresAuth: true,
					requiresPagePermission: true,
					freeAccessForManager: true,
				},
			},
		],
	},
];
