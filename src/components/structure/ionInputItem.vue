<template>
	<ion-item>
		<ion-icon v-if="config.icon || config.iconPlaceholder" :icon="config.icon" slot="start" class="ion-align-self-center"/>
		<ion-label v-if="config.label" :position="config.slot !== 'start' ? 'floating' : undefined">{{ config.label() }}</ion-label>
		<ion-input-custom v-model="modelValue" :config="config" @update:modelValue="el => $emit('update:modelValue', el)" :inputGroup="inputGroup"/>
	</ion-item>
</template>
<script>
	import IonInputCustom from '@/components/structure/ionInputCustom';
	export default {
		name: 'ionInputItem',
		components: { IonInputCustom },
		props: ['modelValue', 'config', 'inputGroup'],
		emits: ['update:modelValue'],
	};
</script>
<style scoped>
</style>
