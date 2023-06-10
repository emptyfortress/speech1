<template lang="pug">
div
	MyChip1(:label="label")
	q-btn(flat round icon="mdi-calendar" @click="toggle")
</template>

<script setup lang="ts">
import { useStore } from '@/stores/store'
import MyChip1 from '@/components/MyChip1.vue'

const props = defineProps({
	label: {
		type: String,
	},
})

const mystore = useStore()
const toggle = () => mystore.toggleDateDrawer()
</script>

<style scoped lang="scss"></style>
