<script setup lang="ts">
const props = defineProps({
	width: String,
	top: String,
	left: String,
})

const modelValue = defineModel<boolean>()

const words = [
	{ id: 1, number: 0, time: 60, label: 'Пожалуйста' },
	{ id: 2, number: 1, time: 69, label: 'Спасибо' },
	{ id: 3, number: 2, time: 10, label: 'Здравствуйте' },
]
const emo = [
	{ id: 4, time: 40, label: 'Волнение' },
	{ id: 5, time: 100, label: 'Раздражение' },
	{ id: 6, time: 300, label: 'Повышенный тон' },
	{ id: 7, time: 500, label: 'Повышенная громкость' },
]
const check = [
	{ id: 8, time: 400, label: 'Решение вопроса абонента' },
	{ id: 9, time: 20, label: 'Приветствие' },
	{ id: 10, time: 190, label: 'Критичная ошибка оператора' },
	{ id: 11, time: 540, label: 'Подведение итогов разговора' },
]

const sys = [
	{ id: 12, time: 200, label: 'Заказ' },
	{ id: 13, time: 220, label: 'Жалоба' },
]

const emit = defineEmits(['action'])
const action = (id: number) => {
	emit('action', id)
}
</script>

<template lang="pug">
.milestone(v-if='modelValue')
	.text-yellow
		.hd.yellow Слова и фразы
		q-list
			q-item(clickable v-for="item in words" :key='item.id' @click='action(item.time)')
				q-item-section(side) {{ item.id }}
				q-item-section
					q-item-label {{ item.label }}
	.text-primary
		.hd Эмоции
		q-list()
			q-item(clickable v-for="item in emo" :key='item.id'  @click='action(item.time)')
				q-item-section(side) {{ item.id }}
				q-item-section
					q-item-label {{ item.label }}
	.text-red
		.hd Чек-лист
		q-list
			q-item(clickable v-for="item in check" :key='item.id'  @click='action(item.time)')
				q-item-section(side) {{ item.id }}
				q-item-section
					q-item-label {{ item.label }}
	.text-purple-11
		.hd Категории
		q-list
			q-item(clickable v-for="item in sys" :key='item.id'  @click='action(item.time)')
				q-item-section(side) {{ item.id }}
				q-item-section
					q-item-label {{ item.label }}
</template>

<style scoped lang="scss">
.milestone {
	position: absolute;
	width: v-bind(width);
	// height: 200px;
	top: v-bind(top);
	left: v-bind(left);
	background: hsla(200deg, 17.91%, 26.27%, 1);
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	column-gap: 1.5rem;
	padding: 1rem 0.5rem;
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
.q-item__section--side {
	color: inherit;
}
</style>
