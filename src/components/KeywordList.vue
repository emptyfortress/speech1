<template lang="pug">
.zg
	div Библиотека
	q-badge {{ items.length }}
q-input(ref="input" dense v-model="filter" clearable hide-bottom-space @clear="filter = ''")
	template(v-slot:prepend)
		q-icon(name="mdi-magnify")
q-list(dense)
	template(v-if="editMode && currentVoc")
		q-card.full-background
			q-item(clickable dense)
				q-item-section(side)
					component(:is="SvgIcon" name="vocabulary").voc
				q-item-section {{currentVoc.label}}
				q-item-section(side)
					q-icon(name="mdi-arrow-up-right" size="xs" dense @click="save")
			q-item(v-for="item in selection" clickable :key="item" dense)
				q-item-section {{item}}
				q-item-section(side)
					q-icon(name="mdi-close" size="xs" @click="removeFromVoc(item)").hov


	component(:is="draggable" v-model="filteredItems" itemKey="item.id" group="subcat" )
		template(#item="{ element }")
			q-item(clickable dense)
				q-item-section
					label
						q-checkbox(v-model="selection" size="xs" dense :val="element.label").q-mr-sm
						component(:is="SvgIcon" name="vocabulary" v-if="element.voc").voc
						WordHighlighter(:query="filter") {{ element.label }}

				q-item-section(side v-if="!editMode")
					.row
						q-icon(name="mdi-pencil" size="xs" @click="edit(element)" v-if="element.voc").q-mr-sm.hov
						q-icon(name="mdi-trash-can-outline" size="xs" @click="").hov
							q-menu
								q-list
									q-item(clickable @click="remove(element)" v-close-popup).pink
										q-item-section Удалить

	template(v-if="filteredItems.length === 0")
		.notfound
			q-icon(name="mdi-emoticon-tongue-outline" size="sm" color="primary")
			span.q-mx-sm Ничего нет.
			q-btn(color="primary" label="Добавить" size="sm" unelevated @click="add")

transition(name="slide-bottom")
	.addvoc(v-show="selection.length > 0 && !editMode")
		.total
			|Выбрано:
			span {{ calcKeys }}
			q-btn(round dense flat icon="mdi-close" size="sm" @click="cancel")
		q-input(v-model="vocName" outlined dense label="Название словаря" bg-color="white")
		q-card-actions
			q-btn(label="Отмена" flat color="white" @click="cancel")
			q-space
			q-btn(label="Создать" flat color="white" :disable="vocName.length < 3" @click="addVoc")
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import draggable from 'vuedraggable'
import type { Ref } from 'vue'
import { useQuasar } from 'quasar'
import { words } from '@/stores/list'
import SvgIcon from '@/components/SvgIcon.vue'
import WordHighlighter from 'vue-word-highlighter'

interface Keyword {
	key?: string
	keys?: string[]
	label: string
	selected: boolean
	score: number
	part?: string
	voc?: boolean
}

const selection: Ref<string[]> = ref([])
const input = ref(null)
const filter = ref('')

const items: Ref<Keyword[]> = ref(words)
const filteredItems = computed(() => {
	if (filter.value) {
		return items.value.filter((item) =>
			item.label.toLowerCase().includes(filter.value.toLowerCase())
		)
	}
	return items.value
})

const remove = (e: Keyword) => {
	let index = items.value.findIndex((item) => item.key === e.key)
	items.value.splice(index, 1)
	show(e)
}

const compare = (a: Keyword, b: Keyword) => {
	if (a.score > b.score) return -1
	if (a.score < b.score) return 1
	return 0
}

const add = () => {
	if (filter.value) {
		let temp = {
			key: filter.value,
			label: filter.value,
			selected: false,
			score: 4500,
			part: '',
		}
		items.value.push(temp)
		items.value.sort(compare)
		added(filter.value)
		filter.value = ''
	}
}

const undo = (e: Keyword) => {
	items.value.push(e)
	items.value.sort(compare)
}

const $q = useQuasar()

const show = (e: Keyword) => {
	let message = e.label + ' - удалено.'
	$q.notify({
		message: message,
		color: 'negative',
		actions: [
			{
				label: 'Вернуть',
				color: 'white',
				handler: () => undo(e),
			},
		],
	})
}

const added = (e: string) => {
	let message = 'Добавлено ' + e
	$q.notify({
		message: message,
		icon: 'mdi-check',
		position: 'bottom-right',
	})
}
const vocName = ref('')

const cancel = () => {
	selection.value = []
}

const addVoc = () => {
	let temp = {
		id: words.length + 1,
		label: vocName.value,
		keys: selection.value,
		selected: false,
		score: 5000,
		voc: true,
	}
	items.value.push(temp)
	items.value.sort(compare)
	selection.value = []
	added(vocName.value)
	vocName.value = ''
}
const calcKeys = computed(() => {
	return selection.value.flat(2).length
})

const editMode = ref(false)
const currentVoc: Ref<null | Keyword> = ref(null)

const edit = (item: Keyword) => {
	editMode.value = !editMode.value
	currentVoc.value = item
	selection.value = item.keys?.flat(2) || []
}

const removeFromVoc = (e: string) => {
	selection.value = selection.value.filter((item) => item !== e)
}
const save = () => {
	currentVoc.value!.keys = selection.value
	selection.value = []
	editMode.value = false
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/myvariables.scss';
.rel {
	position: relative;
	.plus {
		position: absolute;
		top: -3px;
		right: 23px;
	}
}
.q-list--dense {
	font-size: 0.9rem;
	.q-item {
		padding-left: 6px;
		padding-right: 6px;
	}
}
.q-input {
	transform: translateY(-7px);
}
.q-field--dense {
	height: 32px;
}
.q-item {
	.hov {
		display: none;
	}
	&:hover {
		.hov {
			display: block;
		}
	}
}
.q-notification-message {
	background: red;
}
.zg {
	margin-bottom: 1rem;
	font-size: 0.9rem;
	display: flex;
	justify-content: flex-start;
	gap: 1rem;
}
.notfound {
	margin-top: 1rem;
	font-size: 0.9rem;
}
.voc {
	font-size: 0.8rem;
	margin-right: 0.5rem;
}
.addvoc {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	background: $primary;
	padding: 0.5rem;
	color: white;
}
.total {
	margin-bottom: 0.5rem;
	span {
		margin: 0 1rem;
		font-size: 1.2rem;
	}
	.q-btn {
		transform: translateY(-2px);
	}
}
.full-background {
	--c: #d9ecfa;
	background: var(--c);
	box-shadow: 0 0 0 100vmax var(--c);
	clip-path: inset(0 -100vmax);
	padding: 10px 0;
	margin-bottom: 1rem;
	margin-top: 0.5rem;
}
.q-item__section--avatar {
	padding-right: 0;
}

.sortable-ghost,
.sortable-drag {
	background: $bgMain;
	border: 1px solid $primary;
	.q-checkbox,
	.q-icon {
		visibility: hidden;
	}
}
</style>
