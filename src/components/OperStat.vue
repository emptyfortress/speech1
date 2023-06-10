<template lang="pug">
q-expansion-item(v-model="oper")
	template(v-slot:header)
		q-item-section(avatar).line
			q-avatar(icon="mdi-headset" flat)

		q-item-section
			.zag Операторы
		q-item-section(side)
			q-btn(round flat icon="mdi-cloud-download-outline")
	q-card-section.q-px-md.q-pt-md
		.grid
			q-table(:rows="rows"
				:columns='columns'
				row-key="name"
				v-model:selected="selected"
				binary-state-sort
				:pagination="pagination"
				:selected-rows-label="getSelectedString"
				:filter="filter"
				rows-per-page-label="Записей на странице"
				).table
				template(v-slot:top)
					.text-subtitle1 Соответствие чеклисту (%)
					.grid1
						q-range(v-model="label" :min="0" :max="100" :step="4" label color="primary" )
						q-input(v-model="filter" dense debounce="300" color="primary" clearable).search
							template(v-slot:prepend)
								q-icon(name="mdi-magnify")

				template(v-slot:body="props")
					q-tr(:props="props" @click="select(props.row)")
						q-td(key="name") {{ props.row.name }}
						q-td(key="total").text-right {{ props.row.total }}
						q-td(key="good").text-right {{ props.row.good }}
						q-td(key="percent").text-right {{ props.row.percent }}%
			q-card.q-px-md
				component(:is="VehOperChart" v-if="selected.length === 0")
				component(:is="VehOperChart1" v-else :oper="selected[0]")
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Ref } from 'vue'
import { operators } from '@/stores/operators'
import VehOperChart from '@/components/VehOperChart.vue'
import VehOperChart1 from '@/components/VehOperChart1.vue'

interface Row {
	name: string
	good: number
	notgood: number
	bad: number
	total: number
	percent: number
}

const oper = ref(false)
const filter = ref('')
const selected: Ref<Row[]> = ref([])
const label = ref({ min: 0, max: 100 })
// const rows = ref(operators)
const rows = computed(() => {
	return operators.filter((e) => e.percent > label.value.min && e.percent < label.value.max)
})

const columns: Column[] = [
	{
		name: 'name',
		required: true,
		label: 'Оператор',
		align: 'left',
		field: 'name',
		sortable: true,
	},
	{
		name: 'total',
		required: false,
		label: 'Всего звонков',
		align: 'right',
		field: 'total',
		sortable: true,
	},
	{
		name: 'good',
		required: false,
		label: 'Всего баллов',
		align: 'right',
		field: 'good',
		sortable: true,
	},
	{
		name: 'percent',
		required: false,
		label: '%',
		align: 'right',
		field: 'percent',
		sortable: true,
		format: (val) => `${val}%`,
	},
]

const pagination = ref({
	sortBy: 'total' as keyof Row,
	descending: true,
	page: 1,
	rowsPerPage: 5,
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
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
.grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 1rem;
	.q-card {
		min-height: 100px;
	}
}
.grid1 {
	width: 100%;
	display: grid;
	grid-template-columns: 2fr 1fr;
	align-items: end;
	gap: 3rem;
}
</style>
