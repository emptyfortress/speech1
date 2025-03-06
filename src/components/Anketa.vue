<script setup lang="ts">
import { ref } from 'vue'
import type { QTableColumn } from 'quasar'
import AnketaDialog from '@/components/AnketaDialog.vue'
import { anketas } from '@/stores/operators'

const panel = ref(true)

const cols: QTableColumn[] = [
	{ name: 'label', label: 'Анкета', field: 'label', sortable: true, align: 'left' },
	{ name: 'descr', label: 'Описание', field: 'descr', sortable: true, align: 'left' },
	{ name: 'date', label: 'Дата создания', field: 'date', sortable: true, align: 'left' },
	{ name: 'author', label: 'Создал', field: 'author', sortable: true, align: 'left' },
	{ name: 'status', label: 'Статус', field: 'status', sortable: true, align: 'left' },
	{ name: 'action', label: '', field: 'action', sortable: false, align: 'right' },
]
const rows = ref<Anketa[]>(anketas)
const dialog = ref(false)

const current = ref<Anketa>(rows.value[0])
const currIndex = ref(0)
const showPreview = (evt: Event, row: any, index: number) => {
	current.value = row
	currIndex.value = index
	dialog.value = !dialog.value
}
const newAnketa = ref(false)
const create = () => {
	newAnketa.value = true
	dialog.value = !dialog.value
}
const duble = () => {
	let temp: Anketa = {
		id: rows.value.length,
		date: '2024-02-05 18:11',
		status: 'Подготовка',
		selected: false,
		anketa: current.value.anketa + '-copy',
		descr: current.value.descr,
		author: current.value.author,
	}
	rows.value.push(temp)
	current.value = temp
	currIndex.value += 1
}
const kill = (ind: number) => {
	rows.value.splice(ind, 1)
}
const cancel = () => {
	newAnketa.value = false
}
const add = (e: string) => {
	let temp: Anketa = {
		id: rows.value.length,
		date: '2024-02-05 18:11',
		status: 'Подготовка',
		anketa: e,
		selected: false,
		descr: 'Описание',
		author: 'Прокофьев А.С.',
	}
	rows.value.push(temp)
	newAnketa.value = false
}
const test = () => {
	console.log(rows.value)
}
const pagination = {
	rowsPerPage: 0,
}
</script>

<template lang="pug">
q-page(padding)
	.container
		q-expansion-item(v-model="panel" default-opened)
			template(v-slot:header)
				q-item-section.line(avatar)
					q-avatar(icon="mdi-playlist-check" flat)
				q-item-section
					.zag(@click="test") Анкеты
			q-card-section.q-px-md
				q-table(:columns="cols"
					:rows="rows"
					@row-click="showPreview"
					:pagination="pagination"
					flat
					hide-pagination)
					template(v-slot:body-cell-action="props")
						q-td(:props="props")
							q-btn(flat round icon="mdi-trash-can-outline" dense @click.stop="" size="sm") 
								q-menu(anchor="bottom right" self="top right")
									q-list
										q-item(clickable v-close-popup @click="kill(props.rowIndex)").pink
											q-item-section Удалить


			q-card-actions.q-mx-md(align="right")
				q-btn(unelevated color="primary" label="Создать анкету" @click="create")
	AnketaDialog(v-model="dialog" :anketa="current" @duble="duble" :new="newAnketa" @cancel="cancel" @save="add")
</template>

<style scoped lang="scss">
.header {
	margin-top: 1rem;
	display: flex;
	justify-content: start;
	gap: 2rem;
	align-items: center;
}

tr {
	.q-btn {
		visibility: hidden;
	}

	&:hover {
		.q-btn {
			visibility: visible;
		}
	}
}

:deep(.q-btn .q-icon) {
	color: #999;

	&:hover {
		color: #333;
	}
}
</style>
