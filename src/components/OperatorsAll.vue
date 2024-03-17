<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { operators } from '@/stores/operators'
import type { QTableColumn } from 'quasar'
import Aggregat from '@/components/Aggregat.vue'
import { useOperatorList } from '@/stores/operatorList'
import { buildAggregate, filterArray } from '@/utils/utils'
import { useRouter } from 'vue-router'
import Chiplist from '@/components/common/Chiplist.vue'
import { anketas } from '@/stores/operators'
import Options2 from '@/components/Options2.vue'
import GistForTable from '@/components/graph/GistForTable.vue'

const opList = useOperatorList()
const router = useRouter()

const opercolumns: QTableColumn[] = [
	{ name: 'name', label: 'Оператор', field: 'name', align: 'left', sortable: true },
	{ name: 'city', label: 'Город', field: 'city', align: 'left', sortable: true },
	{ name: 'group', label: 'Группа', field: 'group', align: 'left', sortable: true },
	{ name: 'percent', label: 'Всего оценок', field: 'percent', align: 'center', sortable: true },
	{ name: 'graph', label: 'Выполнение чеклиста', field: 'graph', align: 'left', sortable: false },
	{ name: 'good', label: 'Среднее', field: 'good', align: 'center', sortable: true },
]
const pagination = ref({
	sortBy: 'name' as keyof Row,
	descending: false,
	page: 1,
	rowsPerPage: 12,
})
const goto = (evt: Event, row: any, index: number) => {
	router.push(`/oper/${row.id}`)
}
const query = ref('')
const table = ref()

const filteredRows = computed(() => {
	let filt = {
		name: (name: string) => name.toLowerCase().includes(query.value.toLowerCase()),
		city: (city: string) => true,
		group: (group: string) => true,
	}
	if (opList.cityFilters.length > 0) {
		filt.city = (city: string) => opList.cityFilters.includes(city)
	}
	if (opList.groupFilters.length > 0) {
		filt.group = (group: string) => opList.groupFilters.includes(group)
	}
	return filterArray(operators, filt)
})

watchEffect(() => {
	let temp = buildAggregate(operators, ['city', 'group'])
	opList.setAggregat(temp)
})

const setup = ref(true)
const data = ref(true)
</script>

<template lang="pug">
q-page(padding)
	.container
		q-expansion-item(v-model="setup")
			template(v-slot:header)
				q-item-section.line(avatar)
					q-avatar(icon="mdi-headset" flat)
				q-item-section
					.zag Операторы
			// q-card-section
			.q-mt-sm
				Chiplist(:chips="anketas" :multiple="false" :tooltip="false" :anketa="true" )
					template(v-slot:header)
						span.q-ml-sm Выберите анкету и настройте другие параметры для просмотра:

			Options2()

		q-expansion-item(v-model="data")
			template(v-slot:header)
				q-item-section.line(avatar)
					q-avatar(icon="mdi-phone-check" flat)
				q-item-section
					.zag Данные для выбранной анкеты и категорий

			.grid
				q-card.aggregat
					q-input(dense v-model="query" placeholder="оператор" clearable hide-bottom-space @clear="query = ''")
						template(v-slot:prepend)
							q-icon(name="mdi-magnify")
					Aggregat

				q-table.table(
					ref="table"
					:rows="filteredRows"
					:pagination="pagination"
					:columns="opercolumns"
					@row-click="goto"
					color="primary"
					row-key="id")
					template(v-slot:body-cell-graph="props")
						q-td(:props="props")
							GistForTable
</template>

<style scoped lang="scss">
.header {
	margin-top: 1rem;
	display: flex;
	justify-content: start;
	gap: 2rem;
	align-items: center;
}
.grid {
	display: grid;
	grid-template-columns: 220px 1fr;
	justify-items: start;
	align-items: start;
	column-gap: 1rem;
	row-gap: 0.5rem;
	margin-top: 1rem;
}
.table {
	width: 100%;
}
:deep(.table tr) {
	.action > button {
		visibility: hidden;
	}
	&:hover {
		.action > button {
			visibility: visible;
		}
	}
}
.aggregat {
	font-size: 0.9rem;
	.q-input {
		padding: 1rem;
		padding-bottom: 0;
	}
}
.mybuttons {
	margin-top: 0.5rem;
	transition: 0.3s ease all;
	button {
		margin-right: 4px;
	}
}
</style>
