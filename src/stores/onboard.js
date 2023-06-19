import { defineStore } from 'pinia'

export const useOnboard = defineStore({
	id: 'onboard',
	state: () => ({
		addNewWord: false

	}),
	getters: {},

	actions: {
		toggle() {
			this.addNewWord = !this.addNewWord
		}
	}
})
