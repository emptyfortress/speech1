<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
	options: string[]
}
const props = defineProps<Props>()
const modelValue = defineModel<string[]>({ default: [] })

const toggle = ((opt: string) => {
	const index = modelValue.value.indexOf(opt)
	if (index > -1) {
		modelValue.value?.splice(index, 1)
	} else modelValue.value?.push(opt)
})
const selClass = ((e: string) => {
	const temp = modelValue.value.find(item => item === e)
	if (temp) {
		return 'selected'
	}
})
const filter = ref()
const filteredOptions = computed(() => {
	if (filter.value?.length > 0) {
		return props.options.filter(item => item.toLowerCase().includes(filter.value.toLowerCase()))
	} else return props.options
})
</script>

<template lang="pug">
q-btn(flat round dense size="md" ) 
	q-menu
		q-list
			q-item
				q-item-section
					q-input.filter(dense debounce="300" color="primary" v-model="filter" clearable)
						template(v-slot:prepend)
							q-icon(name="mdi-magnify")
			q-item(v-for="opt in filteredOptions" key="opt" clickable @click="toggle(opt)" :class="selClass(opt)")
				q-item-section(side)
					q-checkbox(:model-value="modelValue" dense :val="opt" @click="toggle(opt)")
				q-item-section
					q-item-label {{ opt }}
	q-icon(v-if="!modelValue.length" name="mdi-filter-menu-outline" color="primary")
	q-icon(v-else name="mdi-filter-menu" color="primary")
		q-badge(:label="modelValue.length" color="red" floating rounded)
</template>

<style scoped lang="scss">
@import '@/assets/styles/myvariables.scss';

.selected {
	background: $bgSelection;
}

.filter {
	width: 190px;
}

:deep(.q-badge--floating) {
	position: absolute;
	top: -7px;
	right: -7px;
	cursor: inherit;
	font-style: normal;
}
</style>
