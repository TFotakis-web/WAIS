export default [
	{
		path: '/processing',
		name: 'Processing',
		component: () => import('@/components/structure/passThroughRouterView'),
		children: [
			{
				path: 'dueDateRegister',
				name: 'ProcessingDueDateRegister',
				component: () => import('@/views/processing/DueDateRegister'),
				meta: {
					requiresAuth: true,
					requiresPagePermission: true,
					freeAccessForManager: true,
				},
			},
			{
				path: 'duePayment',
				name: 'ProcessingDuePayment',
				component: () => import('@/views/processing/DuePayment'),
				meta: {
					requiresAuth: true,
					requiresPagePermission: true,
					freeAccessForManager: true,
				},
			},
			{
				path: 'paid',
				name: 'ProcessingPaid',
				component: () => import('@/views/processing/Paid'),
				meta: {
					requiresAuth: true,
					requiresPagePermission: true,
					freeAccessForManager: true,
				},
			},
			{
				path: 'losses',
				name: 'ProcessingLosses',
				component: () => import('@/views/processing/Losses'),
				meta: {
					requiresAuth: true,
					requiresPagePermission: true,
					freeAccessForManager: true,
				},
			},
		],
	},
];
