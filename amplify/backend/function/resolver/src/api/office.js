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
								}
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
			const result = response.data.listUserProfileByUsername.items
			console.log('officeAPI.getOfficeDetailsAndPermissionsByUsername output: ' + JSON.stringify(result))
			return result
		} catch (err) {
			console.log(`officeAPI.getOfficeDetailsAndPermissionsByUsername unhandled error: ${err}`)
			throw new Error(`Unable to retrieve the details and permissions for user ${username}.`)
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
									username
									email
									telephone
									name
									fathers_name
									address
									zip_code
									role
									city
									createdAt
									family_name
									gender
									id
									locale
									mobile
									preferences
									updatedAt
									tin
									birthdate
								}
							}
							nextToken
						}
					}
				}
			}
		`
		const response = await gqlUtil.execute(
			{ownerUsername: managerUsername, filter: emp_filter, limit: limit || 50, nextToken: nextToken},
			query,
			'getEmployeeTypeUserProfilesForManagerUsername',
		)
		let result = response.data.listOfficeByOwnerUsername.items
		if (result) {
			result = result[0].workforce
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
			throw new Error('Invalid office ID')
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
			throw new Error('Invalid username or unauthenticated user.')
		}
		if (!officeId) {
			throw new Error('Invalid office ID')
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
			throw new Error('Invalid username or unauthenticated user.')
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
			throw new Error('Invalid username or unauthenticated user.')
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
		console.log('officeAPI.updateOfficeDetails input: ' + [username, input, JSON.stringify(condition)])
		if (!username) {
			throw new Error('Invalid username or unauthenticated user.')
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
			'professionStartDate',
		]

		const sanitized_input = Object.keys(input)
			.filter((key) => allowed.includes(key))
			.reduce((obj, key) => {
				obj[key] = input[key]
				return obj
			}, {})

		const allowed_private = ['bankAccountInfo']
		if ('private_data' in sanitized_input) {
			sanitized_input.private_data = Object.keys(sanitized_input.private_data)
				.filter((key) => allowed_private.includes(key))
				.reduce((obj, key) => {
					obj[key] = sanitized_input.private_data[key]
					return obj
				}, {})
		}

		//Expand the condition to require that the caller is also the manager of that office
		const expanded_condition = {and: [condition || {ownerUsername: {ne: ''}}, {ownerUsername: {eq: username}}]}
		const mutation = /* GraphQL */ `
			mutation updateOfficeDetails($input: UpdateOfficeInput!, $condition: ModelOfficeConditionInput) {
				updateOffice(input: $input, condition: $condition) {
					id
				}
			}
		`

		const response = await gqlUtil.execute({
			input: sanitized_input,
			condition: expanded_condition
		}, mutation, 'updateOfficeDetails')
		const result = response.data.updateOffice
		console.log('officeAPI.updateOfficeDetails output: ' + JSON.stringify(result))
		return result
	},

	createVehicleForOffice: async (office_id, username, input, condition) => {
		console.log('createVehicleForOffice input: ' + [office_id, username, input, condition])
		if (!username) {
			throw new Error('Invalid username or unauthenticated user.')
		}
		if (!office_id) {
			throw new Error('Invalid office ID')
		}

		//Get caller's office
		const officeDetailsAndPermissions = await module.exports.getUserModelPermissionsForOffice(username, office_id)
		if (!officeDetailsAndPermissions) {
			throw new Error('Insufficient permissions')
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
			throw new Error('Invalid username or unauthenticated user.')
		}
		if (!office_id) {
			throw new Error('Invalid office ID')
		}

		//Get caller's office
		const officeDetailsAndPermissions = await module.exports.getUserModelPermissionsForOffice(username, office_id)
		if (!officeDetailsAndPermissions) {
			throw new Error('Insufficient permissions')
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
}
