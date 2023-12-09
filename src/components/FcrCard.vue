<template lang="pug">
.q-ml-md
	.q-mt-lg
	q-card
		q-card-section
			.row.items-center.justify-center
				#zg(contenteditable @blur="update") Настройки First Call Resolution
			.rowline
				q-checkbox(v-model="rep") Звонки клиента от:
				q-input.small(dense v-model="repNum" outlined bg-color="white" type="number" min="1")
				div раз
				q-select(dense v-model="timeFrame" outlined bg-color="white" :options="options")

			q-checkbox(v-model="contain") Содержат фразы, удовлетворяющие запросу:
			br
			br
			FcrTree()

			q-card-actions.q-mt-md(align="right")
				q-btn(flat icon="mdi-share-variant" label="Поделиться" color="primary" @click="dialog = !dialog")
				q-btn(unelevated color="primary" icon="mdi-content-save-outline" label="Сохранить" @click="save")
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar'
import { useLogic } from '@/stores/logic'
// import Board from '@/components/Board.vue'
import FcrTree from '@/components/FcrTree.vue'

const emit = defineEmits(['maximize', 'reset'])

const dialog = ref(false)
const $q = useQuasar()
const save = () => {
	$q.notify({
		icon: undefined,
		message: 'Запрос сохранен',
		color: 'positive',
		position: 'top-right',
	})
}
const rep = ref(true)
const repNum = ref(2)
const timeFrame = ref('в день')
const options = ['в час', 'в день', 'в неделю']
const contain = ref(true)
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
.rowline {
	margin-top: 2rem;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	gap: 1rem;
	.q-select {
		transform: translateY(-5px);
	}
}
.q-input {
	transform: translateY(-7px);
	width: 230px;
	&.small {
		width: 70px;
	}
}
</style>
