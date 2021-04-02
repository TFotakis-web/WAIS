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
				preferences
				locale
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
				postcode
				doy
				address
				familyStatus
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
				preferences
				locale
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
				createdAt
				updatedAt
			}
			nextToken
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
			}
			preferences
			locale
			files {
				level
				idToken
				filePath
				filename
			}
			createdAt
			updatedAt
		}
	}
`;

// --------- Custom ---------

