<script setup lang="ts">
import { ref, reactive } from 'vue'
import EvalQuestions from '@/components/evaluate/EvalQuestions.vue'
import EvalComments from '@/components/evaluate/EvalComments.vue'
import EvalFinish from '@/components/evaluate/EvalFinish.vue'
const step = ref(1)
const stepper = ref()
const selection = ref(0)
const anketa = [
	{ id: 0, label: 'Квартальная', description: 'Для оценки раз в квартал', num: 20 },
	{
		id: 1,
		label: 'По категориям',
		description: 'Непонятно для чего, для категорий, наверное',
		num: 13,
	},
	{
		id: 2,
		label: 'Выборочная',
		description: 'Выборочная анкета для спонтанных проверок',
		num: 31,
	},
	{ id: 3, label: 'Жесткая', description: 'Самая полная анкета', num: 44 },
	{ id: 4, label: 'Краткая', description: 'Короткая анкета для быстрой оценки', num: 9 },
]
const next = () => {
	stepper.value.next()
}
const prev = () => {
	stepper.value.previous()
}
</script>

<template lang="pug">
q-stepper(v-model="step" ref="stepper" header-nav color="primary" animated flat alternative-labels )
	q-step(:name="1" title="Выбор анкеты" prefix="1" :done="step > 1")
		q-item-label Выберите анкету для оценки:
		q-list(padding separator)
			q-item(tag="label" v-ripple v-for="item in anketa" :key="item.id" :class="{selected : selection == item.id}")
				q-item-section(side top)
					q-radio(v-model="selection" :val="item.id")

				q-item-section
					q-item-label {{item.label}}
					q-item-label(caption) {{item.description}}
				q-item-section(side) {{ item.num }}
	q-step(:name="2" title="Вопросы" prefix="2" :done="step > 2")
		EvalQuestions
	q-step(:name="3" title="Комментарии" prefix="3" :done="step > 3")
		EvalComments
	q-step(:name="4" title="Завершение" prefix="4" :done="step > 4")
		EvalFinish

	template(v-slot:navigation)
		q-stepper-navigation(align="right")
			q-btn(v-if="step > 1" flat color="primary" @click="prev" label="Назад" class="q-ml-sm")
			q-btn(unelevated @click="next" color="primary" :label="step === 4 ? 'Завершить' : 'Далее'")
</template>

<style scoped lang="scss">
.q-stepper {
	background: transparent;
	margin-top: 1rem;
}
.selected {
	background: $accent1;
	color: $blue-9;
	.q-item__label--caption,
	.q-item__section--side {
		color: $blue-9;
	}
}
</style>
