<template lang="pug">
q-splitter(v-model="splitterModel" :limits="[0, 100]" :style="hei")
	template(v-slot:before)
		q-card.card
			q-card-section.q-px-none
				.row.items-center.justify-between
					q-btn(flat round dense)
						q-icon(name="mdi-backburger")
					#zg(contenteditable @blur="update") {{mycheck.activeCheck.label}}
					.btngroup
						q-btn(outline size="10px" color="primary" @click="mycheck.duble").q-mr-xs Дублировать
						q-btn(round flat icon="mdi-plus" dense color="primary" @click="mycheck.addCheckList")
				#comment(contenteditable @blur="updatecomment") {{mycheck.activeCheck.comment}}
			component(:is="draggable" class="list-group" :list="list1" group="vehi" itemKey="id")
				template(#item="{ element }")
					.list-group-item
						.label
							q-icon(name="mdi-toy-brick-search-outline").q-mr-sm
							|{{ element.label }}
						.input
							.lab Вес:
							input(value="15")
						q-btn(flat round icon="mdi-pencil" size="12px" @click="edit(element)")
						q-btn(flat round icon="mdi-trash-can-outline" size="12px")
							q-menu(anchor="bottom right" self="top right")
								q-list
									q-item(clickable v-close-popup @click="kill(element)").pink
										q-item-section Удалить

			.place(@click="addNew") Кликните, чтобы добавить веху.<br /> Или перетащите логический запрос в очередь вверху.
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
						q-item-section(side) ({{mylogic.allLogic.length}})
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

</template>

<script setup lang="ts">
import draggable from 'vuedraggable'
import { ref, computed } from 'vue'
import { useCheck } from '@/stores/check'
import { useLogic } from '@/stores/logic'
import WordHighlighter from 'vue-word-highlighter'

const splitterModel = ref(65)
const hei = computed(() => {
	return 'height: ' + (window.innerHeight - 205) + 'px;'
})
const firstItem = ref(true)

const mylogic = useLogic()
const mycheck = useCheck()
const query = ref('')

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

const itemIndex = (e: Logic) => {
	return list1.value.findIndex((item) => item.id === e.id)
}

const list1 = computed(() => {
	const id = mycheck.activeCheck.id
	const temp = mycheck.allList.find((e) => e.id === id)
	return temp!.list
})
const kill = (e: Logic) => {
	let index = itemIndex(e)
	list1.value.splice(index, 1)
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
	.place {
		margin-top: 1rem;
		color: #999;
		width: 100%;
		border: 2px solid $bgLight;
		border-radius: 6px;
		background: $bgLight;
		text-align: center;
		padding: 0.5rem;
		&:hover {
			border: 2px dotted #aaa;
		}
	}
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
	/* text-align: center; */
	&:hover {
		background: $bgLight;
	}
	&:focus {
		outline: none;
		border-bottom: 1px dotted $primary;
		background: $bgSelection;
	}
}
.sortable-ghost {
	background: $bgSelection;
	border: 1px solid $primary;
}
.list-group {
	min-height: 50px;
	background-image: url(@/assets/img/vert.png);
	background-repeat: repeat-y;
	background-position-x: 48px;
}
.list-group-item {
	width: 100%;
	border: 2px solid #ccc;
	border-radius: 0.5rem;
	background: #f2f3ef;
	padding: 0.5rem;
	min-height: 50px;
	margin-bottom: 0.5rem;
	display: grid;
	grid-template-columns: 1fr 90px auto auto;
	gap: 0.5rem;
	align-items: center;
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
</style>
