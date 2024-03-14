<script setup lang="ts">
import { ref } from 'vue'
import CategTree from '@/components/CategTree.vue'
const modelValue = defineModel()

const emit = defineEmits(['setcategory'])
const action = () => {
	emit('setcategory', ticked.value)
}
const ticked = ref([])

const setTicked = (e: String[]) => {
	ticked.value = e
}
</script>

<template lang="pug">
q-dialog(v-model="modelValue")
	q-card()
		q-btn.close(round color="negative" icon="mdi-close" v-close-popup)
		q-card-section.row.items-center.q-pb-none
			.text-h6 Выберите категории

		q-card-section
			CategTree(@setTicked="setTicked")
		q-card-actions.q-ma-md(align="right")
			q-btn(flat color="primary" label="Отмена" v-close-popup) 
			q-btn(unelevated color="primary" label="OK" @click="action") 
</template>

<style scoped lang="scss">
.q-card {
	width: 500px;
}
</style>
