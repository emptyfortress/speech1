<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps<{ anketa: Anketa }>()

const modelValue = defineModel()
const tab = ref('anketa')
</script>

<template lang="pug">
q-dialog(v-model="modelValue")
	q-card()
		q-btn.close(round color="negative" icon="mdi-close" v-close-popup)
		q-card-section
			.text-h6 {{ props.anketa.anketa }} - ({{ props.anketa.supervisor }})
			.total
				div {{ props.anketa.date}}
				.text-weight-bold Общая оценка - {{ props.anketa.mark }}
			q-tabs(v-model="tab" dense active-color="primary" indicator-color="primary" align="left" )
				q-tab(name="anketa" label="Анкета")
				q-tab(name="records" label="Запись разговора")
				q-tab(name="comments" label="Комментарии")
					
		q-card-section
			q-card-actions(align="right")
				q-btn(flat color="negative" label="Я не согласен!" v-close-popup) 
				q-space
				q-btn(unelevated color="primary" label="Хорошо" v-close-popup) 


</template>

<style scoped lang="scss">
.q-card {
	min-width: 700px;
}
.total {
	border-top: 1px solid #ccc;
	border-bottom: 1px solid #ccc;
	padding: 0.3rem;
	background: #eee;
	margin-bottom: 1rem;
	display: flex;
	justify-content: space-between;
}
.links {
	cursor: pointer;
	color: $primary;
	&:hover {
		text-decoration: underline;
	}
}
</style>
