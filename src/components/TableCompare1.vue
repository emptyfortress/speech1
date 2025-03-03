<script setup lang="ts">
import { ref, computed } from 'vue'
import { vehi, operators } from '@/stores/vehi_cols'

const doubleColumns = computed(() => {
	return vehi.flatMap((item) => {
		return [
			{
				label: item.label,
				name: item.name,
				field: item.field,
				align: item.align,
				sortable: true,
				compare: 1,
			},
			{
				label: item.label,
				name: item.name + 'a',
				field: item.field + 'a',
				align: item.align,
				sortable: true,
				compare: 2,
			},
		]

	})
})
const rows = ref(operators)
const tuning = ref(false)
const teal = ref(false)
const orange = ref(true)

const group = ref('abs')
const options = [
	{ label: 'Показать абсолютные значения', value: 'abs' },
	{ label: 'Показать тенденцию', value: 'rel' },
]
const pagination = ref({
	sortBy: 'total' as keyof Row,
	descending: true,
	page: 1,
	rowsPerPage: 0,
})

const calcBg = ((n: number) => {
	if (orange.value) {
		let op = 1 - (n / 100) / .25
		if (n < 40) return `background-color: rgba(255, 149, 0, ${op});`
	}
	if (teal.value) {
		let op = 0.7 / (100 / n)
		if (n > 50) return `background-color: rgba(0, 128, 128, ${op});`
	}
})

const calcCol = ((col: any) => {
	if (col.name.includes('group')) return 'group'
	return ''
})
</script>

<template lang="pug">
q-table.sticky(
	:rows='rows'
	:columns='doubleColumns'
	row-key="id"
	separator='cell'
	binary-state-sort
	:pagination='pagination'
	hide-pagination
	dense
	)

	template(#top)
		.top
			.title
				|Интегральный чек-лист
				q-badge.q-ml-lg(rounded color="primary") Сравнение
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
		q-tr.main
			q-th Операторы
			q-th(v-for="(col, index) in vehi" colspan='2' :class="calcCol(col)")
				span.rot {{ col.label }}

		q-tr.sma(:props="props")
			q-th.blo
			q-th(:props="props" v-for="col in props.cols" :key='col.name' :class="calcCol(col)") {{ col.compare }}

	template(v-slot:body="props")
		q-tr(:props="props" @click="")
			q-td {{ props.row.name }}
			q-td.cell(:style="calcBg(props.row.group1)") &#8486;
			q-td.cell(:style="calcBg(props.row.group1)") &#8486;
			q-td.cell(:style="calcBg(props.row.veh1)") {{ props.row.veh1 }}
			q-td.cell(:style="calcBg(props.row.veh1a)") {{ props.row.veh1a }}
			q-td.cell(:style="calcBg(props.row.veh2)") {{ props.row.veh2 }}
			q-td.cell(:style="calcBg(props.row.veh2a)") {{ props.row.veh2a }}
			q-td.cell(:style="calcBg(props.row.veh3)") {{ props.row.veh3 }}
			q-td.cell(:style="calcBg(props.row.veh3a)") {{ props.row.veh3a }}
			q-td.cell(:style="calcBg(props.row.veh4)") {{ props.row.veh4 }}
			q-td.cell(:style="calcBg(props.row.veh4a)") {{ props.row.veh4a }}
			q-td.cell(:style="calcBg(props.row.group2)") &#8486;
			q-td.cell(:style="calcBg(props.row.group2)") &#8486;
			q-td.cell(:style="calcBg(props.row.veh5)") {{ props.row.veh5 }}
			q-td.cell(:style="calcBg(props.row.veh5a)") {{ props.row.veh5a }}
			q-td.cell(:style="calcBg(props.row.veh6)") {{ props.row.veh6 }}
			q-td.cell(:style="calcBg(props.row.veh6a)") {{ props.row.veh6a }}
			q-td.cell(:style="calcBg(props.row.veh7)") {{ props.row.veh7 }}
			q-td.cell(:style="calcBg(props.row.veh7a)") {{ props.row.veh7a }}
			q-td.cell(:style="calcBg(props.row.group3)") &#8486;
			q-td.cell(:style="calcBg(props.row.group3)") &#8486;
			q-td.cell(:style="calcBg(props.row.veh8)") {{ props.row.veh8 }}
			q-td.cell(:style="calcBg(props.row.veh8a)") {{ props.row.veh8a }}
			q-td.cell(:style="calcBg(props.row.veh9)") {{ props.row.veh9 }}
			q-td.cell(:style="calcBg(props.row.veh9a)") {{ props.row.veh9a }}
			q-td.cell(:style="calcBg(props.row.veh10)") {{ props.row.veh10 }}
			q-td.cell(:style="calcBg(props.row.veh10a)") {{ props.row.veh10a }}
			q-td.cell(:style="calcBg(props.row.veh11)") {{ props.row.veh11 }}
			q-td.cell(:style="calcBg(props.row.veh11a)") {{ props.row.veh11a }}
			q-td.cell(:style="calcBg(props.row.veh12)") {{ props.row.veh12 }}
			q-td.cell(:style="calcBg(props.row.group4)") &#8486;
			q-td.cell(:style="calcBg(props.row.group4)") &#8486;
			q-td.cell(:style="calcBg(props.row.veh12a)") {{ props.row.veh12a }}
			q-td.cell(:style="calcBg(props.row.veh13)") {{ props.row.veh13 }}
			q-td.cell(:style="calcBg(props.row.veh13a)") {{ props.row.veh13a }}
			q-td.cell(:style="calcBg(props.row.veh14)") {{ props.row.veh14 }}
			q-td.cell(:style="calcBg(props.row.veh14a)") {{ props.row.veh14a }}
			q-td.cell(:style="calcBg(props.row.veh15)") {{ props.row.veh15 }}
			q-td.cell(:style="calcBg(props.row.veh15a)") {{ props.row.veh15a }}
			q-td.cell(:style="calcBg(props.row.veh16)") {{ props.row.veh16 }}
			q-td.cell(:style="calcBg(props.row.veh16a)") {{ props.row.veh16a }}
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

:deep(.q-table th, .q-table td) {
	padding: 6px 15px;
}

:deep(.q-table thead tr.sma) {
	position: sticky;
	z-index: 2;
	top: 138px;

	th {
		padding-left: 0;
		padding-right: 0;
		vertical-align: center;
	}
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

:deep(tr th.group) {
	background: #d4d4b4;
}
</style>
