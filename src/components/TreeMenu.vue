<template lang="pug">
q-menu(context-menu)
	q-list
		q-item(v-for="item in menu" :key="item.id" clickable v-close-popup @click="action(item)" :class="item.className")
			q-item-section(avatar)
				q-icon(:name="item.icon")
			q-item-section
				q-item-label {{item.label}}
</template>

<script setup lang="ts">
const props = defineProps<{
	node: {
		id: String
		label: String
		typ: Number
	}
}>()

const emit = defineEmits(['addOp', 'addCond', 'kill', 'cut', 'paste'])

const calcClass = (e: number) => {
	if (props.node?.typ === 2 && e === 0) {
		return 'disab'
	} else if (props.node?.typ === 2 && e === 1) {
		return 'disab'
	} else if (props.node?.typ === 2 && e === 3) {
		return 'disab'
	} else return ''
}

const action = (item: any) => {
	if (props.node?.typ === 2 && item.id === 0) {
		return
	}
	if (props.node?.typ === 2 && item.id === 1) {
		return
	}
	if (props.node?.typ === 2 && item.id === 3) {
		return
	}
	return item.action()
}

const addOp = () => {
	emit('addOp')
}
const addCond = () => {
	emit('addCond')
}
const kill = () => {
	emit('kill')
}
const cut = () => {
	emit('cut')
}
const paste = () => {
	emit('paste')
}

const menu = [
	{
		id: 0,
		label: 'Добавить оператор',
		icon: 'mdi-gate-and',
		action: addOp,
		className: calcClass(0),
	},
	{
		id: 1,
		label: 'Добавить условие',
		icon: 'mdi-crosshairs-question',
		action: addCond,
		className: calcClass(1),
	},
	{ id: 2, label: 'Вырезать', icon: 'mdi-content-cut', action: cut },
	{ id: 3, label: 'Вставить', icon: 'mdi-content-paste', action: paste, className: calcClass(3) },
	{ id: 4, label: 'Удалить', icon: 'mdi-trash-can-outline', action: kill },
]
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
.q-item:last-child {
	border-top: 1px solid #ccc;
	color: darkred;
}
.disab {
	opacity: 0.5;
	cursor: not-allowed !important;
}
</style>
