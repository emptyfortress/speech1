<template lang="pug">
q-page(padding)
	.container
		.huge
			.ava
				.q-avatar
					img(src="@/assets/img/user1.svg")
				div
					.text-weight-bold Голомудько
					.name Разубай Буранович
				q-space
				q-card.card
					VueApexCharts(type="area" height="130px" :options="chartOptionsSpark1" :series="series1" )
				// q-space
				q-btn(label="Выйти" unelevated color="primary")
			q-btn(color="white" round icon="mdi-camera" text-color="black" size="sm").photo
		br
		br
		br
		br
		q-tabs(v-model="tab" dense active-color="primary" indicator-color="primary" align="left" )
			q-tab(name="marks" label="Мои оценки")
			q-tab(name="records" label="Мои записи")
		q-separator

		q-tab-panels(v-model="tab" animated)
			q-tab-panel(name="marks")
				q-table(:columns="cols"
					:rows="marks"
					@row-click="toggleDialog"
					:pagination="pagination"
					row-key="id"
					flat)
					template(v-slot:body-cell-mark="props")
						q-td(:props="props")
							.mrk {{props.value}}
					template(v-slot:body-cell-status="props")
						q-td(:props="props")
							q-badge(:color="calcColor(props.value)") {{props.value}}

			q-tab-panel(name="records" )
				div records

	DialogOperatorMarks(v-model="dialog" :mark="currMark")
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { marks } from '@/stores/marks'
import VueApexCharts from 'vue3-apexcharts'
import DialogOperatorMarks from '@/components/common/DialogOperatorMarks.vue'
import type { QTableColumn } from 'quasar'

const tab = ref('marks')
// const current = ref(1)
const dialog = ref(false)

const cols: QTableColumn[] = [
	{ name: 'date', label: 'Дата', field: 'date', sortable: true, align: 'left' },
	{ name: 'anketa', label: 'Анкета', field: 'anketa', sortable: true, align: 'left' },
	{ name: 'descr', label: 'Описание', field: 'descr', sortable: true, align: 'left' },
	{ name: 'supervisor', label: 'Супервизор', field: 'supervisor', sortable: true, align: 'left' },
	{ name: 'status', label: 'Статус', field: 'status', sortable: true, align: 'left' },
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

const currMark = ref()

const toggleDialog = (item: Mark) => {
	currMark.value = item
	dialog.value = !dialog.value
}

const calcCat = computed(() => {
	return marks.map((el) => el.text)
})
const calcSer = computed(() => {
	return marks.map((el) => el.mark)
})

const series1 = [{ name: 'Оценки', data: [55, 57, 65, 70, 77, 80, 67] }]
const chartOptionsSpark1 = {
	chart: {
		type: 'area',
		height: 130,
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
		text: '64',
		offsetX: 0,
		style: {
			fontSize: '24px',
		},
	},
	subtitle: {
		text: 'Средняя оценка',
		offsetX: 0,
		style: {
			fontSize: '14px',
		},
	},
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/myvariables.scss';
.huge {
	height: 150px;
	// background: url(@/assets/img/abstract.jpg);
	background: url(@/assets/img/city.webp);
	background-size: cover;
	background-position: 0 40%;
	position: relative;
}
.photo {
	position: absolute;
	bottom: -70px;
	left: 40px;
}
.ava {
	height: 100px;
	width: 100%;
	position: absolute;
	bottom: -70px;
	left: 0;
	display: flex;
	padding-left: 50px;
	justify-content: flex-start;
	align-items: flex-end;
	gap: 2rem;
	font-size: 1.2rem;
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
.q-tab-panels {
	min-height: 500px;
	box-shadow: $card-shadow;
	padding: 1rem;
	padding-top: 0;
	border-radius: 0 0 4px 4px;
	font-size: 0.9rem;
}
.mrk {
	font-size: 1rem;
	font-weight: 600;
	margin-right: 0.5rem;
}
</style>
