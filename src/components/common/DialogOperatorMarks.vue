<template lang="pug">
q-dialog(v-model="modelValue")
	q-card(style="width: 600px; max-width: 80vw;")
		q-btn.close(round color="negative" icon="mdi-close" v-close-popup)
		q-card-section
			.text-h6 Карточка оценки
		q-card-section
			p Что здесь должно быть? Нужны пояснения...
			pre {{ props.mark }}
		q-card-section
			q-card-actions(align="right")
				q-btn(flat color="negative" label="Я не согласен!" v-close-popup) 
				q-space
				q-btn(unelevated color="primary" label="Хорошо" v-close-popup) 


</template>

<script setup lang="ts">
const props = defineProps<{ mark: Mark }>()

const modelValue = defineModel()
</script>

<style scoped lang="scss"></style>
