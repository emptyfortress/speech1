<script setup lang="ts">
interface Props {
	label?: string
	filled?: boolean
	bg?: string
	options?: string[]
	disable?: boolean
}

// const props = defineProps({
// 	label: String,
// 	clearable: { type: Boolean, default: false },
// 	options: Array,
// 	filled: { type: Boolean, default: false },
// })
const props = withDefaults(defineProps<Props>(), {
	filled: false,
	options: () => ['Options 1', 'Option 2'],
	bg: 'white',
})

const modelValue = defineModel()
</script>

<template lang="pug">
div
	.label {{ label }}
	q-select(
		dense
		v-model="modelValue"
		:filled="props.filled"
		:outlined="!props.filled"
		:bg-color="props.bg"
		:options="props.options"
		:disable="props.disable"
		hide-bottom-space
	)
</template>

<style scoped lang="scss">
.label {
	font-size: 0.8rem;
	font-weight: 600;
}
:deep(.q-select) {
	width: 100%;
}
</style>
