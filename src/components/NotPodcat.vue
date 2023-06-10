<template lang="pug">
.full-height.flex.flex-center
	.move
		img(src="@/assets/img/check-chose.svg" width="200")
		div Выберите категорию слева или настройте ее

</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.move {
	transform: translateY(-40px);
	font-size: 1.2rem;
	color: #aaa;
	text-align: center;
}
</style>
