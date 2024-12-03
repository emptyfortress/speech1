<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { vehi, operators } from '@/stores/vehi_cols'
import { randomNumber } from '@/utils/utils'

interface Row {
	name: string
	good: number
	notgood: number
	bad: number
	total: number
	percent: number
}

const oper = ref(true)
const rows = ref([])
const selected: Ref<Row[]> = ref([])

const pagination = ref({
	sortBy: 'total' as keyof Row,
	descending: true,
	page: 1,
	rowsPerPage: 0,
})

const select = (e: Row) => {
	if (selected.value.length === 0) {
		selected.value.push(e)
	} else if (selected.value[0].name === e.name) {
		selected.value = []
	} else {
		selected.value = []
		selected.value.push(e)
	}
}
const getSelectedString = (e: number) => {
	return `Выбран оператор`
}

const calcBg = ((n: number) => {
	if (orange.value) {
		let op = 1 - (n / 100)/ .25
		if (n < 40) return `background-color: rgba(255, 149, 0, ${op});`
	}
	if (teal.value) {
		let op =   0.7 / (100 / n)
		if (n > 50) return `background-color: rgba(0, 128, 128, ${op});`
	}
})

const tuning = ref(false)
const compare = ref(false)
const teal = ref(false)
const orange = ref(true)

const group = ref('abs')
const options = [
	{label: 'Показать абсолютные значения', value: 'abs'},
	{label: 'Показать тенденцию', value: 'rel'},
]

const vehi2 = computed(() => {
	const duplicatedArray = vehi.map(item => [item, item]).flat();
	return duplicatedArray
})
const calcCols = computed(() => {
	return vehi.map((item) => item)
})
</script>

<template lang="pug">
q-expansion-item(v-model="oper")
	template(v-slot:header)
		q-item-section(avatar).line
			q-avatar(icon="mdi-headset" flat)

		q-item-section
			.zag Прохождение чек-листа
		q-item-section(side)
			q-btn(round flat icon="mdi-cloud-download-outline")

	q-card-section.q-px-md.q-pt-md
		q-table.sticky(
			:rows="operators"
			title="Интегральный чек-лист"
			:columns='vehi2'
			row-key="name"
			v-model:selected="selected"
			:pagination="pagination"
			:selected-rows-label="getSelectedString"
			separator='cell'
			rows-per-page-label="Записей на странице"
			dense
			)

			template(#top)
				.top
					.title Интегральный чек-лист
					q-btn(flat icon-right="mdi-tune-variant" label="Настройки" @click="tuning = !tuning" size='sm') 
				.tune(v-if='tuning')
					.column
						q-checkbox(v-model="orange" dense label="Выделить проблемы" color="orange")
						q-checkbox(v-model="teal" dense label="Выделить успехи" color="teal")

					q-option-group(
						:options="options"
						type="radio"
						dense
						v-model="group")

			template(#header="props")
				q-tr.main(:props="props")
					q-th Операторы
					q-th(v-for="(col, index) in vehi" :key="col.name" :props="props" colspan='2' @click.stop)
						span.rot {{ col.label }}
	
				q-tr(:props="props").sma
					q-th.blo
					template(v-for="(col, index) in vehi2" :key="col.name" :props="props")
						q-th() one
						q-th() two

				// q-tr(:props="props").sma
				// 	q-th.blo
				// 	template(v-for="(col, index) in vehi2" :key="col.name" :props="props")
				// 		q-th дфлоыв
				// 		q-th ллл

			template(v-slot:body="props")
				q-tr(:props="props" @click="select(props.row)")
					q-td {{ props.row.name }}
			//		q-td.cell(:style="calcBg(props.row.veh1)") {{ props.row.veh1 }}
			// 		q-td.cell(:style="calcBg(props.row.veh2)") {{ props.row.veh2 }}
			// 		q-td.cell(:style="calcBg(props.row.veh3)") {{ props.row.veh3 }}
			// 		q-td.cell(:style="calcBg(props.row.veh4)") {{ props.row.veh4 }}
			// 		q-td.cell(:style="calcBg(props.row.veh5)") {{ props.row.veh5 }}
			// 		q-td.cell(:style="calcBg(props.row.veh6)") {{ props.row.veh6 }}
			// 		q-td.cell(:style="calcBg(props.row.veh7)") {{ props.row.veh7 }}
			// 		q-td.cell(:style="calcBg(props.row.veh8)") {{ props.row.veh8 }}
			// 		q-td.cell(:style="calcBg(props.row.veh9)") {{ props.row.veh9 }}
			// 		q-td.cell(:style="calcBg(props.row.veh10)") {{ props.row.veh10 }}
			// 		q-td.cell(:style="calcBg(props.row.veh11)") {{ props.row.veh11 }}
			// 		q-td.cell(:style="calcBg(props.row.veh12)") {{ props.row.veh12 }}
			// 		q-td.cell(:style="calcBg(props.row.veh13)") {{ props.row.veh13 }}
			// 		q-td.cell(:style="calcBg(props.row.veh14)") {{ props.row.veh14 }}
			// 		q-td.cell(:style="calcBg(props.row.veh15)") {{ props.row.veh15 }}
			// 		q-td.cell(:style="calcBg(props.row.veh16)") {{ props.row.veh16 }}

</template>


<style scoped lang="scss">
.cell {
	text-align: center;
}
.sticky {
	height: 630px;
}
:deep(tr th) {
	vertical-align: bottom;
	text-align: center;
	position: sticky;
	z-index: 2;
	top: 0;
	background-color: #f9f9eb;
}
:deep(tr.main i) {
	display: none;
}
:deep(tr.other td) {
	padding: 2px 5px;
}
:deep(.q-table th, .q-table td) {
	padding: 6px 15px;
}

.q-table thead tr.sma {
	height: 32px;
	position: sticky;
	z-index: 2;
	top: 138px;
}

:deep(th span.rot) {
	-ms-writing-mode: tb-rl;
	-webkit-writing-mode: vertical-rl;
	writing-mode: vertical-rl;
	transform: rotate(180deg);
	white-space: wrap;
	max-height: 120px;
	text-align: left;
}

.q-table thead .q-tr:first-child th:first-child {
	background-color: #fff;
	z-index: 3;
}

:deep(.q-table tbody td:first-child) {
	background-color: #f9f9eb;
}

:deep(th:first-child),
:deep(td:first-child) {
	position: sticky;
	left: 0;
	z-index: 1;
}

:deep(th.blo) {
	z-index: 3;
}
:deep(.q-table__title) {
	font-size: 1rem;
}
.top {
	width: 100%;
	display: flex;
	justify-content: space-between;
}
.tune {
	padding: 1rem;
	display: grid;
	margin: 0 auto;
	grid-template-columns: repeat(2, 1fr);
	column-gap: 5rem;
	font-size: .8rem;
}
</style>
