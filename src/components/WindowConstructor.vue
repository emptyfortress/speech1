<script setup lang="ts">
import { useLogic } from '@/stores/logic'
import { useCheck } from '@/stores/check'
import { useQuasar } from 'quasar'
import Puzzle from '@/components/Puzzle.vue'

const logic = useLogic()
const check = useCheck()

const update = () => {
	const zag = document.getElementById('zg1')
	const text = zag!.innerHTML
	logic.currentLogic.label = text
	// const index = check.allList[0].list.findIndex((item) => item.label === logic.currentLogic.label)
	// check.allList[0].list[index].label = text
}
const updatecomment = () => {
	const comm = document.getElementById('comment1')
	const text = comm!.innerHTML
	logic.currentLogic.comment = text
	// const index = logic.allLogic.findIndex((item) => item.selected)
	// logic.allLogic[index].comment = text
}

const $q = useQuasar()

const save = () => {
	logic.inception = false
	const tmp = {} as Logic
	tmp.label = logic.currentLogic.label
	tmp.comment = logic.currentLogic.comment
	tmp.star = false
	tmp.selected = false
	check.addNewCheckList(tmp)
	$q.notify({
		icon: undefined,
		message: 'Сохранено',
		color: 'positive',
		position: 'top-right',
	})
}
</script>

<template lang="pug">
q-dialog(v-model="logic.inception")
	q-card
		q-card-section.row.items-baseline.q-pb-none
			q-space
			#zg1(contenteditable @blur="update") {{ logic.currentLogic.label }}
			q-space
			q-btn(icon="mdi-close" flat round dense v-close-popup)

		.q-mt-sm.q-mx-lg
			#comment1(contenteditable @blur="updatecomment") {{logic.currentLogic.comment}}

		q-card-section
			component(:is="Puzzle")

		q-card-section
			q-card-actions(align="right")
				q-btn(flat label="Отмена" color="primary" v-close-popup)
				q-btn(unelevated color="primary" icon="mdi-content-save-outline" label="Применить" @click="save")
		
</template>

<style scoped lang="scss">
@import '@/assets/styles/myvariables.scss';
.q-dialog__inner--minimized > div {
	min-width: 70%;
}
#zg1 {
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
#comment1 {
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
</style>
