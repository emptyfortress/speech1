import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSynStore = defineStore('syn', () => {
	const showSyn = ref(false)
	const setSyn = (e: boolean) => {
		showSyn.value = e
	}

	return {
		showSyn,
		setSyn,
	}
})
