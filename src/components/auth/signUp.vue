<template>
	<ion-grid fixed>
		<ion-row class="ion-justify-content-center">
			<ion-col size-sm="10" size-md="8" size-lg="6" size-xl="6">
				<ion-card>
					<ion-card-header>
						<ion-card-title>{{ $t('views.auth.createANewWaisAccount') }}</ion-card-title>
					</ion-card-header>
					<ion-card-content>
						<form @submit.prevent="signUp">
							<ion-item>
								<ion-icon :icon="ionicons.personOutline" slot="start" class="ion-align-self-center"/>
								<ion-label position="floating">{{ $t('fields.username') }}</ion-label>
								<ion-input v-model="credentials.username" type="text" name="username" autocomplete="username" required/>
							</ion-item>
							<ion-item>
								<ion-icon :icon="ionicons.keyOutline" slot="start" class="ion-align-self-center"/>
								<ion-label position="floating">{{ $t('fields.password') }}</ion-label>
								<ion-input v-model="credentials.password" :type="passwordVisible ? 'text' : 'password'" name="password" autocomplete="current-password" required/>
								<ion-button @click="passwordVisible = !passwordVisible" slot="end" fill="clear" class="ion-align-self-center">
									<ion-icon slot="icon-only" :icon="passwordVisible ? ionicons.eyeOffOutline : ionicons.eyeOutline"/>
								</ion-button>
							</ion-item>
							<ion-item>
								<ion-icon :icon="ionicons.mailOutline" slot="start" class="ion-align-self-center"/>
								<ion-label position="floating">{{ $t('fields.email') }}</ion-label>
								<ion-input v-model="credentials.email" type="email" name="email" autocomplete="email" required/>
							</ion-item>
							<ion-row>
								<ion-col>
									<ion-item>
										<ion-icon :icon="ionicons.callOutline" slot="start" class="ion-align-self-center"/>
										<ion-label position="floating">{{ $t('fields.countryCode') }}</ion-label>
										<ion-select :ok-text="$t('actions.ok')" :cancel-text="$t('actions.cancel')">
											<ion-select-option v-for="o in telephoneCodeOptions" :key="o.text" :value="o.value">{{ o.text }}</ion-select-option>
										</ion-select>
									</ion-item>
								</ion-col>
								<ion-col>
									<ion-item>
										<ion-label position="floating">{{ $t('fields.phoneNumber') }}</ion-label>
										<ion-input v-model="phone_number" type="number" name="phone" autocomplete="tel" required class="no-arrows"/>
									</ion-item>
								</ion-col>
							</ion-row>
							<div class="ion-margin-top">
								<loadingBtn color="primary" expand="block" type="submit" :loading="loading" :text="$t('views.auth.signUp')" :loadingText="$t('views.auth.signingUp')" class="ion-margin-bottom"/>
								<p v-if="error !== {}" class="text-danger">{{ error.message }}</p>
								<hr class="ion-margin-vertical"/>
								<p>
									<span>{{ $t('views.auth.haveAnAccount') + ' ' }}</span>
									<router-link :to="{ name: 'SignIn' }">{{ $t('views.auth.signIn') }}</router-link>
								</p>
								<localeDropdown/>
							</div>
						</form>
					</ion-card-content>
				</ion-card>
			</ion-col>
		</ion-row>
	</ion-grid>
</template>
<script>
	import {
		IonCard,
		IonCardHeader,
		IonCardContent,
		IonCardTitle,
		IonIcon,
		IonItem,
		IonLabel,
		IonButton,
		IonInput,
		IonGrid,
		IonRow,
		IonCol,
		IonSelect,
		IonSelectOption,
	} from '@ionic/vue';
	import { eyeOutline, eyeOffOutline, keyOutline, personOutline, mailOutline, callOutline } from 'ionicons/icons';
	import { mapActions } from 'vuex';
	import localeDropdown from '@/components/structure/localeDropdown';
	import loadingBtn from '@/components/structure/loadingBtn';

	export default {
		name: 'signUp',
		components: {
			IonCard,
			IonCardHeader,
			IonCardContent,
			IonCardTitle,
			IonIcon,
			IonItem,
			IonLabel,
			IonButton,
			IonInput,
			IonGrid,
			IonRow,
			IonCol,
			IonSelect,
			IonSelectOption,
			localeDropdown,
			loadingBtn,
		},
		data() {
			return {
				ionicons: {
					personOutline,
					keyOutline,
					eyeOutline,
					eyeOffOutline,
					mailOutline,
					callOutline,
				},
				loading: false,
				credentials: {
					username: '',
					password: '',
					email: '',
					phone_number: '',
				},
				phone_number: '',
				selectedTelephoneCode: '+30',
				error: {},
				telephoneCodeOptions: [
					{ text: '+1', value: '+1' },
					{ text: '+7', value: '+7' },
					{ text: '+20', value: '+20' },
					{ text: '+27', value: '+27' },
					{ text: '+30', value: '+30', selected: true },
					{ text: '+31', value: '+31' },
					{ text: '+32', value: '+32' },
					{ text: '+33', value: '+33' },
					{ text: '+34', value: '+34' },
					{ text: '+36', value: '+36' },
					{ text: '+39', value: '+39' },
					{ text: '+40', value: '+40' },
					{ text: '+41', value: '+41' },
					{ text: '+43', value: '+43' },
					{ text: '+44', value: '+44' },
					{ text: '+45', value: '+45' },
					{ text: '+46', value: '+46' },
					{ text: '+47', value: '+47' },
					{ text: '+48', value: '+48' },
					{ text: '+49', value: '+49' },
					{ text: '+51', value: '+51' },
					{ text: '+52', value: '+52' },
					{ text: '+53', value: '+53' },
					{ text: '+54', value: '+54' },
					{ text: '+55', value: '+55' },
					{ text: '+56', value: '+56' },
					{ text: '+57', value: '+57' },
					{ text: '+58', value: '+58' },
					{ text: '+60', value: '+60' },
					{ text: '+61', value: '+61' },
					{ text: '+62', value: '+62' },
					{ text: '+63', value: '+63' },
					{ text: '+64', value: '+64' },
					{ text: '+65', value: '+65' },
					{ text: '+66', value: '+66' },
					{ text: '+81', value: '+81' },
					{ text: '+82', value: '+82' },
					{ text: '+84', value: '+84' },
					{ text: '+86', value: '+86' },
					{ text: '+90', value: '+90' },
					{ text: '+91', value: '+91' },
					{ text: '+92', value: '+92' },
					{ text: '+93', value: '+93' },
					{ text: '+94', value: '+94' },
					{ text: '+95', value: '+95' },
					{ text: '+98', value: '+98' },
					{ text: '+212', value: '+212' },
					{ text: '+213', value: '+213' },
					{ text: '+216', value: '+216' },
					{ text: '+218', value: '+218' },
					{ text: '+220', value: '+220' },
					{ text: '+221', value: '+221' },
					{ text: '+222', value: '+222' },
					{ text: '+223', value: '+223' },
					{ text: '+224', value: '+224' },
					{ text: '+225', value: '+225' },
					{ text: '+226', value: '+226' },
					{ text: '+227', value: '+227' },
					{ text: '+228', value: '+228' },
					{ text: '+229', value: '+229' },
					{ text: '+230', value: '+230' },
					{ text: '+231', value: '+231' },
					{ text: '+232', value: '+232' },
					{ text: '+233', value: '+233' },
					{ text: '+234', value: '+234' },
					{ text: '+235', value: '+235' },
					{ text: '+236', value: '+236' },
					{ text: '+237', value: '+237' },
					{ text: '+238', value: '+238' },
					{ text: '+239', value: '+239' },
					{ text: '+240', value: '+240' },
					{ text: '+241', value: '+241' },
					{ text: '+242', value: '+242' },
					{ text: '+243', value: '+243' },
					{ text: '+244', value: '+244' },
					{ text: '+245', value: '+245' },
					{ text: '+246', value: '+246' },
					{ text: '+248', value: '+248' },
					{ text: '+249', value: '+249' },
					{ text: '+250', value: '+250' },
					{ text: '+251', value: '+251' },
					{ text: '+252', value: '+252' },
					{ text: '+253', value: '+253' },
					{ text: '+254', value: '+254' },
					{ text: '+255', value: '+255' },
					{ text: '+256', value: '+256' },
					{ text: '+257', value: '+257' },
					{ text: '+258', value: '+258' },
					{ text: '+260', value: '+260' },
					{ text: '+261', value: '+261' },
					{ text: '+262', value: '+262' },
					{ text: '+263', value: '+263' },
					{ text: '+264', value: '+264' },
					{ text: '+265', value: '+265' },
					{ text: '+266', value: '+266' },
					{ text: '+267', value: '+267' },
					{ text: '+268', value: '+268' },
					{ text: '+269', value: '+269' },
					{ text: '+290', value: '+290' },
					{ text: '+291', value: '+291' },
					{ text: '+297', value: '+297' },
					{ text: '+298', value: '+298' },
					{ text: '+299', value: '+299' },
					{ text: '+345', value: '+345' },
					{ text: '+350', value: '+350' },
					{ text: '+351', value: '+351' },
					{ text: '+352', value: '+352' },
					{ text: '+353', value: '+353' },
					{ text: '+354', value: '+354' },
					{ text: '+355', value: '+355' },
					{ text: '+356', value: '+356' },
					{ text: '+357', value: '+357' },
					{ text: '+358', value: '+358' },
					{ text: '+359', value: '+359' },
					{ text: '+370', value: '+370' },
					{ text: '+371', value: '+371' },
					{ text: '+372', value: '+372' },
					{ text: '+373', value: '+373' },
					{ text: '+374', value: '+374' },
					{ text: '+375', value: '+375' },
					{ text: '+376', value: '+376' },
					{ text: '+377', value: '+377' },
					{ text: '+378', value: '+378' },
					{ text: '+379', value: '+379' },
					{ text: '+380', value: '+380' },
					{ text: '+381', value: '+381' },
					{ text: '+382', value: '+382' },
					{ text: '+385', value: '+385' },
					{ text: '+386', value: '+386' },
					{ text: '+387', value: '+387' },
					{ text: '+389', value: '+389' },
					{ text: '+420', value: '+420' },
					{ text: '+421', value: '+421' },
					{ text: '+423', value: '+423' },
					{ text: '+500', value: '+500' },
					{ text: '+501', value: '+501' },
					{ text: '+502', value: '+502' },
					{ text: '+503', value: '+503' },
					{ text: '+504', value: '+504' },
					{ text: '+505', value: '+505' },
					{ text: '+506', value: '+506' },
					{ text: '+507', value: '+507' },
					{ text: '+508', value: '+508' },
					{ text: '+509', value: '+509' },
					{ text: '+537', value: '+537' },
					{ text: '+590', value: '+590' },
					{ text: '+591', value: '+591' },
					{ text: '+593', value: '+593' },
					{ text: '+594', value: '+594' },
					{ text: '+595', value: '+595' },
					{ text: '+596', value: '+596' },
					{ text: '+597', value: '+597' },
					{ text: '+598', value: '+598' },
					{ text: '+599', value: '+599' },
					{ text: '+670', value: '+670' },
					{ text: '+672', value: '+672' },
					{ text: '+673', value: '+673' },
					{ text: '+674', value: '+674' },
					{ text: '+675', value: '+675' },
					{ text: '+676', value: '+676' },
					{ text: '+677', value: '+677' },
					{ text: '+678', value: '+678' },
					{ text: '+679', value: '+679' },
					{ text: '+680', value: '+680' },
					{ text: '+681', value: '+681' },
					{ text: '+682', value: '+682' },
					{ text: '+683', value: '+683' },
					{ text: '+685', value: '+685' },
					{ text: '+686', value: '+686' },
					{ text: '+687', value: '+687' },
					{ text: '+688', value: '+688' },
					{ text: '+689', value: '+689' },
					{ text: '+690', value: '+690' },
					{ text: '+691', value: '+691' },
					{ text: '+692', value: '+692' },
					{ text: '+850', value: '+850' },
					{ text: '+852', value: '+852' },
					{ text: '+853', value: '+853' },
					{ text: '+855', value: '+855' },
					{ text: '+856', value: '+856' },
					{ text: '+872', value: '+872' },
					{ text: '+880', value: '+880' },
					{ text: '+886', value: '+886' },
					{ text: '+960', value: '+960' },
					{ text: '+961', value: '+961' },
					{ text: '+962', value: '+962' },
					{ text: '+963', value: '+963' },
					{ text: '+964', value: '+964' },
					{ text: '+965', value: '+965' },
					{ text: '+966', value: '+966' },
					{ text: '+967', value: '+967' },
					{ text: '+968', value: '+968' },
					{ text: '+970', value: '+970' },
					{ text: '+971', value: '+971' },
					{ text: '+972', value: '+972' },
					{ text: '+973', value: '+973' },
					{ text: '+974', value: '+974' },
					{ text: '+975', value: '+975' },
					{ text: '+976', value: '+976' },
					{ text: '+977', value: '+977' },
					{ text: '+992', value: '+992' },
					{ text: '+993', value: '+993' },
					{ text: '+994', value: '+994' },
					{ text: '+995', value: '+995' },
					{ text: '+996', value: '+996' },
					{ text: '+998', value: '+998' },
				],
				passwordVisible: false,
			};
		},
		methods: {
			...mapActions({
				signUpStore: 'auth/signUp',
				confirmSignUpStore: 'auth/confirmSignUp',
				resendSignUpStore: 'auth/resendSignUp',
				signInStore: 'auth/signIn',
			}),
			signUp: async function () {
				this.loading = true;
				this.error = {};
				this.credentials.phone_number = this.selectedTelephoneCode + this.phone_number.toString();
				try {
					await this.signUpStore(this.credentials);
					await this.$router.push({ name: 'ConfirmSignUp' });
					// this.$emit('auth-credentials', {
					// 	username: this.credentials.username,
					// 	password: this.credentials.password,
					// });
				} catch (error) {
					this.error = error;
					this.loading = false;
				}
			},
		},
	};
</script>
