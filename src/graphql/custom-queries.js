/* eslint-disable */
// This is an auto generated file and will be overwritten with codegen.
// DO NOT EDIT.
// Please use custom-queries-description.js for editing.

export const echo = /* GraphQL */ `
	query Echo($msg: String!) {
		echo(msg: $msg)
	}
`;
export const getAvailableInsuranceCompanies = /* GraphQL */ `
	query GetAvailableInsuranceCompanies {
		getAvailableInsuranceCompanies {
			id
			officeName
			insuranceCompanies {
				name
				code
			}
		}
	}
`;
export const getContractsForOfficeId = /* GraphQL */ `
	query GetContractsForOfficeId(
		$officeId: ID!
		$filter: ModelContractFilterInput
		$limit: Int
		$nextToken: String
	) {
		getContractsForOfficeId(
			officeId: $officeId
			filter: $filter
			limit: $limit
			nextToken: $nextToken
		) {
			items {
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
				postcode
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
			nextToken
		}
	}
`;
export const getCustomersForOfficeId = /* GraphQL */ `
	query GetCustomersForOfficeId(
		$officeId: ID!
		$filter: ModelCustomerFilterInput
		$limit: Int
		$nextToken: String
	) {
		getCustomersForOfficeId(
			officeId: $officeId
			filter: $filter
			limit: $limit
			nextToken: $nextToken
		) {
			items {
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
				postcode
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
			nextToken
		}
	}
`;
export const getEmployeeUserProfiles = /* GraphQL */ `
	query GetEmployeeUserProfiles(
		$filter: ModelOfficeUserConnectionFilterInput
		$limit: Int
		$nextToken: String
	) {
		getEmployeeUserProfiles(
			filter: $filter
			limit: $limit
			nextToken: $nextToken
		) {
			items {
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
			nextToken
		}
	}
`;
export const getMySentRequests = /* GraphQL */ `
	query GetMySentRequests(
		$filter: ModelRequestsFilterInput
		$limit: Int
		$nextToken: String
	) {
		getMySentRequests(filter: $filter, limit: $limit, nextToken: $nextToken) {
			items {
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
			nextToken
		}
	}
`;
export const getOfficesIWorkIn = /* GraphQL */ `
	query GetOfficesIWorkIn(
		$filter: ModelOfficeFilterInput
		$limit: Int
		$nextToken: String
	) {
		getOfficesIWorkIn(filter: $filter, limit: $limit, nextToken: $nextToken) {
			items {
				id
				fromId
				fromOfficeName
				toId
				toOfficeName
				expirationDate
				message
				createdAt
				updatedAt
			}
			nextToken
		}
	}
`;
export const getRequestsForMe = /* GraphQL */ `
	query GetRequestsForMe(
		$filter: ModelRequestsFilterInput
		$limit: Int
		$nextToken: String
	) {
		getRequestsForMe(filter: $filter, limit: $limit, nextToken: $nextToken) {
			items {
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
			nextToken
		}
	}
`;
export const getS3Object = /* GraphQL */ `
	query GetS3Object($obj: S3ObjectInput) {
		getS3Object(obj: $obj)
	}
`;
export const getUserModelPermissionsForOffice = /* GraphQL */ `
	query GetUserModelPermissionsForOffice($officeId: ID!) {
		getUserModelPermissionsForOffice(officeId: $officeId)
	}
`;
export const getUserPagePermissionsForOffice = /* GraphQL */ `
	query GetUserPagePermissionsForOffice($officeId: ID!) {
		getUserPagePermissionsForOffice(officeId: $officeId)
	}
`;
export const getUserRole = /* GraphQL */ `
	query GetUserRole {
		getUserRole
	}
`;
export const me = /* GraphQL */ `
	query Me {
		me {
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

// --------- Custom ---------

