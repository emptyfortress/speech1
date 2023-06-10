<template lang="pug">
.gridcat
	.cat
		.zag.cursor-pointer
			|{{catselect}}
			q-icon(name="mdi-menu-down")
			q-menu
				q-list
					q-item(clickable v-close-popup v-for="item in cat.categories" :key="item.id" @click="catselect = item.label" :class="{'selected' : item.label === catselect}")
						q-item-section
							q-item-label {{ item.label }}
		q-btn(flat round icon="mdi-dots-horizontal")
			q-menu( anchor="bottom right" self="top right")
				q-list(dense)
					q-item(clickable v-close-popup)
						q-item-section
							q-checkbox(v-model="all" label="Показать все" dense @update:model-value="toggle")
					q-separator
					q-item(clickable v-close-popup v-for="category in cat.categories" :key="category.id")
						q-item-section
							q-checkbox(:model-value="category.selected" :label="category.label" dense @update:model-value="update(category)")
	component(:is="ChipCalendar1" label="Текущий месяц").right
	.cat
		component(:is="CategoryTable")

	q-card
		component(:is="VueApexCharts" type="bar" height="102%" :options="coolOptions" :series="coolSeries")

</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import CategoryTable from '@/components/CategoryTable.vue'
import ChipCalendar1 from '@/components/ChipCalendar1.vue'
import { useCategory } from '@/stores/category'
import type { Ref } from 'vue'
import { randomArray } from '@/utils/utils'

const cat = useCategory()
const all: Ref<null | boolean> = ref(false)

const update = (e: any) => {
	cat.toggleCategory(e)
}

const toggle = () => {
	if (!all.value) {
		cat.unsetAll()
	} else cat.setAll()
}
const coolOptions = {
	chart: {
		type: 'bar',
		stacked: true,
		toolbar: {
			show: false,
		},
	},
	plotOptions: {
		bar: {
			horizontal: true,
		},
	},
	stroke: {
		width: 1,
		colors: ['#fff'],
	},
	xaxis: {
		categories: [
			'Продажи',
			'Сервис',
			'Оплата',
			'Жалобы',
			'Неисправности',
			'Услуги',
			'Работа',
			'Регионы',
			'Грубость',
			'Остальное',
		],
		labels: {
			show: false,
			minHeight: 0,
			maxHeight: 0,
		},
	},
	yaxis: {
		show: false,
		title: {
			text: undefined,
		},
	},
	fill: {
		opacity: 1,
	},
	legend: {
		show: true,
		position: 'top',
		horizontalAlign: 'left',
	},
	colors: ['#29A1F9', '#FDB948', '#C72829'],
}

const coolSeries = computed(() => {
	return [
		{
			name: 'AHT',
			data: randomArray(cat.rowNum, 10, 40),
		},
		{
			name: 'Тишина',
			data: randomArray(cat.rowNum, 3, 15),
		},
		{
			name: 'Перебивания',
			data: randomArray(cat.rowNum, 7, 20),
		},
	]
})
const catselect = ref('Неисправности')
</script>

<style scoped lang="scss">
@import '@/assets/styles/myvariables.scss';

.gridcat {
	margin-top: 1rem;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	column-gap: 1rem;
	align-content: start;
	.cat {
		grid-column: 1/4;
		display: flex;
		justify-content: space-between;
	}
}
.q-table th {
	font-weight: 300;
}
.q-table tr {
	cursor: pointer;
	&.sel {
		background: #def0fd;
	}
	td {
		font-weight: 600;
		font-size: 16px;
		.up {
			margin-left: 0.5rem;
			color: green;
		}
		.down {
			margin-left: 0.5rem;
			color: darkred;
		}
		.legend {
			width: 10px;
			height: 10px;
			&.blue {
				background: #249efa;
			}
			&.green {
				background: #24e6a4;
			}
			&.orange {
				background: #fdba3a;
			}
		}
		&.graph:hover {
			outline: 1px solid #249efa;
		}
	}
	td:nth-child(2) {
		font-weight: 400;
		font-size: 13px;
	}
}
.right {
	justify-self: end;
}
.selected {
	background: $bgSelection;
	color: $blue-9;
}
</style>
