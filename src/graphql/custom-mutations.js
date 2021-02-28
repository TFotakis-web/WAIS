/* eslint-disable */
// This is an auto generated file and will be overwritten with codegen.
// DO NOT EDIT.
// Please use custom-mutations-description.js for editing.

export const createCompanyAccessConnection = `
	mutation CreateCompanyAccessConnection(
		$input: CreateCompanyAccessConnectionInput!
		$condition: ModelCompanyAccessConnectionConditionInput
	) {
		createCompanyAccessConnection(input: $input, condition: $condition) {
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
	}
`;
export const createContract = `
	mutation CreateContract(
		$input: CreateContractInput!
		$condition: ModelContractConditionInput
	) {
		createContract(input: $input, condition: $condition) {
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
				Category {
					category
					issueDate
					expiresAt
				}
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
	}
`;
export const createCustomer = `
	mutation CreateCustomer(
		$input: CreateCustomerInput!
		$condition: ModelCustomerConditionInput
	) {
		createCustomer(input: $input, condition: $condition) {
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
export const createOffice = `
	mutation CreateOffice(
		$input: CreateOfficeInput!
		$condition: ModelOfficeConditionInput
	) {
		createOffice(input: $input, condition: $condition) {
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
			contracts {
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
			employees {
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
			contractors {
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
			partnerOffices {
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
			createdAt
			updatedAt
			privateData {
				tin
				professionStartDate
				chamberRecordNumber
				insuranceLicenseExpirationDate
				civilLiabilityExpirationDate
				bankAccountInfo
				files {
					bucket
					region
					key
					name
				}
			}
			members
			officeContracts {
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
			officeCustomers {
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
			companyConnections {
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
	}
`;
export const createRequests = `
	mutation CreateRequests(
		$input: CreateRequestsInput!
		$condition: ModelRequestsConditionInput
	) {
		createRequests(input: $input, condition: $condition) {
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
export const createTradeContractConnection = `
	mutation CreateTradeContractConnection(
		$input: CreateTradeContractConnectionInput!
		$condition: ModelTradeContractConnectionConditionInput
	) {
		createTradeContractConnection(input: $input, condition: $condition) {
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
	}
`;
export const createTradeUserConnection = `
	mutation CreateTradeUserConnection(
		$input: CreateTradeUserConnectionInput!
		$condition: ModelTradeUserConnectionConditionInput
	) {
		createTradeUserConnection(input: $input, condition: $condition) {
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
	}
`;
export const createTransactionHistory = `
	mutation CreateTransactionHistory(
		$input: CreateTransactionHistoryInput!
		$condition: ModelTransactionHistoryConditionInput
	) {
		createTransactionHistory(input: $input, condition: $condition) {
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
	}
`;
export const createUserCalendarEvent = `
	mutation CreateUserCalendarEvent(
		$input: CreateUserCalendarEventInput!
		$condition: ModelUserCalendarEventConditionInput
	) {
		createUserCalendarEvent(input: $input, condition: $condition) {
			id
			username
			createdAt
			payload
			updatedAt
		}
	}
`;
export const createUserProfile = `
	mutation CreateUserProfile(
		$input: CreateUserProfileInput!
		$condition: ModelUserProfileConditionInput
	) {
		createUserProfile(input: $input, condition: $condition) {
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
			officeConnections {
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
			callendarEvents {
				items {
					id
					username
					createdAt
					payload
					updatedAt
				}
				nextToken
			}
			requestsSentByMe {
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
			requestsForMe {
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
	}
`;
export const createVehicle = `
	mutation CreateVehicle(
		$input: CreateVehicleInput!
		$condition: ModelVehicleConditionInput
	) {
		createVehicle(input: $input, condition: $condition) {
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
export const deleteCompanyAccessConnection = `
	mutation DeleteCompanyAccessConnection(
		$input: DeleteCompanyAccessConnectionInput!
		$condition: ModelCompanyAccessConnectionConditionInput
	) {
		deleteCompanyAccessConnection(input: $input, condition: $condition) {
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
	}
`;
export const deleteContract = `
	mutation DeleteContract(
		$input: DeleteContractInput!
		$condition: ModelContractConditionInput
	) {
		deleteContract(input: $input, condition: $condition) {
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
				Category {
					category
					issueDate
					expiresAt
				}
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
	}
`;
export const deleteCustomer = `
	mutation DeleteCustomer(
		$input: DeleteCustomerInput!
		$condition: ModelCustomerConditionInput
	) {
		deleteCustomer(input: $input, condition: $condition) {
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
export const deleteOffice = `
	mutation DeleteOffice(
		$input: DeleteOfficeInput!
		$condition: ModelOfficeConditionInput
	) {
		deleteOffice(input: $input, condition: $condition) {
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
			contracts {
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
			employees {
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
			contractors {
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
			partnerOffices {
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
			createdAt
			updatedAt
			privateData {
				tin
				professionStartDate
				chamberRecordNumber
				insuranceLicenseExpirationDate
				civilLiabilityExpirationDate
				bankAccountInfo
				files {
					bucket
					region
					key
					name
				}
			}
			members
			officeContracts {
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
			officeCustomers {
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
			companyConnections {
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
	}
`;
export const deleteRequests = `
	mutation DeleteRequests(
		$input: DeleteRequestsInput!
		$condition: ModelRequestsConditionInput
	) {
		deleteRequests(input: $input, condition: $condition) {
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
export const deleteTradeContractConnection = `
	mutation DeleteTradeContractConnection(
		$input: DeleteTradeContractConnectionInput!
		$condition: ModelTradeContractConnectionConditionInput
	) {
		deleteTradeContractConnection(input: $input, condition: $condition) {
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
	}
`;
export const deleteTradeUserConnection = `
	mutation DeleteTradeUserConnection(
		$input: DeleteTradeUserConnectionInput!
		$condition: ModelTradeUserConnectionConditionInput
	) {
		deleteTradeUserConnection(input: $input, condition: $condition) {
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
	}
`;
export const deleteTransactionHistory = `
	mutation DeleteTransactionHistory(
		$input: DeleteTransactionHistoryInput!
		$condition: ModelTransactionHistoryConditionInput
	) {
		deleteTransactionHistory(input: $input, condition: $condition) {
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
	}
`;
export const deleteUserCalendarEvent = `
	mutation DeleteUserCalendarEvent(
		$input: DeleteUserCalendarEventInput!
		$condition: ModelUserCalendarEventConditionInput
	) {
		deleteUserCalendarEvent(input: $input, condition: $condition) {
			id
			username
			createdAt
			payload
			updatedAt
		}
	}
`;
export const deleteUserProfile = `
	mutation DeleteUserProfile(
		$input: DeleteUserProfileInput!
		$condition: ModelUserProfileConditionInput
	) {
		deleteUserProfile(input: $input, condition: $condition) {
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
			officeConnections {
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
			callendarEvents {
				items {
					id
					username
					createdAt
					payload
					updatedAt
				}
				nextToken
			}
			requestsSentByMe {
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
			requestsForMe {
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
	}
`;
export const deleteVehicle = `
	mutation DeleteVehicle(
		$input: DeleteVehicleInput!
		$condition: ModelVehicleConditionInput
	) {
		deleteVehicle(input: $input, condition: $condition) {
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
export const manageContractors = `
	mutation ManageContractors(
		$action: ContractorResourceAction!
		$tradeName: String!
		$payload: String!
	) {
		manageContractors(
			action: $action
			tradeName: $tradeName
			payload: $payload
		) {
			id
		}
	}
`;
export const manageContracts = `
	mutation ManageContracts(
		$action: ContractResourceAction!
		$tradeName: String!
		$payload: String!
	) {
		manageContracts(action: $action, tradeName: $tradeName, payload: $payload) {
			id
		}
	}
`;
export const manageCustomers = `
	mutation ManageCustomers(
		$action: CustomerResourceAction!
		$tradeName: String!
		$payload: String!
	) {
		manageCustomers(action: $action, tradeName: $tradeName, payload: $payload) {
			id
		}
	}
`;
export const manageEmployees = `
	mutation ManageEmployees(
		$action: EmployeeResourceAction!
		$tradeName: String!
		$payload: String!
	) {
		manageEmployees(action: $action, tradeName: $tradeName, payload: $payload) {
			id
		}
	}
`;
export const resolveRequest = `
	mutation ResolveRequest($id: ID!, $payload: String!) {
		resolveRequest(id: $id, payload: $payload)
	}
`;
export const sendRequest = `
	mutation SendRequest($requestType: RequestType!, $payload: String!) {
		sendRequest(requestType: $requestType, payload: $payload)
	}
`;
export const updateCompanyAccessConnection = `
	mutation UpdateCompanyAccessConnection(
		$input: UpdateCompanyAccessConnectionInput!
		$condition: ModelCompanyAccessConnectionConditionInput
	) {
		updateCompanyAccessConnection(input: $input, condition: $condition) {
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
	}
`;
export const updateContract = `
	mutation UpdateContract(
		$input: UpdateContractInput!
		$condition: ModelContractConditionInput
	) {
		updateContract(input: $input, condition: $condition) {
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
				Category {
					category
					issueDate
					expiresAt
				}
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
	}
`;
export const updateCustomer = `
	mutation UpdateCustomer(
		$input: UpdateCustomerInput!
		$condition: ModelCustomerConditionInput
	) {
		updateCustomer(input: $input, condition: $condition) {
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
export const updateFields = `
	mutation UpdateFields($typename: String!, $id: ID!, $fields: String) {
		updateFields(typename: $typename, id: $id, fields: $fields) {
			id
		}
	}
`;
export const updateOffice = `
	mutation UpdateOffice(
		$input: UpdateOfficeInput!
		$condition: ModelOfficeConditionInput
	) {
		updateOffice(input: $input, condition: $condition) {
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
			contracts {
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
			employees {
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
			contractors {
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
			partnerOffices {
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
			createdAt
			updatedAt
			privateData {
				tin
				professionStartDate
				chamberRecordNumber
				insuranceLicenseExpirationDate
				civilLiabilityExpirationDate
				bankAccountInfo
				files {
					bucket
					region
					key
					name
				}
			}
			members
			officeContracts {
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
			officeCustomers {
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
			companyConnections {
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
	}
`;
export const updateRequests = `
	mutation UpdateRequests(
		$input: UpdateRequestsInput!
		$condition: ModelRequestsConditionInput
	) {
		updateRequests(input: $input, condition: $condition) {
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
export const updateTradeContractConnection = `
	mutation UpdateTradeContractConnection(
		$input: UpdateTradeContractConnectionInput!
		$condition: ModelTradeContractConnectionConditionInput
	) {
		updateTradeContractConnection(input: $input, condition: $condition) {
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
	}
`;
export const updateTradeUserConnection = `
	mutation UpdateTradeUserConnection(
		$input: UpdateTradeUserConnectionInput!
		$condition: ModelTradeUserConnectionConditionInput
	) {
		updateTradeUserConnection(input: $input, condition: $condition) {
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
	}
`;
export const updateTransactionHistory = `
	mutation UpdateTransactionHistory(
		$input: UpdateTransactionHistoryInput!
		$condition: ModelTransactionHistoryConditionInput
	) {
		updateTransactionHistory(input: $input, condition: $condition) {
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
	}
`;
export const updateUserCalendarEvent = `
	mutation UpdateUserCalendarEvent(
		$input: UpdateUserCalendarEventInput!
		$condition: ModelUserCalendarEventConditionInput
	) {
		updateUserCalendarEvent(input: $input, condition: $condition) {
			id
			username
			createdAt
			payload
			updatedAt
		}
	}
`;
export const updateUserProfile = `
	mutation UpdateUserProfile(
		$input: UpdateUserProfileInput!
		$condition: ModelUserProfileConditionInput
	) {
		updateUserProfile(input: $input, condition: $condition) {
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
			officeConnections {
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
			callendarEvents {
				items {
					id
					username
					createdAt
					payload
					updatedAt
				}
				nextToken
			}
			requestsSentByMe {
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
			requestsForMe {
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
	}
`;
export const updateVehicle = `
	mutation UpdateVehicle(
		$input: UpdateVehicleInput!
		$condition: ModelVehicleConditionInput
	) {
		updateVehicle(input: $input, condition: $condition) {
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

// --------- Custom ---------

