<script setup lang="ts">
import { ref } from 'vue';
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

const emit = defineEmits(['addVeh'])
const save = () => {
	logic.inception = false
	const tmp = {
		text: logic.currentLogic.label,
		group: false,
		drag: true,
		drop: false,
	}
	emit('addVeh', tmp)
	// tmp.label = logic.currentLogic.label
	// tmp.comment = logic.currentLogic.comment
	// tmp.star = false
	// tmp.selected = false
	// check.addNewCheckList(tmp)

	$q.notify({
		icon: undefined,
		message: 'Сохранено',
		color: 'positive',
		position: 'top-right',
	})
}
const tabs = ref('logic')
const gptRequest = ref()
</script>

<template lang="pug">
q-dialog(v-model="logic.inception")
	q-card
		q-card-section
			q-btn.close(icon="mdi-close" round dense v-close-popup color="negative")
			#zg1(contenteditable @blur="update") {{ logic.currentLogic.label }}
			.q-mx-lg
				#comment1(contenteditable @blur="updatecomment") {{ logic.currentLogic.comment }}
			.row.justify-between
				q-tabs(v-model="tabs" indicator-color="primary" active-color="primary" dense align="left")
					q-tab(name="logic" label="Конструктор запросов")
					q-tab(name="gpt" label="Запрос на естественном языке")

			q-tab-panels(v-model="tabs")
				q-tab-panel(name="logic")
					component(:is="Puzzle")
				q-tab-panel(name="gpt")
					q-input(v-model="gptRequest" type='textarea' filled placeholder="Расскажите, что Вас интересует")

		q-card-section
			.bottom
				.experiment
					q-icon.q-mr-sm(name="mdi-information" color="primary" size="24px")
					span Вы можете использовать конктруктор логических запросов или искусственный интеллект. Выберите типа запроса, заполните детали и сохраните его. При дальнейшем анализе будет использован выбранный Вами тип запроса.
				.text-right
					q-btn(flat label="Отмена" color="primary" v-close-popup)
					q-btn(unelevated color="primary" icon="mdi-content-save-outline" label="Сохранить" @click="save")
		
</template>

<style scoped lang="scss">
@import '@/assets/styles/myvariables.scss';

.q-dialog__inner--minimized>div {
	min-width: 70%;
}

#zg1 {
	font-size: 1rem;
	text-transform: uppercase;
	font-weight: 600;
	padding: 0.5rem;
	padding-bottom: 0;
	text-align: center;

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
	// margin-top: 1rem;
	padding: 0.5rem;
	padding-bottom: 0;
	margin-bottom: 1rem;

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

.experiment {
	font-size: .8rem;
}

.bottom {
	display: grid;
	grid-template-columns: 1fr 300px;
	column-gap: 1rem;
}

:deep(.q-badge) {
	transform: translateY(-7px);
	font-size: .8rem;
}
</style>
