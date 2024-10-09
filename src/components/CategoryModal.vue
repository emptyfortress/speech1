<script setup lang="ts">
import { ref } from 'vue'
import CategTree from '@/components/CategTree.vue'
import { useCat } from '@/stores/category1'

const modelValue = defineModel<boolean>()

const emit = defineEmits(['setTicked'])
const cat = useCat()
const action = () => {
	emit('setTicked', cat.ticked)
	modelValue.value = false
}
</script>

<template lang="pug">
q-dialog(v-model="modelValue")
	q-card()
		q-btn.close(round color="negative" icon="mdi-close" v-close-popup)
		q-card-section.row.items-center.q-pb-none
			.text-h6 Выберите категории

		q-card-section
			CategTree
		q-card-actions.q-ma-md(align="right")
			q-btn(flat color="primary" label="Отмена" v-close-popup) 
			q-btn(unelevated color="primary" label="OK" @click="action") 
</template>

<style scoped lang="scss">
.q-card {
	width: 500px;
}
</style>
