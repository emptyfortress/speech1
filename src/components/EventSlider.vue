<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'

type EventItem = {
	id: number
	event: string
	hint: string
}

const events: EventItem[] = Array.from({ length: 10 }, (_, i) => ({
	id: i + 1,
	event: `Событие ${i + 1}`,
	hint: `Подсказка ${i + 1}`,
}))

const index = ref<number>(0)
const show = ref<boolean>(false)
const showHint = ref<boolean>(false)

let intervalId: number | null = null
let hintTimeoutId: number | null = null
let initialTimeoutId: number | null = null

const currentItem = computed(() => events[index.value])

const scheduleNext = () => {
	show.value = false
	showHint.value = false

	setTimeout(async () => {
		index.value = (index.value + 1) % events.length
		show.value = true

		await nextTick()
		hintTimeoutId = window.setTimeout(() => {
			showHint.value = true
		}, 1000)
	}, 300)
}

const showFirst = async () => {
	show.value = true
	await nextTick()
	hintTimeoutId = window.setTimeout(() => {
		showHint.value = true
	}, 1000)
}

onMounted(() => {
	// Отложенное первое появление
	initialTimeoutId = window.setTimeout(() => {
		showFirst()
	}, 5000)

	// Регулярная смена событий
	intervalId = window.setInterval(() => {
		scheduleNext()
	}, 5000)
})

onBeforeUnmount(() => {
	if (intervalId !== null) clearInterval(intervalId)
	if (hintTimeoutId !== null) clearTimeout(hintTimeoutId)
	if (initialTimeoutId !== null) clearTimeout(initialTimeoutId)
})
</script>

<template lang="pug">
transition(name="slide-left")
	.event-block(v-if="show")
		.event-hint {{ currentItem.event }}
		transition(name="fade")
			.event-text(v-if="showHint") {{ currentItem.hint }}
</template>

<style scoped>
.event-block {
	text-align: center;
	padding: 1rem;
}

.event-text {
	margin-top: 1rem;
	font-size: 1.7rem;
	font-weight: bold;
	margin-bottom: 0.5rem;
}

.event-hint {
	font-size: 1.1rem;
}

/* Анимация подсказки */
.fade-enter-active,
.fade-leave-active {
	transition:
		opacity 0.3s ease,
		transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
	opacity: 0;
	transform: translateY(10px);
}
.fade-enter-to,
.fade-leave-from {
	opacity: 1;
	transform: translateY(0);
}

/* Slide-left */
.slide-left-enter-active,
.slide-left-leave-active {
	transition:
		transform 0.3s ease,
		opacity 0.3s ease;
}
.slide-left-enter-from {
	opacity: 0;
	transform: translateX(100px);
}
.slide-left-enter-to {
	opacity: 1;
	transform: translateX(0);
}
.slide-left-leave-from {
	opacity: 1;
	transform: translateX(0);
}
.slide-left-leave-to {
	opacity: 0;
	transform: translateX(-100px);
}
</style>
