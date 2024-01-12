<script setup lang="ts">
import { ref } from 'vue'

const list = ref('')
const modelValue = defineModel()
// const close = () => {
// 	modelValue.value = false
// }
const emit = defineEmits(['add'])
const add = () => {
	emit('add', list.value)
	modelValue.value = false
}
</script>

<template lang="pug">
q-dialog(v-model="modelValue")
	q-card
		q-card-section.row.items-center.q-pb-none
			.text-h6 Добавить список слов
			q-space
			q-btn(icon="mdi-close" flat round dense v-close-popup)

		q-card-section
			p Введите слова и выражения, разделяя из запятой. Дубликаты будут удалены автоматически.
			q-input(v-model="list" filled type="textarea" counter)
		q-card-section
			q-card-actions(align="right")
				q-btn(flat color="primary" label="Отмена" v-close-popup) 
				q-btn(unelevated color="primary" label="Добавить" @click="add") 
</template>

<style scoped lang="scss">
.q-card {
	min-width: 700px;
}
.q-input {
	// min-height: 150px;
}
</style>
