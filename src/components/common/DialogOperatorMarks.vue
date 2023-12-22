<template lang="pug">
q-dialog(v-model="modelValue")
	q-card(style="width: 600px; max-width: 80vw;")
		q-btn.close(round color="negative" icon="mdi-close" v-close-popup)
		q-card-section
			.text-h6 {{ mark.text}}
		q-card-section
			q-list(dense)
				q-item(v-for="item in 5")
					q-item-section(side) Параметр {{ item }}:
					q-item-section.text-weight-bold {{ mark.mark }}
					q-item-section Это комментарий.
			.total Общая оценка - {{ mark.mark }}
			div Записи по которым производилась оценка:
			.links Петров_2023-10-03
			.links Петров_2023-10-04
					

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

<style scoped lang="scss">
.total {
	margin-top: 1rem;
	margin-bottom: 1rem;
	text-align: center;
	border-top: 1px solid #ccc;
	border-bottom: 1px solid #ccc;
	padding: 0.3rem;
	background: #eee;
}
.links {
	cursor: pointer;
	color: $primary;
}
</style>
