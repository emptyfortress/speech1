<script setup lang="ts">
interface Props {
	label?: string
	filled?: boolean
	bg?: string
	disable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	filled: false,
	bg: 'white',
})

const modelValue = defineModel<string | number | FileList | null | undefined>()
</script>

<template lang="pug">
div
	.label {{ label }}
	q-input(
		v-model="modelValue"
		:filled="props.filled"
		:outlined="!props.filled"
		:bg-color="props.bg"
		:disable="props.disable"
		hide-bottom-space
		dense
		)
</template>

<style scoped lang="scss">
.label {
	font-size: 0.8rem;
	font-weight: 600;
}

:deep(.q-input) {
	width: 100%;
}
</style>
