<template>
	<mdb-card cascade>
		<mdb-view cascade class="blue lighten-1 p-3">
			<div class="mx-auto profileImg" :style="{ 'background-image': 'url(' + userProfile.profilePicture + ')' }">
				<mdb-view hover class="h-100 w-100 rounded-circle">
					<mdb-mask flex-center overlay="black-strong" :text="$t('actions.edit')" class="clickable" @click.native="save" style=" overflow-wrap: anywhere; text-align: center;"/>
				</mdb-view>
			</div>
		</mdb-view>
		<mdb-card-body>
			<!--			<div class="text-center mb-3">
							<mdb-btn @click.native="getProfile">Get</mdb-btn>
							<mdb-btn @click.native="listProfiles">List</mdb-btn>
							<mdb-btn @click.native="createProfile">Create</mdb-btn>
							<mdb-btn @click.native="updateProfile">Update</mdb-btn>
							<mdb-btn @click.native="deleteProfile">Delete</mdb-btn>
							<mdb-btn @click.native="$store.dispatch('auth/updateUserAttributes')">UpdateAttributes</mdb-btn>
						</div>-->
			<form @submit.prevent="save">
				<mdb-row>
					<mdb-col>
						<h6 class="text-left">{{ $t('views.userProfile.personalInfo') }}</h6>
					</mdb-col>
				</mdb-row>
				<mdb-row class="mb-4">
					<mdb-col sm="6">
						<mdb-input v-model="userProfile.name" :label="$t('fields.name')" type="text" name="name" autocomplete="given-name" outline required class="my-2"/>
					</mdb-col>
					<mdb-col sm="6">
						<mdb-input v-model="userProfile.family_name" :label="$t('fields.surname')" type="text" name="lname" autocomplete="family-name" outline required class="my-2"/>
					</mdb-col>
					<mdb-col sm="6">
						<mdb-input v-model="userProfile.birthdate" :label="$t('fields.birthdate')" type="text" outline  required class="my-2"/>
					</mdb-col>
					<mdb-col sm="6">
						<mdb-input v-model="userProfile.gender" :label="$t('fields.gender')" type="text" outline  required class="my-2"/>
					</mdb-col>
					<mdb-col sm="6">
						<mdb-input v-model="userProfile.email" :label="$t('fields.email')" type="text" name="email" autocomplete="email" outline required class="my-2"/>
					</mdb-col>
					<mdb-col sm="6">
						<mdb-input v-model="userProfile.telephone" :label="$t('fields.phone')" type="text" name="phone" autocomplete="tel" outline required class="my-2"/>
					</mdb-col>
					<mdb-col sm="6">
						<mdb-input v-model="userProfile.familyStatus" :label="$t('fields.familyStatus')" type="text" outline required class="my-2"/>
					</mdb-col>
					<mdb-col sm="6">
						<mdb-input v-model="userProfile.address" :label="$t('fields.address')" type="text" name="address" autocomplete="street-address" outline required class="my-2"/>
					</mdb-col>
					<mdb-col sm="6">
						<mdb-input v-model="userProfile.doy" :label="$t('fields.doy')" type="text" outline required class="my-2"/>
					</mdb-col>
					<mdb-col sm="6">
						<mdb-input v-model="userProfile.city" :label="$t('fields.city')" type="text" name="city" autocomplete="address-level2" outline required class="my-2"/>
					</mdb-col>
					<mdb-col sm="6">
						<mdb-input v-model="userProfile.locale" :label="$t('fields.locale')" type="text" outline  required class="my-2"/>
					</mdb-col>
					<mdb-col sm="6">
						<mdb-input v-model="userProfile.chamberRecordNumber" :label="$t('fields.chamberRecordNumber')" type="text" outline required class="my-2"/>
					</mdb-col>
					<mdb-col sm="6">
						<mdb-input v-model="userProfile.tin" :label="$t('fields.tin')" type="text" outline required class="my-2"/>
					</mdb-col>
					<mdb-col sm="6">
						<mdb-input v-model="userProfile.insuranceLicenseExpirationDate" :label="$t('fields.insuranceLicenseExpirationDate')" type="text" outline required class="my-2"/>
					</mdb-col>
					<mdb-col sm="6">
						<mdb-input v-model="userProfile.professionStartDate" :label="$t('fields.professionStartDate')" type="text" outline required class="my-2"/>
					</mdb-col>
				</mdb-row>
				<mdb-row>
					<mdb-col class="text-center">
						<hr/>
						<mdb-btn outline="primary" darkWaves rounded type="submit">{{ $t('actions.save') }}</mdb-btn>
					</mdb-col>
				</mdb-row>
			</form>
		</mdb-card-body>
	</mdb-card>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
	name: "personalInfoCard",
	methods: {
		...mapActions('auth', ['updateUserProfile']),
		save() {
			let userProfile = {
				id: this.userProfile.id,
				username: this.userProfile.username,
				email: this.userProfile.email,
				telephone: this.userProfile.telephone,
				name: this.userProfile.name,
				family_name: this.userProfile.family_name,
				gender: this.userProfile.gender,
				birthdate: this.userProfile.birthdate,
				address: this.userProfile.address,
				// profilePicture: this.userProfile.profilePicture,
				// preferences: this.userProfile.preferences,
				locale: this.userProfile.locale,
				tin: this.userProfile.tin,
				doy: this.userProfile.doy,
				city: this.userProfile.city,
				familyStatus: this.userProfile.familyStatus,
				chamberRecordNumber: this.userProfile.chamberRecordNumber,
				insuranceLicenseExpirationDate: this.userProfile.insuranceLicenseExpirationDate,
				professionStartDate: this.userProfile.professionStartDate,
			}
			this.updateUserProfile(userProfile);
		},
	},
	computed: {
		...mapGetters("auth", ["userProfile"])
	}
}
</script>
<style scoped>
.profileImg {
	height: 88px;
	width: 88px;
	background-size: cover;
	background-repeat: inherit;
	background-position: 50% center;
	border-radius: 50% !important;
	border: 5px solid white;
}
</style>