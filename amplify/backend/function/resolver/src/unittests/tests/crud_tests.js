const assert = require('assert')
const util = require('util');

const usersAPI = require('../../api/user')

module.exports = {
	UserProfile: async (ddb, gql, gateway) => {
		console.log('CRUD UserProfile')

		//The chosen ID for this test object
		const id = "test_id_0"

		//Delete existing item (in case of failure)
		const deleteUPMutation0 = /* GraphQL */`
			mutation deleteUserProfile($input: DeleteUserProfileInput!) {
				deleteUserProfile(input: $input) {
					id
				}
			}
		`
		const cleanUpResult = await gql.execute({input: {id: id}}, deleteUPMutation0, 'deleteUserProfile')
		console.log(`Pre-CRUD queries result: ${JSON.stringify(cleanUpResult)}`)

		//Create
		const ogUP = {
			id: id,
			username: "username_0",
			email: "email_0@email.com",
			telephone: "+301234567890",
			role: "UNKNOWN",
			name: "name_0",
			fathers_name: "fathers_name_0",
			address: "address_0",
			zip_code: "71414",
			mobile: "+30000",
			tin: "0",
			family_name: "family_name_0",
			gender: "gender_0",
			city: "city_0",
			profilePicture: {
				level: "",
				idToken: "",
				filePath: "",
				filename: "",
				contentType: ""
			},
			preferences: "{}",
			locale: "el-GR",
			files: [
				{
					level: "",
					idToken: "",
					filePath: "",
					filename: "",
					contentType: ""
				},
				{
					level: "",
					idToken: "",
					filePath: "",
					filename: "",
					contentType: ""
				}
			]
		}

		const createUPMutation = `mutation createUserProfile($input: CreateUserProfileInput!){
			createUserProfile(input: $input) {
				id
				username
				email
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
				role
				profilePicture {
					level
					idToken
					filePath
					filename
					contentType
				}
				preferences
				locale
				createdAt
				updatedAt
				files {
					level
					idToken
					filePath
					filename
					contentType
				}
			}
		}`

		let createdUserProfile = null
		try {
			const response = await gql.execute({input: ogUP}, createUPMutation, 'createUserProfile')
			createdUserProfile = response.data.createUserProfile
		} catch (err) {
			return Promise.reject(err.message)
		}

		assert(createdUserProfile.username === ogUP.username)
		console.log('UserProfile creation succeeded.')

		//Read
		const listUPQuery = /* GraphQL */ `
			query getUserProfileByUsername($username: String!) {
				listUserProfileByUsername(username: $username) {
					items {
						id
						username
						email
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
						role
						profilePicture {
							level
							idToken
							filePath
							filename
							contentType
						}
						preferences
						locale
						createdAt
						updatedAt
						files {
							level
							idToken
							filePath
							filename
							contentType
						}
					}
				}
			}
		`
		let readUP = null
		try {
			const response = await gql.execute({username: createdUserProfile.username}, listUPQuery, 'getUserProfileByUsername')
			readUP = response.data.listUserProfileByUsername.items[0]
		} catch (err) {
			return Promise.reject(err.message)
		}
		assert(util.isDeepStrictEqual(readUP, createdUserProfile))
		console.log('UserProfile read succeeded.')

		//Update
		const updateInput = {
			id: id,
			city: createdUserProfile.city + '_UPDATED'
		}
		const updatedUserProfile = await usersAPI.updateUserProfileDetails(createdUserProfile.username, updateInput)
		if (!updatedUserProfile) {
			throw new Error('UserProfile update failed.')
		}
		createdUserProfile.city = updateInput.city
		createdUserProfile.updatedAt = updatedUserProfile.updatedAt
		assert(util.isDeepStrictEqual(updatedUserProfile, createdUserProfile))
		console.log('UserProfile update succeeded.')

		//Delete
		const deleteUPMutation = /* GraphQL */`
			mutation deleteUserProfile($input: DeleteUserProfileInput!) {
				deleteUserProfile(input: $input) {
					id
				}
			}
		`
		let deleteResult
		try {
			deleteResult = await gql.execute({input: {id: createdUserProfile.id}}, deleteUPMutation, 'deleteUserProfile')
			if (!deleteResult || deleteResult.errors) {
				return Promise.reject('Failed to delete UserProfile')
			}
		} catch (err) {
			return Promise.reject(err.message)
		}
		assert(createdUserProfile.id === deleteResult.data.deleteUserProfile.id)
		console.log('UserProfile delete succeeded.')

		console.log('UserProfile CRUD tests passed successfully.')
		return {}
	}
}

