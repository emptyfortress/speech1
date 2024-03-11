<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { operators } from '@/stores/operators'
import { useOperatorList } from '@/stores/operatorList'
import { useRoute, useRouter } from 'vue-router'
import OperMarksTable from '@/components/evaluate/OperMarksTable.vue'
import OperRecordTable from '@/components/evaluate/OperRecordTable.vue'
import VueApexCharts from 'vue3-apexcharts'
import { randomArray } from '@/utils/utils'
// import { series } from '@/stores/operoptions'
import { chartOptionsSpark, chartOptionsSpark1, chartOptionsSpark2 } from '@/stores/charts1'

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
const tabs = ref('history')
const series = [{ name: 'Оценки', data: [60, 43, 65, 55, 77, 62, 67] }]
const series1 = [{ name: 'Вызовы', data: [55, 57, 65, 70, 77, 80, 67] }]
const series2 = [{ name: 'АНТ', data: [60, 57, 65, 67, 72, 42, 68] }]
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
			q-card
				component(:is="VueApexCharts" type="area" height="120px" :options="chartOptionsSpark1" :series="series1" )
			q-card
				component(:is="VueApexCharts" type="area" height="120px" :options="chartOptionsSpark2" :series="series2" )
			q-card
				component(:is="VueApexCharts" type="area" height="120px" :options="chartOptionsSpark" :series="series" )

		q-tabs(v-model="tabs" align="left" active-color="primary")
			q-tab(name="history" label="Оценки")
			q-tab(name="record" label="Записи")
			q-separator
		q-tab-panels(v-model="tabs" animated)
			q-tab-panel(name="history")
				OperMarksTable(:oper="oper")
			q-tab-panel(name="record")
				OperRecordTable(:oper="oper" :private="false")

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
	grid-template-columns: auto 1.5fr 1fr 1fr 1fr;
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
