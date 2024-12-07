<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { vehi, operators } from '@/stores/vehi_cols'

const startColumns = [...vehi]

const doubleColumns = computed(() => {
	return startColumns.flatMap((item) => {
		return [
			{
				label: item.label,
				name: item.name,
				field: item.field,
				align: 'left',
				sortable: true,
				compare: 1,
			},
			{
				label: item.label,
				name: item.name + 'a',
				field: item.field + 'a',
				align: 'left',
				sortable: true,
				compare: 2,
			},
		]

	})
})

const rows = ref([
	{
		id: 0,
		name: 'Екатерина',
		veh1: 5,
		veh1b: 25,
		veh2: 88,
		veh2b: 60,
		veh3: 5,
		veh3b: 5,
	},
	{
		id: 1,
		name: 'laдлофы',
		veh1: 15,
		veh1b: 55,
		veh2: 65,
		veh2b: 35,
		veh3: 85,
		veh3b: 26,
	}
])

const tuning = ref(false)
const compare = ref(false)
const teal = ref(false)
const orange = ref(true)

const group = ref('abs')
const options = [
	{ label: 'Показать абсолютные значения', value: 'abs' },
	{ label: 'Показать тенденцию', value: 'rel' },
]

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
</script>

<template lang='pug'>
q-page(padding)
	q-card-section.q-px-md.q-pt-md(style='width: 1400px;')
		q-table.sticky(
			:rows='rows'
			:columns='doubleColumns'
			row-key="id"
			separator='cell'
			binary-state-sort
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
				q-tr.main
					q-th Операторы
					q-th(v-for="(col, index) in startColumns" colspan='2')
						span.rot {{ col.label }}

				q-tr.sma(:props="props")
					q-th.blo
					q-th(:props="props" v-for="col in props.cols" :key='col.name') {{ col.compare }}

			template(v-slot:body="props")
				q-tr(:props="props" @click="select(props.row)")
					q-td {{ props.row.name }}
					q-td.cell(:style="calcBg(props.row.veh1)") {{ props.row.veh1 }}
					q-td.cell(:style="calcBg(props.row.veh1b)") {{ props.row.veh1b }}
					q-td.cell(:style="calcBg(props.row.veh2)") {{ props.row.veh2 }}
					q-td.cell(:style="calcBg(props.row.veh2b)") {{ props.row.veh2b }}
					q-td.cell(:style="calcBg(props.row.veh3)") {{ props.row.veh3 }}
					q-td.cell(:style="calcBg(props.row.veh3b)") {{ props.row.veh3b }}

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

// :deep(tr.other td) {
// 	padding: 2px 5px;
// }

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
