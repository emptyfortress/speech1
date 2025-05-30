<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

type ItemType = 'word' | 'emotion' | 'check' | 'category'

const props = defineProps({
	width: String,
	top: String,
	left: String,
})

const modelValue = defineModel<boolean>()

const emit = defineEmits(['action', 'change-visible-types'])
const action = (time: number) => {
	emit('action', time)
}

// Флаги фильтров
const oper = ref(true)
const client = ref(true)
const word = ref(true)
const emotion = ref(true)
const veh = ref(true)
const cat = ref(true)

// Единый массив данных
const allItems: Array<{
	id: number
	type: ItemType
	client: boolean
	time: number
	label: string
	number?: number
}> = [
	{ id: 1, type: 'word', client: true, number: 0, time: 60, label: 'Пожалуйста' },
	{ id: 2, type: 'word', client: false, number: 1, time: 69, label: 'Спасибо' },
	{ id: 3, type: 'word', client: true, number: 2, time: 10, label: 'Здравствуйте' },

	{ id: 4, type: 'emotion', client: false, time: 40, label: 'Волнение' },
	{ id: 5, type: 'emotion', client: false, time: 100, label: 'Раздражение' },
	{ id: 6, type: 'emotion', client: false, time: 300, label: 'Повышенный тон' },
	{ id: 7, type: 'emotion', client: true, time: 500, label: 'Повышенная громкость' },

	{ id: 8, type: 'check', client: false, time: 400, label: 'Решение вопроса абонента' },
	{ id: 9, type: 'check', client: false, time: 20, label: 'Приветствие' },
	{ id: 10, type: 'check', client: false, time: 190, label: 'Критичная ошибка оператора' },
	{ id: 11, type: 'check', client: false, time: 540, label: 'Подведение итогов разговора' },

	{ id: 12, type: 'category', client: false, time: 200, label: 'Заказ' },
	{ id: 13, type: 'category', client: true, time: 220, label: 'Жалоба' },
]

// Настройки отображения по типам
const typeLabels = {
	word: { title: 'Слова и фразы', color: 'yellow' },
	emotion: { title: 'Эмоции', color: 'primary' },
	check: { title: 'Чек-лист', color: 'red' },
	category: { title: 'Категории', color: 'purple-11' },
}

// Основная фильтрация
const filteredItems = computed(() => {
	return allItems.filter((item) => {
		const typeMatch =
			(word.value && item.type === 'word') ||
			(emotion.value && item.type === 'emotion') ||
			(veh.value && item.type === 'check') ||
			(cat.value && item.type === 'category')

		const clientMatch = (oper.value && item.client) || (client.value && !item.client)

		return typeMatch && clientMatch
	})
})

// Группировка по типу
const groupedItems = computed(() => {
	const result: Record<string, { title: string; color: string; items: typeof allItems }> = {}

	for (const item of filteredItems.value) {
		if (!result[item.type]) {
			result[item.type] = {
				title: typeLabels[item.type].title,
				color: typeLabels[item.type].color,
				items: [],
			}
		}
		result[item.type].items.push(item)
	}

	return Object.values(result)
})

const emitFilteredTypes = () => {
	const types: string[] = []
	if (word.value) types.push('word')
	if (emotion.value) types.push('emotion')
	if (veh.value) types.push('check')
	if (cat.value) types.push('category')
	emit('change-visible-types', types)
}

onMounted(() => {
	emitFilteredTypes()
})
</script>

<template lang="pug">
.milestone(v-if="modelValue")
  .filters
    label Показать:
    q-checkbox(v-model="word" label="Слова" dense dark @update:model-value="emitFilteredTypes")
    q-checkbox(v-model="emotion" label="Эмоции" dense dark @update:model-value="emitFilteredTypes")
    q-checkbox(v-model="veh" label="Чек-лист" dense dark @update:model-value="emitFilteredTypes")
    q-checkbox(v-model="cat" label="Категории" dense dark @update:model-value="emitFilteredTypes")
    q-space
    q-checkbox(v-model="oper" label="Клиент" dense dark @update:model-value="emitFilteredTypes")
    q-checkbox(v-model="client" label="Оператор" dense dark @update:model-value="emitFilteredTypes")

  .columns
    .column-block(
      v-for="group in groupedItems"
      :key="group.title"
      :class="`text-${group.color}`"
    )
      .hd {{ group.title }}
      q-list
        q-item(
          clickable
          v-for="item in group.items"
          :key="item.id"
          @click="action(item.time)"
        )
          q-item-section(side) {{ item.id }}
          q-item-section
            q-item-label {{ item.label }}
</template>

<style scoped lang="scss">
.milestone {
	position: absolute;
	width: v-bind(width);
	top: v-bind(top);
	left: v-bind(left);
	background: hsla(200deg, 17.91%, 26.27%, 1);

	.hd {
		font-size: 0.8rem;
		margin-left: 1rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
	}

	.q-list {
		font-size: 0.8rem;
		margin-left: 1rem;

		.q-item {
			padding: 2px 5px;
			min-height: 16px;
		}
	}
}

.filters {
	border-bottom: 1px solid #ffffff33;
	padding: 0.5rem 1rem;
	color: white;
	font-size: 0.8rem;
	display: flex;
	gap: 2rem;
}

.columns {
	padding: 1rem 0.5rem;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	column-gap: 1.5rem;
}
:deep(.q-item__section--side) {
	color: inherit;
}
</style>
