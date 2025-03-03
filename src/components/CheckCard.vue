<template lang="pug">
q-splitter(v-model="splitterModel" :limits="[0, 100]" :style="hei")
	template(v-slot:before)
		q-card.card
			q-card-section.q-px-none
				.row.items-center.justify-between
					q-btn(flat round dense)
						q-icon(name="mdi-backburger")
					#zg(contenteditable @blur="update") {{ mycheck.activeCheck.label }}
					.btngroup
						q-btn(outline size="10px" color="primary" @click="mycheck.duble").q-mr-xs Дублировать
						q-btn(round flat icon="mdi-plus" dense color="primary" @click="mycheck.addCheckList")

				#comment(contenteditable @blur="updatecomment") {{ mycheck.activeCheck.comment }}

			Draggable(class="mtl-tree"
				ref='tree'
				v-model="treeData"
				treeLine
				:root-droppable="false"
				:eachDroppable='isDrop'
				:eachDraggable='isDrag'
				:onExternalDragOver='onExternalDragOver'
				:externalDataHandler='externalDataHandler'
				)
				template(#default="{ node, stat }")
					.list-group.root(v-if='node.root')
						OpenIcon.icon(
							v-if="stat.children.length"
							:open="stat.open"
							class="mtl-mr"
							@click.native="stat.open = !stat.open")
						span {{ mycheck.activeCheck.label }}

					.list-group(v-if='node.group && !node.root' @click.stop="stat.open = !stat.open")
						div
							OpenIcon.icon(
								v-if="stat.children.length"
								:open="stat.open"
								class="mtl-mr"
								@click.stop="stat.open = !stat.open")
							span(@click.stop) {{ node.text }}
								q-popup-edit(v-model="node.text" auto-save v-slot="scope")
									q-input(v-model="scope.value" dense autofocus counter @keyup.enter="scope.set")
						q-btn(flat round icon="mdi-trash-can-outline" size='12px' dense @click.stop) 
							q-menu(anchor="bottom right" self="top right")
								q-list
									q-item(clickable v-close-popup @click="kill(stat)").pink
										q-item-section Удалить

					.list-item(v-if='!node.group')
						.label
							q-icon(name="mdi-toy-brick-search-outline")
							span(class="mtl-ml") {{ node.text }}
						q-checkbox(v-model="node.crusial" dense label="Критично")
						.input
							.lab Вес:
							input(value="15")
						q-btn(flat round icon="mdi-pencil" size="12px" @click="edit(stat)")
						q-btn(flat round icon="mdi-trash-can-outline" size="12px")
							q-menu(anchor="bottom right" self="top right")
								q-list
									q-item(clickable v-close-popup @click="kill(stat)").pink
										q-item-section Удалить

			.q-gutter-x-sm.q-mt-lg
				q-btn(outline color="primary" size='sm' icon="mdi-plus" label="Добавить веху" @click="addNew") 
				q-btn(outline color="primary" size='sm' icon='mdi-playlist-plus' label="Добавить группу" @click="addGroup") 

			q-card-actions.q-mt-xl
				q-btn(flat icon="mdi-trash-can-outline" label="Удалить чеклист" color="primary")
					q-menu(anchor="bottom right" self="top right")
						q-list
							q-item(clickable v-close-popup  @click="mycheck.deleteCheckList").pink
								q-item-section Удалить
				q-space
				q-btn(flat icon="mdi-share-variant" label="Поделиться" color="primary" )
				q-btn(unelevated color="primary" icon="mdi-content-save-outline" label="Сохранить" )

	template(v-slot:after)
		q-scroll-area.list
			LogicRequestList


	VehConstructor(@add-veh="addItem")
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCheck } from '@/stores/check'
import { useLogic } from '@/stores/logic'
import VehConstructor from '@/components/VehConstructor.vue'
import LogicRequestList from '@/components/LogicRequestList.vue'

import { Draggable, OpenIcon, dragContext } from '@he-tree/vue'
import '@he-tree/vue/style/default.css'
import '@he-tree/vue/style/material-design.css'

const splitterModel = ref(65)
const hei = computed(() => {
	return 'height: ' + (window.innerHeight - 205) + 'px;'
})

const mylogic = useLogic()
const mycheck = useCheck()

const tree = ref()

const treeData = ref([

	{
		text: 'Приветствие и прощание',
		group: true,
		drag: false,
		drop: true,
		root: true,
		children: [
			{
				text: 'Общая вежливость',
				group: true,
				drag: true,
				drop: true,
				children: [
					{
						text: 'Приветствие',
						group: false,
						drag: true,
						drop: false,
						crusial: false,
					},
					{
						text: 'Прощание',
						group: false,
						drag: true,
						drop: false,
						crusial: false,
					},
				]
			},
		]
	}
])

const addGroup = (() => {
	tree.value.add({
		text: 'Группа',
		group: true,
		drag: true,
		drop: true,
		children: [],
	},
		tree.value.getStat(treeData.value[0])
	)
})

const addItem = ((e: any) => {
	tree.value.add(e, tree.value.getStat(treeData.value[0])
	)
})

const isDrop = (e: any) => {
	if (e.data.root && dragContext.dragNode?.data.group) return true
	if (e.data.group && !e.data.root && !dragContext.dragNode?.data.group) return true
	else return false
}
const isDrag = (e: any) => {
	if (e.data.drag) return true
	else return false
}



const update = () => {
	const zag = document.getElementById('zg')
	const text = zag!.innerHTML
	const index = mycheck.allCheck.findIndex((item) => item.selected)
	mycheck.allCheck[index].label = text
}

const updatecomment = () => {
	const comm = document.getElementById('comment')
	const text = comm!.innerHTML
	const index = mycheck.allCheck.findIndex((item) => item.selected)
	mycheck.allCheck[index].comment = text
}

const kill = (e: any) => {
	tree.value.remove(e)
}
const edit = (e: Logic) => {
	mylogic.showInception()
	mylogic.currentLogic = e
}

const addNew = () => {
	mylogic.showInception()
	mylogic.currentLogic = {
		id: 9,
		label: 'Новая веха',
		selected: false,
		comment: 'Это комментарий',
		star: false,
	}
}

const onExternalDragOver = (() => {
	return true
})
const externalDataHandler = (() => {
	return ({
		text: mylogic.draggedLogic?.label,
		group: false,
		drop: false,
		drag: true,
	})
})
const crusial = ref(true)
</script>

<style scoped lang="scss">
@import '@/assets/styles/myvariables.scss';

.list {
	padding: 0.5rem;
	margin-right: 0.5rem;
	height: calc(100vh - 205px);
	font-size: 0.9rem;
}

.card {
	margin-top: 1rem;
	margin-left: 0.5rem;
	margin-right: 0.5rem;
	background: #fff;
	padding: 1rem;
	min-height: 200px;
	padding-top: 0;
}

#zg {
	font-size: 1rem;
	text-transform: uppercase;
	font-weight: 600;
	padding: 0.5rem;
	padding-bottom: 0;

	&:hover {
		background: $bgLight;
	}

	&:focus {
		outline: none;
		border-bottom: 1px dotted $primary;
		background: $bgSelection;
	}
}

#comment {
	font-size: 0.9rem;
	margin-top: 1rem;
	padding: 0.5rem;
	padding-bottom: 0;

	&:hover {
		background: $bgLight;
	}

	&:focus {
		outline: none;
		border-bottom: 1px dotted $primary;
		background: $bgSelection;
	}
}

.list-group {
	font-size: 1.0rem;
	font-weight: 600;
	width: 100%;
	min-height: 34px;
	line-height: 34px;
	padding-right: .8rem;
	display: grid;
	grid-template-columns: 1fr auto;
	align-items: center;

	.q-btn {
		display: none;
	}

	&:hover {
		background: #efefef;

		.q-btn {
			display: block;
		}
	}

	&.root {
		display: block;
	}

}

.list-item {
	width: 100%;
	border: 2px solid #ccc;
	border-radius: 0.5rem;
	background: #f2f3ef;
	padding: 4px 0.5rem;
	min-height: 42px;
	margin-bottom: 0.25rem;
	display: grid;
	grid-template-columns: 1fr 120px 90px auto auto;
	align-items: center;

	&:hover {
		border: 2px solid $primary;
	}
}

:deep(.mtl-tree .tree-node:hover) {
	background: transparent;
}

:deep(.drag-placeholder) {
	min-height: 48px;
	border-radius: 0.5rem;
	margin-bottom: .25rem;
}

.input {
	display: flex;
	align-items: center;
	gap: 0.5rem;

	input {
		width: 40px;
		border: 1px solid #ccc;
		text-align: center;
	}
}


.icon {
	font-size: 1.4rem;
	transform: translateY(4px);

	&.open {
		transform: rotate(90deg) translateY(4px);
	}
}

.label .q-icon {
	font-size: 1.3rem;
	margin-right: .5rem;
}
</style>
