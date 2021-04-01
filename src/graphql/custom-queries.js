/* eslint-disable */
// This is an auto generated file and will be overwritten with codegen.
// DO NOT EDIT.
// Please use custom-queries-description.js for editing.

export const echo = /* GraphQL */ `
	query Echo($msg: String!) {
		echo(msg: $msg)
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
				telephone
				surname
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
				telephone
				surname
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
				receiverUsername
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
				receiverUsername
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
export const me = /* GraphQL */ `
	query Me {
		me {
			id
			username
			email
			telephone
			surname
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
			files {
				bucket
				region
				key
				name
			}
			createdAt
			updatedAt
		}
	}
`;

// --------- Custom ---------

