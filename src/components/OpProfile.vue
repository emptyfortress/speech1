<template lang="pug">
q-page(padding)
	.container
		.ava
			.row.rel.items-center.q-gutter-x-sm
				.q-avatar
					img(src="@/assets/img/user1.svg")
				div
					.text-weight-bold Голомудько
					.name Разубай Буранович
				q-btn.photo(color="white" round icon="mdi-camera" text-color="black" size="sm" )
			q-card.card
				component(:is="VueApexCharts" type="area" height="130px" :options="chartOptionsSpark1" :series="series1")
			q-card.card
				component(:is="VueApexCharts" type="area" height="130px" :options="chartOptionsSpark2" :series="series2")
			q-card.card
				component(:is="VueApexCharts" type="area" height="130px" :options="chartOptionsSpark" :series="series")
		br
		q-tabs(v-model="tab" dense active-color="primary" indicator-color="primary" align="left" )
			q-tab(name="checklists" label="Мои чеклисты")
			q-tab(name="marks" label="Мои оценки")
			q-tab(name="records" label="Мои записи")
		q-separator

		q-tab-panels(v-model="tab" animated)
			q-tab-panel(name="checklists")
				q-table.table(
					:columns="cols1"
					:rows='checks'
					@row-click="toggleDialog1"
					:pagination="pagination"
					row-key="id"
					flat
				)
					template(v-slot:body-cell-mark="props")
						q-td.text-right
							.mrk {{ props.row.mark }}
					template(v-slot:body-cell-action="props")
						q-td(:props="props")
							q-icon(name="mdi-chevron-right" size='sm') 

			q-tab-panel(name="marks")
				q-table.table(:columns="cols"
					:rows="marks"
					@row-click="toggleDialog"
					:pagination="pagination"
					row-key="id"
					flat)
					template(v-slot:body-cell-mark="props")
						q-td(:props="props")
							.mrk {{ props.value }}
					template(v-slot:body-cell-status="props")
						q-td(:props="props")
							q-badge(:color="calcColor(props.value)") {{ props.value }}

					template(v-slot:body-cell-graph="props")
						q-td(:props="props")
							GistForTable

			q-tab-panel(name="records")
				OperRecordTable(:oper="oper" :private="true")

	DialogOperatorMarks(v-model="dialog" :anketa="currAnketa")
	DialogOperatorChecklistMarks(v-model="dialog1" :list="currChecklist")
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { marks } from '@/stores/marks'
import VueApexCharts from 'vue3-apexcharts'
import DialogOperatorMarks from '@/components/common/DialogOperatorMarks.vue'
import DialogOperatorChecklistMarks from '@/components/common/DialogOperatorChecklistMarks.vue'
import type { QTableColumn } from 'quasar'
import OperRecordTable from './evaluate/OperRecordTable.vue'
import { chartOptionsSpark, chartOptionsSpark1, chartOptionsSpark2 } from '@/stores/charts1'
import GistForTable from '@/components/graph/GistForTable.vue'

const tab = ref('checklists')

const oper = {
	id: 0,
	name: 'Екатерина',
	group: 'Юрлица',
	city: 'Москва',
	total: 169,
	percent: 9,
	good: 15,
	notgood: 47,
	bad: 53,
	date: '2022-12-14',
}
const cols1: QTableColumn[] = [
	{ name: 'date', label: 'Дата', field: 'date', sortable: true, align: 'left' },
	{ name: 'client', label: 'Клиент', field: 'client', sortable: true, align: 'left' },
	{ name: 'category', label: 'Категория', field: 'category', sortable: true, align: 'left' },
	{ name: 'list', label: 'Чеклист', field: 'list', sortable: true, align: 'left' },
	{ name: 'mark', label: 'Оценка', field: 'mark', sortable: true, align: 'right' },
	{ name: 'action', label: '', field: 'action', sortable: true, align: 'right' },
]

const checks = [
	{ id: 0, date: '2025-01-19 20:32', client: 'Григорий', list: 'Интегральный чеклист', mark: 53 },
	{ id: 1, date: '2025-01-19 20:32', client: 'Григорий', list: 'Чеклист 1', mark: 22 },
	{ id: 2, date: '2025-01-19 20:32', client: 'Григорий', list: 'Чеклист 2', mark: 65 },
	{ id: 3, date: '2025-01-18 16:29', client: 'Константин', list: 'Интегральный чеклист', mark: 58 },
	{ id: 4, date: '2025-01-18 16:29', client: 'Константин', list: 'Чеклист 1', mark: 63 },
	{ id: 5, date: '2025-01-18 16:29', client: 'Константин', list: 'Чеклист 2', mark: 63 },
	{ id: 6, date: '2025-01-18 14:16', client: 'Николай', list: 'Интегральный чеклист', mark: 85 },
	{ id: 7, date: '2025-01-18 14:16', client: 'Николай', list: 'Чеклист 1', mark: 95 },
	{ id: 8, date: '2025-01-18 14:16', client: 'Николай', list: 'Чеклист 2', mark: 55 },
	{ id: 9, date: '2025-01-17 10:18', client: 'Николай', list: 'Интегральный чеклист', mark: 68 },
	{ id: 10, date: '2025-01-17 10:18', client: 'Николай', list: 'Чеклист 1', mark: 48 },
	{ id: 11, date: '2025-01-17 10:18', client: 'Николай', list: 'Чеклист 2', mark: 45 },
]

const cols: QTableColumn[] = [
	{ name: 'date', label: 'Дата', field: 'date', sortable: true, align: 'left' },
	{ name: 'anketa', label: 'Анкета', field: 'anketa', sortable: true, align: 'left' },
	{ name: 'descr', label: 'Описание', field: 'descr', sortable: true, align: 'left' },
	{ name: 'supervisor', label: 'Супервизор', field: 'supervisor', sortable: true, align: 'left' },
	{ name: 'status', label: 'Статус', field: 'status', sortable: true, align: 'left' },
	{ name: 'graph', label: 'Выполнение чеклиста', field: 'graph', align: 'left', sortable: false },
	{ name: 'mark', label: 'Оценка', field: 'mark', sortable: true, align: 'right' },
]
const pagination = {
	rowsPerPage: 7,
	sortBy: 'date',
	descending: true,
}

const calcColor = (e: string) => {
	if (e == 'Эскалация') return 'negative'
	if (e == 'Завершено') return 'secondary'
	else return 'primary'
}

const currAnketa = ref<Anketa>(marks[0])

const currChecklist = ref(checks[0])

const dialog = ref(false)
const dialog1 = ref(false)

const toggleDialog = (evt: Event, row: Anketa) => {
	currAnketa.value = row
	dialog.value = !dialog.value
}
const toggleDialog1 = (evt: Event, row: Checklist) => {
	currChecklist.value = row
	dialog1.value = !dialog1.value
}

const series = [{ name: 'Оценки', data: [60, 43, 65, 55, 77, 62, 67] }]
const series1 = [{ name: 'Вызовы', data: [55, 57, 65, 70, 77, 80, 67] }]
const series2 = [{ name: 'АНТ', data: [60, 57, 65, 67, 72, 42, 68] }]
</script>

<style scoped lang="scss">
@import '@/assets/styles/myvariables.scss';

.photo {
	position: absolute;
	bottom: 0;
	left: -5px;
}

.ava {
	display: grid;
	grid-template-columns: 420px 1fr 1fr 1fr;
	justify-items: start;
	align-items: center;
	column-gap: 0.5rem;
	font-size: 1.1rem;

	.q-avatar {
		width: 100px;
		height: 100px;
	}
}

.mygrid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	justify-content: start;
	grid-column-gap: 3rem;
	align-items: center;

	.q-separator {
		grid-column: 1/-1;
	}

	.test {
		height: 100%;
		width: 100%;
		background: pink;
	}
}

.mygrid1 {
	display: grid;
	grid-template-columns: auto 1fr;
	justify-content: start;
	gap: 1rem;
	grid-column-gap: 2rem;
}

.mrk {
	font-size: 1rem;
	font-weight: 600;
	margin-right: 0.5rem;
}

.mean {
	span {
		font-size: 1.3rem;
		font-weight: 600;
		line-height: 92%;
	}

	&.all {
		margin-top: 20px;
	}
}

.dash {
	padding: 0.7rem;
	height: 130px;
	// background: transparent;
	// box-shadow: none;
	font-size: 0.95rem;
}

:deep(.q-tab-panels) {
	background: transparent;
}

:deep(.q-tab-panel) {
	padding-left: 0;
	padding-right: 0;
}

.mrk {
	font-size: 1rem;
	font-weight: 600;
	margin-right: 0.5rem;
}
</style>
