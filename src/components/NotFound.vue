<template lang="pug">
.flexcenter
	.text-center
		.zg Not Found!
		q-btn(color="primary" label="На главную" size="lg" @click="$router.push('/')")
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
.flexcenter {
	height: calc(100vh - 200px);
	display: flex;
	justify-content: center;
	align-items: center;
	.zg {
		font-size: 5rem;
		font-weight: bold;
	}
}
</style>
