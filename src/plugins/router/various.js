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
		path: '/officeCreationForm',
		name: 'OfficeCreationForm',
		component: () => import('@/views/officeCreationForm/OfficeCreationForm'),
		meta: {
			requiresAuth: true,
			customCheck: () => {
				return true;
			},
		},
	},
	{
		path: '/office',
		name: 'Office',
		component: () => import('@/views/office/Office'),
		meta: {
			requiresAuth: true,
			requiresPagePermission: true,
		},
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
		name: 'Notifications',
		component: () => import('@/views/notifications/Notifications'),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/notifications/:id',
		name: 'NotificationDetails',
		component: () => import('@/views/notifications/NotificationDetails'),
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/contractApproval',
		name: 'ContractApproval',
		component: () => import('@/views/contractApproval/ContractApproval'),
		meta: {
			requiresAuth: true,
			requiresPagePermission: true,
		},
	},
	{
		path: '/payment',
		name: 'Payment',
		component: () => import('@/views/payment/Payment'),
		meta: {
			requiresAuth: true,
			requiresPagePermission: true,
		},
	},
	{
		path: '/bank',
		name: 'Bank',
		component: () => import('@/views/bank/Bank'),
		meta: {
			requiresAuth: true,
			requiresPagePermission: true,
		},
	},
	{
		path: '/collaboration',
		name: 'Collaboration',
		component: () => import('@/views/collaboration/Collaboration'),
		meta: {
			requiresAuth: true,
			requiresPagePermission: true,
		},
	},
	{
		path: '/wallet',
		name: 'Wallet',
		component: () => import('@/views/wallet/Wallet'),
		meta: {
			requiresAuth: true,
			requiresPagePermission: true,
		},
	},
	{
		path: '/library',
		name: 'Library',
		component: () => import('@/views/library/Library'),
		meta: {
			requiresAuth: true,
			requiresPagePermission: true,
		},
	},
];
