<template lang="pug">
q-expansion-item(v-model="mystore.recordPanel")
	template(v-slot:header)
		q-item-section(avatar).line
			q-avatar(icon="mdi-record-circle-outline" flat)
		q-item-section
			.zag Записи сеансов обслуживания
	q-card-section.q-px-md
		q-table(ref="table"
			:rows="records"
			:columns="columns"
			:selected-rows-label="getSelectedString"
			rows-per-page-label="Записей на странице"
			:filter="filter"
			:pagination="pagination"
			row-key="id"
			).table
			template(v-slot:top="props")
				.text-h6 Записи по вехам
				.grid
					q-select(label="Веха" :options="vehOptions" v-model="vehModel" dense)
					q-range(v-model="label" :min="0" :max="100" :step="4" label color="primary" label-always )
					.row.justify-end
						q-input(dense debounce="300" color="primary" v-model="filter" clearable)
							template(v-slot:prepend)
								q-icon(name="mdi-magnify")
						q-btn(flat round dense :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'" @click="togg").q-ml-md
			template(v-slot:body-selection)
			template(v-slot:body="props")
				q-tr(:props="props" @click="select(props.row)").rel
					q-td(key="date" :props="props") {{ props.row.date }}
					q-td(key="operator") {{props.row.operator}}
					q-td(key="client") {{props.row.client}}
					q-td(key="group") {{props.row.group}}
					q-td(key="record" v-html="props.row.record")
					q-btn(flat round color="primary" icon="mdi-download" size="sm" @click.stop="$q.notify({message: 'Запись скачана', icon: 'mdi-check'} )").dd
					.myplayer(v-if="selected === props.row.id")
						q-linear-progress(:value=".6" color="positive")
						div(v-if="!mystore.wide") {{props.row.date}}
						div(v-if="!mystore.wide") {{props.row.operator}}
						.player
							q-btn(round flat icon="mdi-rewind" @click.stop)
							q-btn(round flat icon="mdi-pause" @click.stop)
							q-btn(round flat icon="mdi-fast-forward" @click.stop)
						.time 02:31
						.row.items-center
							q-icon(name="mdi-volume-medium" size="sm")
							q-slider(color="primary" v-model="sound").slide
							q-icon(name="mdi-volume-high" size="sm")
br
br
br
br
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { Ref } from 'vue'
import { records } from '@/stores/operators'
import { useStore } from '@/stores/store'

const rec = ref(false)
const vehModel = ref('Приветствие')
const label = ref({ min: 0, max: 100 })
const filter = ref('')

interface Row {
	id: number
	date: string
	operator: string
	client: string
	group: string
	context: string
}

const vehOptions = [
	'Приветствие',
	'Назвать себя',
	'Локализация проблемы',
	'Просьба обождать',
	'Благодарность за ожид.',
	'Новые услуги',
	'Прощание',
]

const columns: Column[] = [
	{ id: 0, name: 'date', label: 'Дата и время', field: 'date', align: 'left', sortable: true },
	{ id: 1, name: 'operator', label: 'Оператор', field: 'operator', align: 'left', sortable: true },
	{ id: 2, name: 'client', label: 'Клиент', field: 'client', align: 'left', sortable: true },
	{ id: 3, name: 'group', label: 'Группа', field: 'group', align: 'left', sortable: true },
	{ id: 4, name: 'context', label: 'Контекст', field: 'context', align: 'left', sortable: false },
]

const getSelectedString = () => {
	return 'Выбран оператор'
}

const pagination = ref({
	sortBy: 'total' as keyof Row,
	descending: true,
	page: 1,
	rowsPerPage: 10,
})

const sound = ref(50)
const table: any = ref(null)
const togg = () => {
	table.value.toggleFullscreen()
	table.value.setPagination({
		rowsPerPage: 0,
	})
}

const mystore = useStore()
const selected: Ref<number | null> = ref(null)
const select = (e: Row) => {
	if (selected.value === null) {
		selected.value = e.id
		mystore.setRecord(e.group)
		mystore.openSpeechDrawer()
	} else if (selected.value === e.id) {
		selected.value = null
		mystore.setRecord('группа1')
		mystore.closeSpeechDrawer()
	} else {
		selected.value = e.id
		mystore.setRecord(e.group)
	}
}

watchEffect(() => {
	if (mystore.recordPanel == false) {
		selected.value = null
		mystore.closeSpeechDrawer()
	}
})
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
.grid {
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	gap: 5rem;
	align-items: end;
}
.q-tr.rel {
	position: relative;
	cursor: pointer;
	.dd {
		position: absolute;
		top: 50%;
		right: 1rem;
		transform: translateY(-50%);
		visibility: hidden;
	}
	&:hover {
		.dd {
			visibility: visible;
		}
	}
}
.myplayer {
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background: $blue-grey-9;
	color: #6d8e9e;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	padding-left: 1rem;
	gap: 2rem;
	font-size: 0.9rem;
	.q-linear-progress {
		position: absolute;
		top: 0;
		left: 0;
	}
	.player {
		color: white;
		display: flex;
		justify-items: flex-start;
		align-items: center;
		height: 100%;
	}
	.time {
		font-size: 2rem;
		font-weight: lighter;
		letter-spacing: 1px;
		color: white;
	}
	.slide {
		width: 150px;
	}
}
</style>
