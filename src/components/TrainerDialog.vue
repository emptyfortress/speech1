<script setup lang="ts">
const modelValue = defineModel<boolean>()

const props = defineProps<{
	mode: 'evaluation' | 'hint'
	data: any
}>()
</script>

<template lang="pug">
q-dialog(v-model="modelValue")
	q-card(style="width: 500px; max-width: 80vw;")
		q-btn.close(round color="negative" icon="mdi-close" v-close-popup)
		q-card-section
			.text-h6(v-if='props.mode == "evaluation"') Оценка
			.text-h6(v-else) Подсказка
		q-card-section
			p {{ props.data }}
			q-card-actions(align="right")
				q-btn(flat color="primary" label="Закрыть" v-close-popup) 
</template>

<style scoped lang="scss"></style>
