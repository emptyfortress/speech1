<template>
	<div class="timer">⏱ {{ formattedTime }}</div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

const secondsElapsed = ref(0)
let timerId = null

const formattedTime = computed(() => {
	const minutes = Math.floor(secondsElapsed.value / 60)
	const seconds = secondsElapsed.value % 60
	return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
})

onMounted(() => {
	timerId = setInterval(() => {
		secondsElapsed.value++
	}, 1000)
})

onBeforeUnmount(() => {
	clearInterval(timerId)
})
</script>

<style scoped>
.timer {
	font-size: 2rem;
	font-family: monospace;
}
</style>
