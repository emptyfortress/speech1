<template lang="pug">
q-item
	q-item-section
		.text-subtitle1(@click="updateChart") {{props.oper.name}}
	q-item-section
	.text-overline Проход по вехам
component(:is="VueApexCharts" height="350" type="bar" :options="options" :series="series")
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { randomArray } from '@/utils/utils'

interface Operator {
	id: number
	name: string
	total: number
	percent: number
	good?: number
	notgood?: number
	bad?: number
}

const props = defineProps<{
	oper: Operator
}>()

const options = {
	chart: {
		type: 'bar',
		height: 350,
	},
	plotOptions: {
		bar: {
			horizontal: true,
		},
	},
	labels: [
		'Приветствие',
		'Назвать себя',
		'Локализация проблемы',
		'Просьба обождать',
		'Благодарность за ожид.',
		'Новые услуги',
		'Прощание',
	],
}

const series = ref([
	{
		data: randomArray(7, 10, 98),
	},
])

const updateChart = () => {
	const max = 93
	const min = 10
	const newData = series.value[0].data.map(() => {
		return Math.floor(Math.random() * (max - min + 1)) + min
	})

	series.value = [{ data: newData }]
}

watch(
	() => props.oper,
	() => {
		updateChart()
	}
)
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
</style>
