<script setup lang="ts">

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
</script>

<template lang="pug">
q-btn(flat round icon="mdi-filter"  @click="" dense size="sm") 
	q-menu
		q-list
			q-item(v-for="opt in props.options" key="opt" clickable @click="toggle(opt)" :class="selClass(opt)")
				q-item-section(side)
					q-checkbox(:model-value="modelValue" dense :val="opt" @click="toggle(opt)")
				q-item-section
					q-item-label {{ opt }}
</template>

<style scoped lang="scss">
@import '@/assets/styles/myvariables.scss';

.selected {
	background: $bgSelection;
}
</style>
