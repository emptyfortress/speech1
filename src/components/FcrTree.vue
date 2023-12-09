<template lang="pug">
q-tree(:nodes="treeData" node-key="id" v-model:expanded="expanded" default-expand-all)
	template(v-slot:default-header="prop")
		template(v-if="prop.node.typ !== 2")
			.row.items-center.cursor-pointer
				.icon(:class="{or : prop.node.typ === 1}" @click.stop="next(prop.node)")
				.q-ml-md {{prop.node.label}}
				.text-weight-bold.q-ml-sm {{prop.node.typ === 1 ? 'ИЛИ' : 'И'}}
		template(v-else)
			component(:is="QueryFcr" :keys="prop.node.keys" )
		component(:is="TreeMenu" :node="prop.node" @addOp="addOperator(prop.node)" @addCond="addCondition(prop.node)" @kill="del(prop.node)" @cut="cut(prop.node)" @paste="paste(prop.node)")
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { uid } from 'quasar'
import QueryFcr from '@/components/common/QueryFcr.vue'
import TreeMenu from '@/components/TreeMenu.vue'
import { deleteNodeFromTree, insertNodeIntoTree } from '@/utils/utils'
import type { Ref } from 'vue'

const treeData = reactive([
	{
		id: '0',
		label: 'Оператор',
		typ: 1,
		children: [
			{
				id: '1',
				typ: 2,
				label: 'Условие',
				children: [],
				keys: [{ id: 117, label: 'перезваниваю', score: 824.1, selected: false, part: 'v' }],
			},
			{
				id: '2',
				typ: 2,
				label: 'Условие',
				children: [],
				keys: [{ id: 118, label: 'уже звонил', score: 825.1, selected: false, part: 'v' }],
			},
			{
				id: '3',
				typ: 2,
				label: 'Условие',
				children: [],
				keys: [{ id: 119, label: 'три раза общались', score: 825.1, selected: false, part: 'v' }],
			},
			{
				id: '4',
				typ: 2,
				label: 'Условие',
				children: [],
				keys: [{ id: 120, label: 'вчера разговаривали', score: 825.1, selected: false, part: 'v' }],
			},
		],
	},
])
const test = [{ id: 117, label: 'перезваниваю', score: 824.1, selected: false, part: 'v' }]

const selected = ref(treeData[0].id)
const expanded: Ref<string[]> = ref(['0'])

const addOperator = (e: Request) => {
	let node = {
		id: uid(),
		label: 'Оператор',
		typ: 0,
		children: [],
	}
	insertNodeIntoTree(treeData[0], e.id, node)
	selected.value = node.id
	expanded.value.push(e.id)
}

const addCondition = (e: Request) => {
	let node = {
		id: uid(),
		label: 'Условие',
		typ: 2,
		children: [],
	}
	insertNodeIntoTree(treeData[0], e.id, node)
	selected.value = node.id
	expanded.value.push(e.id)
}

const del = (e: Request) => {
	deleteNodeFromTree(treeData[0], e.id)
}

let copy: any = null

const cut = (e: Request) => {
	copy = e
	deleteNodeFromTree(treeData[0], e.id)
}
const paste = (e: Request) => {
	if (copy != null) {
		insertNodeIntoTree(treeData[0], e.id, copy)
	}
}

const next = (e: Request) => {
	if (e.typ === 1) {
		e.typ = 0
	} else e.typ = e.typ + 1
}
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
.icon {
	width: 49px;
	height: 36px;
	background-image: url('@/assets/img/andor.svg');
	transition: 0.2s ease-out all;
	background-position: top left;
	cursor: pointer;
	&.or {
		background-position: bottom left;
	}
}
</style>
