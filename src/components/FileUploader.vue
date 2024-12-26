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
const rows = ref([
	{
		id: 0,
		api: 'something',
		label: 'Год издания',
		type: 'Число',
		vid: 'Выбор из списка',
	},
	{
		id: 1,
		api: 'something',
		label: 'Титул',
		type: 'Число',
		vid: 'Выбор из списка',
	},
	{
		id: 2,
		api: 'something',
		label: 'Автор',
		type: 'Число',
		vid: 'Выбор из списка',
	},
	{
		id: 3,
		api: 'something',
		label: 'Нейтрино',
		type: 'Число',
		vid: 'Выбор из списка',
	},
	{
		id: 4,
		api: 'something',
		label: 'Кварки',
		type: 'Число',
		vid: 'Выбор из списка',
	},
	{
		id: 5,
		api: 'something',
		label: 'Ядерные реакции',
		type: 'Число',
		vid: 'Выбор из списка',
	},
])

const $q = useQuasar()

const load = (() => {
	modelValue.value = false
	let item = {
		id: 'meta',
		label: 'Метаданные из файла',
		level: 1,
		breads: [],
		childs: [],
		children: []
	}
	cat.addCategory(item, 'Все')
	$q.notify({
		icon: 'mdi-check-bold',
		message: 'Добавлено',
		color: 'positive',
		position: 'bottom',
	})

})
const selected = ref([])
</script>

<template lang="pug">
q-table(flat
	v-if='modelValue'
	:columns="cols"
	:rows="rows"
	hide-pagination
	selection='multiple'
	v-model:selected='selected'
	color='primary'
	)

	template(v-slot:bottom)
		q-btn(unelevated size="sm" color="primary" label="Добавить отмеченные метаданные" @click="load") 

</template>

<style scoped lang="scss">
.q-uploader {
	width: 100%;
	margin-top: .5rem;
}
</style>
