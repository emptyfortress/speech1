<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '@/stores/store'
import NlqSearch from '@/components/nlq/NlqSearch.vue'
// import NlqAnalyze from '@/components/nlq/NlqAnalyze.vue'

const mystore = useStore()

const search = ref(true)
// const analize = ref(true)
</script>

<template lang="pug">
q-page(padding)
	.container
		q-expansion-item(v-model="search")
			template(v-slot:header)
				q-item-section(avatar).line
					q-avatar(flat)
						svg(xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24")
							path(fill="none" stroke="#888888" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 9a3 3 0 0 1 3-3m-2 15h4m0-3c0-4.1 4-4.9 4-9A6 6 0 1 0 6 9c0 4 4 5 4 9z")
				q-item-section
					.zag Семантический поиск

			NlqSearch

		// q-expansion-item(v-model="analize")
			template(v-slot:header)
				q-item-section(avatar).line
					q-avatar(flat)
						svg(xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24")
							path(fill="none" stroke="#888888" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 9a3 3 0 0 1 3-3m-2 15h4m0-3c0-4.1 4-4.9 4-9A6 6 0 1 0 6 9c0 4 4 5 4 9z")
				q-item-section
					.zag Оценка текста

			NlqAnalyze
</template>

<style scoped lang="scss">
</style>
