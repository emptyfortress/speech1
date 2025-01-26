<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import type { QTableColumn } from 'quasar'
import { useCat } from '@/stores/category1'

const modelValue = defineModel<boolean>()

const cat = useCat()

const cols: QTableColumn[] = [
	{
		name: 'label',
		field: 'label',
		label: 'Название',
		align: 'left',
		sortable: true,
	},
	{
		name: 'type',
		field: 'type',
		label: 'Тип поля',
		align: 'left',
		sortable: true,
	},
	{
		name: 'vid',
		field: 'vid',
		label: 'Вид фильтра',
		align: 'left',
		sortable: true,
	},
]

interface Categ {
	id: number
	label: string
	type: string
	vid: string
	list: Categ[]
}

const rows = ref([
	{
		id: 0,
		label: 'Год издания',
		type: 'Число',
		vid: 'Выбор из списка',
		list: [
			{ id: 0, type: '', vid: '', label: '1975' },
			{ id: 1, type: '', vid: '', label: '1977' },
			{ id: 2, type: '', vid: '', label: '1992' },
			{ id: 3, type: '', vid: '', label: '2003' },
			{ id: 4, type: '', vid: '', label: '2014' }
		]
	},
	{
		id: 1,
		label: 'Автор',
		type: 'Строка',
		vid: 'Выбор из списка',
		list: [
			{ id: 0, type: '', vid: '', label: 'Агата Кристи' },
			{ id: 1, type: '', vid: '', label: 'Сомерсэт Моэм' },
			{ id: 2, type: '', vid: '', label: 'Виктор Перевин' },
		]
	},
	{
		id: 2,
		label: 'Титул',
		type: 'Строка',
		vid: 'Выбор из списка',
		list: [
			{ id: 0, type: '', vid: '', label: 'Война и мир' },
			{ id: 1, type: '', vid: '', label: '1984' },
			{ id: 2, type: '', vid: '', label: 'Улисс' },
			{ id: 3, type: '', vid: '', label: 'Преступление и наказание' },
			{ id: 4, type: '', vid: '', label: 'Ложная слепота' }
		]
	},
])

const $q = useQuasar()

const load = (() => {
	let item = {
		id: selected.value[0].label,
		label: selected.value[0].label,
		level: 1,
		breads: [],
		childs: [],
		children: selected.value[0].list
	}
	cat.addCategory(item, 'Мета')
	selected.value = []
	$q.notify({
		icon: 'mdi-check-bold',
		message: 'Добавлены метаданные',
		color: 'positive',
		position: 'bottom',
	})
	close()
})
const selected = ref<Categ[]>([])
const close = (() => {
	modelValue.value = false
})
</script>

<template lang="pug">
q-dialog(v-model="modelValue")
	q-card
		q-btn.close(icon="mdi-close" color="negative" round dense v-close-popup)
		q-card-section
			.text-h6 Создать категорию
			div Выберите метаданные для создания категории

		q-card-section
			q-table(flat
				v-if='modelValue'
				:columns="cols"
				:rows="rows"
				hide-bottom
				selection='single'
				v-model:selected='selected'
				color='primary'
				)

		q-card-actions.q-mr-md.q-mb-md(align='right')
			q-btn(flat color="primary" label="Отмена" @click="close") 
			q-btn(une  color="primary" label="Создать" @click="load") 

	// template(v-slot:bottom)
	// 	q-btn(unelevated size="sm" color="primary" label="Добавить отмеченные метаданные" @click="load") 

</template>

<style scoped lang="scss">
.q-uploader {
	width: 100%;
	margin-top: .5rem;
}
</style>
