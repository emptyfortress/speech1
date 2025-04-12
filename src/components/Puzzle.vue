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
		:root-droppable="false"
		class='mtl-tree'
		)

		template(#default="{ node, stat }")
			.node
				TreeItem(:stat='stat')
				q-btn.close(dense flat round icon="mdi-close" size='sm' @click='remove(stat)') 


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
		children: [
			{
				id: uid(),
				text: 'laksjdlak',
			},
		],
	},
])

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
	padding-right: 0.5rem;
}
.kill {
	width: 900px;
	margin: 0 auto;
	margin-top: 2rem;
}
</style>
