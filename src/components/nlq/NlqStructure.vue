<script setup lang="ts">
import { ref } from 'vue'
import { records as myrecords } from '@/stores/operators'
import type {QTableColumn} from 'quasar'

const cols: QTableColumn[] = [
	{ name: 'voc', label: 'Словарь', field: 'voc', sortable: true, align: 'left' },
	{ name: 'num', label: 'Емкость', field: 'num', sortable: true, align: 'left' },
]
const rows = [
	{ voc: 'Мат', num: 26 },
	{ voc: 'Ругательства', num: 32 },
	{ voc: 'Нецензурная лексика', num: 15 },
]
const cols1: QTableColumn[] = [
	{ name: 'date', label: 'Дата, время', field: 'date', sortable: true, align: 'left' },
	{ name: 'operator', label: 'Оператор', field: 'operator', sortable: true, align: 'left' },
	{ name: 'client', label: 'Клиент', field: 'client', sortable: true, align: 'left' },
	{ name: 'group', label: 'Группа', field: 'group', sortable: true, align: 'left' },
	{ name: 'categ', label: 'Категория', field: 'categ', sortable: true, align: 'left' },
]
const view = ref<number | null>(null)
const toggle = ((e: number) => {
	if (view.value == e) {
		view.value = null
	} else view.value = e
})
</script>

<template lang="pug">
ol
	li
		div Выбрать словари с нецензурной лексикой.
		q-btn(flat icon='mdi-binoculars' label="Проверить данные" @click="toggle(1)" size='sm' color="grey") 
		q-btn(flat icon='mdi-function-variant' label="Запрос" @click="toggle(2)" size='sm' color="grey") 

		q-table.tab.narrow(v-if='view == 1' flat dense :columns='cols' :rows='rows' hide-bottom)
		q-card.narrow(v-if='view == 2' flat)
			q-card-section
				.select
					|SELECT
					span ID, NAME
				.select
					|FROM
					span KEYWORDLIST
				.select
					|WHERE <span>TYPE</span> == 'VOCABULARY'<br>
					|ORDER BY <span>QUANTITY</span> in <span>ITEM</span>
	li
		div Включить распознавание эмоций "Гнев", "Раздражение".
		q-btn(flat icon='mdi-binoculars' label="Проверить данные" @click="toggle(3)" size='sm' color="grey") 
		q-btn(flat icon='mdi-function-variant' label="Запрос" @click="toggle(4)" size='sm' color="grey") 
		q-card.narrow(v-if='view == 3' flat)
			q-card-section Нет данных для проверки.
		q-card.narrow(v-if='view == 4' flat)
			q-card-section
				.select
					|SELECT
					span EMOTION, NEGATIVE
				.select
					|FROM
					span EMOTIONLIST

	li
		div Выбрать все записи за последний месяц.
		q-btn(flat icon='mdi-binoculars' label="Проверить данные" @click="toggle(5)" size='sm' color="grey") 
		q-btn(flat icon='mdi-function-variant' label="Запрос" @click="toggle(6)" size='sm' color="grey") 
		q-table.tab(v-if='view == 5' flat dense :columns='cols1' :rows='myrecords' hide-bottom)
		q-card.narrow(v-if='view == 6' flat)
			q-card-section
				.select
					|SELECT
					span RECORDS
				.select
					|FROM
					span DATA
	li
		div Отфильтровать выбранные записи по словарям и эмоциям из предыдущих шагов.
		q-btn(flat icon='mdi-binoculars' label="Проверить данные" @click="toggle(7)" size='sm' color="grey") 
		q-btn(flat icon='mdi-function-variant' label="Запрос" @click="toggle(8)" size='sm' color="grey") 
		q-table.tab(v-if='view == 7' flat dense :columns='cols1' :rows='myrecords' hide-bottom)
		q-card.narrow(v-if='view == 8' flat)
			q-card-section
				.select
					|FILTER
					span RECORDS
				.select
					|BY
					span VOCABULARIES
					span EMOTIONS
					span DATES

</template>

<style scoped lang="scss">
li {
	margin-bottom: 1rem;
}
.tab th {
	background: #ccc;
}

.narrow {
	width: 350px;
}

:deep(.q-table th) {
	background: #ccc;
}
.select {
	span {
		margin-left: 1rem;
		color: blue;
		font-weight: 600;
		cursor: pointer;
	}
}
</style>
