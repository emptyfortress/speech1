<script setup lang="ts">
import { ref, computed } from 'vue'
import Channel from '@/components/Channel.vue'

type DialogItem = {
	id: number
	title: string
	content: string
	operator: string
	client: string
	startTime: number
}

const dialogs = ref<DialogItem[]>([
	{
		id: 1,
		title: 'Канал 1',
		content: 'Здравствуйте! Чем могу помочь?',
		operator: 'Оператор 1',
		client: 'Клиент A',
		startTime: Date.now() - 10000,
	},
	{
		id: 2,
		title: 'Канал 2',
		content: 'Хочу узнать статус заказа.',
		operator: 'Оператор 2',
		client: 'Клиент B',
		startTime: Date.now() - 25000,
	},
	{
		id: 3,
		title: 'Канал 3',
		content: 'Спасибо за обращение.',
		operator: 'Оператор 3',
		client: 'Клиент C',
		startTime: Date.now() - 40000,
	},
	{
		id: 4,
		title: 'Канал 4',
		content: 'Пожалуйста, подождите минуту.',
		operator: 'Оператор 4',
		client: 'Клиент D',
		startTime: Date.now() - 15000,
	},
	{
		id: 5,
		title: 'Канал 5',
		content: 'Мне не пришло уведомление.',
		operator: 'Оператор 5',
		client: 'Клиент E',
		startTime: Date.now() - 30000,
	},
	{
		id: 6,
		title: 'Канал 6',
		content: 'Это техническая ошибка.',
		operator: 'Оператор 6',
		client: 'Клиент F',
		startTime: Date.now() - 5000,
	},
	{
		id: 7,
		title: 'Канал 7',
		content: 'Сейчас попробую перезагрузить.',
		operator: 'Оператор 7',
		client: 'Клиент G',
		startTime: Date.now() - 18000,
	},
	{
		id: 8,
		title: 'Канал 8',
		content: 'Ожидайте на линии.',
		operator: 'Оператор 8',
		client: 'Клиент H',
		startTime: Date.now() - 35000,
	},
	{
		id: 9,
		title: 'Канал 9',
		content: 'Спасибо за терпение.',
		operator: 'Оператор 9',
		client: 'Клиент I',
		startTime: Date.now() - 8000,
	},
	{
		id: 10,
		title: 'Канал 10',
		content: 'Ваша заявка выполнена.',
		operator: 'Оператор 10',
		client: 'Клиент J',
		startTime: Date.now() - 60000,
	},
	{
		id: 11,
		title: 'Канал 11',
		content: 'Рады были помочь!',
		operator: 'Оператор 11',
		client: 'Клиент K',
		startTime: Date.now() - 45000,
	},
	{
		id: 12,
		title: 'Канал 12',
		content: 'Свяжемся с вами позже.',
		operator: 'Оператор 12',
		client: 'Клиент L',
		startTime: Date.now() - 22000,
	},
	{
		id: 13,
		title: 'Канал 13',
		content: 'Ожидайте подключения.',
		operator: 'Оператор 13',
		client: 'Клиент M',
		startTime: Date.now() - 37000,
	},
	{
		id: 14,
		title: 'Канал 14',
		content: 'Уточняю информацию.',
		operator: 'Оператор 14',
		client: 'Клиент N',
		startTime: Date.now() - 14000,
	},
	{
		id: 15,
		title: 'Канал 15',
		content: 'Благодарю за ожидание.',
		operator: 'Оператор 15',
		client: 'Клиент O',
		startTime: Date.now() - 27000,
	},
])

const selectedOperator = ref<string | null>(null)

const operators = computed(() => Array.from(new Set(dialogs.value.map((d) => d.operator))))

const filteredDialogs = computed(() => {
	return dialogs.value.filter((d) => {
		const matchOperator = !selectedOperator.value || d.operator === selectedOperator.value
		return matchOperator
	})
})
</script>

<template lang="pug">
q-page(padding)
	.container
		.zag
			q-icon.q-mr-sm(name="mdi-ear-hearing" size='25px')
			| Мониторинг
			q-space
			q-select(
				v-model="selectedOperator"
				:options="operators"
				label="Фильтр по оператору"
				clearable
				dense
				outlined
				style="width: 300px; margin-left: 1rem"
			)

		.grid
			Channel(:channels='filteredDialogs')
</template>

<style scoped lang="scss">
.zag {
	padding-bottom: 0.5rem;
	border-bottom: 1px solid #ccc;
	display: flex;
	align-items: center;
}
.icon {
	width: 36px;
	height: 36px;
	margin-right: 1rem;
}
.filter-bar {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-bottom: 1rem;
}
.grid {
	margin-top: 1rem;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	grid-auto-rows: 200px;
	gap: 1rem;
}
.text-overflow {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
