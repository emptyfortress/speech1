<script setup lang="ts">
import { ref, reactive } from 'vue'

const anketa = reactive([
	{
		id: 0,
		quesiton: 'Вопрос 1. Это длинный, длинный, длинный, очень длинный вопрос ни о чем',
		description: 'Пояснения и расшифровка вопроса, если она требуется.',
		auto: false,
	},
	{ id: 1, quesiton: 'Вопрос 1.', description: '', auto: false },
	{ id: 2, quesiton: 'Вопрос 1.', description: '', auto: false },
	{ id: 3, quesiton: 'fuck', description: '', auto: false },
])
const zapros = ref('Приветствие')
const options = ['Option 1', 'Option 2']
</script>

<template lang="pug">
q-list(padding separator)
	q-item(v-for="(item, index) in anketa" :key="item.id")
		q-item-section(side) {{ index + 1 }}
		q-item-section
			q-item-label {{ item.quesiton }}
			q-item-label(caption) {{ item.description }}
		q-item-section(side)
			.row.items-center.q-gutter-x-md
				q-checkbox(v-model="item.auto" label="Auto" size="sm")
				q-select(v-model="zapros" dense label="Запрос" v-if="item.auto" :options="options")
		q-item-section(side) 55


</template>

<style scoped lang="scss"></style>
