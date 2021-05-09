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
	officeConnectionsTest: async (gql, gateway) => {
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
		const deleteUPMutation = /* GraphQL */`
			mutation deleteUserProfile($input: DeleteUserProfileInput!) {
				deleteUserProfile(input: $input) {
					id
				}
			}
		`

		//Delete office
		const deleteOfficeMutation = /* GraphQL */`
			mutation deleteOffice($input: DeleteOfficeInput!) {
				deleteOffice(input: $input) {
					id
				}
			}
		`

		await Promise.all([managerUserProfile.id, employeeUserProfile.id, contractorUserProfile.id].map(id => gql.execute({input: {id: id}}, deleteUPMutation, 'deleteUserProfile')))
			.then(deleteUPResponses => deleteUPResponses.forEach(value => console.log(`User profile with ID:${JSON.stringify(value, null, 2)} deleted.`)))
			.then(() => console.log('Initial UserProfile clean up OK'))

		await Promise.all([managerUserProfile.id].map(id => gql.execute({input: {id: id}}, deleteOfficeMutation, 'deleteOffice')))
			.then(deleteOfficeResp => deleteOfficeResp.forEach(value => console.log(`Office with ID:${JSON.stringify(value, null, 2)} deleted.`)))
			.then(() => console.log('Initial Office clean up successful.'))

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
		await Promise.all([managerUserProfile, employeeUserProfile, contractorUserProfile].map(profile => gql.execute({input: profile}, createUPMutation, 'createUserProfile')))
			.then(profile => console.log(`UserProfile created: ${JSON.stringify(profile)}`))

		//Make a createOffice request
		await gateway.createUnverifiedOffice({
			username: managerUserProfile.username,
			input: {
				officeName: "TestOffice1",
				address: "address1",
				office_email: "testoffice1@email.com",
				zip_code: "71414",
				mobile: "6969696969",
				phone: "+30123",
				tin: "123",
				office_logo: null,
				professionStartDate: new Date().toISOString().slice(0, 10),
				chamberRecordNumber: '123',
				insuranceLicenseExpirationDate: new Date().toISOString().slice(0, 10),
				civilLiabilityExpirationDate: new Date().toISOString().slice(0, 10),
				comments: '',
				files: [{
					level: 'test_level',
					idToken: 'test_id_token',
					filePath: 'test_file_path',
					filename: 'test_filename',
					contentType: 'test_content_type'
				}]
			}
		})
			.then((unverifiedOfficeResult) => {
				const unverifiedOfficeId = unverifiedOfficeResult?.id
				if (!unverifiedOfficeId) {
					return Promise.reject(new Error('Failed to create unverified office.'))
				}
				console.log('Unverified office created successfully with: ' + JSON.stringify(unverifiedOfficeId, null, 2))
				return unverifiedOfficeId
			})
			.then(unverifiedOfficeId => ({
				username: managerUserProfile.username,
				email: managerUserProfile.email,
				groups: ["admin"],
				id: unverifiedOfficeId,
				decision: "ACCEPT",
				payload: {
					verifyOfficePayload: {
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
						managerPagePermissions: ["AccountingReceipts"],
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
			}))
			.then(resolveCreateOfficeRequest => gateway.resolveRequest(resolveCreateOfficeRequest))
			.then(value => console.log('Request resolved successfully: ' + JSON.stringify(value, null, 2)))

		//Clean up
		await Promise.all([managerUserProfile.id, employeeUserProfile.id, contractorUserProfile.id].map(id => gql.execute({input: {id: id}}, deleteUPMutation, 'deleteUserProfile')))
			.then(deleteUPResponses => deleteUPResponses.forEach(value => console.log(`User profile with ID:${JSON.stringify(value, null, 2)} deleted.`)))
			.then(() => console.log('UserProfile clean up successful.'))

		await Promise.all([managerUserProfile.id].map(id => gql.execute({input: {id: id}}, deleteOfficeMutation, 'deleteOffice')))
			.then(deleteOfficeResp => deleteOfficeResp.forEach(value => console.log(`Office with ID:${JSON.stringify(value, null, 2)} deleted.`)))
			.then(() => console.log('Office clean up successful.'))

		console.log('officeManagerAndEmployeeConnection finish')
		return Promise.resolve({})
	}
}
