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
export const getContractorUserProfiles = /* GraphQL */ `
	query GetContractorUserProfiles(
		$filter: ModelOfficeUserConnectionFilterInput
		$limit: Int
		$nextToken: String
	) {
		getContractorUserProfiles(
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
						office_logo {
							level
							idToken
							filePath
							filename
							contentType
						}
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
export const getMyUserCalendarEvents = /* GraphQL */ `
	query GetMyUserCalendarEvents(
		$filter: ModelUserCalendarEventFilterInput
		$limit: Int
		$nextToken: String
	) {
		getMyUserCalendarEvents(
			filter: $filter
			limit: $limit
			nextToken: $nextToken
		) {
			items {
				id
				username
				payload
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
				officeId
				officeName
				userId
				username
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
					office_logo {
						level
						idToken
						filePath
						filename
						contentType
					}
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
				pagePermissions
				modelPermissions
				employeeType
				preferences
				createdAt
				updatedAt
			}
			nextToken
		}
	}
`;
export const getPartnerOfficeConnectionsForOfficeId = /* GraphQL */ `
	query GetPartnerOfficeConnectionsForOfficeId(
		$officeId: ID!
		$filter: ModelOfficeAccessConnectionFilterInput
		$limit: Int
		$nextToken: String
	) {
		getPartnerOfficeConnectionsForOfficeId(
			officeId: $officeId
			filter: $filter
			limit: $limit
			nextToken: $nextToken
		) {
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
export const getPartnerSummary = /* GraphQL */ `
	query GetPartnerSummary {
		getPartnerSummary {
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
						items {
							id
							officeId
							officeName
							userId
							username
							pagePermissions
							modelPermissions
							employeeType
							preferences
							createdAt
							updatedAt
						}
						nextToken
					}
				}
			}
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
						office_logo {
							level
							idToken
							filePath
							filename
							contentType
						}
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
		getS3Object(obj: $obj) {
			level
			idToken
			filePath
			filename
			contentType
		}
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
export const getUserProfileByUsername = /* GraphQL */ `
	query GetUserProfileByUsername($username: String) {
		getUserProfileByUsername(username: $username) {
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

