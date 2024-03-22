<script setup lang="ts">
import { ref } from 'vue'
import EvalQuestions from '@/components/evaluate/EvalQuestions.vue'
import Speech from '@/components/Speech.vue'
import EvalComments from '@/components/evaluate/EvalComments.vue'

const props = defineProps<{ anketa: Anketa }>()

const modelValue = defineModel()
const tab = ref('anketa')
const sound = ref(50)
const agree = ref(false)
const text = ref('')
</script>

<template lang="pug">
q-dialog(v-model="modelValue")
	q-card.maindialog
		q-btn.close(round color="negative" icon="mdi-close" v-close-popup)
		q-card-section
			.text-h6 {{ props.anketa.anketa }} - ({{ props.anketa.supervisor }})
			.total
				div {{ props.anketa.date}} - 13:05
				.text-weight-bold Общая оценка - {{ props.anketa.mark }}

			.myplayer
				q-linear-progress(:value=".6" color="positive")
				.player
					q-btn(round flat icon="mdi-rewind" @click.stop)
					q-btn(round flat icon="mdi-pause" @click.stop)
					q-btn(round flat icon="mdi-fast-forward" @click.stop)
				.time 02:31
				.row.items-center
					q-icon(name="mdi-volume-medium" size="sm")
					q-slider.slide(color="primary" v-model="sound")
					q-icon(name="mdi-volume-high" size="sm")
			q-tabs(v-model="tab" dense active-color="primary" indicator-color="primary" align="left" )
				q-tab(name="anketa" label="Анкета")
				q-tab(name="records" label="Расшифровка разговора")
				q-tab(name="comments" label="Комментарии")

			q-separator

			q-tab-panels(v-model="tab" animated)
				q-tab-panel(name="anketa")
					q-scroll-area
						EvalQuestions(operator)
				q-tab-panel(name="records")
					q-scroll-area.dark
						Speech
				q-tab-panel(name="comments")
					q-scroll-area
						EvalComments
					
		q-card-section
			q-card-actions(align="right")
				q-btn(flat color="negative" label="Я не согласен!" @click="agree = true") 
				q-space
				q-btn(unelevated color="primary" label="Хорошо" v-close-popup) 

	q-dialog(v-model="agree")
		q-card
			q-card-section.row.items-center.q-pb-none
				.text-h6 Ваши возражения

			q-card-section
				q-input(v-model="text" type="textarea" filled autofocus)
			q-card-actions.q-ma-md(align="right")
				q-btn(flat color="primary" label="Отмена" v-close-popup) 
				q-btn(unelevated color="primary" label="Отправить" v-close-popup) 
</template>

<style scoped lang="scss">
.q-card {
	min-width: 860px;
}
.maindialog {
	height: 90vh;
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
.q-scrollarea {
	height: 55vh;
}
.myplayer {
	position: relative;
	height: 50px;
	background: $blue-grey-9;
	color: #6d8e9e;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	padding-left: 1rem;
	gap: 2rem;
	font-size: 0.9rem;

	.q-linear-progress {
		position: absolute;
		top: 0;
		left: 0;
	}

	.player {
		color: white;
		display: flex;
		justify-items: flex-start;
		align-items: center;
		height: 100%;
	}

	.time {
		font-size: 2rem;
		font-weight: lighter;
		letter-spacing: 1px;
		color: white;
	}

	.slide {
		width: 150px;
	}
}
.dark {
	margin-top: 1px;
	background: $blue-grey-9;
}
</style>
