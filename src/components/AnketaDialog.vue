<script setup lang="ts">
const modelValue = defineModel()

const props = defineProps<{
	anketa: Anketa
}>()
const emit = defineEmits(['duble', 'remove'])
const remove = () => {
	emit('remove')
	modelValue.value = false
}
const duble = () => {
	emit('duble')
}

const edit = () => {
	console.log(111)
}
</script>

<template lang="pug">
q-dialog(v-model="modelValue")
	q-card
		q-card-section.row.items-center.q-pb-none
			div
				.text-h6 {{ props.anketa.anketa }}
				.descr {{props.anketa.descr}}
			q-space
			q-btn(icon="mdi-close" flat round dense v-close-popup)

		q-card-section
			.row.justify-between
				.descr Создано: {{props.anketa.date}}
				.descr Автор: {{props.anketa.author}}
		.row.justify-between.q-ma-sm(align="right")
			q-btn(unelevated color="negative" label="Удалить" @click="remove") 
			q-btn(flat color="primary" label="Дублировать" @click="duble") 
			q-btn(flat color="primary" label="Редактировать" @click="edit") 

</template>

<style scoped lang="scss">
.q-card {
	min-width: 600px;
}
.descr {
	font-size: 0.9rem;
}
</style>
