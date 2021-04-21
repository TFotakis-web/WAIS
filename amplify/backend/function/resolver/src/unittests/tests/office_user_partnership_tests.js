const assert = require('assert')
const util = require('util');

module.exports = {
	/**
	 * -- Scenario --
	 *
	 * A list of 4 users is created (Admin,Manager,Employee,Contractor).
	 * User1 creates a CreateOffice request.
	 * Admin retrieves and accepts this request.
	 * User (now MANAGER) lists the newly created Office.
	 * The Manager creates an inviteEmployeeToOffice and an inviteContractorToOffice request.
	 * User2 accepts the first request and becomes an employee.
	 * The employee lists their new workplace.
	 * User3 accepts the second request and becomes a contractor.
	 * The contractor lists their new workplace.
	 * ...
	 * The 3 OfficeUser connections are deleted.
	 * The 3 UserProfiles are deleted.
	 * The Office is deleted.
	 *
	 * -- API functions used in this test --
	 *
	 */
	officeConnectionsTest: async (ddb, gql, gateway) => {
		console.log('officeManagerAndEmployeeConnection start')

		//The user profiles of the 3 users.
		const managerUserProfile = {
			id: "test_id_1",
			username: "username_1",
			email: "email_1@email.com",
			telephone: "+301234567890",
			role: "UNKNOWN",
			name: "name_1",
		}
		const employeeUserProfile = {
			id: "test_id_2",
			username: "username_2",
			email: "email_2@email.com",
			telephone: "+401234567890",
			role: "UNKNOWN",
			name: "name_2",
		}
		const contractorUserProfile = {
			id: "test_id_3",
			username: "username_3",
			email: "email_3@email.com",
			telephone: "+501234567890",
			role: "UNKNOWN",
			name: "name_3",
		}

		//Delete existing user profiles iff they already exist
		const deleteUPMutation0 = /* GraphQL */`
			mutation deleteUserProfile($input: DeleteUserProfileInput!) {
				deleteUserProfile(input: $input) {
					id
				}
			}
		`
		const cleanUpResultManger = await gql.execute({input: {id: managerUserProfile.id}}, deleteUPMutation0, 'deleteUserProfile')
		const cleanUpResultEmployee = await gql.execute({input: {id: employeeUserProfile.id}}, deleteUPMutation0, 'deleteUserProfile')
		const cleanUpResultContractor = await gql.execute({input: {id: contractorUserProfile.id}}, deleteUPMutation0, 'deleteUserProfile')
		if (cleanUpResultManger.errors || cleanUpResultEmployee.errors || cleanUpResultContractor.errors) {
			throw new Error(`Error cleaning initial UserProfiles ${JSON.stringify(cleanUpResultManger)},${JSON.stringify(cleanUpResultEmployee)},${JSON.stringify(cleanUpResultContractor)}`)
		}
		console.log('Initial clean up OK')

		//Create the 3 user profiles
		const createUPMutation = `mutation createUserProfile($input: CreateUserProfileInput!){
			createUserProfile(input: $input) {
				id
				username
				email
				telephone
				role
				name
			}
		}`
		const createManagerUPResult = await gql.execute({input: managerUserProfile}, createUPMutation, 'createUserProfile')
		const createEmployeeUPResult = await gql.execute({input: employeeUserProfile}, createUPMutation, 'createUserProfile')
		const createContractorUPResult = await gql.execute({input: contractorUserProfile}, createUPMutation, 'createUserProfile')
		if (createManagerUPResult.errors || createEmployeeUPResult.errors || createContractorUPResult.errors) {
			throw new Error(`Error creating one of the UserProfiles: ${JSON.stringify(createManagerUPResult)},${JSON.stringify(createEmployeeUPResult)},${JSON.stringify(createContractorUPResult)}`)
		}
		assert(createManagerUPResult.data.createUserProfile.username === managerUserProfile.username)
		assert(createEmployeeUPResult.data.createUserProfile.username === employeeUserProfile.username)
		assert(createContractorUPResult.data.createUserProfile.username === contractorUserProfile.username)
		console.log('UserProfile creation succeeded.')

		//Make a createOffice request
		const createOfficeRequestInput = {
			officeName: "TestOffice1",
			address: "address1",
			office_email: "testoffice1@email.com",
			zip_code: "71414",
			mobile: "6969696969",
			phone: "+30123",
			tin: "123",
			professionStartDate: new Date().toISOString().slice(0, 10),
			chamberRecordNumber: '123',
			insuranceLicenseExpirationDate: new Date().toISOString().slice(0, 10),
			civilLiabilityExpirationDate: new Date().toISOString().slice(0, 10),
			comments: '',
			files: []
		}

		//Throws error on failure
		const createOfficeRequest = await gateway.createOfficeRequest({
			username: employeeUserProfile.username,
			email: employeeUserProfile.email,
			groups: null,
			requestInput: createOfficeRequestInput,
		})
		const createOfficeRequestID = createOfficeRequest.id
		assert(util.isDeepStrictEqual(createOfficeRequestInput, createOfficeRequest.payload.createOfficePayload))
		console.log('CreateOffice request was sent successfully.')

		//Accept that request as an admin
		const resolveCreateOfficeRequest = {
			username: managerUserProfile.username,
			email: managerUserProfile.email,
			groups: ["admin"],
			id: createOfficeRequestID,
			decision: "ACCEPT",
			payload: {
				createOfficePayload: {
					managerModelPermissions: [
						"OFFICE_INFO_QUERY",
						"OFFICE_INFO_MUTATE",
						"VEHICLES_QUERY",
						"VEHICLES_MUTATE",
						"CONTRACTS_QUERY",
						"CONTRACTS_MUTATE",
						"CUSTOMERS_QUERY",
						"CUSTOMERS_MUTATE",
						"EMPLOYEE_ADD",
						"EMPLOYEE_REMOVE",
						"CONTRACTOR_ADD",
						"CONTRACTOR_REMOVE",
						"OFFICE_CONN_CREATE",
						"OFFICE_CONN_DELETE"
					],
					managerPagePermissions: {},
					partnersNumberLimit: 1,
					employeesNumberLimit: 2,
					insuranceCompanies: [{
						name: "insurance_company_1",
						code: "insurance_code_1",
					}, {
						name: "insurance_company_2",
						code: "insurance_code_2",
					}]
				}
			}
		}
		const acceptCreateOfficeRequestResponse = await gateway.resolveRequest(resolveCreateOfficeRequest)
		if (!acceptCreateOfficeRequestResponse) {
			throw new Error(`Failed to resolve the CreateOffice request. Response was ${JSON.stringify(acceptCreateOfficeRequestResponse)}`)
		}
		//assert(util.isDeepStrictEqual(createOfficeRequestInput, createOfficeRequest.payload.createOfficePayload))
		console.log('CreateOffice request was resolved successfully.')

		//Clean up
		//Delete UserProfiles
		const deleteUPMutation = /* GraphQL */`
			mutation deleteUserProfile($input: DeleteUserProfileInput!) {
				deleteUserProfile(input: $input) {
					id
				}
			}
		`
		const deleteManagerUP = await gql.execute({input: {id: managerUserProfile.id}}, deleteUPMutation, 'deleteUserProfile')
		const deleteEmployeeUP = await gql.execute({input: {id: employeeUserProfile.id}}, deleteUPMutation, 'deleteUserProfile')
		const deleteContractorUP = await gql.execute({input: {id: contractorUserProfile.id}}, deleteUPMutation, 'deleteUserProfile')
		if ((deleteManagerUP.errors || deleteEmployeeUP.errors || deleteContractorUP.errors) !== undefined) {
			throw new Error(`Clean up failed while deleting one of the UserProfiles:
			${JSON.stringify(deleteManagerUP)},${JSON.stringify(deleteEmployeeUP)},${JSON.stringify(deleteContractorUP)}`)
		}
		assert(deleteManagerUP.data.deleteUserProfile.id === managerUserProfile.id)
		assert(deleteEmployeeUP.data.deleteUserProfile.id === employeeUserProfile.id)
		assert(deleteContractorUP.data.deleteUserProfile.id === contractorUserProfile.id)

		//Delete office request, just in case
		const deleteCreateOfficeRequestMutation = /* GraphQL */`
			mutation deleteUserProfile($input: DeleteUserProfileInput!) {
				deleteUserProfile(input: $input) {
					id
				}
			}
		`
		const deleteCreateOfficeRequestResponse = await gql.execute({input: {id: createOfficeRequestID}}, deleteCreateOfficeRequestMutation, 'deleteUserProfile')
		console.log(`Delete CreateOfficeRequest result: ${deleteCreateOfficeRequestResponse}`)

		console.log('Clean up successful.')

		console.log('officeManagerAndEmployeeConnection finish')
	}
}
