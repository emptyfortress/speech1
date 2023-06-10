<template lang="pug">
q-splitter(v-model="split2" :limits="[30, 80]" :style="hei")
	template(v-slot:before)
		.related
			.my-h6
				q-breadcrumbs
					q-breadcrumbs-el(v-for="bread in props.selectedItem.breads" :label="bread")
					q-breadcrumbs-el(:label="props.selectedItem.label")
			q-list().q-mt-md
				q-item(clickable dense v-for="(item, index) in props.selectedItem.children" :key="item.id" @click="select(item.id)").nohov
					q-item-section(avatar)
						q-icon(name="mdi-menu-right" size="sm")
					q-item-section
						q-item-label
							|{{item.label}}
						q-popup-edit(v-model="item.label" auto-save v-slot="scope" :ref="(el: any) => {editNode[index] = el}" )
							q-input(v-model="scope.value" dense autofocus counter @keyup.enter="scope.set")
					q-item-section(side).hove
						q-btn(round flat dense icon="mdi-pencil" size="11px" @click.stop="editItem(index)")
						q-btn(round flat dense icon="mdi-trash-can-outline" size="11px" @click.stop="killItem(item)")
				q-separator.q-my-sm

				q-item(clickable v-if="props.selectedItem.level < 3" v-click-away="addModeOff")
					q-item-section(avatar)
						q-icon(name="mdi-plus-circle" color="primary" size="sm" :class="{'rot' : addMode}" @click.stop="addMode = !addMode")
					q-item-section
						q-item-label(v-if="!addMode" @click.stop="addMode = !addMode") Добавить
						.inlineAdd(v-else)
							q-input(autofocus v-model="newItem" dense ref="addInput" @keyup.enter="submit").smallinput
							q-btn(round unelevated color="positive" icon="mdi-check" dense size="sm" @click.stop="addItem" :disable="newItem.length < 3")


			q-card(v-if="props.selectedItem.level === 3").sub
				component(:is="draggable" class="list-group" :list="props.selectedItem.childs" group="subcat" itemKey="id")
					template(#header)
						div
							.list
								.podzag Словарь, слово, логический запрос
							.empty(v-if="props.selectedItem.childs?.length === 0") Раздел не настроен.
					template(#item="{ element, index }")
						.list.item
							component(:is="SvgIcon" name="vocabulary" v-if="element.voc").small.q-mr-sm
							q-icon(name="mdi-toy-brick-search-outline" v-if="!element.score" size="18px").q-mr-sm
							|{{element.label}}
							q-icon(name="mdi-trash-can-outline" size="xs" @click="killVoc(index)").del

	template(v-slot:after)
		.right
			q-tabs(v-model="tabs" inline-label indicator-color="primary" no-caps dense align="left")
				q-tab(name="Voc")
					component(:is="SvgIcon" name="vocabulary").vocicon
					|Словари
				q-tab(name="Rec")
					q-icon(name="mdi-toy-brick-search-outline" size="20px")
					span.q-mx-sm Запросы
					q-badge(color="green" label="New!")
			q-tab-panels(v-model="tabs" animated).cool
				q-tab-panel(name="Voc")
					q-scroll-area(:style="hei1")
						component(:is="KeywordList")
				q-tab-panel(name="Rec")
					q-scroll-area(:style="hei1")
						component(:is="LogicList1")
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import draggable from 'vuedraggable'
import { useCat } from '@/stores/category1'
import SvgIcon from '@/components/SvgIcon.vue'
import KeywordList from '@/components/KeywordList.vue'
import LogicList1 from '@/components/LogicList1.vue'
import { useQuasar } from 'quasar'
import { uid } from 'quasar'
import type { Ref } from 'vue'

const props = defineProps<{
	selectedItem: Category
}>()

const emit = defineEmits(['select'])

const cat = useCat()
const $q = useQuasar()
const split2 = ref(60)

const tabs = ref('Voc')
const cli = ref(true)

const hei = computed(() => {
	return 'height: ' + (window.innerHeight - 190) + 'px;'
})
const hei1 = computed(() => {
	return 'height: ' + (window.innerHeight - 265) + 'px;'
})
const show = () => {
	$q.notify({
		icon: 'mdi-heart',
		message: 'Спасибо! Ваш голос учтен.',
	})
	cli.value = !cli.value
}
const select = (e: string) => {
	emit('select', e)
}

const addMode = ref(false)
const newItem = ref('')
const addInput = ref()

const addItem = () => {
	const current = props.selectedItem
	let temp = {
		id: uid(),
		label: newItem.value,
		level: current.level + 1,
		breads: current.breads,
		children: [],
		childs: [],
	}
	temp.breads?.push(current.label)
	cat.addCategory(temp, props.selectedItem.id)
	newItem.value = ''
	addInput.value.focus()
}

const submit = () => {
	if (newItem.value.length > 2) {
		addItem()
	}
}

const addModeOff = () => {
	addMode.value = false
}

const killItem = (e: Category) => {
	cat.killNode(e.id)
	$q.notify({
		message: `${e.label} - удалено`,
		color: 'negative',
	})
}
const killVoc = (e: number) => {
	props.selectedItem.childs?.splice(e, 1)
}

const editNode: Ref<any[]> = ref([])

const editItem = (e: number) => {
	editNode.value[e].show()
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/myvariables.scss';

.right {
	padding-left: 0.5rem;
}
.cool {
	background: transparent;
	box-shadow: none;
	margin-top: 0;
}
.podzag {
	padding-left: 1.2rem;
	font-size: 0.75rem;
	letter-spacing: 1px;
	color: grey;
	border-bottom: 1px solid #ccc;
}
.list {
	// display: grid;
	// grid-template-columns: 1fr 1fr;
	// column-gap: 2rem;
	position: relative;
	&.item {
		padding: 0.5rem 1rem;
		background: #fff;
		cursor: pointer;
	}
	&:hover {
		background: #efefef;
		.del {
			display: block;
		}
	}
	.del {
		position: absolute;
		right: 6px;
		top: 10px;
		display: none;
	}
}
.list-group:empty {
	padding-bottom: 3rem;
}
.empty {
	background: $bgMain;
	padding: 0.5rem 1rem;
	font-size: 0.9rem;
	font-style: italic;
	color: #999;
	border: 1px solid #ccc;
	margin-top: 0.5rem;
}
.related {
	// position: relative;
	margin: 0 0.5rem;
	// height: 100%;
}
.sub {
	padding: 1rem;
}
.grid {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	// flex-wrap: wrap;
	& > div {
		font-size: 0.9rem;
		padding: 0.5rem 1rem;
		cursor: pointer;
		border: 1px solid transparent;
		&:hover {
			border: 1px solid #cdcdcd;
		}
	}
}
.nohov {
	.hove {
		display: none;
	}
	&:hover {
		.hove {
			display: block;
		}
	}
}
.fab1 {
	position: absolute;
	bottom: 0.8rem;
	left: 0;
	z-index: 10;
}
.ccc {
	position: absolute;
	bottom: 0.5rem;
	left: 0;
	background: $primary;
	color: white;
	width: 250px;
	z-index: 10;
	border-bottom-left-radius: 1.5rem;
	.sub {
		padding: 1rem;
	}
}
.inlineAdd {
	display: flex;
	justify-content: flex-start;
	align-items: center;
}
.smallinput {
	margin-top: -9px;
}
.my-h6 {
	font-size: 1.1rem;
}
.small {
	font-size: 0.7rem;
}
.vocicon {
	font-size: 13px;
	margin-right: 0.5rem;
}
</style>
