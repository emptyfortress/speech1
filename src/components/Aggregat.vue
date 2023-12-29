<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
// import { operators } from '@/stores/operators'
const props = defineProps<{
	data: Block[]
}>()

type List = {
	title: string
	value: boolean
	badge: number
}
type Block = {
	col: string
	name: string
	list: List[]
}

const emit = defineEmits(['filterBy'])

const toggle = (el: any, index: number, ind: number) => {
	// props.data[index].list[ind].value = !props.data[index].list[ind].value
	let item = {
		col: props.data[index].col,
		title: props.data[index].list[ind].title,
		value: el.value,
	}
	emit('filterBy', item)
	console.log(item)
}
const action = () => {
	// console.log(props.data)
}
</script>

<template lang="pug">
// q-btn(unelevated color="primary" label="Отмена" @click="action") 

// p {{ props.data }}
.list(v-for="(item, index) in props.data")
	.section {{ item.name }}
	q-btn(flat color="primary" label="Отмена" size="11px") 
	q-list(dense).q-mb-sm
		q-item(v-for="( el, ind ) in item.list" v-ripple tag="label" clickable)
			q-item-section(side)
				q-checkbox.reset(dense :model-value="el.value" @update:model-value="toggle(el, index, ind)")
			q-item-section {{ el.title }}
			q-item-section.right {{ el.badge }}
</template>

<style scoped lang="scss">
.section {
	padding: 0 1rem;
	font-weight: 600;
	// margin-bottom: 0.5rem;
}
.right {
	text-align: right;
}
.list {
	border-bottom: 1px solid #dedede;
	padding-bottom: 1rem;
	padding-top: 1rem;
}
</style>
