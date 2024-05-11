<script setup lang="ts">
import { ref } from 'vue'
import { widgets } from '@/stores/widgets'

const treeData = ref(widgets)
const expanded = ref(['ready', 'types', 'data'])

const query = ref('')

const startDrag = (evt: DragEvent, item: Widget) => {
	// console.log(item)
	// evt.dataTransfer.dropEffect = 'copy'
	// evt.dataTransfer.effectAllowed = 'copy'
	evt.dataTransfer!.setData('item', JSON.stringify(item))
	console.log(item)
}
</script>

<template lang="pug">
q-input(dense debounce="0" color="primary" v-model="query" clearable)
	template(v-slot:prepend)
		q-icon(name="mdi-magnify" )

q-tree(ref="tree"
	:nodes="treeData"
	:filter="query"
	label-key="text"
	dense
	node-key="id"
	v-model:expanded="expanded"
	icon="mdi-chevron-right")

	template(v-slot:default-header="prop")
		.wnode(:draggable="prop.node.drag" @dragstart="startDrag($event, prop.node)")
			q-icon.q-mr-sm(v-if="prop.node.icon" :name="prop.node.icon" size="18px")
			label {{ prop.node.text }}
</template>

<style scoped lang="scss">
.wnode {
	width: 100%;
	padding: 2px 6px;
	cursor: pointer;
	font-size: 0.9rem;
	background: transparent;
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	.q-icon {
		margin-bottom: 3px;
	}
	&:active {
		background: white;
	}
}
:deep(.q-tree__arrow) {
	font-size: 19px;
	color: #666;
}
</style>
