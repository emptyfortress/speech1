<script setup lang="ts">
// import { ref, reactive, computed } from 'vue'
import { useOperatorList } from '@/stores/operatorList'

const opList = useOperatorList()
const emit = defineEmits(['filterBy'])

const toggle = (item: any, el: any, index: number, ind: number) => {
	opList.aggregateData[index].list[ind].value = !opList.aggregateData[index].list[ind].value
	if (el.value == true && item.col == 'city') opList.addToCityFilters(el.title)
	if (el.value == false && item.col == 'city') opList.removeFromCityFilters(el.title)
	if (el.value == true && item.col == 'group') opList.addToGroupFilters(el.title)
	if (el.value == false && item.col == 'group') opList.removeFromGroupFilters(el.title)
}
</script>

<template lang="pug">
.list(v-for="(item, index) in opList.aggregateData")
	.section {{ item.name }}
	q-list(dense).q-mb-sm
		q-item(v-for="( el, ind ) in item.list" v-ripple tag="label" clickable)
			q-item-section(side)
				q-checkbox.reset(dense :model-value="el.value" @update:model-value="toggle(item, el, index, ind)")
			q-item-section
				q-item-label {{ el.title }}
			.right {{ el.badge }}
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
.q-item {
	font-size: 0.9rem;
	align-items: center;
}
</style>
