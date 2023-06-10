<template lang="pug">
div
	.label {{ label }}
	q-select(dense
		outlined
		bg-color="white"
		:model-value="props.model"
		:options="props.options"
		)
</template>

<script setup lang="ts">
const props = defineProps({
	label: String,
	model: String,
	clearable: { type: Boolean, default: false },
	options: Array,
})
</script>

<style scoped lang="scss">
.label {
	font-size: 0.8rem;
	font-weight: 600;
}
</style>
