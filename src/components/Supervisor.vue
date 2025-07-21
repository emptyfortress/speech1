<script setup lang="ts">
import { ref } from 'vue'
import TrainerTable from '@/components/TrainerTable.vue'

const top = ref(true)

const trainers = [
	{
		id: 1,
		lastName: 'Иванов И.И.',
		operatorCount: 5,
		evaluationCount: 42,
		averageScore: 4.6,
		photoUrl: '1.jpeg',
	},
	{
		id: 2,
		lastName: 'Петров П.П.',
		operatorCount: 3,
		evaluationCount: 27,
		averageScore: 4.2,
		photoUrl: '2.jpeg',
	},
	{
		id: 3,
		lastName: 'Сидоров С.С.',
		operatorCount: 6,
		evaluationCount: 35,
		averageScore: 4.8,
		photoUrl: '3.jpeg',
	},
	{
		id: 4,
		lastName: 'Кузнецова А.А.',
		operatorCount: 4,
		evaluationCount: 30,
		averageScore: 4.4,
		photoUrl: '4.jpeg',
	},
	{
		id: 5,
		lastName: 'Морозов Д.Д.',
		operatorCount: 2,
		evaluationCount: 18,
		averageScore: 4.1,
		photoUrl: '5.jpeg',
	},
	{
		id: 6,
		lastName: 'Васильева Т.Т.',
		operatorCount: 7,
		evaluationCount: 50,
		averageScore: 4.9,
		photoUrl: '6.jpeg',
	},
	{
		id: 7,
		lastName: 'Новиков Е.Е.',
		operatorCount: 3,
		evaluationCount: 20,
		averageScore: 3.9,
		photoUrl: '7.jpeg',
	},
]

const onSelectTrainer = (trainer: Trainer) => {
	console.log('Selected:', trainer)
}
</script>

<template lang="pug">
q-page(padding)
	.container
		q-expansion-item(v-model="top")
			template(v-slot:header)
				q-item-section.line(avatar)
					q-avatar(icon="mdi-account-group" flat)
				q-item-section
					.zag Моя команда
			q-card-section.q-px-md
				.grid
					TrainerTable(:trainers="trainers" @select="onSelectTrainer")
					div alksdj
</template>

<style scoped lang="scss">
.grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	column-gap: 1rem;
}
</style>
