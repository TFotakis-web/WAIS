const gqlUtil = require('./utils/gql_utils')

module.exports = {
	/*
	 * Queries
	 */

	getUserProfileByUsername: async (username) => {
		console.log('userAPI.getUserProfileByUsername input: ' + username)
		const query = /* GraphQL */ `
			query getUserProfileByUsername($username: String!) {
				listUserProfileByUsername(username: $username) {
					items {
						id
						username
						email
						telephone
						name
						fathers_name
						address
						zip_code
						mobile
						tin
						family_name
						gender
						birthdate
						city
						role
						profilePicture {
							bucket
							region
							key
							name
						}
						preferences
						locale
						createdAt
						updatedAt
						files {
							level
							idToken
							filePath
							filename
						}
					}
				}
			}
		`
		const response = await gqlUtil.execute({ username: username }, query, 'getUserProfileByUsername')
		let result = response.data.listUserProfileByUsername
		if (result.items.length > 0) {
			result = result.items[0]
		} else {
			result = null
		}
		console.log('userAPI.getUserProfileByUsername output: ' + JSON.stringify(result))
		return result
	},

	getUserProfileByEmail: async (email) => {
		console.log('userAPI.getUserProfileByEmail input: ' + email)
		const query = /* GraphQL */ `
			query getUserProfileByEmail($email: String!) {
				listUserProfileByEmail(email: $email) {
					items {
						id
						username
						email
						telephone
						role
						name
						fathers_name
						address
						zip_code
						mobile
						tin
						family_name
						gender
						birthdate
						city
						profilePicture {
							bucket
							region
							key
							name
						}
						preferences
						locale
						createdAt
						updatedAt
						files {
							level
							idToken
							filePath
							filename
						}
					}
				}
			}
		`
		const response = await gqlUtil.execute({ email: email }, query, 'getUserProfileByEmail')
		let result = response.data.listUserProfileByEmail
		if (result.items.length > 0) {
			result = result.items[0]
		} else {
			result = null
		}
		console.log('userAPI.getUserProfileByEmail output: ' + JSON.stringify(result))
		return result
	},

	getUserRoleByUsername: async (username) => {
		console.log('userAPI.getUserRoleByUsername input: ' + username)
		const query = /* GraphQL */ `
			query getUserRoleByUsername($username: String!) {
				listUserProfileByUsername(username: $username) {
					items {
						id
						username
						role
					}
				}
			}
		`
		const response = await gqlUtil.execute({ username: username }, query, 'getUserRoleByUsername')
		let result = response.data.listUserProfileByUsername.items
		if (result.items.length > 0) {
			result = result.items[0]
		} else {
			result = null
		}
		console.log('userAPI.getUserRoleByUsername output: ' + JSON.stringify(result))
		return result
	},

	getUserModelPermissionsForOffice: async (username, officeId) => {
		console.log('userAPI.getUserModelPermissionsForOffice input: ' + [username])
		const query = /* GraphQL */ `
			query getUserModelPermissionsForOffice($username: String!, $filter: ModelOfficeUserConnectionConditionInput, $limit: Int) {
				listUserProfileByUsername(username: $username) {
					items {
						officeConnections(filter: $filter, limit: $limit) {
							items {
								modelPermissions
							}
						}
					}
				}
			}
		`
		const response = await gqlUtil.execute(
			{ username: username, filter: { and: [{ officeId: { eq: officeId } }, { username: { eq: username } }] }, limit: 100 },
			query,
			'getUserModelPermissionsForOffice',
		)
		const modelPermissionsSet = new Set()
		response.data.listUserProfileByUsername.items.forEach((userProfile) => {
			userProfile.officeConnections.items.forEach((oc) => {
				modelPermissionsSet.add(oc.modelPermissions)
			})
		})
		console.log('userAPI.getUserModelPermissionsForOffice output: ' + modelPermissionsSet)
		return modelPermissionsSet
	},

	getUserPagePermissionsForOffice: async (username, officeId) => {
		console.log('userAPI.getUserPagePermissionsForOffice input: ' + [username])
		const query = /* GraphQL */ `
			query getUserPagePermissionsForOffice($username: String!, $filter: ModelOfficeUserConnectionConditionInput, $limit: Int) {
				listUserProfileByUsername(username: $username) {
					items {
						officeConnections(filter: $filter, limit: $limit) {
							items {
								pagePermissions
							}
						}
					}
				}
			}
		`
		const response = await gqlUtil.execute(
			{ username: username, filter: { and: [{ officeId: { eq: officeId } }, { username: { eq: username } }] }, limit: 100 },
			query,
			'getUserPagePermissionsForOffice',
		)
		const pagePermissionsSet = new Set()
		response.data.listUserProfileByUsername.items.forEach((userProfile) => {
			userProfile.officeConnections.items.forEach((oc) => {
				pagePermissionsSet.add(oc.pagePermissions)
			})
		})
		console.log('userAPI.getUserPagePermissionsForOffice output: ' + pagePermissionsSet)
		return pagePermissionsSet
	},

	checkIfUserIsUnemployed: async (username) => {
		console.log('userAPI.checkIfUserIsUnemployed input: ' + username)
		const query = /* GraphQL */ `
			query listUserProfileByUsername($username: String!) {
				listUserProfileByUsername(username: $username) {
					items {
						officeConnections {
							items {
								id
							}
						}
					}
				}
			}
		`
		const response = await gqlUtil.execute({ username: username }, query, 'listUserProfileByUsername')
		const result = response.data.listUserProfileByUsername.items || []
		const retVal = result.length == 0
		console.log('userAPI.checkIfUserIsUnemployed output: ' + retVal)
		return retVal
	},

	/*
	 * Mutations
	 */
	updateUserProfileDetails: async (username, input, condition) => {
		console.log('userAPI.updateUserProfileDetails input: ' + [username, input, condition])
		if (!username) {
			throw new Error('Invalid username or unauthenticated user.')
		}

		//Sanitize input
		const allowed = [
			'id',
			'telephone',
			'name',
			'address',
			'mobile',
			'fathers_name',
			'zip_code',
			'gender',
			'family_name',
			'preferences',
			'locale',
			'files',
			'tin',
			'city',
			'profilePicture',
		]
		const sanitized_input = Object.keys(input)
			.filter((key) => allowed.includes(key))
			.reduce((obj, key) => {
				obj[key] = input[key]
				return obj
			}, {})

		//Expand the condition to require that the caller is also the owner of the profile
		const expanded_condition = { and: [condition || { username: { ne: '' } }, { username: { eq: username } }] }
		const mutation = /* GraphQL */ `
			mutation updateUserProfileDetails($input: UpdateUserProfileInput!, $condition: ModelUserProfileConditionInput) {
				updateUserProfile(input: $input, condition: $condition) {
					id
					username
					email
					role
					telephone
					name
					fathers_name
					address
					zip_code
					mobile
					tin
					family_name
					gender
					birthdate
					city
					preferences
					locale
					createdAt
					updatedAt
				}
			}
		`

		const response = await gqlUtil.execute(
			{ input: sanitized_input, condition: expanded_condition },
			mutation,
			'updateUserProfileDetails',
		)
		const result = response.data.updateUserProfile
		console.log('userAPI.updateUserProfileDetails output: ' + JSON.stringify(result))
		return result
	},

	updateEmployeeModelPermissionsForOffice: async (officeId, caller_username, empUsername, modelPermissions) => {
		console.log('userAPI.updateEmployeeModelPermissionsForOffice input: ' + [officeId, caller_username, empUsername, modelPermissions])
		if (!caller_username) {
			throw new Error('Invalid username or unauthenticated user.')
		}

		//Get the office
		const tuc_filter = { and: [{ officeId: { eq: officeId } }, { username: { eq: caller_username } }] }
		const officeDetailsAndPermissions = await module.exports.getOfficeDetailsAndPermissionsByUsername(caller_username, tuc_filter)
		const tucItem = officeDetailsAndPermissions.items[0].officeConnections.items[0]
		if (!tucItem || tucItem.office.ownerUsername !== caller_username) {
			throw new Error('Invalid office ID or caller not an owner of that office.')
		}

		const input = { id: tucItem.id, modelPermissions: modelPermissions }

		const mutation1 = /* GraphQL */ `
			mutation updateOfficeUserConnection(input: UpdateOfficeUserConnectionInput!) {
				updateOfficeUserConnection(input: $input) {
				id
				}
			}
		`
		const response = await gqlUtil.execute({ input: input }, mutation1, 'updateOfficeUserConnection')
		const result = response.data.updateUserCalendarEvent
		console.log('userAPI.updateEmployeeModelPermissionsForOffice output: ' + JSON.stringify(result))
		return result
	},

	updateEmployeePagePermissionsForOffice: async (officeId, caller_username, empUsername, pagePermissions) => {
		console.log('userAPI.updateEmployeePagePermissionsForOffice input: ' + [officeId, caller_username, empUsername, pagePermissions])
		if (!caller_username) {
			throw new Error('Invalid username or unauthenticated user.')
		}

		//Get the office
		const tuc_filter = { and: [{ officeId: { eq: officeId } }, { username: { eq: caller_username } }] }
		const officeDetailsAndPermissions = await module.exports.getOfficeDetailsAndPermissionsByUsername(caller_username, tuc_filter)
		const tucItem = officeDetailsAndPermissions.items[0].officeConnections.items[0]
		if (!tucItem || tucItem.office.ownerUsername !== caller_username) {
			throw new Error('Invalid office ID or caller not an owner of that office.')
		}

		const input = { id: tucItem.id, pagePermissions: pagePermissions }

		const mutation1 = /* GraphQL */ `
			mutation updateOfficeUserConnection(input: UpdateOfficeUserConnectionInput!) {
				updateOfficeUserConnection(input: $input) {
					id
				}
			}
		`
		const response = await gqlUtil.execute({ input: input }, mutation1, 'updateOfficeUserConnection')
		const result = response.data.updateUserCalendarEvent
		console.log('userAPI.updateEmployeePagePermissionsForOffice output: ' + JSON.stringify(result))
		return result
	},
}
