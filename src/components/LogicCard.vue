<template lang="pug">
.q-ml-md
	.q-mt-lg
	q-card
		q-card-section
			.row.items-center.justify-between
				q-btn(flat round dense @click="switchSidebar")
					q-icon(name="mdi-forwardburger" v-if="props.splitter === 0")
					q-icon(name="mdi-backburger" v-else)
				#zg(contenteditable @blur="update") {{ mystore.activeLogic.label }}
				.btngroup
					q-btn(outline size="10px" color="primary" @click="mystore.duble").q-mr-xs Дублировать
					q-btn(round flat icon="mdi-plus" dense color="primary" @click="mystore.addLogic")
			#comment(contenteditable @blur="updatecomment") {{mystore.activeLogic.comment}}

			Puzzle

			.row.items-center.justify-between.q-mt-xl
				q-btn(flat icon="mdi-trash-can-outline" label="Удалить запрос" color="primary")
					q-menu(anchor="bottom right" self="top right")
						q-list
							q-item(clickable @click="mystore.deleteLogic" v-close-popup).pink
								q-item-section Удалить
				div
					q-btn(flat icon="mdi-share-variant" label="Поделиться" color="primary" @click="dialog = !dialog")
					q-btn(unelevated color="primary" icon="mdi-content-save-outline" label="Сохранить" @click="save")
	br
	br
	br
	br

	q-dialog(v-model="dialog")
		q-card
			q-card-section lkaj
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useLogic } from '@/stores/logic'
// import Board from '@/components/Board.vue'
import Puzzle from '@/components/Puzzle.vue'

const mystore = useLogic()

const props = defineProps({
	splitter: Number,
})
const emit = defineEmits(['maximize', 'reset'])

const switchSidebar = () => {
	if (props.splitter !== 0) {
		emit('maximize')
	} else emit('reset')
}
const dialog = ref(false)
const update = () => {
	const zag = document.getElementById('zg')
	const text = zag!.innerHTML
	const index = mystore.allLogic.findIndex((item) => item.selected)
	mystore.allLogic[index].label = text
}
const updatecomment = () => {
	const comm = document.getElementById('comment')
	const text = comm!.innerHTML
	const index = mystore.allLogic.findIndex((item) => item.selected)
	mystore.allLogic[index].comment = text
}

const $q = useQuasar()
const save = () => {
	$q.notify({
		icon: undefined,
		message: 'Запрос сохранен',
		color: 'positive',
		position: 'top-right',
	})
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/myvariables.scss';
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
</style>
