import { defineStore } from 'pinia'

export const useDash = defineStore({
	id: 'dash',
	state: () => ({
		panels: [
			{
				id: 'home',
				label: 'Панель 1',
				name: 'home',
				descr: 'По умолчанию',
				gap: 0.5,
				radius: 4,
				flat: false,
			},
		],
	}),
	getters: {},
	actions: {
		addPanel(e: any) {
			this.panels.push(e)
		},
	},
})
