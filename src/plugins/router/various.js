import { store } from '@/plugins/store/store';


export default [
	{
		path: '',
		name: 'Home',
		component: () => import('@/views/home/Home'),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/office',
		component: () => import('@/components/structure/passThroughRouterView'),
		children: [
			{
				path: '',
				name: 'Office',
				component: () => import('@/views/office/Office'),
				meta: {
					requiresAuth: true,
					customCheck: () => {
						return store.getters['auth/role'] === 'MANAGER' || store.getters['auth/role'] === 'EMPLOYEE';
					},
					// requiresPagePermission: true,
				},
			},
			{
				path: 'create',
				name: 'OfficeCreationForm',
				component: () => import('@/views/officeCreationForm/OfficeCreationForm'),
				meta: {
					requiresAuth: true,
					customCheck: () => {
						return store.getters['auth/role'] === 'UNKNOWN';
					},
				},
			},
			{
				path: 'manageUser/:username',
				name: 'ManageUser',
				component: () => import('@/views/office/ManageUser'),
				meta: {
					requiresAuth: true,
					customCheck: () => {
						return store.getters['auth/role'] === 'MANAGER' || store.getters['auth/role'] === 'EMPLOYEE';
					},
				},
			},
			{
				path: 'inviteUser',
				component: () => import('@/components/structure/passThroughRouterView'),
				children: [
					{
						path: '',
						name: 'InviteUser',
						component: () => import('@/views/office/InviteUser'),
						meta: {
							requiresAuth: true,
							customCheck: () => {
								return store.getters['auth/role'] === 'MANAGER';
							},
						},
					},
					{
						path: 'employee/:id',
						name: 'InviteEmployeeToOfficeItemDetails',
						component: () => import('@/views/office/InviteEmployeeToOfficeItemDetails'),
						meta: {
							requiresAuth: true,
							customCheck: () => {
								return store.getters['auth/role'] === 'MANAGER';
							},
						},
					},
					{
						path: 'contractor/:id',
						name: 'InviteContractorToOfficeItemDetails',
						component: () => import('@/views/office/InviteContractorToOfficeItemDetails'),
						meta: {
							requiresAuth: true,
							customCheck: () => {
								return store.getters['auth/role'] === 'MANAGER';
							},
						},
					},
				],
			},
			{
				path: 'manageOffice/:id',
				name: 'ManageOffice',
				component: () => import('@/views/office/ManageOffice'),
				meta: {
					requiresAuth: true,
					customCheck: () => {
						return store.getters['auth/role'] === 'MANAGER' || store.getters['auth/role'] === 'EMPLOYEE';
					},
				},
			},
			{
				path: 'inviteOffice',
				component: () => import('@/components/structure/passThroughRouterView'),
				children: [
					{
						path: '',
						name: 'InviteOffice',
						component: () => import('@/views/office/InviteOffice'),
						meta: {
							requiresAuth: true,
							customCheck: () => {
								return store.getters['auth/role'] === 'MANAGER';
							},
						},
					},
					{
						path: ':id',
						name: 'InviteOfficeItemDetails',
						component: () => import('@/views/office/InviteOfficeItemDetails'),
						meta: {
							requiresAuth: true,
							customCheck: () => {
								return store.getters['auth/role'] === 'MANAGER';
							},
						},
					},
				],
			},
		],
	},
	{
		path: '/profile',
		name: 'UserProfile',
		component: () => import('@/views/userProfile/UserProfile'),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/notifications',
		component: () => import('@/components/structure/passThroughRouterView'),
		children: [
			{
				path: '',
				name: 'Notifications',
				component: () => import('@/views/notifications/Notifications'),
				meta: {
					requiresAuth: true,
				},
			},
			{
				path: 'createOfficeConnection/:id',
				name: 'CreateOfficeConnectionNotificationDetails',
				component: () => import('@/views/notifications/CreateOfficeConnectionNotificationDetails'),
				meta: {
					requiresAuth: true,
				},
			},
			{
				path: 'inviteEmployeeToOffice/:id',
				name: 'InviteEmployeeToOfficeNotificationDetails',
				component: () => import('@/views/notifications/InviteEmployeeToOfficeNotificationDetails'),
				meta: {
					requiresAuth: true,
				},
			},
			{
				path: 'inviteContractorToOffice/:id',
				name: 'InviteContractorToOfficeNotificationDetails',
				component: () => import('@/views/notifications/InviteContractorToOfficeNotificationDetails'),
				meta: {
					requiresAuth: true,
				},
			},
		],
	},
	{
		path: '/contractApproval',
		name: 'ContractApproval',
		component: () => import('@/views/contractApproval/ContractApproval'),
		meta: {
			requiresAuth: true,
			requiresPagePermission: true,
			freeAccessForManager: true,
		},
	},
	{
		path: '/payment',
		name: 'Payment',
		component: () => import('@/views/payment/Payment'),
		meta: {
			requiresAuth: true,
			requiresPagePermission: true,
			freeAccessForManager: true,
		},
	},
	{
		path: '/bank',
		name: 'Bank',
		component: () => import('@/views/bank/Bank'),
		meta: {
			requiresAuth: true,
			requiresPagePermission: true,
			freeAccessForManager: true,
		},
	},
	{
		path: '/collaboration',
		name: 'Collaboration',
		component: () => import('@/views/collaboration/Collaboration'),
		meta: {
			requiresAuth: true,
			requiresPagePermission: true,
			freeAccessForManager: true,
		},
	},
	{
		path: '/wallet',
		name: 'Wallet',
		component: () => import('@/views/wallet/Wallet'),
		meta: {
			requiresAuth: true,
			requiresPagePermission: true,
			freeAccessForManager: true,
		},
	},
	{
		path: '/library',
		name: 'Library',
		component: () => import('@/views/library/Library'),
		meta: {
			requiresAuth: true,
			requiresPagePermission: true,
			freeAccessForManager: true,
		},
	},
];
