<template lang="pug">
.chip(v-close-popup)
	.key {{ label }}
	.count {{ Math.round(count) }}
	q-menu(anchor="top middle" self="bottom middle").bg-primary.text-white
		.row.no-wrap.q-pa-md
			.column
				.text-h6.q-mb-none {{ label }}
				.calc {{ calc }}
			q-separator(vertical inset color="white").q-mx-lg
			.column.items-center
				.text-h6.q-mb-md {{ count}}
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
	label: {
		type: String,
		default: 'test',
	},
	count: {
		type: Number,
		default: 0,
	},
	part: {
		type: String,
		required: false,
	},
})
const calc = computed(() => {
	switch (props.part) {
		case 's':
			return 'сущ.'
		case 'a':
			return 'прил.'
		case 'adv':
			return 'нареч.'
		case 'v':
			return 'глаг.'
		default:
			return 'неизв.'
	}
})
</script>

<style scoped lang="scss">
@import '@/assets/styles/myvariables.scss';
.chip {
	padding: 2px 5px 2px 10px;
	display: inline-flex;
	align-items: center;
	gap: 10px;
	margin-right: 8px;
	margin-bottom: 8px;
	cursor: pointer;
	// background: #d9d9d9;
	background: $accent2;
	border-radius: 16px;
	position: relative;
	font-size: 0.9rem;
	.count {
		font-size: 0.8rem;
		// background: #7f8f96;
		background: #9c9c9c;
		color: #fff;
		padding: 0 4px;
		border-radius: 8px;
		// text-shadow: 0 0 4px black;
	}
}
.q-menu {
	min-width: 250px;
	min-height: 50px;
	.zg {
		font-size: 1.1rem;
	}
}
.calc {
	font-style: italic;
}
</style>
