import { defineStore } from 'pinia'

export const useOnboard = defineStore({
	id: 'onboard',
	state: () => ({
		addNewWord: false,
		addVoc: false,
		scene: 0,
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
