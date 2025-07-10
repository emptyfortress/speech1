<script setup lang="ts">
import { onMounted } from 'vue'
import SiriWave from 'siriwave'

onMounted(() => {
	var siriWave = new SiriWave({
		container: document.getElementById('siri-container'),
		width: 250,
		height: 80,
		style: 'ios9',
	})
})
</script>

<template lang="pug">
#siri-container
</template>

<style scoped lang="scss"></style>
