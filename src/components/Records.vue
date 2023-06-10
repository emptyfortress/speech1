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
			:loading="mystore.loading"
			:rows-per-page-options='shownRows').table
			template(v-slot:loading)
				q-inner-loading(showing color="primary" size="100px")
			template(v-slot:top="props")
				q-btn(unelevated color="grey" size="sm" label="Скачать одним архивом")
				q-chip(v-for="chip in cat.getTags") {{ chip }}
				q-space
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
					q-td(key="categ") {{props.row.categ}}
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

Teleport(to="#speech")
	.recdate(v-if="selected !== null") {{ records[selected].date}}
</template>

<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'
import type { Ref } from 'vue'
import { records } from '@/stores/operators'
import { useStore } from '@/stores/store'
import { useCat } from '@/stores/category1'
import type { QTableProps } from 'quasar'

interface Row {
	id: number
	date: string
	group: string
	record: string
	categ?: string
	operator: string
	client: string
	expand: boolean
}

const cat = useCat()
const table: any = ref(null)
const shownRows = ref([10, 20, 50])
const togg = () => {
	table.value.toggleFullscreen()
	table.value.setPagination({
		rowsPerPage: 0,
	})
}

const filter = ref('')
const mystore = useStore()

const selected: Ref<number | null> = ref(null)

watchEffect(() => {
	if (mystore.recordPanel == false) {
		selected.value = null
		mystore.closeSpeechDrawer()
	}
})

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

const getSelectedString = (e: number) => {
	return `Выбрана ${e} запись`
}

const sound = ref(50)

const columns: QTableProps['columns'] = [
	{ name: 'date', label: 'Дата, время', align: 'left', field: 'date', sortable: true },
	{ name: 'operator', label: 'Оператор', align: 'left', field: 'operator', sortable: true },
	{ name: 'client', label: 'Клиент', align: 'left', field: 'client', sortable: true },
	{ name: 'group', label: 'Группа', align: 'left', field: 'group', sortable: true },
	{ name: 'categ', label: 'Категория', align: 'left', field: 'categ', sortable: true },
	{ name: 'record', label: 'Контекст', align: 'left', field: 'record', sortable: false },
]
</script>

<style scoped lang="scss">
.recdate {
	font-weight: 600;
}
.rel {
	position: relative;
	cursor: pointer;
	.dd {
		position: absolute;
		top: 50%;
		right: 1rem;
		transform: translateY();
		visibility: hidden;
	}
	&:hover {
		.dd {
			visibility: visible;
		}
	}
}
td.ellipsis {
	max-width: 400px;
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
