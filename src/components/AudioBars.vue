<script setup lang="ts">
import { ref } from 'vue'

const bars = ref(
	Array.from({ length: 5 }, () => ({
		delay: Math.random() * 0.5, // от 0 до 0.5s
		duration: 0.8 + Math.random(), // от 0.8 до 1.8s
		scale: 0.3 + Math.random() * 0.7, // от 0.3 до 1
	}))
)
</script>

<template>
	<div class="bars">
		<span
			v-for="(bar, index) in bars"
			:key="index"
			class="bar"
			:style="{
				animationDelay: `${bar.delay}s`,
				animationDuration: `${bar.duration}s`,
				'--scale': bar.scale,
			}"
		/>
	</div>
</template>

<style scoped lang="scss">
.bars {
	display: flex;
	align-items: end;
	gap: 2px;
	height: 30px;
	width: 30px;
}
.bar {
	width: 4px;
	height: 100%;
	background-color: #42a5f5;
	animation: bounce var(--duration, 1s) infinite ease-in-out;
}

@keyframes bounce {
	0%,
	100% {
		transform: scaleY(0.3);
	}
	50% {
		transform: scaleY(var(--scale, 1));
	}
}
</style>
