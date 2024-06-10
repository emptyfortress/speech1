<script setup lang="ts">
import ZagSetup from '@/components/dash/ZagSetup.vue'
</script>

<template lang="pug">
q-page(padding)
	.panel
		ZagSetup
</template>

<style scoped lang="scss">
.panel {
	min-height: 400px;
	background: white;
	padding: 1rem;
}
</style>
