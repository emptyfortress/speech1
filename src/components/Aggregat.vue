<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { operators } from '@/stores/operators'
const props = defineProps<{
	data: Operator[]
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

const aggregateData = computed(() => {
	let agg: Block[] = []
	const iteration = ['city', 'group']
	iteration.forEach((it: string) => {
		const block = [...new Set(props.data.map((item: any) => item[it]))]
		const blockname = (it: string) => {
			switch (it) {
				case 'city':
					return 'Город'
				case 'group':
					return 'Группа'
				default:
					return 'Остальное'
			}
		}
		const list = block.map((el: any) => {
			const length = props.data.filter((item: any) => item[it] === el).length
			return {
				title: el,
				value: false,
				badge: length,
			}
		})
		list.sort((a, b) => b.badge - a.badge)

		const blocks: Block = {
			col: it,
			name: blockname(it),
			list: list,
		}

		agg.push(blocks)
	})
	return agg
})

const emit = defineEmits(['filterBy'])

const reactData = reactive([...aggregateData.value])

const toggle = (el: any, index: number, ind: number) => {
	reactData[index].list[ind].value = !reactData[index].list[ind].value
	let item = {
		col: reactData[index].col,
		title: reactData[index].list[ind].title,
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
.list(v-for="(item, index) in aggregateData")
	.section {{ item.name }}
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
