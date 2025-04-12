<template lang="pug">
.kill
	// .empty()
	// 	q-icon(name="mdi-face-man" color="grey" size='lg')
	// 	div Запрос не настроен.
	//
	// .q-gutter-x-xs.q-mt-md
	// 	q-btn(outline color="primary" icon='mdi-gate-and' label="Добавить оператор" @click="" size='sm') 
	// 	q-btn(outline color="primary" icon='mdi-crosshairs-question' label="Добавить условие" @click="" size='sm') 
	// 	q-btn(outline color="negative" icon='mdi-backspace-outline' label="Очистить все" @click="" size='sm') 


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
				q-btn.close(v-if='!node.root' dense flat round color="negative" icon="mdi-close" size='sm' @click='remove(stat)') 

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
		children: [
			{
				id: uid(),
				text: 'one',
				not: false,
				context: '',
				syn: false,
				keys1: [],
				keys2: [],
				channel: 'Все',
			},
			{
				id: uid(),
				text: 'two',
				not: true,
				context: '',
				syn: false,
				keys1: [],
				keys2: [],
				channel: 'Все',
			},
			{
				id: uid(),
				text: 'three',
				not: false,
				context: '',
				syn: false,
				keys1: [],
				keys2: [],
				channel: 'Все',
			},
		],
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
</script>

<style scoped lang="scss">
.empty {
	width: 345px;
	text-align: center;
	color: $grey;
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
	.close {
		margin-left: 0.25rem;
		margin-right: 0.25rem;
		visibility: hidden;
	}
	&:hover {
		.close {
			visibility: visible;
		}
	}
}
.kill {
	width: 900px;
	margin: 0 auto;
	margin-top: 2rem;
}

:deep(.drag-placeholder) {
	height: 58px;
	border-radius: 0.25rem;
}

:deep(.tree-hline) {
	width: 30px;
}
</style>
