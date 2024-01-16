<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { operators } from '@/stores/operators'
import { useOperatorList } from '@/stores/operatorList'
import { useRoute, useRouter } from 'vue-router'
import OperMarksTable from '@/components/evaluate/OperMarksTable.vue'
import VueApexCharts from 'vue3-apexcharts'
import { randomArray } from '@/utils/utils'

const route = useRoute()
const router = useRouter()
const initOperator = operators.find((el: any) => el.id == route.params.id)

const oper = ref(initOperator)
const opList = useOperatorList()

const idx = computed(() => {
	if (!!oper) {
		return opList.selectedOperators.findIndex((el) => el == oper.value)
	}
	return 0
})
const prev = () => {
	if (idx.value == 0) return
	const prevItem: Operator = opList.selectedOperators[idx.value - 1]
	router.push(`/oper/${prevItem.id}`)
	oper.value = prevItem
}
const next = () => {
	if (idx.value == opList.selectedOperators.length - 1) return
	const nextItem: Operator = opList.selectedOperators[idx.value + 1]
	router.push(`/oper/${nextItem.id}`)
	oper.value = nextItem
}
const tabs = ref('history')
const sparkLine = {
	chart: {
		type: 'line',
		height: 35,
		sparkline: {
			enabled: true,
		},
	},
	stroke: {
		width: 3,
		curve: 'smooth',
	},
	tooltip: {
		enabled: false,
		x: {
			show: false,
		},
		y: {
			title: {
				formatter: function () {
					return ''
				},
			},
		},
		marker: {
			show: false,
		},
	},
}
const coolSeries = computed(() => {
	return [
		{
			name: 'Eval',
			data: randomArray(5, 46, 87),
		},
	]
})
</script>

<template lang="pug">
q-page(padding)
	.container(v-if="!!oper")
		.huge
			q-img.bg(src="@/assets/img/abstract.jpg")
			.q-avatar
				img(src="@/assets/img/user1.svg")
			.fio
				.text-weight-bold Фамилия
				.name {{ oper.name }}
			.mean Средняя оценка: <span> 67</span>
			component.chart(:is="VueApexCharts" type="line" height="35" width="110" :options="sparkLine" :series="coolSeries" )


			// 	q-space
			// 	.q-gutter-x-xs(v-if="opList.selectedOperators.length > 1")
			// 		q-btn(round unelevated icon="mdi-chevron-left" color="primary" @click="prev" :disable="idx == 0")
			// 			q-tooltip Предыдущий оператор
			// 		q-btn(round unelevated icon="mdi-chevron-right" color="primary" @click="next" :disable="idx == opList.selectedOperators.length - 1")
			// 			q-tooltip Следущюий оператор
			// q-btn.photo(color="white" round icon="mdi-camera" text-color="black" size="sm")
		br
		br
		br
		br
		// q-tabs(v-model="tabs" align="left" active-color="primary")
		// 	q-tab(name="history" label="История")
		// 	q-tab(name="record" label="Записи")
		// q-separator
		// q-tab-panels(v-model="tabs" animated)
		// 	q-tab-panel(name="history")
		// 		OperMarksTable
</template>

<style scoped lang="scss">
.huge {
	display: grid;
	grid-template-columns: repeat(20, 1fr);
	grid-template-rows: repeat(7, 1fr);
	justify-items: start;
	align-items: center;
	// background: #ccc;
	// gap: 1rem;
	// height: 100px;
	// width: 100%;
	// background: url(@/assets/img/abstract.jpg);
	// background-size: cover;
	// background-position: 0 30%;
	// position: relative;
}
.bg {
	grid-column: 1/-1;
	grid-row: 1/5;
}
.photo {
	position: absolute;
	bottom: -70px;
	left: 40px;
}
.q-avatar {
	width: 100px;
	height: 100px;
	grid-column: 2/4;
	grid-row: 4/7;
}
.fio {
	grid-column: 4/8;
	grid-row: 5/7;
}
.mean {
	grid-column: 8/12;
	grid-row: 5/7;
	span {
		font-size: 1.3rem;
		font-weight: 600;
	}
}
.chart {
	grid-column: 12/15;
	grid-row: 5/7;
}
</style>
