<script setup lang="ts">
import { ref, computed } from 'vue'
import IcOutlineSupportAgent from '@/components/icons/IcOutlineSupportAgent.vue'

type DialogItem = {
	id: number
	title: string
	content: string
	operator: string
	client: string
}

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
		operator: 'Оператор 1',
		client: 'Клиент D',
	},
	{
		id: 5,
		title: 'Диалог 5',
		content: 'Мне не пришло уведомление.',
		operator: 'Оператор 2',
		client: 'Клиент E',
	},
	{
		id: 6,
		title: 'Диалог 6',
		content: 'Это техническая ошибка.',
		operator: 'Оператор 3',
		client: 'Клиент F',
	},
	{
		id: 7,
		title: 'Диалог 7',
		content: 'Сейчас попробую перезагрузить.',
		operator: 'Оператор 1',
		client: 'Клиент G',
	},
	{
		id: 8,
		title: 'Диалог 8',
		content: 'Ожидайте на линии.',
		operator: 'Оператор 2',
		client: 'Клиент H',
	},
	{
		id: 9,
		title: 'Диалог 9',
		content: 'Спасибо за терпение.',
		operator: 'Оператор 3',
		client: 'Клиент I',
	},
	{
		id: 10,
		title: 'Диалог 10',
		content: 'Ваша заявка выполнена.',
		operator: 'Оператор 2',
		client: 'Клиент J',
	},
	{
		id: 11,
		title: 'Диалог 11',
		content: 'Рады были помочь!',
		operator: 'Оператор 1',
		client: 'Клиент K',
	},
	{
		id: 12,
		title: 'Диалог 12',
		content: 'Свяжемся с вами позже.',
		operator: 'Оператор 3',
		client: 'Клиент L',
	},
])

const selectedDialog = ref<DialogItem | null>(null)
const isDialogOpen = ref(false)
const selectedOperator = ref<string | null>(null)

const operators = computed(() => Array.from(new Set(dialogs.value.map((d) => d.operator))))

const filteredDialogs = computed(() => {
	return selectedOperator.value
		? dialogs.value.filter((d) => d.operator === selectedOperator.value)
		: dialogs.value
})

function openDialog(dialog: DialogItem) {
	selectedDialog.value = dialog
	isDialogOpen.value = true
}
</script>

<template lang="pug">
q-page(padding)
	.container
		.zag
			IcOutlineSupportAgent.icon
			| Мультисуфлер

		.filter-bar.q-mt-md
			q-select(
				v-model="selectedOperator"
				:options="operators"
				label="Фильтр по оператору"
				clearable
				dense
				outlined
				style="width: 300px"
			)

		.grid-scroll
			.grid
				div(
					v-for="dialog in filteredDialogs"
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
.filter-bar {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-bottom: 1rem;
}
.grid-scroll {
	max-height: calc(100vh - 200px);
	overflow-y: auto;
	padding-right: 8px;
}
.grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
	grid-auto-rows: 200px;
	gap: 1rem;

	> div {
		padding: 0.75rem;
		background: #fff;
		border-radius: 6px;
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
		cursor: pointer;
		transition: all 0.2s ease;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		&:hover {
			box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
			background-color: #f9f9f9;
		}
	}
}
.text-overflow {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
</style>
