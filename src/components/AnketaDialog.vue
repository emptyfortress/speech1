<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import draggable from 'vuedraggable'
import LogicList from '@/components/LogicList.vue'
import { useLogic } from '@/stores/logic'

const modelValue = defineModel()

const props = defineProps<{
	anketa: Anketa
	new: boolean
}>()
const emit = defineEmits(['duble', 'cancel', 'save'])
const duble = () => {
	emit('duble')
}
const rec = ref(false)
const add = () => {
	let question = {
		id: list.value.length,
		text: 'Вопрос',
		zapros: '',
		auto: true,
		mark: 0,
		new: true,
	}
	props.new == true ? list1.value.push(question) : list.value.push(question)
}

const editMode = ref(false)
const edit = () => {
	editMode.value = !editMode.value
}
const list1 = ref([{ id: 0, text: 'Вопрос', auto: true, mark: 0, new: false }])
const list = ref([
	{ id: 0, zapros: 'Приветствие', text: 'Приветствие', auto: true, mark: 53, new: false },
	{ id: 1, zapros: '', text: 'Прогрев', auto: false, new: false },
	{ id: 2, zapros: '', text: 'Выяснение проблем', auto: false, new: false },
	{ id: 3, zapros: '', text: 'Отработка возражений', auto: false, new: false },
	{ id: 4, zapros: '', text: 'Предложение товаров по акции', auto: false, mark: 67, new: false },
	{ id: 5, zapros: '', text: 'Тон разговора', new: false },
	{ id: 6, zapros: 'Прощание', text: 'Завершение разговора', auto: true, mark: 92, new: false },
])
const calcEdit = computed(() => {
	return editMode.value ? true : false
})
const del = (idx: number) => {
	list.value.splice(idx, 1)
}
const del1 = (idx: number) => {
	list1.value.splice(idx, 1)
}
const close = () => {
	modelValue.value = false
	emit('cancel')
}
const anketaName = ref()
const save = () => {
	let name = anketaName.value.textContent
	emit('save', name)
	modelValue.value = false
}

const mystore = useLogic()
const zapros = ref(false)
const elem = ref()
const toggleZapros = (el: any) => {
	elem.value = el
	zapros.value = !zapros.value
}
const setZapros = () => {
	elem.value.zapros = mystore.activeLogic.label
	zapros.value = false
}
const removeZapros = (el: any) => {
	el.zapros = ''
	el.auto = false
}
</script>

<template lang="pug">
q-dialog.rel(v-model="modelValue")
	q-card(class="edit" v-if="props.new")
		q-card-section.row.items-start.q-pb-none
			div
				.text-h6(ref="anketaName" contenteditable) Название анкеты
				.descr(contenteditable) Описание
			q-space
			q-btn(icon="mdi-close" flat round dense v-close-popup)
		q-card-section
			.row.justify-between
				.descr Создано: -дата-
				.descr Автор: -фио автора-
		q-card-section
			q-scroll-area
				q-list
					q-expansion-item(expand-separator v-for="(item, index) in list1" :key="item.id")
						template(v-slot:header)
							q-item-section(avatar)
								q-avatar(text-color="black") {{index + 1}}
							q-item-section
								q-item-label(contenteditable) {{ item.text }}
								.text-caption(v-if="item.auto")
									q-icon.q-mr-xs(name="mdi-alpha-a-box" color="primary" size="xs")
									span AUTO
							q-item-section(side)
								q-btn(flat round dense icon="mdi-trash-can-outline" size="sm") 
									q-menu
										q-list
											q-item.pink(clickable @click="del1(index)" v-close-popup)
												q-item-section Удалить


						q-card-section
							.grid
								.condition
									.text-weight-bold Условия
									p(contenteditable) Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis nesciunt officiis dicta quae voluptates sequi? Minima eaque, repellat neque praesentium perspiciatis amet expedita. Vitae at quam, veniam ipsa sequi quia.
								.request(v-if="item.auto && !item.new")
									q-checkbox.q-mr-md(v-model="rec" dense) 
									label Запрос для автоматической оценки: <span class="text-weight-bold">Запрос запросыч</span>
								.request(v-if="item.new")
									q-checkbox(v-model="rec" dense) Запрос для автоматической оценки: <span class="text-weight-bold">Запрос запросыч</span>
		.row.justify-between.q-ma-sm(align="right")
			q-btn(flat color="primary" label="Отмена" @click="close") 
			q-btn(flat color="primary" label="Добавить вопрос" @click="add") 
			q-btn(flat color="primary" label="Сохранить" @click="save") 


	q-card(:class="{edit: editMode}" v-else)
		q-card-section
			q-card-section.row.items-start.q-pb-none
				div
					.text-h6(:contenteditable="calcEdit") {{ props.anketa.anketa }}
					.descr(:contenteditable="calcEdit") {{props.anketa.descr}}
				q-space
				q-btn(icon="mdi-close" flat round dense v-close-popup)

			q-card-section
				.row.justify-between
					.descr Создано: {{props.anketa.date}}
					.descr Автор: {{props.anketa.author}}

			q-card-section
				q-scroll-area
					component(:is="draggable" v-model="list" :disabled="!editMode" ghost-class="ghost" itemKey="item.id").q-mb-lg
						template(#item="{ element, index }")
							q-expansion-item()
								template(v-slot:header)
									q-item-section(avatar)
										q-avatar(text-color="black") {{index + 1}}
									q-item-section
										q-item-label(:contenteditable="calcEdit") {{ element.text }}
										.text-caption(v-if="element.auto")
											q-icon.q-mr-xs(name="mdi-alpha-a-box" color="primary" size="xs")
											span AUTO

									q-item-section(side v-if="editMode")
										q-btn(flat round dense icon="mdi-trash-can-outline" size="sm")
											q-menu
												q-list
													q-item.pink(clickable @click="del(index)" v-close-popup)
														q-item-section Удалить
								q-card-section
									.grid
										.condition
											.text-weight-bold Условия
											p(:contenteditable="calcEdit") Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis nesciunt officiis dicta quae voluptates sequi? Minima eaque, repellat neque praesentium perspiciatis amet expedita. Vitae at quam, veniam ipsa sequi quia.
										.request
											q-checkbox.q-mr-md(v-model="element.auto" dense :disable="!editMode || !element.zapros.length")
											label Запрос для автоматической оценки:
												q-chip(:removable="editMode" v-if="element.zapros.length" @remove="removeZapros(element)" ) {{ element.zapros}}
												q-btn(v-else flat color="primary" label="Выбрать" @click="toggleZapros(element)" :disable="!editMode" )

			.row.justify-between.q-ma-sm(align="right")
				template(v-if="!editMode")
					q-btn(flat color="primary" label="Отмена" @click="close") 
					q-btn(flat color="primary" label="Дублировать" @click="duble") 
					q-btn(flat color="primary" label="Редактировать" @click="edit") 
				template(v-else)
					q-btn(flat color="primary" label="Отмена" @click="edit") 
					q-btn(flat color="primary" label="Добавить вопрос" @click="add") 
					q-btn(flat color="primary" label="Сохранить" @click="edit") 

q-dialog(v-model="zapros")
	q-card.dop
		q-card-section
			LogicList()
		q-card-actions.q-ma-sm(align="right")
			q-btn(flat color="primary" label="Отмена" v-close-popup) 
			q-btn(flat color="primary" label="Выбрать" @click="setZapros")
</template>

<style scoped lang="scss">
.q-card {
	min-width: 700px;
}
.edit {
	outline: 3px solid red;
	-webkit-animation: shake-horizontal 0.3s cubic-bezier(0.455, 0.03, 0.515, 0.955) both;
	animation: shake-horizontal 0.3s cubic-bezier(0.455, 0.03, 0.515, 0.955) both;
}
.descr {
	font-size: 0.9rem;
}
.q-scrollarea {
	height: 60vh;
}
div > *[contenteditable='true'] {
	border-bottom: 1px dotted $primary;
}
.ghost {
	opacity: 0.5;
	background: #c8ebfb;
	border: 1px solid $primary;
}
.q-card.dop {
	width: 500px;
	min-width: 500px;
}
</style>
