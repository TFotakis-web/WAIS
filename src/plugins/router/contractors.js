export default [
	{
		path: '/contractors',
		name: 'Contractors',
		component: () => import('@/components/structure/passThroughRouterView'),
		children: [
			{
				path: 'suppliers',
				name: 'SupplierContractors',
				component: () => import('@/views/contractors/Supplier'),
				meta: {
					requiresAuth: true,
					requiresPagePermission: true,
					freeAccessForManager: true,
				},
			},
			{
				path: 'externalContractors',
				name: 'ContractorsExternalContractors',
				component: () => import('@/views/contractors/ExternalContractors'),
				meta: {
					requiresAuth: true,
					requiresPagePermission: true,
					freeAccessForManager: true,
				},
			},
		],
	},
];
