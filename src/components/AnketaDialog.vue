<script setup lang="ts">
import { ref, reactive } from 'vue'
const modelValue = defineModel()

const props = defineProps<{
	anketa: Anketa
}>()
const emit = defineEmits(['duble', 'remove'])
const remove = () => {
	emit('remove')
	modelValue.value = false
}
const duble = () => {
	emit('duble')
}

const editMode = ref(false)
const edit = () => {
	editMode.value = !editMode.value
}
const list = reactive([
	{ id: 0, text: 'Приветствие', auto: true, mark: 53 },
	{ id: 1, text: 'Прогрев', auto: false },
	{ id: 2, text: 'Выяснение проблем', auto: false },
	{ id: 3, text: 'Отработка возражений', auto: false },
	{ id: 4, text: 'Предложение товаров по акции', auto: true, mark: 67 },
	{ id: 5, text: 'Тон разговора' },
	{ id: 6, text: 'Завершение разговора', auto: true, mark: 92 },
])
</script>

<template lang="pug">
q-dialog(v-model="modelValue")
	q-card(:class="{edit: editMode}")
		q-card-section.row.items-start.q-pb-none
			div
				.text-h6 {{ props.anketa.anketa }}
				.descr {{props.anketa.descr}}
			q-space
			q-btn(icon="mdi-close" flat round dense v-close-popup)

		q-card-section
			.row.justify-between
				.descr Создано: {{props.anketa.date}}
				.descr Автор: {{props.anketa.author}}

		q-card-section
			q-scroll-area
				q-list
					q-expansion-item(expand-separator v-for="item in list" :key="item.id")
						template(v-slot:header)
							q-item-section(avatar)
								q-avatar(text-color="black") {{item.id + 1}}
							q-item-section
								q-item-label {{ item.text }}
								.text-caption(v-if="item.auto") AUTO

						q-card-section
							.grid
								.condition
									.text-weight-bold Условия
									p Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis nesciunt officiis dicta quae voluptates sequi? Minima eaque, repellat neque praesentium perspiciatis amet expedita. Vitae at quam, veniam ipsa sequi quia.
								.request(v-if="item.auto") Запрос для автоматической оценки: <span class="text-weight-bold">Запрос запросыч</span>

		.row.justify-between.q-ma-sm(align="right")
			template(v-if="!editMode")
				q-btn(unelevated color="negative" label="Удалить" @click="remove") 
				q-btn(flat color="primary" label="Дублировать" @click="duble") 
				q-btn(flat color="primary" label="Редактировать" @click="edit") 
			template(v-else)
				q-btn(flat color="primary" label="Отмена" @click="duble") 
				q-btn(flat color="primary" label="Сохранить как" @click="duble") 
				q-btn(flat color="primary" label="Сохранить" @click="edit") 

</template>

<style scoped lang="scss">
.q-card {
	min-width: 600px;
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
	// height: 300px;
	height: 60vh;
}
</style>
