<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { operators } from '@/stores/operators'
import { useOperatorList } from '@/stores/operatorList'
import { useRoute, useRouter } from 'vue-router'
import OperMarksTable from '@/components/evaluate/OperMarksTable.vue'
import OperRecordTable from '@/components/evaluate/OperRecordTable.vue'
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
const chartOptionsSpark1 = {
	chart: {
		type: 'area',
		height: 120,
		sparkline: {
			enabled: true,
		},
	},
	stroke: {
		curve: 'smooth',
	},
	fill: {
		opacity: 0.3,
	},
	xaxis: {
		crosshairs: {
			width: 1,
		},
	},
	yaxis: {
		min: 0,
	},
	title: {
		text: '78',
		offsetX: 0,
		style: {
			fontSize: '24px',
		},
	},
	subtitle: {
		text: 'Средняя оценка',
		offsetX: 0,
		style: {
			fontSize: '14px',
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
	.container(v-if="oper !== undefined")
		.huge
			q-img.bg(src="@/assets/img/abstract.jpg")
			.q-avatar
				img(src="@/assets/img/user1.svg")
			.fio
				.text-weight-bold Фамилия
				.name {{ oper.name }}
			q-card.mean
				component(:is="VueApexCharts" type="area" height="120px" :options="chartOptionsSpark1" :series="coolSeries" )
			// .prevnext(v-if="opList.selectedOperators.length > 0")
			// 	q-btn(round unelevated icon="mdi-chevron-left" color="primary" @click="prev" :disable="idx == 0")
			// 		q-tooltip Предыдущий оператор
			// 	q-btn(round unelevated icon="mdi-chevron-right" color="primary" @click="next" :disable="idx == opList.selectedOperators.length - 1")
			// 		q-tooltip Следующй оператор

		q-tabs(v-model="tabs" align="left" active-color="primary")
			q-tab(name="history" label="Оценки")
			q-tab(name="record" label="Записи")
			q-separator
		q-tab-panels(v-model="tabs" animated)
			q-tab-panel(name="history")
				OperMarksTable()
			q-tab-panel(name="record")
				OperRecordTable(:oper="oper")

	div(v-else) ...loading

</template>

<style scoped lang="scss">
:deep(.q-tab-panels) {
	background: transparent;
}
:deep(.q-tab-panel) {
	padding-left: 0;
	padding-right: 0;
}
.huge {
	display: grid;
	grid-template-columns: repeat(22, 1fr);
	grid-template-rows: repeat(5, 40px);
	// background: #ccc;
}
.bg {
	grid-column: 1/-1;
	grid-row: 1/4;
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
	grid-row: 3/6;
}
.fio {
	margin-top: 0.5rem;
	margin-left: 0.5rem;
	grid-column: 4/8;
	grid-row: 4/6;
}
.mean {
	grid-column: 17/22;
	grid-row: 3/6;
	span {
		font-size: 1.3rem;
		font-weight: 600;
	}
}
.prevnext {
	grid-column: 21/23;
	grid-row: 4/6;
	margin-top: 1rem;
	margin-left: 1rem;
}
</style>
