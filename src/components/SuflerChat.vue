<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { QScrollArea } from 'quasar'

type Message = {
	from: 'operator' | 'client'
	text: string
	timestamp: number // unix timestamp (ms)
}

const scrollAreaRef = ref<InstanceType<typeof QScrollArea> | null>(null)

const allMessages = [
	{ from: 'operator', text: 'Здравствуйте, меня зовут Ольга. Чем могу помочь?' },
	{ from: 'client', text: 'Добрый день. У меня не работает интернет.' },
	{ from: 'operator', text: 'Понимаю. Сейчас выполню диагностику.' },
	{ from: 'operator', text: 'Пожалуйста, подождите пару минут.' },
	{ from: 'client', text: 'Хорошо, жду.' },
	{ from: 'operator', text: 'Спасибо за ожидание. У вас была авария на линии, уже исправили.' },
	{ from: 'client', text: 'Интернет появился, благодарю!' },
	{ from: 'operator', text: 'Рада помочь! Хорошего дня.' },
] as Omit<Message, 'timestamp'>[]

const visibleMessages = ref<Message[]>([])

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

async function playMessages() {
	for (const msg of allMessages) {
		const withTime: Message = {
			...msg,
			timestamp: Date.now(),
		}

		visibleMessages.value.push(withTime)
		await nextTick()
		scrollToBottom()
		await delay(1800)
	}
}

function scrollToBottom() {
	const target = scrollAreaRef.value?.getScrollTarget()
	if (target) {
		scrollAreaRef.value?.setScrollPosition('vertical', target.scrollHeight, 300)
	}
}
function formatTime(ts: number): string {
	const date = new Date(ts)
	const h = String(date.getHours()).padStart(2, '0')
	const m = String(date.getMinutes()).padStart(2, '0')
	return `${h}:${m}`
}

onMounted(() => {
	playMessages()
})
</script>

<template lang="pug">
q-card.chat-container
	q-scroll-area.chat-scroll(ref="scrollAreaRef")
		.chat-content
			div(
				v-for="(msg, index) in visibleMessages"
				:key="index"
				:class="['message', msg.from]"
			)
				.person
					span(v-if="msg.from === 'operator'") {{ formatTime(msg.timestamp) }}&nbsp;&nbsp;Оператор:
					span(v-else) {{ formatTime(msg.timestamp) }}&nbsp;&nbsp;Клиент:
				.bubble
					span {{ msg.text }}
</template>

<style scoped lang="scss">
.chat-container {
	max-width: 500px;
	height: 400px;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	border-radius: 0.5rem;
	background: #37474f;
}

.chat-scroll {
	height: 100%;
}

.chat-content {
	padding: 16px;
	display: flex;
	flex-direction: column;
	gap: 10px;
}

.message {
	display: flex;
	flex-direction: column;
	max-width: 80%;
}
.person {
	color: white;
	font-size: 0.8rem;
}

.message.operator {
	align-self: flex-start;
	.bubble {
		// background-color: #e0f7fa;
		background: rgb(144, 202, 249);
		color: #004d40;
		border-radius: 0.25rem;
		padding: 10px;
	}
}

.message.client {
	align-self: flex-end;
	.bubble {
		background: hsl(200 18% 57% / 1);
		padding-bottom: 18px;
		border-radius: 0.5rem;
		padding: 10px;
	}
	.timestamp {
		font-size: 12px;
		color: #888;
		margin-top: 6px;
		text-align: right;
	}
}
</style>
