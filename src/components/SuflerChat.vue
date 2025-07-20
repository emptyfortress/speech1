<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { QScrollArea } from 'quasar'

type Message = {
	from: 'operator' | 'client'
	text: string
	timestamp: number
}

const scrollAreaRef = ref<InstanceType<typeof QScrollArea> | null>(null)

// const rawMessages = [
const rawMessages: Array<Omit<Message, 'timestamp'>> = [
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

function delay(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

function formatTime(ts: number): string {
	const date = new Date(ts)
	const h = String(date.getHours()).padStart(2, '0')
	const m = String(date.getMinutes()).padStart(2, '0')
	return `${h}:${m}`
}

function scrollToBottom() {
	const target = scrollAreaRef.value?.getScrollTarget()
	if (target) {
		scrollAreaRef.value!.setScrollPosition('vertical', target.scrollHeight, 300)
	}
}

async function playMessages() {
	for (const raw of rawMessages) {
		const msg: Message = {
			...raw,
			timestamp: Date.now(),
		}
		visibleMessages.value.push(msg)
		await nextTick()
		scrollToBottom()
		await delay(1800)
	}
}

onMounted(() => {
	playMessages()
})
</script>

<template lang="pug">
q-card.chat-container
	q-scroll-area.chat-scroll(ref="scrollAreaRef")
		transition-group(name="fade-up" tag="div" class="chat-content")
			q-chat-message(
				v-for="(msg, index) in visibleMessages"
				:key="index"
				:text="[msg.text]"
				:sent="msg.from === 'client'"
				:name="msg.from === 'operator' ? 'Оператор' : 'Клиент'"
				:stamp="formatTime(msg.timestamp)"
			)
</template>

<style scoped lang="scss">
.chat-container {
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
:deep(.q-message-text--received) {
	color: #90caf9;
}
:deep(.q-message-name--received) {
	color: #90caf9;
}

:deep(.q-message-name--sent) {
	color: #ffd68a;
}
:deep(.q-message-text--sent) {
	background: #ffd68a;
}
:deep(.q-message-text--sent:last-child:before) {
	border-bottom-color: #ffd68a;
}

.person {
	color: white;
	font-size: 0.8rem;
}
// анимация
.fade-up-enter-active,
.fade-up-leave-active {
	transition: all 0.4s ease;
}
.fade-up-enter-from {
	opacity: 0;
	transform: translateY(10px);
}
.fade-up-enter-to {
	opacity: 1;
	transform: translateY(0);
}
.fade-up-leave-from {
	opacity: 1;
	transform: translateY(0);
}
.fade-up-leave-to {
	opacity: 0;
	transform: translateY(-10px);
}
</style>
