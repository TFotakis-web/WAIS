/* eslint-disable */
// This is an auto generated file and will be overwritten with codegen.
// DO NOT EDIT.
// Please use custom-queries-description.js for editing.

export const echo = `
	query Echo($msg: String!) {
		echo(msg: $msg)
	}
`;
export const getCompanyAccessConnection = `
	query GetCompanyAccessConnection($id: ID!) {
		getCompanyAccessConnection(id: $id) {
			id
			fromId
			fromTradeName
			toId
			toTradeName
			expirationDate
			message
			createdAt
			updatedAt
			from {
				id
				tradeName
				ownerUsername
				address
				office_email
				zip_code
				mobile
				phone
				partnersNumberLimit
				employeesNumberLimit
				verified
				createdAt
				updatedAt
				members
			}
			to {
				id
				tradeName
				ownerUsername
				address
				office_email
				zip_code
				mobile
				phone
				partnersNumberLimit
				employeesNumberLimit
				verified
				createdAt
				updatedAt
				members
			}
		}
	}
`;
export const getContract = `
	query GetContract($id: ID!) {
		getContract(id: $id) {
			id
			contractId
			version
			vehicleNumberPlate
			vehicleId
			voucherId
			customerId
			tradeName
			second_tradeId
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
			}
			createdAt
			updatedAt
			vehicle {
				id
				numberPlate
				tradeName
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
				createdAt
				updatedAt
			}
		}
	}
`;
export const getCustomer = `
	query GetCustomer($id: ID!) {
		getCustomer(id: $id) {
			id
			tin
			tradeName
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
				bucket
				region
				key
				name
			}
			driversLicense {
				LicenseID
				DriversLicenseType
			}
			createdAt
			updatedAt
		}
	}
`;
export const getOffice = `
	query GetOffice($id: ID!) {
		getOffice(id: $id) {
			id
			tradeName
			ownerUsername
			address
			office_email
			zip_code
			mobile
			phone
			partnersNumberLimit
			employeesNumberLimit
			verified
			customers {
				nextToken
			}
			contracts {
				nextToken
			}
			employees {
				nextToken
			}
			contractors {
				nextToken
			}
			partnerOffices {
				nextToken
			}
			createdAt
			updatedAt
			privateData {
				tin
				professionStartDate
				chamberRecordNumber
				insuranceLicenseExpirationDate
				civilLiabilityExpirationDate
				bankAccountInfo
			}
			members
			officeContracts {
				nextToken
			}
			officeCustomers {
				nextToken
			}
			companyConnections {
				nextToken
			}
		}
	}
`;
export const getRequests = `
	query GetRequests($id: ID!) {
		getRequests(id: $id) {
			id
			senderUsername
			senderEmail
			receiverEmail
			type
			payload
			createdAt
			updatedAt
		}
	}
`;
export const getTradeContractConnection = `
	query GetTradeContractConnection($id: ID!) {
		getTradeContractConnection(id: $id) {
			id
			tradeId
			tradeName
			contractId
			ownsContract
			createdAt
			updatedAt
			trade {
				id
				tradeName
				ownerUsername
				address
				office_email
				zip_code
				mobile
				phone
				partnersNumberLimit
				employeesNumberLimit
				verified
				createdAt
				updatedAt
				members
			}
			contract {
				id
				contractId
				version
				vehicleNumberPlate
				vehicleId
				voucherId
				customerId
				tradeName
				second_tradeId
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
				createdAt
				updatedAt
			}
		}
	}
`;
export const getTradeUserConnection = `
	query GetTradeUserConnection($id: ID!) {
		getTradeUserConnection(id: $id) {
			id
			tradeId
			tradeName
			userId
			username
			permissions {
				department
				read
				write
			}
			employeeType
			preferences
			members
			createdAt
			updatedAt
			trade {
				id
				tradeName
				ownerUsername
				address
				office_email
				zip_code
				mobile
				phone
				partnersNumberLimit
				employeesNumberLimit
				verified
				createdAt
				updatedAt
				members
			}
			user {
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
		}
	}
`;
export const getTransactionHistory = `
	query GetTransactionHistory($id: ID!) {
		getTransactionHistory(id: $id) {
			id
			senderUserProfileId
			receiverUserProfileId
			timestamp
			senderUsername
			receiverUsername
			transactionAmount
			createdAt
			updatedAt
			sender {
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
			receiver {
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
		}
	}
`;
export const getUserCalendarEvent = `
	query GetUserCalendarEvent($id: ID!) {
		getUserCalendarEvent(id: $id) {
			id
			username
			createdAt
			payload
			updatedAt
		}
	}
`;
export const getUserProfile = `
	query GetUserProfile($id: ID!) {
		getUserProfile(id: $id) {
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
			tradeCon {
				nextToken
			}
			officeConnections {
				nextToken
			}
			callendarEvents {
				nextToken
			}
			requestsSentByMe {
				nextToken
			}
			requestsForMe {
				nextToken
			}
		}
	}
`;
export const getVehicle = `
	query GetVehicle($id: ID!) {
		getVehicle(id: $id) {
			id
			numberPlate
			tradeName
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
export const listCompanyAccessConnectionByFromId = `
	query ListCompanyAccessConnectionByFromId(
		$fromId: ID
		$toId: ModelIDKeyConditionInput
		$sortDirection: ModelSortDirection
		$filter: ModelCompanyAccessConnectionFilterInput
		$limit: Int
		$nextToken: String
	) {
		listCompanyAccessConnectionByFromId(
			fromId: $fromId
			toId: $toId
			sortDirection: $sortDirection
			filter: $filter
			limit: $limit
			nextToken: $nextToken
		) {
			items {
				id
				fromId
				fromTradeName
				toId
				toTradeName
				expirationDate
				message
				createdAt
				updatedAt
			}
			nextToken
		}
	}
`;
export const listCompanyAccessConnectionByFromTradeName = `
	query ListCompanyAccessConnectionByFromTradeName(
		$fromTradeName: String
		$toTradeName: ModelStringKeyConditionInput
		$sortDirection: ModelSortDirection
		$filter: ModelCompanyAccessConnectionFilterInput
		$limit: Int
		$nextToken: String
	) {
		listCompanyAccessConnectionByFromTradeName(
			fromTradeName: $fromTradeName
			toTradeName: $toTradeName
			sortDirection: $sortDirection
			filter: $filter
			limit: $limit
			nextToken: $nextToken
		) {
			items {
				id
				fromId
				fromTradeName
				toId
				toTradeName
				expirationDate
				message
				createdAt
				updatedAt
			}
			nextToken
		}
	}
`;
export const listCompanyAccessConnectionByToId = `
	query ListCompanyAccessConnectionByToId(
		$toId: ID
		$fromId: ModelIDKeyConditionInput
		$sortDirection: ModelSortDirection
		$filter: ModelCompanyAccessConnectionFilterInput
		$limit: Int
		$nextToken: String
	) {
		listCompanyAccessConnectionByToId(
			toId: $toId
			fromId: $fromId
			sortDirection: $sortDirection
			filter: $filter
			limit: $limit
			nextToken: $nextToken
		) {
			items {
				id
				fromId
				fromTradeName
				toId
				toTradeName
				expirationDate
				message
				createdAt
				updatedAt
			}
			nextToken
		}
	}
`;
export const listCompanyAccessConnectionByToTradeName = `
	query ListCompanyAccessConnectionByToTradeName(
		$toTradeName: String
		$fromTradeName: ModelStringKeyConditionInput
		$sortDirection: ModelSortDirection
		$filter: ModelCompanyAccessConnectionFilterInput
		$limit: Int
		$nextToken: String
	) {
		listCompanyAccessConnectionByToTradeName(
			toTradeName: $toTradeName
			fromTradeName: $fromTradeName
			sortDirection: $sortDirection
			filter: $filter
			limit: $limit
			nextToken: $nextToken
		) {
			items {
				id
				fromId
				fromTradeName
				toId
				toTradeName
				expirationDate
				message
				createdAt
				updatedAt
			}
			nextToken
		}
	}
`;
export const listCompanyAccessConnections = `
	query ListCompanyAccessConnections(
		$filter: ModelCompanyAccessConnectionFilterInput
		$limit: Int
		$nextToken: String
	) {
		listCompanyAccessConnections(
			filter: $filter
			limit: $limit
			nextToken: $nextToken
		) {
			items {
				id
				fromId
				fromTradeName
				toId
				toTradeName
				expirationDate
				message
				createdAt
				updatedAt
			}
			nextToken
		}
	}
`;
export const listContracts = `
	query ListContracts(
		$filter: ModelContractFilterInput
		$limit: Int
		$nextToken: String
	) {
		listContracts(filter: $filter, limit: $limit, nextToken: $nextToken) {
			items {
				id
				contractId
				version
				vehicleNumberPlate
				vehicleId
				voucherId
				customerId
				tradeName
				second_tradeId
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
				createdAt
				updatedAt
			}
			nextToken
		}
	}
`;
export const listContractsByCustomerId = `
	query ListContractsByCustomerId(
		$customerId: String
		$tradeName: ModelStringKeyConditionInput
		$sortDirection: ModelSortDirection
		$filter: ModelContractFilterInput
		$limit: Int
		$nextToken: String
	) {
		listContractsByCustomerId(
			customerId: $customerId
			tradeName: $tradeName
			sortDirection: $sortDirection
			filter: $filter
			limit: $limit
			nextToken: $nextToken
		) {
			items {
				id
				contractId
				version
				vehicleNumberPlate
				vehicleId
				voucherId
				customerId
				tradeName
				second_tradeId
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
				createdAt
				updatedAt
			}
			nextToken
		}
	}
`;
export const listContractsByTradeName = `
	query ListContractsByTradeName(
		$tradeName: String
		$createdAt: ModelStringKeyConditionInput
		$sortDirection: ModelSortDirection
		$filter: ModelContractFilterInput
		$limit: Int
		$nextToken: String
	) {
		listContractsByTradeName(
			tradeName: $tradeName
			createdAt: $createdAt
			sortDirection: $sortDirection
			filter: $filter
			limit: $limit
			nextToken: $nextToken
		) {
			items {
				id
				contractId
				version
				vehicleNumberPlate
				vehicleId
				voucherId
				customerId
				tradeName
				second_tradeId
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
				createdAt
				updatedAt
			}
			nextToken
		}
	}
`;
export const listContractsByVehicleNumberPlates = `
	query ListContractsByVehicleNumberPlates(
		$vehicleNumberPlate: String
		$tradeName: ModelStringKeyConditionInput
		$sortDirection: ModelSortDirection
		$filter: ModelContractFilterInput
		$limit: Int
		$nextToken: String
	) {
		listContractsByVehicleNumberPlates(
			vehicleNumberPlate: $vehicleNumberPlate
			tradeName: $tradeName
			sortDirection: $sortDirection
			filter: $filter
			limit: $limit
			nextToken: $nextToken
		) {
			items {
				id
				contractId
				version
				vehicleNumberPlate
				vehicleId
				voucherId
				customerId
				tradeName
				second_tradeId
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
				createdAt
				updatedAt
			}
			nextToken
		}
	}
`;
export const listCustomers = `
	query ListCustomers(
		$filter: ModelCustomerFilterInput
		$limit: Int
		$nextToken: String
	) {
		listCustomers(filter: $filter, limit: $limit, nextToken: $nextToken) {
			items {
				id
				tin
				tradeName
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
export const listCustomersByTradeName = `
	query ListCustomersByTradeName(
		$tradeName: String
		$firstNameLastName: ModelCustomerByTradeNameCompositeKeyConditionInput
		$sortDirection: ModelSortDirection
		$filter: ModelCustomerFilterInput
		$limit: Int
		$nextToken: String
	) {
		listCustomersByTradeName(
			tradeName: $tradeName
			firstNameLastName: $firstNameLastName
			sortDirection: $sortDirection
			filter: $filter
			limit: $limit
			nextToken: $nextToken
		) {
			items {
				id
				tin
				tradeName
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
export const listOffices = `
	query ListOffices(
		$filter: ModelOfficeFilterInput
		$limit: Int
		$nextToken: String
	) {
		listOffices(filter: $filter, limit: $limit, nextToken: $nextToken) {
			items {
				id
				tradeName
				ownerUsername
				address
				office_email
				zip_code
				mobile
				phone
				partnersNumberLimit
				employeesNumberLimit
				verified
				createdAt
				updatedAt
				members
			}
			nextToken
		}
	}
`;
export const listRequestsByReceiverEmail = `
	query ListRequestsByReceiverEmail(
		$receiverEmail: String
		$sortDirection: ModelSortDirection
		$filter: ModelRequestsFilterInput
		$limit: Int
		$nextToken: String
	) {
		listRequestsByReceiverEmail(
			receiverEmail: $receiverEmail
			sortDirection: $sortDirection
			filter: $filter
			limit: $limit
			nextToken: $nextToken
		) {
			items {
				id
				senderUsername
				senderEmail
				receiverEmail
				type
				payload
				createdAt
				updatedAt
			}
			nextToken
		}
	}
`;
export const listRequestsBySenderEmail = `
	query ListRequestsBySenderEmail(
		$senderEmail: String
		$sortDirection: ModelSortDirection
		$filter: ModelRequestsFilterInput
		$limit: Int
		$nextToken: String
	) {
		listRequestsBySenderEmail(
			senderEmail: $senderEmail
			sortDirection: $sortDirection
			filter: $filter
			limit: $limit
			nextToken: $nextToken
		) {
			items {
				id
				senderUsername
				senderEmail
				receiverEmail
				type
				payload
				createdAt
				updatedAt
			}
			nextToken
		}
	}
`;
export const listRequestss = `
	query ListRequestss(
		$filter: ModelRequestsFilterInput
		$limit: Int
		$nextToken: String
	) {
		listRequestss(filter: $filter, limit: $limit, nextToken: $nextToken) {
			items {
				id
				senderUsername
				senderEmail
				receiverEmail
				type
				payload
				createdAt
				updatedAt
			}
			nextToken
		}
	}
`;
export const listTradeByName = `
	query ListTradeByName(
		$tradeName: String
		$ownerUsername: ModelStringKeyConditionInput
		$sortDirection: ModelSortDirection
		$filter: ModelOfficeFilterInput
		$limit: Int
		$nextToken: String
	) {
		listTradeByName(
			tradeName: $tradeName
			ownerUsername: $ownerUsername
			sortDirection: $sortDirection
			filter: $filter
			limit: $limit
			nextToken: $nextToken
		) {
			items {
				id
				tradeName
				ownerUsername
				address
				office_email
				zip_code
				mobile
				phone
				partnersNumberLimit
				employeesNumberLimit
				verified
				createdAt
				updatedAt
				members
			}
			nextToken
		}
	}
`;
export const listTradeByOfficeEmail = `
	query ListTradeByOfficeEmail(
		$office_email: String
		$sortDirection: ModelSortDirection
		$filter: ModelOfficeFilterInput
		$limit: Int
		$nextToken: String
	) {
		listTradeByOfficeEmail(
			office_email: $office_email
			sortDirection: $sortDirection
			filter: $filter
			limit: $limit
			nextToken: $nextToken
		) {
			items {
				id
				tradeName
				ownerUsername
				address
				office_email
				zip_code
				mobile
				phone
				partnersNumberLimit
				employeesNumberLimit
				verified
				createdAt
				updatedAt
				members
			}
			nextToken
		}
	}
`;
export const listTradeByOwnerUsername = `
	query ListTradeByOwnerUsername(
		$ownerUsername: String
		$tradeName: ModelStringKeyConditionInput
		$sortDirection: ModelSortDirection
		$filter: ModelOfficeFilterInput
		$limit: Int
		$nextToken: String
	) {
		listTradeByOwnerUsername(
			ownerUsername: $ownerUsername
			tradeName: $tradeName
			sortDirection: $sortDirection
			filter: $filter
			limit: $limit
			nextToken: $nextToken
		) {
			items {
				id
				tradeName
				ownerUsername
				address
				office_email
				zip_code
				mobile
				phone
				partnersNumberLimit
				employeesNumberLimit
				verified
				createdAt
				updatedAt
				members
			}
			nextToken
		}
	}
`;
export const listTradeContractConnectionByContractId = `
	query ListTradeContractConnectionByContractId(
		$contractId: ID
		$tradeId: ModelIDKeyConditionInput
		$sortDirection: ModelSortDirection
		$filter: ModelTradeContractConnectionFilterInput
		$limit: Int
		$nextToken: String
	) {
		listTradeContractConnectionByContractId(
			contractId: $contractId
			tradeId: $tradeId
			sortDirection: $sortDirection
			filter: $filter
			limit: $limit
			nextToken: $nextToken
		) {
			items {
				id
				tradeId
				tradeName
				contractId
				ownsContract
				createdAt
				updatedAt
			}
			nextToken
		}
	}
`;
export const listTradeContractConnectionByTradeId = `
	query ListTradeContractConnectionByTradeId(
		$tradeId: ID
		$tradeName: ModelStringKeyConditionInput
		$sortDirection: ModelSortDirection
		$filter: ModelTradeContractConnectionFilterInput
		$limit: Int
		$nextToken: String
	) {
		listTradeContractConnectionByTradeId(
			tradeId: $tradeId
			tradeName: $tradeName
			sortDirection: $sortDirection
			filter: $filter
			limit: $limit
			nextToken: $nextToken
		) {
			items {
				id
				tradeId
				tradeName
				contractId
				ownsContract
				createdAt
				updatedAt
			}
			nextToken
		}
	}
`;
export const listTradeContractConnectionByTradeName = `
	query ListTradeContractConnectionByTradeName(
		$tradeName: String
		$tradeId: ModelIDKeyConditionInput
		$sortDirection: ModelSortDirection
		$filter: ModelTradeContractConnectionFilterInput
		$limit: Int
		$nextToken: String
	) {
		listTradeContractConnectionByTradeName(
			tradeName: $tradeName
			tradeId: $tradeId
			sortDirection: $sortDirection
			filter: $filter
			limit: $limit
			nextToken: $nextToken
		) {
			items {
				id
				tradeId
				tradeName
				contractId
				ownsContract
				createdAt
				updatedAt
			}
			nextToken
		}
	}
`;
export const listTradeContractConnections = `
	query ListTradeContractConnections(
		$filter: ModelTradeContractConnectionFilterInput
		$limit: Int
		$nextToken: String
	) {
		listTradeContractConnections(
			filter: $filter
			limit: $limit
			nextToken: $nextToken
		) {
			items {
				id
				tradeId
				tradeName
				contractId
				ownsContract
				createdAt
				updatedAt
			}
			nextToken
		}
	}
`;
export const listTradeUserConnections = `
	query ListTradeUserConnections(
		$filter: ModelTradeUserConnectionFilterInput
		$limit: Int
		$nextToken: String
	) {
		listTradeUserConnections(
			filter: $filter
			limit: $limit
			nextToken: $nextToken
		) {
			items {
				id
				tradeId
				tradeName
				userId
				username
				employeeType
				preferences
				members
				createdAt
				updatedAt
			}
			nextToken
		}
	}
`;
export const listTradeUserConnectionsByEmployeeType = `
	query ListTradeUserConnectionsByEmployeeType(
		$employeeType: EmployeeType
		$usernameTradeName: ModelTradeUserConnectionByEmployeeTypeCompositeKeyConditionInput
		$sortDirection: ModelSortDirection
		$filter: ModelTradeUserConnectionFilterInput
		$limit: Int
		$nextToken: String
	) {
		listTradeUserConnectionsByEmployeeType(
			employeeType: $employeeType
			usernameTradeName: $usernameTradeName
			sortDirection: $sortDirection
			filter: $filter
			limit: $limit
			nextToken: $nextToken
		) {
			items {
				id
				tradeId
				tradeName
				userId
				username
				employeeType
				preferences
				members
				createdAt
				updatedAt
			}
			nextToken
		}
	}
`;
export const listTradeUserConnectionsByTradeAndUser = `
	query ListTradeUserConnectionsByTradeAndUser(
		$tradeName: String
		$username: ModelStringKeyConditionInput
		$sortDirection: ModelSortDirection
		$filter: ModelTradeUserConnectionFilterInput
		$limit: Int
		$nextToken: String
	) {
		listTradeUserConnectionsByTradeAndUser(
			tradeName: $tradeName
			username: $username
			sortDirection: $sortDirection
			filter: $filter
			limit: $limit
			nextToken: $nextToken
		) {
			items {
				id
				tradeId
				tradeName
				userId
				username
				employeeType
				preferences
				members
				createdAt
				updatedAt
			}
			nextToken
		}
	}
`;
export const listTradeUserConnectionsByTradeName = `
	query ListTradeUserConnectionsByTradeName(
		$tradeName: String
		$userId: ModelIDKeyConditionInput
		$sortDirection: ModelSortDirection
		$filter: ModelTradeUserConnectionFilterInput
		$limit: Int
		$nextToken: String
	) {
		listTradeUserConnectionsByTradeName(
			tradeName: $tradeName
			userId: $userId
			sortDirection: $sortDirection
			filter: $filter
			limit: $limit
			nextToken: $nextToken
		) {
			items {
				id
				tradeId
				tradeName
				userId
				username
				employeeType
				preferences
				members
				createdAt
				updatedAt
			}
			nextToken
		}
	}
`;
export const listTradeUserConnectionsByUserId = `
	query ListTradeUserConnectionsByUserId(
		$userId: ID
		$tradeName: ModelStringKeyConditionInput
		$sortDirection: ModelSortDirection
		$filter: ModelTradeUserConnectionFilterInput
		$limit: Int
		$nextToken: String
	) {
		listTradeUserConnectionsByUserId(
			userId: $userId
			tradeName: $tradeName
			sortDirection: $sortDirection
			filter: $filter
			limit: $limit
			nextToken: $nextToken
		) {
			items {
				id
				tradeId
				tradeName
				userId
				username
				employeeType
				preferences
				members
				createdAt
				updatedAt
			}
			nextToken
		}
	}
`;
export const listTradeUserConnectionsByUsername = `
	query ListTradeUserConnectionsByUsername(
		$username: String
		$tradeName: ModelStringKeyConditionInput
		$sortDirection: ModelSortDirection
		$filter: ModelTradeUserConnectionFilterInput
		$limit: Int
		$nextToken: String
	) {
		listTradeUserConnectionsByUsername(
			username: $username
			tradeName: $tradeName
			sortDirection: $sortDirection
			filter: $filter
			limit: $limit
			nextToken: $nextToken
		) {
			items {
				id
				tradeId
				tradeName
				userId
				username
				employeeType
				preferences
				members
				createdAt
				updatedAt
			}
			nextToken
		}
	}
`;
export const listTransactionHistorybyReceiverUsername = `
	query ListTransactionHistorybyReceiverUsername(
		$receiverUsername: String
		$timestampSenderUsername: ModelTransactionHistoryByReceiverUsernameCompositeKeyConditionInput
		$sortDirection: ModelSortDirection
		$filter: ModelTransactionHistoryFilterInput
		$limit: Int
		$nextToken: String
	) {
		listTransactionHistorybyReceiverUsername(
			receiverUsername: $receiverUsername
			timestampSenderUsername: $timestampSenderUsername
			sortDirection: $sortDirection
			filter: $filter
			limit: $limit
			nextToken: $nextToken
		) {
			items {
				id
				senderUserProfileId
				receiverUserProfileId
				timestamp
				senderUsername
				receiverUsername
				transactionAmount
				createdAt
				updatedAt
			}
			nextToken
		}
	}
`;
export const listTransactionHistorybySenderUsername = `
	query ListTransactionHistorybySenderUsername(
		$senderUsername: String
		$timestampReceiverUsername: ModelTransactionHistoryBySenderUsernameCompositeKeyConditionInput
		$sortDirection: ModelSortDirection
		$filter: ModelTransactionHistoryFilterInput
		$limit: Int
		$nextToken: String
	) {
		listTransactionHistorybySenderUsername(
			senderUsername: $senderUsername
			timestampReceiverUsername: $timestampReceiverUsername
			sortDirection: $sortDirection
			filter: $filter
			limit: $limit
			nextToken: $nextToken
		) {
			items {
				id
				senderUserProfileId
				receiverUserProfileId
				timestamp
				senderUsername
				receiverUsername
				transactionAmount
				createdAt
				updatedAt
			}
			nextToken
		}
	}
`;
export const listTransactionHistorys = `
	query ListTransactionHistorys(
		$filter: ModelTransactionHistoryFilterInput
		$limit: Int
		$nextToken: String
	) {
		listTransactionHistorys(
			filter: $filter
			limit: $limit
			nextToken: $nextToken
		) {
			items {
				id
				senderUserProfileId
				receiverUserProfileId
				timestamp
				senderUsername
				receiverUsername
				transactionAmount
				createdAt
				updatedAt
			}
			nextToken
		}
	}
`;
export const listUserCalendarEvents = `
	query ListUserCalendarEvents(
		$filter: ModelUserCalendarEventFilterInput
		$limit: Int
		$nextToken: String
	) {
		listUserCalendarEvents(
			filter: $filter
			limit: $limit
			nextToken: $nextToken
		) {
			items {
				id
				username
				createdAt
				payload
				updatedAt
			}
			nextToken
		}
	}
`;
export const listUserCalendarEventsByUsername = `
	query ListUserCalendarEventsByUsername(
		$username: String
		$createdAt: ModelStringKeyConditionInput
		$sortDirection: ModelSortDirection
		$filter: ModelUserCalendarEventFilterInput
		$limit: Int
		$nextToken: String
	) {
		listUserCalendarEventsByUsername(
			username: $username
			createdAt: $createdAt
			sortDirection: $sortDirection
			filter: $filter
			limit: $limit
			nextToken: $nextToken
		) {
			items {
				id
				username
				createdAt
				payload
				updatedAt
			}
			nextToken
		}
	}
`;
export const listUserProfileByEmail = `
	query ListUserProfileByEmail(
		$email: String
		$sortDirection: ModelSortDirection
		$filter: ModelUserProfileFilterInput
		$limit: Int
		$nextToken: String
	) {
		listUserProfileByEmail(
			email: $email
			sortDirection: $sortDirection
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
export const listUserProfileByUsername = `
	query ListUserProfileByUsername(
		$username: String
		$sortDirection: ModelSortDirection
		$filter: ModelUserProfileFilterInput
		$limit: Int
		$nextToken: String
	) {
		listUserProfileByUsername(
			username: $username
			sortDirection: $sortDirection
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
export const listUserProfiles = `
	query ListUserProfiles(
		$filter: ModelUserProfileFilterInput
		$limit: Int
		$nextToken: String
	) {
		listUserProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
export const listVehicles = `
	query ListVehicles(
		$filter: ModelVehicleFilterInput
		$limit: Int
		$nextToken: String
	) {
		listVehicles(filter: $filter, limit: $limit, nextToken: $nextToken) {
			items {
				id
				numberPlate
				tradeName
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
				createdAt
				updatedAt
			}
			nextToken
		}
	}
`;
export const listVehiclesByOwner = `
	query ListVehiclesByOwner(
		$vehicle_owner: String
		$tradeName: ModelStringKeyConditionInput
		$sortDirection: ModelSortDirection
		$filter: ModelVehicleFilterInput
		$limit: Int
		$nextToken: String
	) {
		listVehiclesByOwner(
			vehicle_owner: $vehicle_owner
			tradeName: $tradeName
			sortDirection: $sortDirection
			filter: $filter
			limit: $limit
			nextToken: $nextToken
		) {
			items {
				id
				numberPlate
				tradeName
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
				createdAt
				updatedAt
			}
			nextToken
		}
	}
`;
export const listVehiclesByTradeName = `
	query ListVehiclesByTradeName(
		$tradeName: String
		$numberPlate: ModelStringKeyConditionInput
		$sortDirection: ModelSortDirection
		$filter: ModelVehicleFilterInput
		$limit: Int
		$nextToken: String
	) {
		listVehiclesByTradeName(
			tradeName: $tradeName
			numberPlate: $numberPlate
			sortDirection: $sortDirection
			filter: $filter
			limit: $limit
			nextToken: $nextToken
		) {
			items {
				id
				numberPlate
				tradeName
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
				createdAt
				updatedAt
			}
			nextToken
		}
	}
`;
export const me = `
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
			tradeCon {
				nextToken
			}
			officeConnections {
				nextToken
			}
			callendarEvents {
				nextToken
			}
			requestsSentByMe {
				nextToken
			}
			requestsForMe {
				nextToken
			}
		}
	}
`;
export const user = `
	query User($username: String!) {
		user(username: $username) {
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
			tradeCon {
				nextToken
			}
			officeConnections {
				nextToken
			}
			callendarEvents {
				nextToken
			}
			requestsSentByMe {
				nextToken
			}
			requestsForMe {
				nextToken
			}
		}
	}
`;

// --------- Custom ---------

export const getRequestsSimple = `
	query GetRequests($id: ID!) {
		getRequests(id: $id) {
			id
			senderUsername
			senderEmail
			receiverEmail
			type
			payload
			createdAt
			updatedAt
		}
	}
`;
export const listRequestssSimple = `
	query ListRequestss(
		$filter: ModelRequestsFilterInput
		$limit: Int
		$nextToken: String
	) {
		listRequestss(filter: $filter, limit: $limit, nextToken: $nextToken) {
			items {
				id
				senderUsername
				senderEmail
				receiverEmail
				type
				payload
				createdAt
				updatedAt
			}
			nextToken
		}
	}
`;
export const listRequestsBySenderEmailSimple = `
	query ListRequestsBySenderEmail(
		$senderEmail: String
		$sortDirection: ModelSortDirection
		$filter: ModelRequestsFilterInput
		$limit: Int
		$nextToken: String
	) {
		listRequestsBySenderEmail(
			senderEmail: $senderEmail
			sortDirection: $sortDirection
			filter: $filter
			limit: $limit
			nextToken: $nextToken
		) {
			items {
				id
				senderUsername
				senderEmail
				receiverEmail
				type
				payload
				createdAt
				updatedAt
			}
			nextToken
		}
	}
`;
export const listRequestsByReceiverEmailSimple = `
	query ListRequestsByReceiverEmail(
		$receiverEmail: String
		$sortDirection: ModelSortDirection
		$filter: ModelRequestsFilterInput
		$limit: Int
		$nextToken: String
	) {
		listRequestsByReceiverEmail(
			receiverEmail: $receiverEmail
			sortDirection: $sortDirection
			filter: $filter
			limit: $limit
			nextToken: $nextToken
		) {
			items {
				id
				senderUsername
				senderEmail
				receiverEmail
				type
				payload
				createdAt
				updatedAt
			}
			nextToken
		}
	}
`;
