<template lang="pug">
q-page(padding)
	.container
		.row.justify-between.items-center
			.zag Тренды
			component(:is="ChipCalendar1")
		component(:is="Trends1")
		component(:is="Events")

		.row.justify-between.items-center.q-mt-lg
			.zag Дополнительно
			component(:is="ChipCalendar1")
		component(:is="Addition")
</template>

<script setup lang="ts">
import Trends1 from '@/components/Trends1.vue'
import Events from '@/components/Events.vue'
import Addition from '@/components/Addition.vue'
import ChipCalendar1 from '@/components/ChipCalendar1.vue'
</script>

<style scoped lang="scss"></style>
