export default [
	{
		path: '/accounting',
		name: 'Accounting',
		component: () => import('@/components/structure/passThroughRouterView'),
		children: [
			{
				path: 'receipts',
				name: 'AccountingReceipts',
				component: () => import('@/views/accounting/Receipts'),
				meta: {
					requiresAuth: true,
					requiresPagePermission: true,
					freeAccessForManager: true,
				},
			},
			{
				path: 'registers',
				name: 'AccountingRegisters',
				component: () => import('@/views/accounting/Registers'),
				meta: {
					requiresAuth: true,
					requiresPagePermission: true,
					freeAccessForManager: true,
				},
			},
			{
				path: 'todaysIncome',
				name: 'AccountingTodaysIncome',
				component: () => import('@/views/accounting/TodaysIncome'),
				meta: {
					requiresAuth: true,
					requiresPagePermission: true,
					freeAccessForManager: true,
				},
			},
			{
				path: 'commissionsUncollected',
				name: 'AccountingCommissionsUncollected',
				component: () => import('@/views/accounting/CommissionsUncollected'),
				meta: {
					requiresAuth: true,
					requiresPagePermission: true,
					freeAccessForManager: true,
				},
			},
			{
				path: 'commissionsCollected',
				name: 'AccountingCommissionsCollected',
				component: () => import('@/views/accounting/CommissionsCollected'),
				meta: {
					requiresAuth: true,
					requiresPagePermission: true,
					freeAccessForManager: true,
				},
			},
			{
				path: 'mutualAccount',
				name: 'AccountingMutualAccount',
				component: () => import('@/views/accounting/MutualAccount'),
				meta: {
					requiresAuth: true,
					requiresPagePermission: true,
					freeAccessForManager: true,
				},
			},
		],
	},
];
