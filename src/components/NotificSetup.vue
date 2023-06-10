<script setup lang="ts">
import { ref } from 'vue'
import type { QTableProps } from 'quasar'
import { useStore } from '@/stores/store'
import { words } from '@/stores/list'
import SvgIcon from '@/components/SvgIcon.vue'

const mystore = useStore()
const stringOptions = words
const options = ref(stringOptions)

const cols: QTableProps['columns'] = [
	{ name: 'keys', label: 'Ключевое слово / словарь', field: 'keys', sortable: true, align: 'left' },
	{ name: 'canal', label: 'Канал', field: 'canal', sortable: true, align: 'right' },
	{ name: 'actions', label: '', field: 'actions', sortable: false, align: 'right' },
]

const rows = ref([
	{ id: 0, keys: 'Здравствуйте', canal: 'Все', voc: false },
	{ id: 1, keys: 'Добрый вечер', canal: 'Все', voc: false },
])
const inf = ref(true)
const canal = ['Все', 'Клиент', 'Оператор']

const remove = (id: number) => {
	const ind = rows.value.findIndex((item) => item.id === id)
	rows.value.splice(ind, 1)
}

const filterFn = (val: string, update: any) => {
	update(() => {
		if (val === '') {
			options.value = stringOptions
		} else {
			const needle = val.toLowerCase()
			options.value = stringOptions.filter((v) => v.label.toLowerCase().indexOf(needle) > -1)
		}
	})
}

const newKey = ref('')
const menu = ref(false)
const menu1 = ref(false)

const changeWord = (e: any, a: string, b: boolean) => {
	e.keys = a
	e.voc = b
	menu.value = false
}

const addWord = (a: string, b: boolean) => {
	const item = {
		id: rows.value.length + 1,
		keys: a,
		voc: b,
		canal: 'Все',
	}
	rows.value.push(item)
	menu1.value = false
	menu.value = false
	newKey.value = ''
}
</script>

<template lang="pug">
.inf( v-if="inf") Чтобы изменить значения кликните по нему.
	q-btn(flat round icon="mdi-close" dense size="10px" @click="inf = false")
q-table(:columns="cols" :rows="rows" flat row-key="id")
	template(v-slot:body="props")
		q-tr(:props="props")
			q-td(key="keys" :props="props" )
				div(@click="menu = true")
					component(:is="SvgIcon" name="vocabulary" v-if="props.row.voc").lib
					|{{ props.row.keys }}

				q-menu(anchor="top left" self="top left" v-if="menu" )
					q-select(outlined v-model="props.row.keys"
						clearable
						use-input
						input-debounce="0"
						label="Ключевое слово, словарь"
						:options="options"
						@filter="filterFn"
						behavior="menu").men

							template(v-slot:option="scope")
								q-item(clickable v-bind="scope.itemProps" @click="changeWord(props.row, scope.opt.label, scope.opt.voc)")
									q-item-section(side v-if="scope.opt.voc")
										component(:is="SvgIcon" name="vocabulary").lib
									q-item-section
										q-item-label {{scope.opt.label}}
							template(v-slot:no-option)
								q-item(clickable)
									q-item-section.text-grey No results
		
			q-td(key="canal" :props="props")
				|{{ props.row.canal }}
				q-popup-edit(v-model="props.row.canal" auto-save v-slot="scope").border-primary
					q-select(v-model="scope.value" dense autofocus @keyup.enter="scope.set" :options="canal")
			q-td(key="actions" :props="props")
				q-btn(dense size="sm" flat round icon="mdi-trash-can-outline").hid
					q-menu
						q-list
							q-item(clickable v-close-popup @click="remove(props.row.id)").pink
								q-item-section Удалить
	template(v-slot:bottom-row)
		q-tr
			q-td
				q-btn(flat icon="mdi-plus-circle-outline" size="sm" label="Добавить" color="primary" @click="menu1 = true") 
				q-menu(anchor="top left" self="top left" v-if="menu1" )
					q-select(outlined v-model="newKey"
						clearable
						use-input
						input-debounce="0"
						label="Ключевое слово, словарь"
						:options="options"
						@filter="filterFn"
						behavior="menu").men

							template(v-slot:option="scope")
								q-item(clickable v-bind="scope.itemProps" @click="addWord(scope.opt.label, scope.opt.voc)")
									q-item-section(side v-if="scope.opt.voc")
										component(:is="SvgIcon" name="vocabulary").lib
									q-item-section
										q-item-label {{scope.opt.label}}
							template(v-slot:no-option)
								q-item(clickable)
									q-item-section.text-grey No results
			q-td
			q-td
</template>

<style scoped lang="scss">
@import '@/assets/styles/myvariables.scss';
tr {
	.hid {
		visibility: hidden;
	}
	&:hover {
		.hid {
			visibility: visible;
		}
	}
}
.inf {
	background: $bgLight;
	border: 1px solid #dedede;
	font-size: 0.7rem;
	padding: 0.3rem 0.6rem;
	margin-bottom: 2rem;
	position: relative;
	.q-btn {
		position: absolute;
		right: 3px;
		top: 2px;
	}
}
.men {
	width: 300px;
}
.lib {
	font-size: 0.8rem;
	margin-right: 0.5rem;
}
</style>
