<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import AudioBars from '@/components/AudioBars.vue'
import SuflerDialog from '@/components/SuflerDialog.vue'

type DialogItem = {
	id: number
	title: string
	content: string
	operator: string
	client: string
	startTime: number
	in: boolean
}

const props = defineProps<{
	channels: DialogItem[]
}>()

const selectedDialog = ref<DialogItem>(props.channels[0])
const isDialogOpen = ref(false)
// const selectedClient = ref<string | null>(null)
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

function formatTime(ms: number): string {
	const totalSeconds = Math.floor(ms / 1000)
	const hours = Math.floor(totalSeconds / 3600)
	const minutes = Math.floor((totalSeconds % 3600) / 60)
	const seconds = totalSeconds % 60
	return [hours, minutes, seconds].map((n) => String(n).padStart(2, '0')).join(':')
}

function openDialog(dialog: DialogItem) {
	selectedDialog.value = dialog
	isDialogOpen.value = true
}

// события
const events = ['Событие 1', 'Событие 2', 'Событие 3', 'Событие 4', 'Событие 5']

const activeEvents = reactive<Record<number, string | null>>({})

props.channels.forEach((c) => {
	activeEvents[c.id] = null
})

let eventInterval: number

onMounted(() => {
	eventInterval = window.setInterval(
		() => {
			const randomCard = props.channels[Math.floor(Math.random() * props.channels.length)]
			const randomEvent = events[Math.floor(Math.random() * events.length)]

			activeEvents[randomCard.id] = randomEvent

			setTimeout(
				() => {
					activeEvents[randomCard.id] = null
				},
				5000 + Math.random() * 1000
			)
		},
		500 + Math.random() * 500
	)
})

onBeforeUnmount(() => {
	clearInterval(eventInterval)
})

const defaultDialog: DialogItem = {
	id: 1,
	title: 'Тестовый звонок',
	content: 'Пробный вызов',
	operator: 'Иванов И.И.',
	client: 'Петров П.П.',
	startTime: Date.now() - 15 * 60 * 1000, // 15 минут назад
	in: true,
}
const currentTime1 = ref(5555)
const dia = ref(true)
</script>

<template lang="pug">
.channel(
	v-for="dialog in props.channels"
	:key="dialog.id"
	@click="openDialog(dialog)"
)
	.row
		q-icon.q-mr-sm(v-if='dialog.in' name="mdi-phone-incoming" size='22px')
		q-icon.q-mr-sm(v-else name="mdi-phone-outgoing" size='22px')

		.text-bold {{ dialog.operator }}

	.event
		.transition-fade(v-if="activeEvents[dialog.id]")
			span {{ activeEvents[dialog.id] }}

	.bottom
		AudioBars
		.time {{ formatTime(currentTime - dialog.startTime) }}

SuflerDialog(v-model="isDialogOpen" :selected-dialog="selectedDialog" :current-time="currentTime")
// SuflerDialog(v-model="dia" persistent :selected-dialog="defaultDialog" :current-time="currentTime1")

</template>

<style scoped lang="scss">
.channel {
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
.bottom {
	display: flex;
	justify-content: start;
	align-items: center;
	gap: 0.5rem;
	font-size: 0.9rem;
}
@keyframes fadeInOut {
	0% {
		opacity: 0;
	}
	10% {
		opacity: 1;
	}
	90% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}

.transition-fade {
	animation: fadeInOut 2s ease-in-out forwards;
}

.event {
	min-height: 20px;
	color: #d84315;
	font-size: 1.1rem;
}
</style>
