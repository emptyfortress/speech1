<script setup lang="ts">
import { ref, computed } from 'vue'

const list = ref('')
const modelValue = defineModel()
const emit = defineEmits(['add'])
const add = () => {
	emit('add', { list: list.value, voc: voc.value, vocName: vocName.value })
	modelValue.value = false
}
const voc = ref(false)
const vocName = ref()

const req = computed(() => {
	if (vocName.value == false) {
		return [(val: string) => (val && val.length > 0) || 'Это обязательное поле']
	}
	return [() => true]
})
</script>

<template lang="pug">
q-dialog(v-model="modelValue")
	q-card
		q-card-section.row.items-center.q-pb-none
			.text-h6 Добавить список слов
			q-space
			q-btn(icon="mdi-close" flat round dense v-close-popup)

		q-form.one(ref="myform" no-error-focus @submit="add")
			q-card-section
				p Введите слова и выражения, разделяя из запятой. Дубликаты будут удалены автоматически.
				q-input(v-model="list" filled type="textarea" counter)
				.row.items-center.q-gutter-x-lg
					q-checkbox(v-model="voc" label="Создать словарь из списка" dense)
					q-input(v-if="voc" v-model="vocName" dense filled label="Название словаря" lazy-rules :rules="req")
			q-card-section
				q-card-actions(align="right")
					q-btn(flat color="primary" label="Отмена" v-close-popup) 
					q-btn(unelevated color="primary" label="Добавить" type="submit" :disable="list.length == 0") 
</template>

<style scoped lang="scss">
.q-card {
	min-width: 700px;
}
.q-input {
	// min-height: 150px;
}
</style>
