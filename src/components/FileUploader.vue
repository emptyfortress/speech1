<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useCat } from '@/stores/category1'

const modelValue = defineModel<boolean>()

const cat = useCat()

const list = ref([
	{
		id: 0,
		label: 'Год издания',
		caption: 'When the article was published',
		active: false,
		num: 12
	},
	{
		id: 1,
		label: 'Титул',
		caption: 'The name of the document',
		active: false,
		num: 12
	},
	{
		id: 2,
		label: 'Автор',
		caption: 'Who created or wrote the document',
		active: false,
		num: 12
	},
	{
		id: 3,
		label: 'Нейтрино',
		caption: 'The lens setting used for the shot',
		active: false,
		num: 6
	},
	{
		id: 4,
		label: 'Кварки',
		caption: 'Dimensions of the image in pixels',
		active: false,
		num: 62
	},
	{
		id: 5,
		label: 'Ядерные реакции',
		caption: 'Information about the camera used to take the picture',
		active: false,
		num: 8
	},
])

const dialog = ref(false)

const finish = (() => {
	dialog.value = !dialog.value
})

const $q = useQuasar()
const load = (() => {
	dialog.value = !dialog.value
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
</script>

<template lang="pug">
q-uploader(flat v-if='modelValue'
	url="http://localhost:4444/upload"
	label="Загрузить файл с метаданными (.json)"
	color="amber"
	text-color="black"
	no-thumbnails
	@finish='finish'
	)

q-dialog(v-model="dialog")
	q-card
		q-btn.close(icon="mdi-close" color="negative" round dense v-close-popup)
		q-card-section.row.items-center.q-pb-none
			.text-h6 Метаданные
		q-card-section
			div Отметьте метаданные для загрузки в дерево категорий:
		q-card-section
			q-list(v-for="item in list" :key='item.id')
				q-item(clickable tag="label" v-ripple)
					q-item-section(side)
						q-checkbox(v-model="item.active" dense)
					q-item-section
						q-item-label {{ item.label }}
						q-item-label(caption) {{ item.caption }}
					q-item-section(side) {{ item.num }}
		q-card-actions.q-ma-md(align='right')
			q-btn(flat color="primary" label="Отмена" @click="dialog = false") 
			q-btn(unelevated color="primary" label="Применить" @click="load") 
	
</template>

<style scoped lang="scss">
.q-uploader {
	width: 100%;
	margin-top: .5rem;
}
</style>
