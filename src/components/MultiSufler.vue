<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import IcOutlineSupportAgent from '@/components/icons/IcOutlineSupportAgent.vue'

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
		title: 'Диалог 1',
		content: 'Здравствуйте! Чем могу помочь?',
		operator: 'Оператор 1',
		client: 'Клиент A',
		startTime: Date.now() - 10000,
	},
	{
		id: 2,
		title: 'Диалог 2',
		content: 'Хочу узнать статус заказа.',
		operator: 'Оператор 2',
		client: 'Клиент B',
		startTime: Date.now() - 25000,
	},
	{
		id: 3,
		title: 'Диалог 3',
		content: 'Спасибо за обращение.',
		operator: 'Оператор 3',
		client: 'Клиент C',
		startTime: Date.now() - 40000,
	},
	{
		id: 4,
		title: 'Диалог 4',
		content: 'Пожалуйста, подождите минуту.',
		operator: 'Оператор 4',
		client: 'Клиент D',
		startTime: Date.now() - 15000,
	},
	{
		id: 5,
		title: 'Диалог 5',
		content: 'Мне не пришло уведомление.',
		operator: 'Оператор 5',
		client: 'Клиент E',
		startTime: Date.now() - 30000,
	},
	{
		id: 6,
		title: 'Диалог 6',
		content: 'Это техническая ошибка.',
		operator: 'Оператор 6',
		client: 'Клиент F',
		startTime: Date.now() - 5000,
	},
	{
		id: 7,
		title: 'Диалог 7',
		content: 'Сейчас попробую перезагрузить.',
		operator: 'Оператор 7',
		client: 'Клиент G',
		startTime: Date.now() - 18000,
	},
	{
		id: 8,
		title: 'Диалог 8',
		content: 'Ожидайте на линии.',
		operator: 'Оператор 8',
		client: 'Клиент H',
		startTime: Date.now() - 35000,
	},
	{
		id: 9,
		title: 'Диалог 9',
		content: 'Спасибо за терпение.',
		operator: 'Оператор 9',
		client: 'Клиент I',
		startTime: Date.now() - 8000,
	},
	{
		id: 10,
		title: 'Диалог 10',
		content: 'Ваша заявка выполнена.',
		operator: 'Оператор 10',
		client: 'Клиент J',
		startTime: Date.now() - 60000,
	},
	{
		id: 11,
		title: 'Диалог 11',
		content: 'Рады были помочь!',
		operator: 'Оператор 11',
		client: 'Клиент K',
		startTime: Date.now() - 45000,
	},
	{
		id: 12,
		title: 'Диалог 12',
		content: 'Свяжемся с вами позже.',
		operator: 'Оператор 12',
		client: 'Клиент L',
		startTime: Date.now() - 22000,
	},
	{
		id: 13,
		title: 'Диалог 13',
		content: 'Ожидайте подключения.',
		operator: 'Оператор 13',
		client: 'Клиент M',
		startTime: Date.now() - 37000,
	},
	{
		id: 14,
		title: 'Диалог 14',
		content: 'Уточняю информацию.',
		operator: 'Оператор 14',
		client: 'Клиент N',
		startTime: Date.now() - 14000,
	},
	{
		id: 15,
		title: 'Диалог 15',
		content: 'Благодарю за ожидание.',
		operator: 'Оператор 15',
		client: 'Клиент O',
		startTime: Date.now() - 27000,
	},
])

const selectedDialog = ref<DialogItem | null>(null)
const isDialogOpen = ref(false)
const selectedClient = ref<string | null>(null)
const currentTime = ref(Date.now())

let interval: number
onMounted(() => {
	interval = window.setInterval(() => {
		currentTime.value = Date.now()
	}, 1000)
})
onBeforeUnmount(() => {
	clearInterval(interval)
})

const clients = computed(() => Array.from(new Set(dialogs.value.map((d) => d.client))))

const filteredDialogs = computed(() => {
	return selectedClient.value
		? dialogs.value.filter((d) => d.client === selectedClient.value)
		: dialogs.value
})

function openDialog(dialog: DialogItem) {
	selectedDialog.value = dialog
	isDialogOpen.value = true
}

function formatTime(ms: number): string {
	const totalSeconds = Math.floor(ms / 1000)
	const hours = Math.floor(totalSeconds / 3600)
	const minutes = Math.floor((totalSeconds % 3600) / 60)
	const seconds = totalSeconds % 60
	return [hours, minutes, seconds].map((n) => String(n).padStart(2, '0')).join(':')
}
</script>

<template lang="pug">
q-page(padding)
	.container
		.zag
			IcOutlineSupportAgent.icon
			| Мультисуфлер
			q-space
			q-select(
				v-model="selectedClient"
				:options="clients"
				label="Фильтр по клиенту"
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
					p.text-caption
							strong Клиент:
							| {{ dialog.client }}
					p.text-overflow {{ dialog.content }}
					p.text-caption.text-grey
						| Таймер: {{ formatTime(currentTime - dialog.startTime) }}

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
					p
						strong Таймер:
						|  {{ selectedDialog ? formatTime(currentTime - selectedDialog.startTime) : '' }}
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
	margin-top: 1rem;
	// max-height: calc(100vh - 200px);
	// overflow-y: auto;
	// padding-right: 8px;
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
