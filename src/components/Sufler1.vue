<script setup lang="ts">
import { ref } from 'vue'
import IcOutlineSupportAgent from '@/components/icons/IcOutlineSupportAgent.vue'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const list = ref([
	{ id: 0, event: 'Не хочу', hint: 'Подсказка для не хочу' },
	{ id: 1, event: 'Нет времени', hint: 'Подсказка для нет времени' },
	{ id: 2, event: 'Не нужно', hint: 'Подсказка для не нужно' },
	{ id: 3, event: 'Потом', hint: 'Подсказка для потом' },
])

const selection = ref(list.value[0])
const editedHint = ref(selection.value.hint)

const select = (item: any) => {
	selection.value = item
	editedHint.value = item.hint
}

const save = () => {
	const index = list.value.findIndex((i) => i.id === selection.value.id)
	if (index !== -1) {
		list.value[index].hint = editedHint.value
		$q.notify({
			message: 'Сохранено',
			color: 'teal',
			position: 'bottom',
		})
	}
}

// Удаление выбранного элемента
const deleteSelected = () => {
	const idToDelete = selection.value?.id
	const index = list.value.findIndex((item) => item.id === idToDelete)
	if (index !== -1) {
		list.value.splice(index, 1)
		if (list.value.length > 0) {
			selection.value = list.value[0]
			editedHint.value = list.value[0].hint
		}
		$q.notify({ message: 'Удалено', color: 'red', position: 'bottom' })
	}
}

// ➕ FAB + Dialog + Validation
const isAddDialogOpen = ref(false)
const newEvent = ref('')
const newHint = ref('')
const addForm = ref()

const openAddDialog = () => {
	newEvent.value = ''
	newHint.value = ''
	isAddDialogOpen.value = true
}

const saveNewItem = () => {
	addForm.value.validate().then((valid: boolean) => {
		if (!valid) return

		const newId = list.value.length ? Math.max(...list.value.map((i) => i.id)) + 1 : 0
		list.value.push({
			id: newId,
			event: newEvent.value,
			hint: newHint.value,
		})
		isAddDialogOpen.value = false
		$q.notify({ color: 'teal', message: 'Новое событие добавлено', position: 'bottom' })
	})
}

// Validation rules
const requiredRule = (val: string) => !!val?.trim() || 'Поле обязательно'
</script>

<template lang="pug">
q-page(padding)
	.container.rel
		.zag
			IcOutlineSupportAgent.icon
			| Суфлер - настройка

		.grid
			.scroll-list
				.hd События
				q-list
					q-item(
						clickable
						v-for="item in list"
						:key='item.id'
						@click="select(item)"
						:class="{ selected : item.id === selection?.id }"
					)
						q-item-section(side)
							q-icon(name="mdi-flag-outline")
						q-item-section {{ item.event }}
						q-item-section(side v-if="item.id === selection?.id")
							q-btn(
								flat
								round
								dense
								icon="mdi-trash-can-outline"
								@click.stop="deleteSelected"
								size="sm"	
								color="negative"
							)

			div
				.text-bold Подсказка
				q-input.q-mt-sm.q-mb-md(
					outlined
					v-model="editedHint"
					type='textarea'
					bg-color="white"
				)
				q-btn(
					unelevated
					color="primary"
					label="Сохранить"
					@click='save'
					:disable="!selection"
				)

		// 🔘 FAB
		q-btn.fab1(round color="primary" icon="add" @click="openAddDialog")

	// 🪟 Dialog
	q-dialog(v-model="isAddDialogOpen")
		q-card(style="min-width: 300px;")
			q-btn.close(icon="mdi-close" color="negative" round dense v-close-popup)
			q-card-section
				.text-h6 Добавить событие
			q-card-section
				q-form(ref="addForm" @keyup.enter="saveNewItem")
					q-input(
						v-model="newEvent"
						label="Событие"
						filled
						:rules="[requiredRule]"
						autofocus
					)
					q-input(
						v-model="newHint"
						label="Подсказка"
						type="textarea"
						class="q-mt-md"
						filled
					)
			q-card-actions(align="right")
				q-btn(flat label="Отмена" color="grey" @click="isAddDialogOpen = false")
				q-btn(flat label="Сохранить" color="primary" @click="saveNewItem")
</template>

<style scoped lang="scss">
.zag {
	padding-bottom: 0.5rem;
	border-bottom: 1px solid #ccc;
}
.icon {
	width: 36px;
	height: 36px;
	margin-right: 1rem;
}
.grid {
	margin-top: 1rem;
	display: grid;
	grid-template-columns: 1fr 1fr;
	column-gap: 3rem;
}
.hd {
	font-weight: 600;
	margin-left: 1rem;
}
:deep(.q-field__native) {
	font-size: 1rem;
}
.selected {
	background: #b1ddfc;
}
.fab1 {
	margin-top: 1rem;
}
.scroll-list {
	max-height: calc(100vh - 170px); // подогнать под твой заголовок и отступы
	overflow-y: auto;
	padding-right: 8px; // чтобы скролл не перекрывал контент
}
</style>
