<script setup lang="ts">
import { nextTick, ref, computed } from 'vue'
import { useStore } from '@/stores/store'
import { useOnboard } from '@/stores/onboard'
import { VOnboardingWrapper, VOnboardingStep, useVOnboarding } from 'v-onboarding'
import Help from '@/components/Help.vue'
import 'v-onboarding/dist/style.css'

const store = useStore()
const onboard = useOnboard()

const keyword_Steps = [
	{ attachTo: { element: '#library' }, content: { title: "Откройте библиотеку", description: "" }, on: { beforeStep: () => store.openKeyDrawer(), afterStep: () => setFilter() }, },
	{ attachTo: { element: '#step1' }, content: { title: "Фильтр", description: "Сначала проверьте, есть ли уже такое слово? Для этого введите его в поле фильтра. Если такого слова нет, то появится кнопка для добавления.", } },
	{ attachTo: { element: '#step2' }, content: { title: "Добавление", description: "Добавьте слово и оно появится вверху списка." }, on: { afterStep: () => backToHelp() } },
]

const voc_Steps = [
	{ attachTo: { element: '#library' }, content: { title: "Откройте библиотеку", description: "" }, on: { beforeStep: () => store.openKeyDrawer() }, },
	{ attachTo: { element: '#voc' }, content: { title: "Cловарь", description: "Словарь имеет иконку в виде книжки. Для создания словаря - выберите слова (или словари) при помощи чекбоксов", }, on: { afterStep: () => setVoc() } },
	{ attachTo: { element: '#dialog' }, content: { title: "Добавление", description: "Введите название словаря и добавьте его. Он появится в списке доступных.", }, on: { afterStep: () => backToHelp() } },
]
const wrapper = ref()
const { start, goToStep, finish } = useVOnboarding(wrapper)

const startBoarding = (() => {
	store.toggleHelp()
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
	onboard.toggle()
	store.openHelp()
	setTimeout(() => {
		onboard.addNewWord = false
		onboard.addVoc = false
	}, 300)
})

const setVoc = (() => {
	onboard.toggleVoc()
})

const setFilter = (() => {
	store.setKeywordFilter('новое слово')
})

const chooseScene = computed(() => {
	if (onboard.scene === 0) {
		return keyword_Steps
	} else if (onboard.scene === 1) {
		return voc_Steps
	}
})
</script>

<template lang="pug">
VOnboardingWrapper(ref="wrapper" :steps="chooseScene" :options="options")

Help(@start="startBoarding")
</template>

<style scoped lang="scss">
:deep(button.v-onboarding-item__header-close) {
	background: #ccc;
	border: none;
	cursor: pointer;

	svg {
		display: none;
	}

	&::after {
		content: '\D7';
		font-size: 1.3rem;
	}
}

:deep([data-popper-arrow]:before) {
	border: 1px solid black;
}
</style>
