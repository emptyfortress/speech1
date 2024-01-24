<script setup lang="ts">
const modelValue = defineModel()

const props = defineProps<{
	operator: Operator
}>()
</script>

<template lang="pug">
q-dialog(v-model="modelValue" full-width)
	q-card()
		q-card-section.row.justify-between.items-center.q-pb-none
			.text-h6 Оценка качества {{ props.operator.name }}
			q-btn(icon="mdi-close" flat round dense v-close-popup)

		q-card-section
			p Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
</template>

<style scoped lang="scss"></style>
