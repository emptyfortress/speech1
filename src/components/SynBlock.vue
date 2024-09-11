<script setup lang="ts">
import { ref } from 'vue'
import { useSynStore } from '@/stores/synonim'

const mysyn = useSynStore()
const searchSyn = ref(false)

interface Syn {
	id: number
	label: string
	selected: boolean
	show: boolean
}

const chips = ref([
	{ id: 0, show: true, label: 'чистый', selected: true },
	{ id: 1, show: true, label: 'белоснежный', selected: true },
	{ id: 2, show: true, label: 'седой', selected: true },
	{ id: 3, show: true, label: 'бледный', selected: true },
	{ id: 4, show: true, label: 'беленький', selected: true },
	{ id: 5, show: true, label: 'белесый', selected: true },
	{ id: 6, show: true, label: 'меловой', selected: true },
	{ id: 7, show: true, label: 'молочный', selected: true },
	{ id: 8, show: true, label: 'восковой', selected: true },
])
const futureDefault = ref(false)

const confirm = (e: Syn) => {
	dialog.value = true
	current.value = e
}

const current = ref<Syn | null>(null)
const dialog = ref(false)

const remove = () => {
	dialog.value = false
}
const revert = () => {
	current.value!.show = true
	dialog.value = false
}
</script>

<template lang="pug">
q-dialog(v-model="mysyn.showSyn" position='bottom' seamless)
	q-card
		q-btn.close(icon="mdi-close" round dense color="negative" v-close-popup)
		q-card-section
			q-checkbox(v-model="searchSyn" dark label='Поиск с синонимами')
		q-card-section(v-if='searchSyn')
			q-chip(v-for="chip in chips" :key='chip.id' v-model:selected='chip.selected' v-model="chip.show" clickable removable @update:modelValue='confirm(chip)') {{ chip.label }}

		q-card-actions.q-mb-md.q-mx-md(v-if='searchSyn' align='left')
			q-checkbox(v-model='futureDefault' dark label='Всегда искать синонимы, если они есть' dense)
			q-space
			q-btn(flat color="primary" label="Отмена" v-close-popup) 
			q-btn(unelevated color="primary" label="Искать включая синонимы" v-close-popup) 

	q-dialog(v-model="dialog")
		q-card
			q-btn.close(icon="mdi-close" round dense color="negative" v-close-popup)
			q-card-section.row.items-center.q-pb-none
				.text-h6 Удалить синоним

			q-card-section
				div Удалить "<b>{{ current.label.toUpperCase() }}</b>" из списка синонимов? Это действие нельзя отменить.
			q-card-actions.q-mb-md.q-mx-md(align='right')
				q-btn(flat color="primary" label="Отмена" @click='revert') 
				q-btn(unelevated color="primary" label="Удалить" @click='remove') 

</template>

<style scoped lang="scss">
.q-card {
	min-width: 800px;
	color: white;
	background: #012949;
}
.q-dialog .q-card .close {
	top: -1rem;
	right: -1rem;
}
</style>
