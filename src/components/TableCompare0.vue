<script setup lang="ts">
import { ref } from 'vue'
import { vehi, operators } from '@/stores/vehi_cols'
import VehOperDialog from '@/components/VehOperDialog.vue'

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

const dialog = ref(false)
const selected = ref<any[]>([])

const select = ((e: any) => {
	console.log(e)
	selected.value[0] = e
	dialog.value = true
})
</script>

<template lang="pug">
q-table.sticky(
	:rows='rows'
	:columns='vehi'
	row-key="name"
	separator='cell'
	binary-state-sort
	:pagination='pagination'
	hide-pagination
	selection='single'
	v-model:selected='selected'
	dense
	)

	template(#top)
		.top
			.title Интегральный чек-лист
			q-btn(flat icon-right="mdi-tune-variant" label="Настройки" @click="tuning = !tuning" size='sm') 
		.tune(v-if='tuning')
			q-checkbox(v-model="orange" dense label="Выделить проблемы" color="orange")
			q-checkbox(v-model="teal" dense label="Выделить успехи" color="teal")

	template(#header="props")
		q-tr.main
			q-th Операторы
			q-th Среднее
			q-th(v-for="col in vehi")
				span.rot {{ col.label }}

		q-tr.sma(:props="props")
			q-th.blo
			q-th(:props="props" v-for="col in props.cols" :key='col.name')

	template(v-slot:body="props")
		q-tr(:props="props" @click='select(props.row)')
			q-td {{ props.row.name }}
			q-td.cell.text-bold(:style="calcBg(props.row.veh0)") 3.14
			q-td.cell(:style="calcBg(props.row.veh1)") {{ props.row.veh1 }}
			q-td.cell(:style="calcBg(props.row.veh2)") {{ props.row.veh2 }}
			q-td.cell(:style="calcBg(props.row.veh3)") {{ props.row.veh3 }}
			q-td.cell(:style="calcBg(props.row.veh4)") {{ props.row.veh4 }}
			q-td.cell(:style="calcBg(props.row.veh5)") {{ props.row.veh5 }}
			q-td.cell(:style="calcBg(props.row.veh6)") {{ props.row.veh6 }}
			q-td.cell(:style="calcBg(props.row.veh7)") {{ props.row.veh7 }}
			q-td.cell(:style="calcBg(props.row.veh8)") {{ props.row.veh8 }}
			q-td.cell(:style="calcBg(props.row.veh9)") {{ props.row.veh9 }}
			q-td.cell(:style="calcBg(props.row.veh10)") {{ props.row.veh10 }}
			q-td.cell(:style="calcBg(props.row.veh11)") {{ props.row.veh11 }}
			q-td.cell(:style="calcBg(props.row.veh12)") {{ props.row.veh12 }}
			q-td.cell(:style="calcBg(props.row.veh13)") {{ props.row.veh13 }}
			q-td.cell(:style="calcBg(props.row.veh14)") {{ props.row.veh14 }}
			q-td.cell(:style="calcBg(props.row.veh15)") {{ props.row.veh15 }}
			q-td.cell(:style="calcBg(props.row.veh16)") {{ props.row.veh16 }}
	template(v-slot:bottom-row='props')
		q-tr(props='props')
			q-td.text-bold СРЕДНЕЕ
			q-td.text-bold.text-center(v-for="n in 17") {{ n }}
	template(v-slot:bottom)
		.itogo Здесь итоговая информация по прохождению чек-листа.

Teleport(to='body')
	VehOperDialog(v-model="dialog" :oper='selected[0]?.name')
</template>

<style scoped lang="scss">
.cell {
	text-align: center;
}

.itogo {
	width: 100%;
	text-align: center;
	font-size: .9rem;
	font-weight: 600;
	padding: 6px 0;
}

.q-tr {
	cursor: pointer;
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
</style>
