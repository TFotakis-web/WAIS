<template>
	<div class="pt-5">
		<h5 class="text-info text-center mb-5">{{ $t('various.underConstruction') }}</h5>
		<mdb-container>
			<personal-info-card/>
		</mdb-container>
	</div>
</template>
<script>
import PersonalInfoCard from "@/views/userProfile/personalInfoCard";

export default {
	name: 'UserProfile',
	components: {
		PersonalInfoCard
	},
};
</script>
