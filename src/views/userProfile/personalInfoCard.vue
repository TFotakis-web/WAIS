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
			<form @submit.prevent="save">
				<mdb-row>
					<mdb-col>
						<h6 class="text-left">{{ $t('views.userProfile.personalInfo') }}</h6>
					</mdb-col>
				</mdb-row>
				<mdb-row>
					<mdb-col sm="4">
						<mdb-input v-model="userProfile.name" :label="$t('fields.name')" type="text" name="name" autocomplete="given-name" outline required class="my-2"/>
					</mdb-col>
					<mdb-col sm="4">
						<mdb-input v-model="userProfile.family_name" :label="$t('fields.surname')" type="text" name="lname" autocomplete="family-name" outline required class="my-2"/>
					</mdb-col>
					<mdb-col sm="4">
						<mdb-input v-model="userProfile.fathers_name" :label="$t('fields.fathersName')" type="text" outline required class="my-2"/>
					</mdb-col>
				</mdb-row>
				<mdb-row>
					<mdb-col sm="6">
						<mdb-input v-model="userProfile.tin" :label="$t('fields.tin')" type="text" outline class="my-2"/>
					</mdb-col>
<!--					<mdb-col sm="6">-->
<!--						<mdb-input v-model="userProfile.birthdate" :label="$t('fields.birthdate')" type="text" outline  required class="my-2"/>-->
<!--					</mdb-col>-->
<!--					<mdb-col sm="6">-->
<!--						<mdb-input v-model="userProfile.gender" :label="$t('fields.gender')" type="text" outline  required class="my-2"/>-->
<!--					</mdb-col>-->
				</mdb-row>
				<mdb-row>
					<mdb-col sm="6">
						<mdb-input v-model="userProfile.email" :label="$t('fields.email')" type="text" name="email" autocomplete="email" outline required class="my-2"/>
					</mdb-col>
				</mdb-row>
				<mdb-row>
					<mdb-col sm="4">
						<mdb-input v-model="userProfile.mobile" :label="$t('fields.mobile')" type="number" name="mobile" autocomplete="tel" outline class="my-2 no-arrows"/>
					</mdb-col>
					<mdb-col sm="4">
						<mdb-input v-model="userProfile.telephone" :label="$t('fields.phone')" type="number" name="phone" autocomplete="tel" outline required class="my-2 no-arrows"/>
					</mdb-col>
				</mdb-row>
				<mdb-row>
<!--					<mdb-col sm="6">-->
<!--						<mdb-input v-model="userProfile.familyStatus" :label="$t('fields.familyStatus')" type="text" outline required class="my-2"/>-->
<!--					</mdb-col>-->
					<mdb-col sm="8">
						<mdb-input v-model="userProfile.address" :label="$t('fields.address')" type="text" name="address" autocomplete="street-address" outline class="my-2"/>
					</mdb-col>
<!--					<mdb-col sm="6">-->
<!--						<mdb-input v-model="userProfile.doy" :label="$t('fields.doy')" type="text" outline required class="my-2"/>-->
<!--					</mdb-col>-->
					<mdb-col sm="2">
						<mdb-input v-model="userProfile.city" :label="$t('fields.city')" type="text" name="city" autocomplete="address-level2" outline class="my-2"/>
					</mdb-col>
					<mdb-col sm="2">
						<mdb-input v-model="userProfile.zip_code" :label="$t('fields.postcode')" type="text" name="postal" autocomplete="postal-code" outline class="my-2"/>
					</mdb-col>
<!--					<mdb-col sm="6">-->
<!--						<mdb-input v-model="userProfile.locale" :label="$t('fields.locale')" type="text" outline  required class="my-2"/>-->
<!--					</mdb-col>-->
<!--					<mdb-col sm="6">-->
<!--						<mdb-input v-model="userProfile.chamberRecordNumber" :label="$t('fields.chamberRecordNumber')" type="text" outline required class="my-2"/>-->
<!--					</mdb-col>-->
<!--					<mdb-col sm="6">-->
<!--						<mdb-input v-model="userProfile.insuranceLicenseExpirationDate" :label="$t('fields.insuranceLicenseExpirationDate')" type="text" outline required class="my-2"/>-->
<!--					</mdb-col>-->
<!--					<mdb-col sm="6">-->
<!--						<mdb-input v-model="userProfile.professionStartDate" :label="$t('fields.professionStartDate')" type="text" outline required class="my-2"/>-->
<!--					</mdb-col>-->
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
				name: this.userProfile.name,
				family_name: this.userProfile.family_name,
				fathers_name: this.userProfile.fathers_name,
				tin: this.userProfile.tin,
				email: this.userProfile.email,
				telephone: this.userProfile.telephone,
				mobile: this.userProfile.mobile,
				address: this.userProfile.address,
				city: this.userProfile.city,
				zip_code: this.userProfile.zip_code,
				locale: this.userProfile.locale,
				// gender: this.userProfile.gender,
				// birthdate: this.userProfile.birthdate,
				// profilePicture: this.userProfile.profilePicture,
				// preferences: this.userProfile.preferences,
				// doy: this.userProfile.doy,
				// familyStatus: this.userProfile.familyStatus,
				// chamberRecordNumber: this.userProfile.chamberRecordNumber,
				// insuranceLicenseExpirationDate: this.userProfile.insuranceLicenseExpirationDate,
				// professionStartDate: this.userProfile.professionStartDate,
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