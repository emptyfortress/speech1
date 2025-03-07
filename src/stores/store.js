import { defineStore } from 'pinia'

export const useStore = defineStore({
	id: 'store',
	state: () => ({
		loading: false,
		rightDrawer: false,
		leftDrawer: true,
		dateDrawer: false,
		keyDrawer: false,
		vocDrawer: false,
		notificationDrawer: false,
		speechDrawer: false,
		mini: false,
		keys: [],
		chips: [],
		nat: true,
		sett: false,
		fcr: true,
		req: true,
		chec: false,
		compare: false,
		table: false,
		tableCompare: false,
		cat: true,
		integral: false,
		record: 'группа 1',
		wide: false,
		recordPanel: false,
		loading: false,
		help: false,
		keywordFilter: '',
		currentVoc: { name: '', keys: [] },
		draggingWord: ''
	}),
	getters: {},

	actions: {
		toggleTableCompare() {
			this.tableCompare = !this.tableCompare
		},
		toggleCompare() {
			this.compare = !this.compare
		},
		setDraggingWord(e) {
			this.draggingWord = e
		},
		addKeyToCurrentVoc(e) {
			this.currentVoc.keys.push(e)
		},
		setCurrentVoc(e) {
			this.currentVoc = e
		},
		setKeywordFilter(e) {
			this.keywordFilter = e
		},
		clearKeywordFilter() {
			this.keywordFilter = ''
		},
		toggleHelp() {
			this.help = !this.help
		},
		closeHelp() {
			this.help = false
		},
		openHelp() {
			this.help = true
		},
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
		},
		toggleIntegral() {
			this.iintegral = !this.integral
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
		openKeyDrawer() {
			this.keyDrawer = true
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
