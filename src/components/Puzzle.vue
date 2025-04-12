<template lang="pug">
div
	Draggable(ref="tree"
		treeLine
		v-model="treeData"
		:indent="40"
		:eachDroppable="isDrop"
		:eachDraggable="isDrag"
		:root-droppable="false"
		class='mtl-tree'
		)

		template(#default="{ node, stat }")
			.node
				TreeItem(:stat='stat')
				q-btn.closing(v-if='!node.root' dense unelevated round color="negative" icon="mdi-close" size='sm' @click='remove(stat)') 

	.empty(v-if='!treeData[0].children.length')
		q-icon(name="mdi-alert-outline" color="grey" size='md')
		div Запрос не настроен.

	.q-gutter-x-xs.q-mt-md
		q-btn(outline color="primary" icon='mdi-gate-and' label="Добавить оператор" @click="addOper" size='sm') 
		q-btn(outline color="primary" icon='mdi-crosshairs-question' label="Добавить условие" @click="addCond" size='sm') 
		q-btn(outline color="negative" icon='mdi-backspace-outline' label="Очистить все" @click="clearAll" size='sm') 
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { uid } from 'quasar'
import { Draggable } from '@he-tree/vue'
import TreeItem from '@/components/TreeItem.vue'
import '@he-tree/vue/style/default.css'
import '@he-tree/vue/style/material-design.css'

const tree = ref()

const treeData = ref([
	{
		id: 'root',
		type: 10,
		text: 'И',
		and: true,
		root: true,
		not: false,
		children: [],
	},
])

const isDrop = (e: any) => {
	if (e.data.type == 10) return true
	else return false
}
const isDrag = (e: any) => {
	if (e.data.root) return false
	return true
}

const remove = (e: any) => {
	tree.value.remove(e)
}

const clearAll = () => {
	let root = tree.value.getStat(treeData.value[0])
	let array: any[] = []
	root.children.forEach((item: any) => {
		array.push(item)
	})
	tree.value.removeMulti(array)
}

const addOper = () => {
	let item = {
		id: uid(),
		text: '',
		type: 10,
		and: true,
		children: [],
	}
	tree.value.add(item, tree.value.rootChildren[0], tree.value.rootChildren[0].children.length)
}
const addCond = () => {
	let item = {
		id: uid(),
		text: '',
		not: false,
		context: '',
		syn: false,
		keys1: [],
		keys2: [],
		channel: 'Все',
	}
	tree.value.add(item, tree.value.rootChildren[0], tree.value.rootChildren[0].children.length)
}
</script>

<style scoped lang="scss">
.empty {
	display: flex;
	align-items: center;
	width: 345px;
	text-align: center;
	color: $grey;
	margin-top: 2rem;
	margin-bottom: 2rem;
	gap: 1rem;
}
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
.node {
	display: flex;
	width: 100%;
	// height: 46px;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1px;
	.closing {
		margin-left: 0.25rem;
		margin-right: 0.25rem;
		visibility: hidden;
	}
	&:hover {
		.closing {
			visibility: visible;
		}
	}
}

:deep(.drag-placeholder) {
	height: 58px;
	border-radius: 0.25rem;
}

:deep(.tree-hline) {
	width: 30px;
}
</style>
