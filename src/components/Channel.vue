<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import AudioBars from '@/components/AudioBars.vue'

type DialogItem = {
	id: number
	title: string
	content: string
	operator: string
	client: string
	startTime: number
}

const props = defineProps<{
	channels: DialogItem[]
}>()

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
</script>

<template lang="pug">
.channel(
	v-for="dialog in props.channels"
	:key="dialog.id"
	@click="openDialog(dialog)"
)
	.row
		q-icon.q-mr-sm(name="mdi-headset" size='18px')
		.text-bold {{ dialog.operator }}

	.event
		.transition-fade(v-if="activeEvents[dialog.id]")
			span {{ activeEvents[dialog.id] }}

	.bottom
		AudioBars
		.time {{ formatTime(currentTime - dialog.startTime) }}

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
