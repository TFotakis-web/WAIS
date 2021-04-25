export default [
	{
		path: '/contract',
		name: 'Contract',
		component: () => import('@/components/structure/passThroughRouterView'),
		children: [
			{
				path: 'file',
				name: 'ContractsFile',
				component: () => import('@/views/contracts/File'),
				meta: {
					requiresAuth: true,
					requiresPagePermission: true,
					freeAccessForManager: true,
				},
			},
			{
				path: 'uncollected',
				name: 'UncollectedContracts',
				component: () => import('@/views/contracts/Uncollected'),
				meta: {
					requiresAuth: true,
					requiresPagePermission: true,
					freeAccessForManager: true,
				},
			},
			{
				path: 'collected',
				name: 'CollectedContracts',
				component: () => import('@/views/contracts/Collected'),
				meta: {
					requiresAuth: true,
					requiresPagePermission: true,
					freeAccessForManager: true,
				},
			},
			{
				path: 'additionalActs',
				name: 'ContractAdditionalActs',
				component: () => import('@/views/contracts/AdditionalActs'),
				meta: {
					requiresAuth: true,
					requiresPagePermission: true,
					freeAccessForManager: true,
				},
			},
			{
				path: 'greenCard',
				name: 'GreenCardContracts',
				component: () => import('@/views/contracts/GreenCard'),
				meta: {
					requiresAuth: true,
					requiresPagePermission: true,
					freeAccessForManager: true,
				},
			},
			{
				path: 'unclaimed',
				name: 'UnclaimedContracts',
				component: () => import('@/views/contracts/Unclaimed'),
				meta: {
					requiresAuth: true,
					requiresPagePermission: true,
					freeAccessForManager: true,
				},
			},
			{
				path: 'invalid',
				name: 'InvalidContracts',
				component: () => import('@/views/contracts/Invalid'),
				meta: {
					requiresAuth: true,
					requiresPagePermission: true,
					freeAccessForManager: true,
				},
			},
			{
				path: 'new',
				name: 'NewContract',
				component: () => import('@/views/contracts/New'),
				meta: {
					requiresAuth: true,
					requiresPagePermission: true,
					freeAccessForManager: true,
				},
			},
		],
	},
];
