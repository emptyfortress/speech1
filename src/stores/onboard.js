import { defineStore } from 'pinia'

export const useOnboard = defineStore({
	id: 'onboard',
	state: () => ({
		addNewWord: false,
		addVoc: false,
		scene: 0,
		steps1: [
			{ element: '#library', popover: { title: 'Добавить слово', description: 'Сначала откройте панель библиотеки', side: "left", align: 'start' } },
			{ element: '#help', popover: { title: 'Добавить слово', description: 'Here is the code example showing animated tour. Let\'s walk you through it.', side: "left", align: 'start' } },
		]
	}),
	getters: {},

	actions: {
		toggle() {
			this.addNewWord = !this.addNewWord
		},
		toggleVoc() {
			this.addVoc = !this.addVoc
		},
		setScene(e) {
			this.scene = e
		}
	}
})
