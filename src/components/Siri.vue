<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
// import SiriWave from 'siriwave'

// const containerRef = ref<HTMLElement | null>(null)
// let wave: SiriWave

// onMounted(() => {
// 	if (containerRef.value) {
// 		wave = new SiriWave({
// 			container: containerRef.value,
// 			width: 250,
// 			height: 180,
// 			color: 'black',
// 			// style: 'ios9',
// 			// autostart: true,
// 		})
// 	}
// })

// onBeforeUnmount(() => {
// 	wave?.stop()
// })
</script>

<template>
	<div ref="containerRef" />
</template>

<style scoped lang="scss">
div {
	width: 250px;
	height: 180px;
}
</style>
