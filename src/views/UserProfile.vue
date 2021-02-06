<template>
	<div class="pt-5">
		<h5 class="text-info text-center mb-5">{{ $t('various.underConstruction') }}</h5>
<!--		<mdb-container>-->
<!--			<mdb-btn @click.native="getProfile">Get</mdb-btn>-->
<!--			<mdb-btn @click.native="listProfiles">List</mdb-btn>-->
<!--			<mdb-btn @click.native="createProfile">Create</mdb-btn>-->
<!--			<mdb-btn @click.native="updateProfile">Update</mdb-btn>-->
<!--			<mdb-btn @click.native="deleteProfile">Delete</mdb-btn>-->
<!--			<mdb-btn @click.native="$store.dispatch('auth/updateUserAttributes')">UpdateAttributes</mdb-btn>-->
<!--		</mdb-container>-->
		<mdb-container>
			<mdb-card cascade>
				<mdb-view cascade class="blue lighten-1 p-3">
					<div class="mx-auto tradeImg" :style="{ 'background-image': 'url(' + fields.profilePicture + ')' }">
						<mdb-view hover class="h-100 w-100 rounded-circle">
							<mdb-mask flex-center overlay="black-strong" :text="$t('actions.edit')" class="clickable" @click.native="save" style=" overflow-wrap: anywhere; text-align: center;"/>
						</mdb-view>
					</div>
				</mdb-view>
				<mdb-card-body>
					<form @submit.prevent="save">
						<mdb-row>
							<mdb-col>
								<h6 class="text-left">{{ $t('views.userProfile.personalInfo') }}</h6>
							</mdb-col>
						</mdb-row>
						<mdb-row class="mb-4">
							<mdb-col sm="6">
								<mdb-input v-model="fields.surname" :label="$t('fields.surname')" :small="validation.surname" type="text" name="lname" autocomplete="family-name" outline required class="my-2"/>
							</mdb-col>
							<mdb-col sm="6">
								<mdb-input v-model="fields.name" :label="$t('fields.name')" :small="validation.name" type="text" name="name" autocomplete="given-name" outline required class="my-2"/>
							</mdb-col>
							<mdb-col sm="6">
								<mdb-input v-model="fields.tin" :label="$t('fields.tin')" :small="validation.tin" type="text" outline required class="my-2"/>
							</mdb-col>
							<mdb-col sm="6">
								<mdb-input v-model="fields.email" :label="$t('fields.email')" :small="validation.email" type="text" name="email" autocomplete="email" outline required class="my-2"/>
							</mdb-col>
							<mdb-col sm="6">
								<mdb-input v-model="fields.address" :label="$t('fields.address')" :small="validation.address" type="text" name="address" autocomplete="street-address" outline required class="my-2"/>
							</mdb-col>
							<mdb-col sm="6">
								<mdb-input v-model="fields.city" :label="$t('fields.city')" :small="validation.city" type="text" name="city" autocomplete="address-level2" outline required class="my-2"/>
							</mdb-col>
							<mdb-col sm="6">
								<mdb-input v-model="fields.phone" :label="$t('fields.phone')" :small="validation.phone" type="text" name="phone" autocomplete="tel" outline required class="my-2"/>
							</mdb-col>
							<mdb-col sm="6">
								<mdb-input v-model="fields.mobile" :label="$t('fields.mobile')" :small="validation.mobile" type="text" name="mobile" autocomplete="tel" outline required class="my-2"/>
							</mdb-col>
						</mdb-row>
						<!--						<mdb-row>-->
						<!--							<mdb-col sm="6" v-for="field in Object.keys(userProfile)" :key="field">-->
						<!--								<mdb-input v-model="userProfile[field]" :label="field" type="text" outline/>-->
						<!--							</mdb-col>-->
						<!--							<mdb-col sm="6" v-for="field in Object.keys(userAttributes)" :key="field">-->
						<!--								<mdb-input v-model="userAttributes[field]" :label="field" type="text" outline/>-->
						<!--							</mdb-col>-->
						<!-- <mdb-col sm="6">
							<mdb-input v-model="userProfile.telephone" label="telephone" type="text" outline />
						</mdb-col>
						<mdb-col sm="6">
							<mdb-input v-model="userProfile.tin" label="tin" type="text" outline />
						</mdb-col>
						<mdb-col sm="6">
							<mdb-input v-model="userProfile.doy" label="doy" type="text" outline />
						</mdb-col>
						<mdb-col sm="6">
							<mdb-input v-model="userProfile.familyStatus" label="familyStatus" type="text" outline />
						</mdb-col>
						<mdb-col sm="6">
							<mdb-input v-model="userProfile.chamberRecordNumber" label="chamberRecordNumber" type="text" outline />
						</mdb-col>
						<mdb-col sm="6">
							<mdb-input v-model="userProfile.insuranceLicenseExpirationDate" label="insuranceLicenseExpirationDate" type="text" outline />
						</mdb-col>
						<mdb-col sm="6">
							<mdb-input v-model="userProfile.professionStartDate" label="professionStartDate" type="text" outline />
						</mdb-col>
						<mdb-col sm="6">
							<mdb-input v-model="userAttributes.address" label="address" type="text" outline />
						</mdb-col>
						<mdb-col sm="6">
							<mdb-input v-model="userAttributes.birthdate" label="birthdate" type="text" outline />
						</mdb-col>
						<mdb-col sm="6">
							<mdb-input v-model="userAttributes.family_name" label="family_name" type="text" outline />
						</mdb-col>
						<mdb-col sm="6">
							<mdb-input v-model="userAttributes.gender" label="gender" type="text" outline />
						</mdb-col>
						<mdb-col sm="6">
							<mdb-input v-model="userAttributes.given_name" label="given_name" type="text" outline />
						</mdb-col>
						<mdb-col sm="6">
							<mdb-input v-model="userAttributes.locale" label="locale" type="text" outline />
						</mdb-col>
						<mdb-col sm="6">
							<mdb-input v-model="userAttributes.middle_name" label="middle_name" type="text" outline />
						</mdb-col>
						<mdb-col sm="6">
							<mdb-input v-model="userAttributes.name" label="name" type="text" outline />
						</mdb-col>
						<mdb-col sm="6">
							<mdb-input v-model="userAttributes.nickname" label="nickname" type="text" outline />
						</mdb-col>
						<mdb-col sm="6">
							<mdb-input v-model="userAttributes.phone_number" label="phone_number" type="text" outline />
						</mdb-col>
						<mdb-col sm="6">
							<mdb-input v-model="userAttributes.picture" label="picture" type="text" outline />
						</mdb-col>
						<mdb-col sm="6">
							<mdb-input v-model="userAttributes.preferred_username" label="preferred_username" type="text" outline />
						</mdb-col>
						<mdb-col sm="6">
							<mdb-input v-model="userAttributes.profile" label="profile" type="text" outline />
						</mdb-col>
						<mdb-col sm="6">
							<mdb-input v-model="userAttributes.website" label="website" type="text" outline />
						</mdb-col>
						<mdb-col sm="6">
							<mdb-input v-model="userAttributes.zoneinfo" label="zoneinfo" type="text" outline />
						</mdb-col> -->
						<!--						</mdb-row>-->
						<mdb-row>
							<mdb-col class="text-center">
								<hr/>
								<mdb-btn outline="primary" darkWaves rounded type="submit">{{ $t('actions.save') }}</mdb-btn>
							</mdb-col>
						</mdb-row>
					</form>
				</mdb-card-body>
			</mdb-card>
		</mdb-container>
	</div>
</template>
<script>
import {API, graphqlOperation} from "aws-amplify";
import {listUserProfiles} from "@/graphql/queries";
import {createUserProfile, deleteUserProfile, updateUserProfile} from "@/graphql/mutations";
// import { v4 as uuid } from 'uuid';
export default {
	name: 'UserProfile',
	data() {
		return {
			fields: {
				profilePicture: '',
				surname: '',
				name: '',
				tin: '',
				email: '',
				address: '',
				city: '',
				phone: '',
				mobile: '',
			},
			validation: {
				profilePicture: '',
				surname: '',
				name: '',
				tin: '',
				email: '',
				address: '',
				city: '',
				phone: '',
				mobile: '',
			},
			// userProfile: {
				// permissions: [],
				// preferences: {},
				// telephone: '',
				// tin: '',
				// doy: '',
				// familyStatus: '',
				// chamberRecordNumber: '',
				// insuranceLicenseExpirationDate: '',
				// partnersNumberLimit: 0,
				// professionStartDate: '',
			// },
			// userAttributes: {
			// 	address: '',
			// 	birthdate: '',
				// email: '',
				// family_name: '',
				// gender: '',
				// given_name: '',
				// locale: '',
				// middle_name: '',
				// name: '',
				// nickname: '',
				// phone_number: '',
				// picture: '',
				// preferred_username: '',
				// profile: '',
				// website: '',
				// zoneinfo: '',
			// },
		};
	},
	mounted() {
		// const userProfile = this.$store.getters['auth/userProfile'];
		// for (const key in this.userProfile) {
		// 	this.userProfile[key] = userProfile[key] || '';
		// }
		// const userAttributes = this.$store.getters['auth/userAttributes'];
		// for (const key in this.userAttributes) {
		// 	this.userAttributes[key] = userAttributes[key] || '';
		// }
	},
	methods: {
		save() {
			// this.$store.dispatch('auth/updateUserAttributes', this.userAttributes);
			console.log('Saved.');
		},
		async getProfile() {
			console.log(this.$store.getters['auth/userProfile']);
			// try {
			// const id = prompt("Profile ID?");
			// const id = this.$store.getters['auth/user'].id;
			// const res = await API.graphql(graphqlOperation(getUserProfile, { id }));
			// console.log(res);
			// } catch (error) {
			// console.error(error);
			// }
		},
		async listProfiles() {
			try {
				const res = await API.graphql(graphqlOperation(listUserProfiles));
				console.log(res);
			} catch (error) {
				console.error(error);
			}
		},
		async createProfile() {
			const userPermissions = {
				department: 'someDepartment',
				read: false,
				write: false,
			};
			const data = {
				id: this.$store.getters['auth/user'].id,
				username: this.$store.getters['auth/user'].username,
				permissions: [userPermissions],
				preferences: JSON.stringify({
					locale: 'el',
				}),
				telephone: '+306981234567',
				tin: 0,
				doy: '',
				familyStatus: '',
				creationDate: '2020-12-01',
				chamberRecordNumber: '',
				insuranceLicenseExpirationDate: '2020-12-01',
				partnersNumberLimit: 0,
				professionStartDate: '2020-12-01',
				message: '',
				valid: false,
				file: [File],
			};
			try {
				const res = await API.graphql(graphqlOperation(createUserProfile, {input: data}));
				console.log(res);
			} catch (error) {
				console.error(error);
			}
		},
		async updateProfile() {
			const userPermissions = {
				department: 'someDepartment',
				read: true,
				write: true,
			};
			// const id = prompt("Profile id?");
			const id = this.$store.getters['auth/user'].id;
			const data = {
				id: id,
				username: this.$store.getters['auth/user'].username,
				permissions: [userPermissions],
				preferences: JSON.stringify({}),
				telephone: '+306987654321',
				tin: 10,
				doy: 'SomeDOY',
				familyStatus: 'Single',
				creationDate: '2020-12-01',
				chamberRecordNumber: '1234',
				insuranceLicenseExpirationDate: '2020-12-10',
				partnersNumberLimit: 10,
				professionStartDate: '2020-12-10',
				message: 'A demo message',
				valid: true,
				file: [File],
			};
			try {
				await API.graphql(graphqlOperation(updateUserProfile, {input: data}));
			} catch (error) {
				console.error(error);
			}
		},
		async deleteProfile() {
			// const id = prompt("Profile id?");
			const id = this.$store.getters['auth/user'].id;
			try {
				await API.graphql(graphqlOperation(deleteUserProfile, {input: {id}}));
			} catch (error) {
				console.error(error);
			}
		},
	},
};
</script>
<style>
.tradeImg {
	height: 88px;
	width: 88px;
	background-size: cover;
	background-repeat: inherit;
	background-position: 50% center;
	border-radius: 50% !important;
	border: 5px solid white;
}
</style>