<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

const focus = reactive([
	{ label: 'Звонки', selected: false },
	{ label: 'Записи', selected: false },
	{ label: 'Операторы', selected: false },
	{ label: 'Продажи', selected: false },
	{ label: 'Отчеты', selected: false },
	{ label: 'Анкеты', selected: false },
])

const focusFlat = computed(() => {
	return focus.filter((el) => el.selected).length > 0 ? false : true
})
const colorFlat = computed(() => {
	return focusFlat.value ? '' : 'primary'
})
const loading = ref(false)
const result = ref(true)
const ask = () => {
	loading.value = true
	setTimeout(() => {
		loading.value = false
		result.value = true
	}, 2000)
}
</script>

<template lang="pug">
q-card-section
	q-linear-progress.q-mb-md(indeterminate color="accent" v-if='loading')
	q-card.result(v-if='result')
		.found
			|Найдено 3 результата.
			q-btn(flat icon='mdi-close' label='Закрыть' @click="action" dense size='sm') 
		.resgrid
			.res
				q-chip(size='sm') Результат 1
			.res
				q-chip(size='sm') Результат 2
			.res
				q-chip(size='sm') Результат 3

	.grid
		div
			.input
				q-input(v-model="query" type='textarea' outlined autogrow class="bg-white" placeholder='Вопрос на естественном языке')
				.filt
					q-btn(icon='mdi-filter-variant' label="Фокус" size='sm' :flat='focusFlat' :color="colorFlat") 
						q-menu
							q-card.focus
								q-card-section
									q-chip(v-for="chip in focus" clickable v-model:selected='chip.selected') {{ chip.label }}

					q-btn(flat icon='mdi-tag-outline' label="Контекст" @click="showContext" size='sm') 
			.search
				.txt Вы всегда сможете дополнить и уточнить свой вопрос.
				q-btn(unelevated color="primary" label="Спросить" @click="ask") 

		div
			.example
				q-icon(name="mdi-lightbulb-outline")
				|покажи мне все звонки, где люди ругаются
			.example
				q-icon(name="mdi-lightbulb-outline")
				|покажи мне звонки Иванова, где он продавал
			.example
				q-icon(name="mdi-lightbulb-outline")
				|покажи все звонки за месяц, где есть несоответствие чек-листу Базовый
	.focus
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
	min-height: 130px;
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
</style>
