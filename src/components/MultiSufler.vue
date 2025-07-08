<script setup lang="ts">
import IcOutlineSupportAgent from '@/components/icons/IcOutlineSupportAgent.vue'
</script>

<template lang="pug">
q-page(padding)
	.container.rel
		.zag
			IcOutlineSupportAgent.icon
			| Мультисуфлер

		.grid
			div
			div
			div
			div
			div
			div
			div
			div
</template>

<style scoped lang="scss">
.zag {
	padding-bottom: 0.5rem;
	border-bottom: 1px solid #ccc;
}
.icon {
	width: 36px;
	height: 36px;
	margin-right: 1rem;
}
.grid {
	margin-top: 1rem;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: repeat(3, 200px);
	column-gap: 1rem;
	row-gap: 1rem;
	> div {
		height: 100%;
		background: #ccc;
	}
}
</style>
