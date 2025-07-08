<script setup lang="ts">
import { ref } from 'vue'
import IcOutlineSupportAgent from '@/components/icons/IcOutlineSupportAgent.vue'

// Тип данных одного диалога
type DialogItem = {
	id: number
	title: string
	content: string
	operator: string
	client: string
}

// 12 диалогов
const dialogs = ref<DialogItem[]>([
	{
		id: 1,
		title: 'Диалог 1',
		content: 'Здравствуйте! Чем могу помочь?',
		operator: 'Оператор 1',
		client: 'Клиент A',
	},
	{
		id: 2,
		title: 'Диалог 2',
		content: 'Хочу узнать статус заказа.',
		operator: 'Оператор 2',
		client: 'Клиент B',
	},
	{
		id: 3,
		title: 'Диалог 3',
		content: 'Спасибо за обращение.',
		operator: 'Оператор 3',
		client: 'Клиент C',
	},
	{
		id: 4,
		title: 'Диалог 4',
		content: 'Пожалуйста, подождите минуту.',
		operator: 'Оператор 4',
		client: 'Клиент D',
	},
	{
		id: 5,
		title: 'Диалог 5',
		content: 'Мне не пришло уведомление.',
		operator: 'Оператор 5',
		client: 'Клиент E',
	},
	{
		id: 6,
		title: 'Диалог 6',
		content: 'Это техническая ошибка.',
		operator: 'Оператор 6',
		client: 'Клиент F',
	},
	{
		id: 7,
		title: 'Диалог 7',
		content: 'Сейчас попробую перезагрузить.',
		operator: 'Оператор 7',
		client: 'Клиент G',
	},
	{
		id: 8,
		title: 'Диалог 8',
		content: 'Ожидайте на линии.',
		operator: 'Оператор 8',
		client: 'Клиент H',
	},
	{
		id: 9,
		title: 'Диалог 9',
		content: 'Спасибо за терпение.',
		operator: 'Оператор 9',
		client: 'Клиент I',
	},
	{
		id: 10,
		title: 'Диалог 10',
		content: 'Ваша заявка выполнена.',
		operator: 'Оператор 10',
		client: 'Клиент J',
	},
	{
		id: 11,
		title: 'Диалог 11',
		content: 'Рады были помочь!',
		operator: 'Оператор 11',
		client: 'Клиент K',
	},
	{
		id: 12,
		title: 'Диалог 12',
		content: 'Свяжемся с вами позже.',
		operator: 'Оператор 12',
		client: 'Клиент L',
	},
	{
		id: 13,
		title: 'Диалог 13',
		content: 'Свяжемся с вами позже.',
		operator: 'Оператор 13',
		client: 'Клиент L',
	},
	{
		id: 14,
		title: 'Диалог 14',
		content: 'Свяжемся с вами позже.',
		operator: 'Оператор 13',
		client: 'Клиент L',
	},
])

const selectedDialog = ref<DialogItem | null>(null)
const isDialogOpen = ref(false)

function openDialog(dialog: DialogItem) {
	selectedDialog.value = dialog
	isDialogOpen.value = true
}
</script>

<template lang="pug">
q-page(padding)
	.container.rel
		.zag
			IcOutlineSupportAgent.icon
			| Мультисуфлер

		.grid
			div(
				v-for="dialog in dialogs"
				:key="dialog.id"
				@click="openDialog(dialog)"
			)
				strong {{ dialog.title }}
				p.text-overflow {{ dialog.content }}

		q-dialog(v-model="isDialogOpen" persistent)
			q-card(style="min-width: 600px; max-width: 90vw")
				q-card-section
					.text-h6 {{ selectedDialog?.title }}
				q-card-section
					p
						strong Оператор:
						|  {{ selectedDialog?.operator }}
					p
						strong Клиент:
						|  {{ selectedDialog?.client }}
					q-separator(class="q-my-md")
					p {{ selectedDialog?.content }}
				q-card-actions(align="right")
					q-btn(flat label="Закрыть" color="primary" @click="isDialogOpen = false")
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
.grid {
	margin-top: 1rem;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: repeat(3, 200px);
	column-gap: 1rem;
	row-gap: 1rem;
	> div {
		padding: 0.5rem;
		cursor: pointer;
		background: #ccc;
		border-radius: 4px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		transition: background 0.2s ease;
		&:hover {
			background: #bbb;
		}
	}
}
.text-overflow {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
