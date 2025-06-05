<script setup lang="ts">
import { ref } from 'vue'
import IcOutlineSupportAgent from '@/components/icons/IcOutlineSupportAgent.vue'
import Timer from '@/components/Timer.vue'
import EventSlider from '@/components/EventSlider.vue'

const oper = ref(true)
const client = ref(true)
</script>

<template lang="pug">
q-page.rel(padding)
	.container
		.zag
			IcOutlineSupportAgent.icon
			|Суфлер
		.setup
			.q-mr-md Анализировать поток:
			q-chip(clickable v-model:selected='oper') Оператор
			q-chip(clickable v-model:selected='client') Клиент
			q-space
			Timer
			q-btn.q-ml-lg(flat round icon="mdi-cog-outline" @click="$router.push('sufler1')") 

		.grid
		EventSlider
</template>

<style scoped lang="scss">
.icon {
	width: 36px;
	height: 36px;
	margin-right: 1rem;
}
.setup {
	margin-top: 1rem;
	font-size: 0.9rem;
	display: flex;
	align-items: center;
	border-bottom: 1px solid #ccc;
	padding-bottom: 0.5rem;
}
.grid {
	margin-top: 3rem;
	display: grid;
	grid-template-columns: 1fr 2fr;
	// justify-items: start;
	// align-items: start;
	column-gap: 1rem;
	row-gap: 0.5rem;
	div {
		// background: #ccc;
		height: 100px;
	}
}
.time {
	font-size: 1.4rem;
}
</style>
