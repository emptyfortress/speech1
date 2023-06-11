<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '@/stores/store'
import { VOnboardingWrapper, VOnboardingStep, useVOnboarding } from 'v-onboarding'
import Help from '@/components/Help.vue'

import 'v-onboarding/dist/style.css'

const store = useStore()
const lib0_Steps = [
	{ attachTo: { element: '#library' }, content: { title: "Откройте библиотеку", description: "" } },
	{ attachTo: { element: '#step0' }, content: { title: "Счетчик", description: "Это количество слов в библиотеке." } },
	{ attachTo: { element: '#step1' }, content: { title: "Фильтр", description: "Сначала проверьте, есть ли уже такое слово? Для этого введите его в поле фильтра. Если такого слова нет, то появится кнопка для добавления." } },
	{ attachTo: { element: '#step2' }, content: { title: "Добавление", description: "Получилось!" }, on: { afterStep: () => backToHelp() } },
	// { attachTo: { element: '#foo2' }, content: { title: "Next" } },
]
const wrapper = ref()
const { start, goToStep, finish } = useVOnboarding(wrapper)
const startBoarding = (() => {
	start()
})


const options = {
	labels: {
		previousButton: 'Назад',
		nextButton: 'Дальше',
		finishButton: 'Завершить'
	}
}

const backToHelp = (() => {
	store.keyDrawer = false
	store.openHelp()
})

</script>

<template lang="pug">
VOnboardingWrapper(ref="wrapper" :steps="lib0_Steps" :options="options")

Help(@start="startBoarding")
</template>

<style scoped lang="scss"></style>
