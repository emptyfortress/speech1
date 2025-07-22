<script setup lang="ts">
import { ref } from 'vue'
import TrainerTable from '@/components/TrainerTable.vue'
import TrainerDetails from '@/components/TrainerDetails.vue'
import TrainersSummary from '@/components/TrainersSummary.vue'
import TrainerTrends from '@/components/TrainerTrends.vue'
import ChipCalendar1 from '@/components/ChipCalendar1.vue'

const trainers = [
	{
		id: 1,
		lastName: 'Иванов И.И.',
		operatorCount: 5,
		evaluationCount: 42,
		averageScore: 4.6,
		photoUrl: '1.jpeg',
		correction: 4,
		appelation: 8,
	},
	{
		id: 2,
		lastName: 'Петров П.П.',
		operatorCount: 3,
		evaluationCount: 27,
		averageScore: 4.2,
		photoUrl: '2.jpeg',
		correction: 2,
		appelation: 6,
	},
	{
		id: 3,
		lastName: 'Сидоров С.С.',
		operatorCount: 6,
		evaluationCount: 35,
		averageScore: 4.8,
		photoUrl: '3.jpeg',
		correction: 7,
		appelation: 3,
	},
	{
		id: 4,
		lastName: 'Кузнецова А.А.',
		operatorCount: 4,
		evaluationCount: 30,
		averageScore: 4.4,
		photoUrl: '4.jpeg',
		correction: 1,
		appelation: 9,
	},
	{
		id: 5,
		lastName: 'Морозов Д.Д.',
		operatorCount: 2,
		evaluationCount: 18,
		averageScore: 4.1,
		photoUrl: '5.jpeg',
		correction: 3,
		appelation: 2,
	},
	{
		id: 6,
		lastName: 'Васильева Т.Т.',
		operatorCount: 7,
		evaluationCount: 50,
		averageScore: 4.9,
		photoUrl: '6.jpeg',
		correction: 0,
		appelation: 10,
	},
	{
		id: 7,
		lastName: 'Новиков Е.Е.',
		operatorCount: 3,
		evaluationCount: 20,
		averageScore: 3.9,
		photoUrl: '7.jpeg',
		correction: 6,
		appelation: 5,
	},
]
const selected = ref<Trainer | null>(null)

const onSelectTrainer = (trainer: Trainer | null) => {
	selected.value = trainer
}
</script>

<template lang="pug">
q-page(padding)

	.container
		.row.items-center
			q-item-section.line(avatar)
				q-avatar(icon="mdi-account-group" flat)
			q-item-section
				.zag Моя команда
			q-space
			component.right(:is="ChipCalendar1" label="Текущий месяц")


		.grid
			TrainerTable(:trainers="trainers" @select="onSelectTrainer")
			q-card
				transition(name="fade-slide" mode="out-in")
					component(
						:is="selected ? TrainerDetails : TrainersSummary"
						:selected="selected"
						:key="selected?.id || 'summary'"
					)

		// transition(name="fade-slide" mode="out-in")
		// 	template(v-if='selected')
		// 		TrainerTrends
		// 	template(v-else)
		// 		div laдло

</template>

<style scoped lang="scss">
.q-card {
	min-height: 340px;
	padding: 1rem;
}
.grid {
	margin-top: 1rem;
	display: grid;
	grid-template-columns: 2fr 1fr;
	column-gap: 1rem;
}
.fade-slide-enter-active,
.fade-slide-leave-active {
	transition:
		opacity 0.3s ease,
		transform 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
	opacity: 0;
	transform: translateY(10px);
}

.fade-slide-leave-from,
.fade-slide-enter-to {
	opacity: 1;
	transform: translateY(0);
}
</style>
