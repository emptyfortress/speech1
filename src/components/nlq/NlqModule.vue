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
const result = ref(false)
const place = ref('Вопрос на естественном языке')
const ask = () => {
	loading.value = true
	setTimeout(() => {
		loading.value = false
		result.value = true
		query.value = ''
		place.value = 'Вы можете уточнить вопрос.'
	}, 2000)
}
const query = ref('')
const action1 = () => {
	query.value = 'покажи мне все звонки, где люди ругаются'
	presearch.value = false
	times[3].selected = true
}
const presearch = ref(true)

const times = reactive([
	{ label: 'Вчера', selected: false },
	{ label: 'Текущая неделя', selected: false },
	{ label: 'Прошлая неделя', selected: false },
	{ label: 'Текущий месяц', selected: false },
	{ label: 'Прошлый месяц', selected: false },
])
const select = (chip: { label: string; selected: boolean }) => {
	times.map((el) => (el.selected = false))
	chip.selected = true
}
</script>

<template lang="pug">
q-card-section
	q-linear-progress(indeterminate color="accent" v-if='loading')
	.summary(v-if='result')
		.hd
			|Структура запроса &nbsp;
			span.text-primary 'покажи мне все звонки, где люди ругаются'
		ol
			li Выбрать словари содержащие нецензурную лексику
			li Включить распознование эмоций (Гнев, раздражение)
			li Отфильтровать архив записей по выбранным словарям и эмоциям
			li Показать результат в виде таблицы записей не старше 1 месяца

	q-card.result(v-if='result')
		.found
			|Найдено 3 похожих ответа.
			q-btn(flat icon='mdi-close' label='Закрыть' @click="action" dense size='sm') 
		.resgrid
			.res
				.found
					q-chip(size='sm') Результат 1
					q-btn(flat round icon="mdi-pencil-outline" @click="action" dense size='sm') 
				.pad
					.hd Мат при звонке
					.gr
						label Вид:
						div Сохраненный отчет
						label Фокус:
						div Записи, Отчеты
						label Словарь:
						div Нецензурная лексика
						label Период:
						div Текущий месяц


			.res
				.found
					q-chip(size='sm') Результат 2
					q-btn(flat round icon="mdi-pencil-outline" @click="action" dense size='sm') 
				.pad
					.hd Повышенный тон
					.gr
						label Вид:
						div Новый поиск
						label Фокус:
						div Звонки
						label Эмоции:
						div Гнев, раздражение
						label Период:
						div Текущий месяц
			.res
				.found
					q-chip(size='sm') Результат 3
					q-btn(flat round icon="mdi-pencil-outline" @click="action" dense size='sm') 
				.pad
					.hd Негативный клиент
					.gr
						label Вид:
						div Сохраненный отчет
						label Фокус:
						div Записи, Отчеты
						label Период:
						div Текущий месяц

	.grid
		div
			.input
				q-input(v-model="query" type='textarea' outlined autogrow class="bg-white" :placeholder='place')
				.filt
					q-btn(icon='mdi-filter-variant' label="Фокус" size='sm' :flat='focusFlat' :color="colorFlat") 
						q-menu
							q-card.focus
								q-card-section
									q-chip(v-for="chip in focus" clickable v-model:selected='chip.selected' :key='chip.label') {{ chip.label }}

					q-btn(flat icon='mdi-tag-outline' label="Контекст" size='sm') 
			.search
				.txt Вы всегда сможете дополнить и уточнить свой вопрос.
				q-btn(unelevated color="primary" label="Спросить" @click="ask") 

		div(v-if='presearch')
			.example(@click='action1')
				q-icon(name="mdi-lightbulb-outline")
				|покажи мне все звонки, где люди ругаются
			.example
				q-icon(name="mdi-lightbulb-outline")
				|покажи мне звонки Иванова, где он продавал
			.example
				q-icon(name="mdi-lightbulb-outline")
				|покажи все звонки за месяц, где есть несоответствие чек-листу Базовый
		div(v-else)
			q-chip(v-for="chip in times" clickable v-model:selected='chip.selected' :key='chip.label' @click='select(chip)') {{ chip.label }}
			q-btn(flat color="primary" icon='mdi-calendar' label="Задать диапазон" size='sm') 

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
