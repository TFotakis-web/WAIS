export default [
	{
		path: '/auth',
		name: 'Auth',
		component: () => import('@/components/structure/passThroughRouterView'),
		children: [
			{
				path: 'confirmSignUp',
				name: 'ConfirmSignUp',
				component: () => import('@/views/auth/ConfirmSignUp'),
				meta: {
					ifAuthenticatedRedirect: true,
				},
			},
			{
				path: 'forceChangePassword',
				name: 'ForceChangePassword',
				component: () => import('@/views/auth/ForceChangePassword'),
				meta: {
					ifAuthenticatedRedirect: true,
				},
			},
			{
				path: 'forgotPassword',
				name: 'ForgotPassword',
				component: () => import('@/views/auth/ForgotPassword'),
				meta: {
					ifAuthenticatedRedirect: true,
				},
			},
			{
				path: 'signIn',
				name: 'SignIn',
				component: () => import('@/views/auth/SignIn'),
				meta: {
					ifAuthenticatedRedirect: true,
				},
			},
			{
				path: 'signUp',
				name: 'SignUp',
				component: () => import('@/views/auth/SignUp'),
				meta: {
					ifAuthenticatedRedirect: true,
				},
			},
		],
	},
];
