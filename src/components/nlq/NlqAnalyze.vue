<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import ChooseRecordDialog from '@/components/nlq/ChooseRecordDialog.vue'

const loading = ref(false)
const result = ref(true)
const place = ref('Вопрос на естественном языке')

// const ask = () => {
// 	loading.value = true
// 	setTimeout(() => {
// 		loading.value = false
// 		result.value = true
// 		query.value = ''
// 		place.value = 'Вы можете уточнить вопрос.'
// 	}, 2000)
// }
const query = ref('')

const presearch = ref(true)

const action1 = (e: string) => {
	query.value = e
	// presearch.value = false
}
const questions = [
	{text: 'был ли оператор вежлив?'},
	{text: 'клиент раздражен и хамил?'},
	{text: 'предложены ли доп.услуги?'},
]
const dialog = ref(false)
const record = ref(false)
const selection = ref()

const setRecord = ((e: any) => {
	record.value = true
	selection.value = e

})
</script>

<template lang="pug">
q-card-section
	q-linear-progress(indeterminate color="accent" v-if='loading')

	q-btn(unelevated color="primary" label="Выбрать запись для оценки" @click="dialog = !dialog") 

.myplayer(v-if="record")
	q-linear-progress(:value=".6" color="positive")
	q-btn(flat round size="sm")
		q-icon(name="mdi-star" color="primary")
	q-btn(flat round size="sm")
		q-icon(v-if="props.row.comment" name="mdi-comment-text-outline" color="primary")
		q-icon(v-else name="mdi-comment-plus-outline" color="grey" )
		q-tooltip.bg-primary(v-if="props.row.comment" anchor="top middle" self="bottom middle" max-width="150px" :offset="[7, 7]") {{ props.row.comment }}
	div(v-if="!mystore.wide") {{ props.row.date }}
	div(v-if="!mystore.wide") {{ props.row.operator }}
	.player
		q-btn(round flat icon="mdi-rewind" @click.stop)
		q-btn(round flat icon="mdi-pause" @click.stop)
		q-btn(round flat icon="mdi-fast-forward" @click.stop)
	.time 02:31
	.row.items-center
		q-icon(name="mdi-volume-medium" size="sm")
		q-slider.slide(color="primary" v-model="sound")
		q-icon(name="mdi-volume-high" size="sm")


	.record(v-if='record')
		pre {{ selection }}
	br
	br
	.grid
		div
			.input
				q-input(v-model="query" type='textarea' outlined autogrow class="bg-white" :placeholder='place')
				.filt
					q-btn(icon='mdi-content-save-outline' label="Сохранить" size='sm' flat) 

					// q-btn(flat icon='mdi-tag-outline' label="Контекст" size='sm') 

			.search
				.txt Вы всегда сможете дополнить и уточнить свой вопрос.
				q-btn(unelevated color="primary" label='Оценить' @click="") 

		div(v-if='presearch')
			.example(v-for="item in questions" @click='action1(item.text)')
				q-icon(name="mdi-lightbulb-outline")
				|{{ item.text }}

		div(v-else)
			q-chip(v-for="chip in times" clickable v-model:selected='chip.selected' :key='chip.label' @click='select(chip)') {{ chip.label }}
			q-btn(flat color="primary" icon='mdi-calendar' label="Задать диапазон" size='sm') 

ChooseRecordDialog(v-model="dialog" @choose='setRecord')
</template>

<style scoped lang="scss">
.grid {
	display: grid;
	grid-template-columns: 2fr 1fr;
	// justify-items: start;
	// align-items: stretch;
	column-gap: 1rem;
	row-gap: 0.5rem;
}
.example {
	padding: 0.3rem 1rem;
	border: 1px solid #ccc;
	font-size: 0.9rem;
	margin-bottom: 4px;
	line-height: 1.2;
	cursor: pointer;
	.q-icon {
		margin-right: 0.5rem;
	}
	&:hover {
		border-color: $primary;
		background: #e4e3e3;
	}
}
.input {
	position: relative;
	.filt {
		position: absolute;
		bottom: 4px;
		left: 4px;
	}
}
:deep(.q-textarea .q-field__native) {
	padding-top: 0.5rem;
	padding-bottom: 1.5rem;
	font-size: 1rem;
	min-height: 100px;
}
.search {
	margin-top: 0.5rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 0.9rem;
}
.focus {
	max-width: 600px;
}
.result {
	margin-bottom: 1rem;
	padding: 1rem;
	font-size: 0.8rem;
}
.found {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.resgrid {
	display: grid;
	grid-template-columns: repeat(3, 300px);
	justify-items: start;
	align-items: start;
	column-gap: 1rem;
	row-gap: 0.5rem;
	.res {
		width: 100%;
		// height: 200px;
		border: 1px solid #ccc;
	}
}
.pad {
	padding: 0.5rem;
	.hd {
		font-size: 1rem;
		font-weight: 600;
	}
	.gr {
		display: grid;
		grid-template-columns: auto 1fr;
		column-gap: 0.5rem;
	}
}
.summary {
	margin-bottom: 1rem;
	margin-left: 0.5rem;
	font-size: 0.9rem;
	.hd {
		font-weight: 600;
		font-size: 0.9rem;
	}
}
</style>
