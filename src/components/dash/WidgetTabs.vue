<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import MySelect from '@/components/common/MySelect.vue'

const group = ref(null)
const options = [
	{ label: 'Звонки', value: 'calls' },
	{ label: 'Категории', value: 'categ' },
	{ label: 'Слова/словари/эмоции', value: 'words' },
	{ label: 'Чек-листы', value: 'list' },
]
const operModel = ref('Все')
const operator = ['Все', 'Катя', 'Маша', 'Миша']
const tab = ref('data')
const period = ['Последние 30 дней', 'Прошлый месяц', 'Текущий месяц', 'Сегодня']
const perModel: Ref<Range | String> = ref('Последние 30 дней')
const setRange = () => {
	let temp = Object.values(date.value)
	perModel.value = temp[0] + ' -- ' + temp[1]
}
const date = ref('2019/03/01')
const quan = ref(10)
const check = ref(false)
</script>

<template lang="pug">
.q-mt-lg
	q-tabs(v-model="tab" align="left" active-color="primary" )
		q-tab(name="data" label="Данные")
		q-tab(name="zag" label="Заголовок")
		q-tab(name="style" label="Оформление")
		q-tab(name="color" label="Цвет")

	q-tab-panels(v-model="tab" animated)
		q-tab-panel(name="data")
			.grid
				div
					.hd Источник данных
					q-option-group(:options="options" type="radio" v-model="group")

				div
					.hd Дополнительные параметры
					.option
						component(:is="MySelect" filled bg="#ccc" label="Клиент" v-model="operModel")
						component(:is="MySelect" filled bg="#ccc" label="Категория" v-model="operModel")
						component(:is="MySelect" filled bg="#ccc" label="Группа" v-model="operModel")
						component(:is="MySelect" filled bg="#ccc" label="Оператор" v-model="operModel")
						component(:is="MySelect" filled bg="#ccc" label="Регион" v-model="operModel")
						component(:is="MySelect" filled bg="#ccc" label="Чек-лист" v-model="operModel")
						.row.items-end
							component(:is="MySelect" filled bg="#ccc" label="Диапазон дат" v-model="perModel")
							div
								q-btn(flat round icon="mdi-calendar")
									q-popup-proxy( cover transition-show="scale" transition-hide="scale")
										q-date(v-model="date" range)
											.row.items-center.justify-end.q-gutter-sm
												q-btn(label="Cancel" color="primary" flat v-close-popup)
												q-btn(label="OK" color="primary" flat v-close-popup @click="setRange")
						.top
							q-checkbox(v-model="check" label="Показать топ значения" dense)
							q-input(dense filled v-model="quan" type="number" )
							div штук


		q-tab-panel(name="zag")
			p Здесь настраиваем заголовок
		q-tab-panel(name="style")
			p Здесь настраиваем шрифты, легенды и тп
		q-tab-panel(name="color")
			p Здесь настраиваем темы и цвет
</template>

<style scoped lang="scss">
.q-tab-panel {
	min-height: 300px;
}
// .q-tab-panels {
// 	background: transparent;
// }
.grid {
	display: grid;
	grid-template-columns: auto 1fr;
	// justify-items: start;
	column-gap: 3rem;
}
.hd {
	font-size: 1rem;
	font-weight: 600;
	margin-bottom: 1rem;
}
.option {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	column-gap: 1rem;
	row-gap: 1rem;
	align-items: flex-end;
}
.top {
	grid-column: 2/-1;
	display: flex;
	gap: 2rem;
	align-items: center;
}
</style>
