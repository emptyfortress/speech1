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
		text: 'Средний балл',
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
		q-breadcrumbs
			q-breadcrumbs-el(icon="home" to="/")
			q-breadcrumbs-el(label="Операторы" to="/operators")
			q-breadcrumbs-el(:label="oper.name" :to="`/oper/${oper.id}`")

		.huge
			.q-avatar
				img(src="@/assets/img/user1.svg")
			.fio
				.text-weight-bold Фамилия
				.name {{ oper.name }}
			q-card.dash
				.mean
					span 2022-02-25
				div Последняя оценка 
			q-card.dash
				.mean
					span 14
				div Всего оценок
			q-card.mean
				component(:is="VueApexCharts" type="area" height="120px" :options="chartOptionsSpark1" :series="coolSeries" )

		q-tabs(v-model="tabs" align="left" active-color="primary")
			q-tab(name="history" label="Оценки")
			q-tab(name="record" label="Записи")
			q-separator
		q-tab-panels(v-model="tabs" animated)
			q-tab-panel(name="history")
				OperMarksTable(:oper="oper")
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
	grid-template-columns: auto 1.5fr 1fr 1fr 2fr;
	gap: 0.5rem;
	margin-top: 1rem;
}
.photo {
	position: absolute;
	bottom: -70px;
	left: 40px;
}
.q-avatar {
	width: 110px;
	height: 110px;
}
.fio {
	margin-top: 0.5rem;
	margin-left: 0.5rem;
}
.mean {
	span {
		font-size: 1.3rem;
		font-weight: 600;
	}
}
.dash {
	// padding: 0.5rem;
	background: transparent;
	box-shadow: none;
	font-size: 0.95rem;
}
</style>
