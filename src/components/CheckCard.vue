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
							span {{ node.text }}
						q-btn(flat round icon="mdi-trash-can-outline" size='12px' dense @click="action") 

					.list-item(v-if='!node.group')
						.label
							q-icon(name="mdi-toy-brick-search-outline")
							span(class="mtl-ml") {{ node.text }}
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
			q-form.quick
				q-card-section.q-pt-xs
					q-input(dense
						v-model="query"
						clearable
						@clear="clearFilter"
						placeholder="фильтр"
						).query
						template(v-slot:prepend)
							q-icon(name="mdi-magnify")
				q-expansion-item(v-model="firstItem" header-class="text-bold")
					template(v-slot:header)
						q-item-section Логические запросы
						q-item-section(side) ({{ mylogic.allLogic.length }})
					q-list(dense).q-mb-lg
						component(:is="draggable" v-model="alllogic"  itemKey="id"  :group="{ name: 'vehi', pull: 'clone', put: false }")
							template(#item="{ element }")
								q-item(tag="label" v-ripple dense)
									q-item-section(side v-if="element.star")
										q-icon(dense name="mdi-star" size="10px")
									q-item-section(side v-else)
										q-icon(dense name="" size="10px")
									q-item-section
										q-item-label
											WordHighlighter(:query="query") {{ element.label }}

	VehConstructor
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'
import { ref, computed } from 'vue'
import { useCheck } from '@/stores/check'
import { useLogic } from '@/stores/logic'
import WordHighlighter from 'vue-word-highlighter'
import VehConstructor from '@/components/VehConstructor.vue'

import { Draggable, OpenIcon } from '@he-tree/vue'
import '@he-tree/vue/style/default.css'
import '@he-tree/vue/style/material-design.css'

const splitterModel = ref(65)
const hei = computed(() => {
	return 'height: ' + (window.innerHeight - 205) + 'px;'
})
const firstItem = ref(true)

const mylogic = useLogic()
const mycheck = useCheck()
const query = ref('')

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
				text: 'Приветствие',
				group: false,
				drag: true,
				drop: false,
			},
			{
				text: 'Прощание',
				group: false,
				drag: true,
				drop: false,
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

const isDrop = (e: any) => {
	if (e.data.drop) return true
	else return false
}
const isDrag = (e: any) => {
	if (e.data.drag) return true
	else return false
}

const clearFilter = () => {
	query.value = ''
}

const alllogic = computed({
	get: () => {
		if (query.value) {
			return mylogic.allLogic.filter((e) =>
				e.label.toLowerCase().includes(query.value.toLowerCase())
			)
		} else return mylogic.allLogic
	},
	set: (val) => mylogic.updateLogicList(val),
})

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
</script>

<style scoped lang="scss">
@import '@/assets/styles/myvariables.scss';

.quick .q-field--dense .q-field__control,
.q-field--dense .q-field__marginal {
	height: 28px !important;
}

.query {
	font-size: 1rem;
	flex-grow: 1;
}

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
	grid-template-columns: 1fr 90px auto auto;
	align-items: center;

	&:hover {
		border: 2px solid $primary;
	}
}

:deep(.mtl-tree .tree-node:hover) {
	background: transparent;
}

:deep(.drag-placeholder) {
	background: hsl(200 35% 84% / 1);
	min-height: 48px;
	border: 2px solid #fff;
	border-radius: 0.5rem;
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
