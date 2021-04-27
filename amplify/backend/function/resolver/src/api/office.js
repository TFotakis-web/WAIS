const gqlUtil = require('../utils/gql')

module.exports = {
	/*
	 * Queries
	 */

	getOfficeDetailsAndPermissionsByUsername: async (username, filter, limit, nextToken) => {
		console.log('officeAPI.getOfficeDetailsAndPermissionsByUsername input: ' + [username, JSON.stringify(filter), limit, nextToken])
		const query = /* GraphQL */ `
			query getOfficeDetailsAndPermissionsByUsername(
				$username: String!
				$filter: ModelOfficeUserConnectionFilterInput
				$limit: Int
				$nextToken: String
			) {
				listUserProfileByUsername(username: $username) {
					items {
						officeConnections(filter: $filter, limit: $limit, nextToken: $nextToken) {
							items {
								id
								username
								userId
								pagePermissions
								modelPermissions
								preferences
								officeId
								officeName
								employeeType
								office {
								  id
								  officeName
								  ownerUsername
								  address
								  office_email
								  zip_code
								  mobile
								  phone
								  partnersNumberLimit
								  employeesNumberLimit
								  verified
								  tin
								  office_logo {
									level
									idToken
									filePath
									filename
									contentType
								  }
								  professionStartDate
								  chamberRecordNumber
								  insuranceLicenseExpirationDate
								  civilLiabilityExpirationDate
								  bankAccountInfo
								  files {
									level
									idToken
									filePath
									filename
									contentType
								  }
								  insuranceCompanies {
									name
									code
								  }
								  createdAt
								  updatedAt
								}
								user {
									username
									email
									role
									telephone
									createdAt
									updatedAt
								}
								createdAt
								updatedAt
							}
							nextToken
						}
					}
				}
			}
		`

		try {
			const response = await gqlUtil.execute({
				username: username,
				filter: filter || {id: {ne: ''}},
				limit: limit || 100,
				nextToken: nextToken
			}, query, 'getOfficeDetailsAndPermissionsByUsername')
			const result = response.data.listUserProfileByUsername?.items[0]?.officeConnections || []
			result?.items.forEach((item) => { //Quick page permissions fix
				item.pagePermissions = JSON.parse(item.pagePermissions)
				if (item.office) {
					item.office.bankAccountInfo = JSON.parse(item.office.bankAccountInfo)
				}
			})
			console.log('officeAPI.getOfficeDetailsAndPermissionsByUsername output: ' + JSON.stringify(result))
			return result
		} catch (err) {
			console.log(`officeAPI.getOfficeDetailsAndPermissionsByUsername unhandled error: ${err}`)
			return Promise.reject(`Unable to retrieve the details and permissions for user ${username}.`)
		}
	},

	getEmployeeTypeUserProfilesForManagerUsername: async (managerUsername, empType, filter, limit, nextToken) => {
		console.log(
			'officeAPI.getEmployeeTypeUserProfilesForManagerUsername input: ' +
			[managerUsername, empType, JSON.stringify(filter), limit, nextToken],
		)
		let emp_filter = {and: [filter || {id: {ne: ''}}, {employeeType: {eq: empType}}]}
		const query = /* GraphQL */ `
			query getEmployeeTypeUserProfilesForManagerUsername(
				$ownerUsername: String!
				$filter: ModelOfficeUserConnectionFilterInput
				$limit: Int
				$nextToken: String
			) {
				listOfficeByOwnerUsername(ownerUsername: $ownerUsername) {
					items {
						workforce(filter: $filter, limit: $limit, nextToken: $nextToken) {
							items {
								user {
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
										level
										idToken
										filePath
										filename
										contentType
									}
									preferences
									locale
									files {
										level
										idToken
										filePath
										filename
										contentType
									}
								}
							}
							nextToken
						}
					}
				}
			}
		`
		const response = await gqlUtil.execute(
			{ownerUsername: managerUsername, filter: emp_filter, limit: limit || 100, nextToken: nextToken},
			query, 'getEmployeeTypeUserProfilesForManagerUsername')
		const office = response.data.listOfficeByOwnerUsername
		if (office === undefined || office.items === undefined) {
			return Promise.reject('An error occurred while retrieving contractors.')
		}
		let users = []
		office.items.forEach((workforceItem) => {
			workforceItem.workforce?.items.forEach((userItem) => {
				users.push(userItem.user)
			})
		})
		const result = {
			items: users,
			nextToken: null
		}
		console.log('officeAPI.getEmployeeTypeUserProfilesForManagerUsername output: ' + JSON.stringify(result))
		return result
	},

	getCustomersForOfficeId: async (officeId, filter, limit, nextToken) => {
		console.log('officeAPI.getCustomersForOfficeId input: ' + [officeId, JSON.stringify(filter), limit, nextToken])
		const query = /* GraphQL */ `
			query getCustomersForOfficeId($officeId: String!, $filter: ModelCustomerFilterInput, $limit: Int, $nextToken: String) {
				listOffices(filter: { id: { eq: $officeId } }) {
					items {
						officeCustomers(limit: $limit, filter: $filter, nextToken: $nextToken) {
							items {
								address
								birthDate
								doy
								createdAt
								email
								driversLicense {
									Category {
										category
										expiresAt
										issueDate
									}
									DriversLicenseType
									LicenseID
								}
								familyStatus
								fathersName
								files {
									level
									idToken
									filePath
									filename
									contentType
								}
								firstName
								gender
								id
								lastName
								mobile
								zip_code
								tin
								officeName
								updatedAt
							}
							nextToken
						}
					}
				}
			}
		`
		const response = await gqlUtil.execute(
			{officeId: officeId, filter: filter || {id: {ne: ''}}, limit: limit || 50, nextToken: nextToken},
			query,
			'getCustomersForOfficeId',
		)
		let result = response.data.listOffices.items
		if (result) {
			result = result[0].officeCustomers
		}
		console.log('officeAPI.getCustomersForOfficeId output: ' + JSON.stringify(result))
		return result
	},

	getContractsForOfficeId: async (officeId, filter, limit, nextToken) => {
		console.log('officeAPI.getContractsForOfficeId input: ' + [officeId, filter, limit, nextToken])
		if (!officeId) {
			return Promise.reject('Invalid office ID')
		}
		const query = /* GraphQL */ `
			query getContractsForOfficeId($officeId: String!, $filter: ModelContractFilterInput, $limit: Int, $nextToken: String) {
				listOffices(filter: { id: { eq: $officeId } }) {
					items {
						officeContracts(limit: $limit, filter: $filter, nextToken: $nextToken) {
							items {
								id
								contractId
								version
								vehicleNumberPlate
								vehicleId
								voucherId
								customerId
								officeName
								second_officeId
								contractorId
								co_name
								co_TRN
								contractState
								insuranceClass
								insuranceCoverage
								insuranceUsage
								duration
								startDate
								endDate
								data
								discount
								jointWorth
								netWorth
								driversLicense
								createdAt
								updatedAt
								vehicle {
									color
									createdAt
									displacement
									eurotax
									file {
										level
										idToken
										filePath
										filename
										contentType
									}
									firstRegistrationDate
									fuelType
									id
									manufacturer
									model
									vin
									vehicle_owner
									value
									usage
									updatedAt
									trim
									officeName
									taxableHorsepower
									purchaseDate
									passengers
									numberPlate
								}
							}
							nextToken
						}
					}
				}
			}
		`
		const response = await gqlUtil.execute(
			{officeId: officeId, filter: filter || {id: {ne: ''}}, limit: limit || 50, nextToken: nextToken},
			query,
			'getContractsForOfficeId',
		)
		let result = response.data.listOffices
		if (result) {
			result = result[0].officeCustomers
		}
		console.log('officeAPI.getContractsForOfficeId output: ' + JSON.stringify(result))
		return result
	},

	getPartnerOfficeConnections: async (officeId, username, filter, limit, nextToken) => {
		console.log('officeAPI.getPartnerOfficeConnections input: ' + [officeId, username, filter, limit, nextToken])
		if (!username) {
			return Promise.reject('Invalid username or unauthenticated user.')
		}
		if (!officeId) {
			return Promise.reject('Invalid office ID')
		}
		const user_filter = {and: [filter || {id: {ne: ''}}, {fromId: {eq: officeId}}]}
		const query = /* GraphQL */ `
			query getPartnerOfficeConnections(
				$officeId: String!
				$filter: ModelOfficeAccessConnectionFilterInput
				$limit: Int
				$nextToken: String
			) {
				listOfficeAccessConnections(filter: $filter, limit: $limit, nextToken: $nextToken) {
					items {
						id
						to {
							id
							officeName
							ownerUsername
							office_email
							address
							mobile
							phone
							tin
						}
						expirationDate
						message
						createdAt
						updatedAt
					}
					nextToken
				}
			}
		`
		const response = await gqlUtil.execute(
			{officeId: officeId, filter: user_filter, limit: limit || 50, nextToken: nextToken},
			query,
			'getPartnerOfficeConnections',
		)
		const result = response.data.listOfficeAccessConnections
		console.log('officeAPI.getPartnerOfficeConnections output: ' + JSON.stringify(result))
		return result
	},

	getAllInsuranceCompanies: async (username) => {
		console.log('officeAPI.getAllInsuranceCompanies input: ' + [username])
		if (!username) {
			return Promise.reject('Invalid username or unauthenticated user.')
		}

		//Get user's office and its companies
		const query = /* GraphQL */ `
			query getOfficeDetailsAndPermissionsByUsername($username: String!) {
				listUserProfileByUsername(username: $username) {
					items {
						officeConnections {
							items {
								office {
									availableInsuranceCompanies {
										items {
											id
											officeName
											insuranceCompanies {
												name
												code
											}
										}
									}
								}
							}
						}
					}
				}
			}
		`
		const response = await gqlUtil.execute({username: username}, query, 'getOfficeDetailsAndPermissionsByUsername')
		const companies = []
		const result = response.data.listUserProfileByUsername.items.forEach((oc) => {
			oc.items.forEach((office) => {
				office.availableInsuranceCompanies.items.forEach((ic) => {
					companies.push(ic)
				})
			})
		})

		console.log('officeAPI.getAllInsuranceCompanies output: ' + JSON.stringify(result))
		return result
	},

	getAvailableInsuranceCompaniesForOffice: async (office, username) => {
		console.log('officeAPI.getAvailableInsuranceCompaniesForOffice input: ' + [JSON.stringify(office), username])
		if (!username) {
			return Promise.reject('Invalid username or unauthenticated user.')
		}

		//Get user's office and its companies
		const companies = []
		companies.push({
			id: office.id,
			officeName: office.officeName,
			insuranceCompanies: office.insuranceCompanies,
		})
		const query = /* GraphQL */ `
			query getPartnerOfficeConnections($officeId: String!, $limit: Int) {
				listOfficeAccessConnections(limit: $limit) {
					items {
						to {
							id
							officeName
							insuranceCompanies {
								name
								code
							}
						}
					}
				}
			}
		`
		const response = await gqlUtil.execute({officeId: office.id, limit: 1000}, query, 'getPartnerOfficeConnections')
		response.data.listOfficeAccessConnections.items.forEach((partnerOffice) => companies.push(partnerOffice))
		const result = {items: companies}
		console.log('officeAPI.getAvailableInsuranceCompaniesForOffice output: ' + JSON.stringify(result))
		return result
	},

	/*
	 * Mutations
	 */

	updateOfficeDetails: async (username, input, condition) => {
		console.log('officeAPI.updateOfficeDetails input: ' + [username, JSON.stringify(input), JSON.stringify(condition)])
		if (!username) {
			return Promise.reject('Invalid username or unauthenticated user.')
		}

		//Sanitize input
		const allowed = [
			'id',
			'address',
			'office_email',
			'zip_code',
			'mobile',
			'files',
			'tin',
			'bankAccountInfo',
			'chamberRecordNumber',
			'civilLiabilityExpirationDate',
			'insuranceLicenseExpirationDate',
			'office_logo',
			'insuranceCompanies',
			'phone',
			'professionStartDate',
		]

		const sanitized_input = Object.keys(input)
			.filter((key) => allowed.includes(key))
			.reduce((obj, key) => {
				obj[key] = input[key]
				return obj
			}, {})

		if ('bankAccountInfo' in sanitized_input) {
			sanitized_input.bankAccountInfo = JSON.stringify(sanitized_input.bankAccountInfo)
		}

		//Expand the condition to require that the caller is also the manager of that office
		const mutation = /* GraphQL */ `
			mutation updateOfficeDetails($input: UpdateOfficeInput!, $condition: ModelOfficeConditionInput) {
				updateOffice(input: $input, condition: $condition) {
					id
					address
					office_email
					officeName
					zip_code
					mobile
					tin
					bankAccountInfo
					chamberRecordNumber
					ownerUsername
					phone
					civilLiabilityExpirationDate
					insuranceLicenseExpirationDate
					partnersNumberLimit
					employeesNumberLimit
					insuranceCompanies {
						name
						code
					}
					office_logo {
						level
						idToken
						filePath
						filename
						contentType
					}
					files {
						level
						idToken
						filePath
						filename
						contentType
					}
					professionStartDate
					createdAt
					updatedAt
				}
			}
		`

		const response = await gqlUtil.execute({
			input: sanitized_input,
			condition: {ownerUsername: {eq: username}}
		}, mutation, 'updateOfficeDetails')
		const result = response.data.updateOffice
		console.log('officeAPI.updateOfficeDetails output: ' + JSON.stringify(result))
		return result
	},

	createVehicleForOffice: async (office_id, username, input, condition) => {
		console.log('createVehicleForOffice input: ' + [office_id, username, input, condition])
		if (!username) {
			return Promise.reject('Invalid username or unauthenticated user.')
		}
		if (!office_id) {
			return Promise.reject('Invalid office ID')
		}

		//Get caller's office
		const officeDetailsAndPermissions = await module.exports.getUserModelPermissionsForOffice(username, office_id)
		if (!officeDetailsAndPermissions) {
			return Promise.reject('Insufficient permissions')
		}

		//Expand the condition to require that the caller is also the owner of the profile
		const expanded_condition = {and: [condition || {officeId: {ne: ''}}, {officeId: {eq: office_id}}]}
		const mutation = /* GraphQL */ `
			mutation createVehicleForOffice($input: CreateVehicleInput!, $condition: ModelVehicleConditionInput) {
				createVehicle(input: $input, condition: $condition) {
					id
				}
			}
		`

		const response = await gqlUtil.execute({
			input: input,
			condition: expanded_condition
		}, mutation, 'createVehicleForOffice')
		const result = response.data.createVehicle
		console.log('createVehicleForOffice output: ' + JSON.stringify(result))
		return result
	},

	updateVehicleForOffice: async (office_id, username, input, condition) => {
		console.log('updateVehicleForOffice input: ' + [office_id, username, input, condition])
		if (!username) {
			return Promise.reject('Invalid username or unauthenticated user.')
		}
		if (!office_id) {
			return Promise.reject('Invalid office ID')
		}

		//Get caller's office
		const officeDetailsAndPermissions = await module.exports.getUserModelPermissionsForOffice(username, office_id)
		if (!officeDetailsAndPermissions) {
			return Promise.reject('Insufficient permissions')
		}

		//Sanitize input
		const allowed = [
			'id',
			'numberPlate',
			'color',
			'manufacturer',
			'model',
			'vehicle_owner',
			'trim',
			'fuelType',
			'usage',
			'displacement',
			'eurotax',
			'firstRegistrationDate',
			'passengers',
			'purchaseDate',
			'taxableHorsepower',
			'vin',
			'value',
			'file',
		]

		let sanitized_input = Object.keys(input)
			.filter((key) => allowed.includes(key))
			.reduce((obj, key) => {
				obj[key] = input[key]
				return obj
			}, {})

		sanitized_input.officeId = officeDetailsAndPermissions[0].officeId
		sanitized_input.officeName = officeDetailsAndPermissions[0].officeName
		if (!('file' in sanitized_input)) {
			sanitized_input.file = []
		}

		//Expand the condition to require that the caller is also the owner of the profile
		const expanded_condition = {and: [condition || {officeId: {ne: ''}}, {officeId: {eq: office_id}}]}
		const mutation = /* GraphQL */ `
			mutation updateVehicleForOffice($input: UpdateVehicleInput!, $condition: ModelVehicleConditionInput) {
				updateVehicle(input: $input, condition: $condition) {
					id
				}
			}
		`

		const response = await gqlUtil.execute(
			{input: sanitized_input, condition: expanded_condition},
			mutation,
			'updateVehicleForOffice',
		)
		const result = response.data.updateVehicle
		console.log('updateVehicleForOffice output: ' + JSON.stringify(result))
		return result
	},
	getWorkEnvironment: async (username, filter, limit, nextToken) => {
		console.log('getWorkEnvironment input: ' + JSON.stringify([username, filter, limit, nextToken]))
		if (!username) {
			return Promise.reject('Invalid username or unauthenticated user.')
		}
		const query = /* GraphQL */ `
			query getOfficeDetailsAndPermissionsByUsername(
				$username: String!
				$filter: ModelOfficeUserConnectionFilterInput
				$limit: Int
				$nextToken: String
			) {
				listUserProfileByUsername(username: $username) {
					items {
						officeConnections(filter: $filter, limit: $limit, nextToken: $nextToken) {
							items {
								id
								username
								userId
								pagePermissions
								modelPermissions
								preferences
								officeId
								officeName
								employeeType
								office {
								  id
								  officeName
								  ownerUsername
								  address
								  office_email
								  zip_code
								  mobile
								  phone
								  tin
								  office_logo {
									level
									idToken
									filePath
									filename
									contentType
								  }
								  professionStartDate
								  chamberRecordNumber
								  insuranceLicenseExpirationDate
								  civilLiabilityExpirationDate
								  bankAccountInfo
								  files {
									level
									idToken
									filePath
									filename
									contentType
								  }
								  insuranceCompanies {
									name
									code
								  }
								  workforce {
								  	items{
										id
										officeId
										officeName
										userId
										username
										pagePermissions
										modelPermissions
										employeeType
										preferences
								  	}
								  }
								}
							}
						}
					}
				}
			}
		`
		try {
			const response = await gqlUtil.execute({
				username: username,
				filter: filter || {id: {ne: ''}},
				limit: limit || 100,
				nextToken: nextToken || null
			}, query, 'getOfficeDetailsAndPermissionsByUsername')

			let result = response.data.listUserProfileByUsername?.items[0].officeConnections?.items[0]
			if (!result) {
				return Promise.reject('Failed to retrieve Office of user ' + username)
			}

			//Quick page permissions fix
			result.pagePermissions = JSON.parse(result.pagePermissions)
			if (result.office) {
				if (!result?.office?.files) {
					result.office.files = []
				}
				if (!result?.office?.insuranceCompanies) {
					result.office.insuranceCompanies = []
				}
				if (!result?.office?.workforce) {
					result.office.workforce = []
				}
			}
			if (result?.office?.bankAccountInfo) {
				result.office.bankAccountInfo = JSON.parse(result.office.bankAccountInfo)
			}
			result?.office?.workforce?.items.forEach((workforce) => {
				if (workforce.pagePermissions) {
					workforce.pagePermissions = JSON.parse(workforce.pagePermissions)
				}
			})
			console.log('officeAPI.getWorkEnvironment output: ' + JSON.stringify(result))
			return result
		} catch (err) {
			console.error(`officeAPI.getWorkEnvironment unhandled error: ${err}`)
			return Promise.reject(`Unable to retrieve partner summary for user ${username}.`)
		}
	},
	createUnverifiedOffice: async (caller_username, officeInput) => {
		console.log('officeAPI.createUnverifiedOffice input: ' + JSON.stringify([caller_username, officeInput]))

		const query = /* GraphQL */ `
			query getUserProfileByUsername($username: String!) {
				listUserProfileByUsername(username: $username) {
					items {
						id
						username
						role
					}
				}
			}
		`
		const callerUserProfile = await gqlUtil.execute({username: caller_username}, query, 'getUserProfileByUsername')
		if (!callerUserProfile) {
			return Promise.reject(`User profile for sender was not found.`)
		}

		//Check if there is already an Office with this name
		if (callerUserProfile.role !== 'UNKNOWN') {
			return Promise.reject(`User's role is not UNKNOWN.`)
		}

		//Deep copy input
		const createOfficeInput = JSON.parse(JSON.stringify(officeInput));
		if (!createOfficeInput) {
			return Promise.reject('Request has invalid payload.')
		}

		//Add extra fields to the Office
		createOfficeInput.ownerUsername = caller_username
		createOfficeInput.employeesNumberLimit = 0
		createOfficeInput.partnersNumberLimit = 10
		createOfficeInput.insuranceCompanies = []
		createOfficeInput.verified = false
		createOfficeInput.bankAccountInfo = JSON.stringify([])

		//Delete some fields that should only be present in the request and not in the office
		delete createOfficeInput.comments
		delete createOfficeInput.modelPermissions
		delete createOfficeInput.pagePermissions

		//Empty and Null checks
		if (!createOfficeInput.office_email) {
			return Promise.reject('Office e-mail can not be empty.')
		}

		const mutation1 = /* GraphQL */ `
						mutation createOffice($input: CreateOfficeInput!) {
								createOffice(input: $input) {
									id
								}
							}
						`

		let createdOfficeId = null
		try {
			const response = await gqlUtil.execute({input: createOfficeInput}, mutation1, 'createOffice')
			createdOfficeId = response.data.createOffice.id
			if (!createdOfficeId) {
				return Promise.reject('Failed to create new office: ' + response.errors.message)
			}
		} catch (err) {
			console.error('Failed to create new office: ' + JSON.stringify(err))
			return Promise.reject('Failed to create new office: ' + JSON.stringify(err))
		}

		//Create a connection between the new Office and the contractor-manager.
		const createTUCInput = {
			officeId: createdOfficeId,
			officeName: createOfficeInput.officeName,
			userId: callerUserProfile.id,
			username: callerUserProfile.username,
			pagePermissions: JSON.stringify(officeInput.managerPagePermissions),
			modelPermissions: officeInput.managerModelPermissions,
			employeeType: 'MANAGER',
		}

		const mutation2 = /* GraphQL */ `
						mutation createOfficeUserConnection($input: CreateOfficeUserConnectionInput!) {
								createOfficeUserConnection(input: $input) {
									id
								}
							}
						`

		try {
			const createOUCResponse = await gqlUtil.execute({input: createTUCInput}, mutation2, 'createOfficeUserConnection')
			const createOUCResult = createOUCResponse.data.createOfficeUserConnection
			if (!createOUCResult) {
				return Promise.reject('Failed to create new Office-User connection: ' + createOUCResponse.errors.message)
			}
			console.log(`Created OUC: ${JSON.stringify(createOUCResult)}`)
		} catch (err) {
			console.error('Unhandled error in officeAPI.createUnverifiedOffice: ' + JSON.stringify(err))
			return Promise.reject('Failed to create new Office-User connection: ' + JSON.stringify(err))
		}

		//Update role in the UserProfile
		const updateProfileMutation = /* GraphQL */ `
						mutation updateUserProfileDetails($input: UpdateUserProfileInput!) {
							updateUserProfile(input: $input) {
								id
							}
						}
					`
		const upInput = {
			id: callerUserProfile.id,
			role: 'CONTRACTOR',
		}
		const updateUPResponse = await gqlUtil.execute({input: upInput}, updateProfileMutation, 'updateUserProfileDetails')
		const resultUP = updateUPResponse.data.updateUserProfile.id
		if (!resultUP) {
			return Promise.reject('Failed to update Contractor`s UserProfile role.')
		}

		const result = {id: createdOfficeId}
		console.log('officeAPI.createUnverifiedOffice output: ' + JSON.stringify(result))
		return result
	}
}
