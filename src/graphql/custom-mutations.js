/* eslint-disable */
// This is an auto generated file and will be overwritten with codegen.
// DO NOT EDIT.
// Please use custom-mutations-description.js for editing.

export const createContractForOffice = /* GraphQL */ `
	mutation CreateContractForOffice(
		$officeId: ID!
		$input: CreateContractInput!
		$condition: ModelContractConditionInput
	) {
		createContractForOffice(
			officeId: $officeId
			input: $input
			condition: $condition
		) {
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
			driversLicense {
				LicenseID
				DriversLicenseType
				Category {
					category
					issueDate
					expiresAt
				}
			}
			createdAt
			updatedAt
		}
	}
`;
export const createCustomerForOffice = /* GraphQL */ `
	mutation CreateCustomerForOffice(
		$officeId: ID!
		$input: CreateCustomerInput!
		$condition: ModelCustomerConditionInput
	) {
		createCustomerForOffice(
			officeId: $officeId
			input: $input
			condition: $condition
		) {
			id
			tin
			officeName
			firstName
			lastName
			fathersName
			birthDate
			gender
			email
			mobile
			zip_code
			doy
			address
			familyStatus
			files {
				level
				idToken
				filePath
				filename
				contentType
			}
			driversLicense {
				LicenseID
				DriversLicenseType
				Category {
					category
					issueDate
					expiresAt
				}
			}
			createdAt
			updatedAt
		}
	}
`;
export const createInviteContractorToOfficeRequest = /* GraphQL */ `
	mutation CreateInviteContractorToOfficeRequest(
		$input: InviteContractorRequestPayloadInput!
	) {
		createInviteContractorToOfficeRequest(input: $input) {
			id
			senderUsername
			senderEmail
			receiverEmail
			type
			payload {
				createOfficePayload {
					officeName
					address
					office_email
					zip_code
					mobile
					phone
					tin
					professionStartDate
					chamberRecordNumber
					insuranceLicenseExpirationDate
					civilLiabilityExpirationDate
					comments
					files {
						level
						idToken
						filePath
						filename
						contentType
					}
				}
				createOfficeConnectionPayload {
					manager_email
				}
				inviteEmployeeToOfficePayload {
					email
					empModelPermissions
					empPagePermissions
				}
				inviteContractorToOfficePayload {
					ctrModelPermissions
					ctrPagePermissions
					email
				}
			}
			createdAt
			updatedAt
		}
	}
`;
export const createInviteEmployeeToOfficeRequest = /* GraphQL */ `
	mutation CreateInviteEmployeeToOfficeRequest(
		$input: InviteEmployeeRequestPayloadInput!
	) {
		createInviteEmployeeToOfficeRequest(input: $input) {
			id
			senderUsername
			senderEmail
			receiverEmail
			type
			payload {
				createOfficePayload {
					officeName
					address
					office_email
					zip_code
					mobile
					phone
					tin
					professionStartDate
					chamberRecordNumber
					insuranceLicenseExpirationDate
					civilLiabilityExpirationDate
					comments
					files {
						level
						idToken
						filePath
						filename
						contentType
					}
				}
				createOfficeConnectionPayload {
					manager_email
				}
				inviteEmployeeToOfficePayload {
					email
					empModelPermissions
					empPagePermissions
				}
				inviteContractorToOfficePayload {
					ctrModelPermissions
					ctrPagePermissions
					email
				}
			}
			createdAt
			updatedAt
		}
	}
`;
export const createOfficeConnectionRequest = /* GraphQL */ `
	mutation CreateOfficeConnectionRequest(
		$input: OfficeConnectionRequestPayloadInput!
	) {
		createOfficeConnectionRequest(input: $input) {
			id
			senderUsername
			senderEmail
			receiverEmail
			type
			payload {
				createOfficePayload {
					officeName
					address
					office_email
					zip_code
					mobile
					phone
					tin
					professionStartDate
					chamberRecordNumber
					insuranceLicenseExpirationDate
					civilLiabilityExpirationDate
					comments
					files {
						level
						idToken
						filePath
						filename
						contentType
					}
				}
				createOfficeConnectionPayload {
					manager_email
				}
				inviteEmployeeToOfficePayload {
					email
					empModelPermissions
					empPagePermissions
				}
				inviteContractorToOfficePayload {
					ctrModelPermissions
					ctrPagePermissions
					email
				}
			}
			createdAt
			updatedAt
		}
	}
`;
export const createOfficeRequest = /* GraphQL */ `
	mutation CreateOfficeRequest($input: CreateOfficeRequestPayloadInput!) {
		createOfficeRequest(input: $input) {
			id
			senderUsername
			senderEmail
			receiverEmail
			type
			payload {
				createOfficePayload {
					officeName
					address
					office_email
					zip_code
					mobile
					phone
					tin
					professionStartDate
					chamberRecordNumber
					insuranceLicenseExpirationDate
					civilLiabilityExpirationDate
					comments
					files {
						level
						idToken
						filePath
						filename
						contentType
					}
				}
				createOfficeConnectionPayload {
					manager_email
				}
				inviteEmployeeToOfficePayload {
					email
					empModelPermissions
					empPagePermissions
				}
				inviteContractorToOfficePayload {
					ctrModelPermissions
					ctrPagePermissions
					email
				}
			}
			createdAt
			updatedAt
		}
	}
`;
export const createVehicleForOffice = /* GraphQL */ `
	mutation CreateVehicleForOffice(
		$officeId: ID!
		$input: CreateVehicleInput!
		$condition: ModelVehicleConditionInput
	) {
		createVehicleForOffice(
			officeId: $officeId
			input: $input
			condition: $condition
		) {
			id
			numberPlate
			officeId
			officeName
			color
			manufacturer
			model
			vehicle_owner
			trim
			fuelType
			usage
			displacement
			eurotax
			firstRegistrationDate
			passengers
			purchaseDate
			taxableHorsepower
			vin
			value
			file {
				level
				idToken
				filePath
				filename
				contentType
			}
			createdAt
			updatedAt
		}
	}
`;
export const deleteContractForOffice = /* GraphQL */ `
	mutation DeleteContractForOffice(
		$officeId: ID!
		$input: DeleteContractInput!
		$condition: ModelContractConditionInput
	) {
		deleteContractForOffice(
			officeId: $officeId
			input: $input
			condition: $condition
		) {
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
			driversLicense {
				LicenseID
				DriversLicenseType
				Category {
					category
					issueDate
					expiresAt
				}
			}
			createdAt
			updatedAt
		}
	}
`;
export const deleteContractorForOffice = /* GraphQL */ `
	mutation DeleteContractorForOffice(
		$officeId: ID!
		$contractorUsername: String!
	) {
		deleteContractorForOffice(
			officeId: $officeId
			contractorUsername: $contractorUsername
		) {
			id
		}
	}
`;
export const deleteCustomerForOffice = /* GraphQL */ `
	mutation DeleteCustomerForOffice(
		$officeId: ID!
		$input: DeleteCustomerInput!
		$condition: ModelCustomerConditionInput
	) {
		deleteCustomerForOffice(
			officeId: $officeId
			input: $input
			condition: $condition
		) {
			id
			tin
			officeName
			firstName
			lastName
			fathersName
			birthDate
			gender
			email
			mobile
			zip_code
			doy
			address
			familyStatus
			files {
				level
				idToken
				filePath
				filename
				contentType
			}
			driversLicense {
				LicenseID
				DriversLicenseType
				Category {
					category
					issueDate
					expiresAt
				}
			}
			createdAt
			updatedAt
		}
	}
`;
export const deleteEmployeeForOffice = /* GraphQL */ `
	mutation DeleteEmployeeForOffice($officeId: ID!, $empUsername: String!) {
		deleteEmployeeForOffice(officeId: $officeId, empUsername: $empUsername) {
			id
		}
	}
`;
export const deleteRequestsSentByMe = /* GraphQL */ `
	mutation DeleteRequestsSentByMe(
		$input: DeleteRequestsInput!
		$condition: ModelRequestsConditionInput
	) {
		deleteRequestsSentByMe(input: $input, condition: $condition) {
			id
		}
	}
`;
export const deleteVehicleForOffice = /* GraphQL */ `
	mutation DeleteVehicleForOffice(
		$officeId: ID!
		$input: DeleteVehicleInput!
		$condition: ModelVehicleConditionInput
	) {
		deleteVehicleForOffice(
			officeId: $officeId
			input: $input
			condition: $condition
		) {
			id
			numberPlate
			officeId
			officeName
			color
			manufacturer
			model
			vehicle_owner
			trim
			fuelType
			usage
			displacement
			eurotax
			firstRegistrationDate
			passengers
			purchaseDate
			taxableHorsepower
			vin
			value
			file {
				level
				idToken
				filePath
				filename
				contentType
			}
			createdAt
			updatedAt
		}
	}
`;
export const resolveRequest = /* GraphQL */ `
	mutation ResolveRequest(
		$requestId: ID!
		$decision: RequestDecision!
		$payload: ResolveRequestPayloadInput!
	) {
		resolveRequest(
			requestId: $requestId
			decision: $decision
			payload: $payload
		) {
			id
		}
	}
`;
export const updateContractForOffice = /* GraphQL */ `
	mutation UpdateContractForOffice(
		$officeId: ID!
		$input: UpdateContractInput!
		$condition: ModelContractConditionInput
	) {
		updateContractForOffice(
			officeId: $officeId
			input: $input
			condition: $condition
		) {
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
			driversLicense {
				LicenseID
				DriversLicenseType
				Category {
					category
					issueDate
					expiresAt
				}
			}
			createdAt
			updatedAt
		}
	}
`;
export const updateContractorModelPermissionsForOffice = /* GraphQL */ `
	mutation UpdateContractorModelPermissionsForOffice(
		$officeId: ID!
		$contractorUsername: String!
		$modelPermissions: [ModelPermission]!
	) {
		updateContractorModelPermissionsForOffice(
			officeId: $officeId
			contractorUsername: $contractorUsername
			modelPermissions: $modelPermissions
		) {
			id
		}
	}
`;
export const updateContractorPagePermissionsForOffice = /* GraphQL */ `
	mutation UpdateContractorPagePermissionsForOffice(
		$officeId: ID!
		$contractorUsername: String!
		$pagePermissions: AWSJSON!
	) {
		updateContractorPagePermissionsForOffice(
			officeId: $officeId
			contractorUsername: $contractorUsername
			pagePermissions: $pagePermissions
		) {
			id
		}
	}
`;
export const updateCustomerForOffice = /* GraphQL */ `
	mutation UpdateCustomerForOffice(
		$officeId: ID!
		$input: UpdateCustomerInput!
		$condition: ModelCustomerConditionInput
	) {
		updateCustomerForOffice(
			officeId: $officeId
			input: $input
			condition: $condition
		) {
			id
			tin
			officeName
			firstName
			lastName
			fathersName
			birthDate
			gender
			email
			mobile
			zip_code
			doy
			address
			familyStatus
			files {
				level
				idToken
				filePath
				filename
				contentType
			}
			driversLicense {
				LicenseID
				DriversLicenseType
				Category {
					category
					issueDate
					expiresAt
				}
			}
			createdAt
			updatedAt
		}
	}
`;
export const updateEmployeeModelPermissionsForOffice = /* GraphQL */ `
	mutation UpdateEmployeeModelPermissionsForOffice(
		$officeId: ID!
		$empUsername: String!
		$modelPermissions: [ModelPermission]!
	) {
		updateEmployeeModelPermissionsForOffice(
			officeId: $officeId
			empUsername: $empUsername
			modelPermissions: $modelPermissions
		) {
			id
		}
	}
`;
export const updateEmployeePagePermissionsForOffice = /* GraphQL */ `
	mutation UpdateEmployeePagePermissionsForOffice(
		$officeId: ID!
		$empUsername: String!
		$pagePermissions: AWSJSON!
	) {
		updateEmployeePagePermissionsForOffice(
			officeId: $officeId
			empUsername: $empUsername
			pagePermissions: $pagePermissions
		) {
			id
		}
	}
`;
export const updateOfficeDetails = /* GraphQL */ `
	mutation UpdateOfficeDetails(
		$input: UpdateOfficeInput!
		$condition: ModelOfficeConditionInput
	) {
		updateOfficeDetails(input: $input, condition: $condition) {
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
	}
`;
export const updateUserProfileDetails = /* GraphQL */ `
	mutation UpdateUserProfileDetails(
		$input: UpdateUserProfileInput!
		$condition: ModelUserProfileConditionInput
	) {
		updateUserProfileDetails(input: $input, condition: $condition) {
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
			createdAt
			updatedAt
		}
	}
`;
export const updateVehicleForOffice = /* GraphQL */ `
	mutation UpdateVehicleForOffice(
		$officeId: ID!
		$input: UpdateVehicleInput!
		$condition: ModelVehicleConditionInput
	) {
		updateVehicleForOffice(
			officeId: $officeId
			input: $input
			condition: $condition
		) {
			id
			numberPlate
			officeId
			officeName
			color
			manufacturer
			model
			vehicle_owner
			trim
			fuelType
			usage
			displacement
			eurotax
			firstRegistrationDate
			passengers
			purchaseDate
			taxableHorsepower
			vin
			value
			file {
				level
				idToken
				filePath
				filename
				contentType
			}
			createdAt
			updatedAt
		}
	}
`;
