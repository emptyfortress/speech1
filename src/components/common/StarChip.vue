<template lang="pug">
.chp(:class="{'selected' : active}" @click="select")
	q-icon(name="mdi-check" v-show="active").check
	.ellipsis {{ label }}
	q-icon(name="mdi-close-circle" v-if="props.editMode" @click.stop="remove").close
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['click', 'remove'])

const props = defineProps({
	label: {
		type: String,
		default: 'label',
	},
	selected: {
		type: Boolean,
		default: false,
	},
	editMode: {
		type: Boolean,
		default: false,
	},
})

const active = ref(props.selected)
const select = () => {
	active.value = !active.value
	emit('click')
}
const remove = () => {
	emit('remove')
}
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
.chp {
	display: inline-flex;
	justify-content: space-between;
	align-items: center;
	gap: 4px;
	font-size: 0.85rem;
	padding: 0.2rem 0.5rem;
	background: #ccc;
	border-radius: 16px;
	cursor: pointer;
	max-width: 170px;
	&.selected {
		background: $primary;
		color: white;
		box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.3);
	}
	&:not(:last-child) {
		margin-right: 4px;
		margin-bottom: 4px;
	}
	.q-icon {
		font-size: 1rem;
	}
	.close {
		opacity: 0.5;
	}
}
</style>
