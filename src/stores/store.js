import { defineStore } from 'pinia'

export const useStore = defineStore({
	id: 'store',
	state: () => ({
		loading: false,
		rightDrawer: false,
		leftDrawer: true,
		dateDrawer: false,
		keyDrawer: false,
		notificationDrawer: false,
		speechDrawer: false,
		mini: false,
		keys: [],
		chips: [],
		sett: true,
		req: true,
		chec: true,
		cat: true,
		integral: false,
		record: 'группа 1',
		wide: false,
		recordPanel: false,
		loading: false,
	}),
	getters: {},

	actions: {
		setLoading() {
			this.loading = true
			setTimeout(() => {
				this.loading = false
			}, 2000)
		},
		setRecord(payload) {
			this.record = payload
		},
		toggleSetup() {
			this.sett = !this.sett
			console.log(444)
		},
		toggleIntegral() {
			this.iintegral = !this.integral
			console.log(444)
		},
		toggleDateDrawer() {
			this.mini = true
			this.dateDrawer = !this.dateDrawer
		},
		toggleNotificationDrawer() {
			this.notificationDrawer = !this.notificationDrawer
		},
		toggleKeyDrawer() {
			this.mini = true
			this.keyDrawer = !this.keyDrawer
		},
		openSpeechDrawer() {
			this.mini = true
			this.speechDrawer = true
		},
		closeSpeechDrawer() {
			this.speechDrawer = false
		},
		toggleSpeechDrawer() {
			this.mini = true
			this.speechDrawer = !this.speechDrawer
		},
		toggleLeftDrawer() {
			this.leftDrawer = !this.leftDrawer
		},
		closeLeftDrawer() {
			this.leftDrawer = false
			console.log('fuck')
		},
		toggleMini() {
			this.mini = !this.mini
		},
		closeMenu() {
			this.mini = true
		},
		addKey(e) {
			this.keys.push(e)
		},
		removeKey(e) {
			let index = this.keys.findIndex((item) => item === e)
			this.keys.splice(index, 1)
		},
		removeKeyByIndex(e) {
			this.keys.splice(e, 1)
		},
		setChips(e) {
			this.chips = e
		},
		setKeys(e) {
			this.keys = e
		},
		clearSelected() {
			this.chips.map((item) => (item.selected = false))
			this.keys = []
		},
	},
})
