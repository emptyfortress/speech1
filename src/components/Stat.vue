<template lang="pug">
q-expansion-item(v-model="stat")
	template(v-slot:header)
		q-item-section(avatar).line
			q-avatar(icon="mdi-dice-5-outline" flat)
		q-item-section
			.zag Частотность
	q-card-section.q-px-md.q-pt-md
		.toolbar
			q-select(label="Сортировка" v-model="sort" :options="sortModel" dense)
			q-select(label="Словарь" v-model="part" :options="partModel" dense)
			q-input(v-model="filter" dense clearable @clear="filter = ''")
				template(v-slot:prepend)
					q-icon(name="mdi-magnify")
			q-range(v-model="label" :min="270" :max="410" :step="4" label color="primary" label-always)
			q-btn(round color="primary" outline  icon="mdi-undo" size="12px" @click="reset")
		.text-left
			transition-group(name="fade")
				component(:is="Wordchip" v-for="chip in mychips3" :key="chip.key" :label="chip.key" :count="chip.value" :part="chip.part")
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Wordchip from '@/components/common/Wordchip.vue'
import { chips } from '@/stores/chips'

const stat = ref(false)
const filter = ref('')
const sort = ref('Вес 9 -> 0')
const part = ref('Все')
const label = ref({ min: 270, max: 410 })

const sortModel = ['Вес 9 -> 0', 'Вес 0 -> 9', 'Алфавит А -> Я', 'Алфавит Я -> А']
const partModel = ['Все', 'Существительные', 'Прилагательные', 'Глаголы', 'Наречия']

const mychips = computed(() => {
	switch (sort.value) {
		case 'Вес 0 -> 9':
			return chips.sort((a, b) => {
				return a.value - b.value
			})
		case 'Вес 9 -> 0':
			return chips.sort((a, b) => b.value - a.value)
		case 'Алфавит А -> Я':
			return chips.sort((a, b) => {
				let fa = a.key.toLowerCase()
				let fb = b.key.toLowerCase()
				if (fa < fb) {
					return -1
				}
				if (fa > fb) {
					return 1
				}
				return 0
			})
		case 'Алфавит Я -> А':
			return chips.sort((a, b) => {
				let fa = a.key.toLowerCase()
				let fb = b.key.toLowerCase()
				if (fa > fb) {
					return -1
				}
				if (fa < fb) {
					return 1
				}
				return 0
			})
		default:
			return chips
	}
})

const mychips1 = computed(() => {
	switch (part.value) {
		case 'Существительные':
			return mychips.value.filter((e) => e.part === 's')
		case 'Прилагательные':
			return mychips.value.filter((e) => e.part === 'a')
		case 'Глаголы':
			return mychips.value.filter((e) => e.part === 'v')
		case 'Наречия':
			return mychips.value.filter((e) => e.part === 'adv')
		default:
			return mychips.value
	}
})

const mychips2 = computed(() => {
	return mychips1.value.filter((e) => e.key.includes(filter.value))
})

const mychips3 = computed(() => {
	return mychips2.value.filter((e) => e.value > label.value.min && e.value < label.value.max)
})

const reset = () => {
	filter.value = ''
	sort.value = 'Вес 9 -> 0'
	part.value = 'Все'
	label.value = { min: 270, max: 410 }
}
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
.toolbar {
	margin-bottom: 1.5rem;
	font-size: 0.9rem;
	display: grid;
	grid-template-columns: 1fr 1fr 2fr 3fr auto;
	align-items: baseline;
	gap: 2rem;
}
.q-range {
	transform: translateY(14px);
}
</style>
