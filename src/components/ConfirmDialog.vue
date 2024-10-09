<script setup lang="ts">
const modelValue = defineModel<boolean>()

const emit = defineEmits(['remove'])
</script>

<template lang="pug">
q-dialog(v-model="modelValue")
	q-card(style="width: 500px; max-width: 80vw;")
		q-btn.close(round color="negative" icon="mdi-close" v-close-popup)
		q-card-section
			.text-h6 Удалить слова
		q-card-section
			p Вы уверены, что нужно удалить выбранные слова?
			q-card-actions(align="right")
				q-btn(flat color="primary" label="Отмена" v-close-popup) 
				q-btn(unelevated color="negative" label="Удалить" v-close-popup @click="$emit('remove')") 
</template>

<style scoped lang="scss"></style>
