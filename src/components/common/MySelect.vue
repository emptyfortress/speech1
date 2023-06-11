<template lang="pug">
div
	.label {{ label }}
	q-select(dense
		outlined
		bg-color="white"
		v-model="modelValue"
		:options="props.options"
		)
</template>

<script setup lang="ts">
const props = defineProps({
	label: String,
	clearable: { type: Boolean, default: false },
	options: Array,
})
const modelValue = defineModel()

</script>

<style scoped lang="scss">
.label {
	font-size: 0.8rem;
	font-weight: 600;
}
</style>
