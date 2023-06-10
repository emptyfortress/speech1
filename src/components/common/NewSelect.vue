<template lang="pug">
q-select(dense
	v-model="innerModel"
	use-input
	autofocus
	multiple
	clearable
	input-debounce="0"
	:options="propOptions"
	@update:model-value="update"
	@filter="filterFn" :style="`width: ${props.width}px`")
	template(v-slot:no-option)
		q-item.text-grey
			q-item-section No results
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
	model: string[]
	options: string[]
	width?: number
}>()
const emit = defineEmits(['update'])

const propOptions = ref(props.options)
const innerModel = ref(props.model)

const update = () => {
	emit('update', innerModel)
}

const filterFn = (val: string, update: Function) => {
	update(() => {
		if (val === '') {
			propOptions.value = props.options
		} else {
			const needle = val.toLowerCase()
			propOptions.value = props.options.filter((v) => v.toLowerCase().indexOf(needle) > -1)
		}
	})
}
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
</style>
