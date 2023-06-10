<template lang="pug">
.grid
	component(:is="MySelect" label="Регион" :model="regModel" :options="region")
	component(:is="MySelect" label="Группа" :model="groupModel" :options="group")
	component(:is="MySelect" label="Оператор" :model="operModel" :options="operator")
	component(:is="MySelect" label="Период" :model="perModel" :options="period")
	div
		q-btn(flat round icon="mdi-calendar")
			q-popup-proxy( cover transition-show="scale" transition-hide="scale")
				q-date(v-model="date" range)
					.row.items-center.justify-end.q-gutter-sm
						q-btn(label="Cancel" color="primary" flat v-close-popup)
						q-btn(label="OK" color="primary" flat v-close-popup @click="setRange")
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import MySelect from '@/components/common/MySelect.vue'

interface Range {
	from: String
	to: String
}

const region = ['Все', 'Не определен']
const group = ['Все', 'Не все', 'Самые-самые']
const operator = ['Все', 'Катя', 'Маша', 'Миша']
const period = ['Последние 30 дней', 'Прошлый месяц', 'Текущий месяц', 'Сегодня']

const regModel = ref('Все')
const perModel: Ref<Range | String> = ref('Последние 30 дней')
const groupModel = ref('Все')
const operModel = ref('Все')
const date = ref('2019/03/01')

const setRange = () => {
	let temp = Object.values(date.value)
	perModel.value = temp[0] + ' -- ' + temp[1]
}
</script>

<style scoped lang="scss">
.grid {
	margin-top: 1rem;
	margin-bottom: 1rem;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr 30px;
	align-items: flex-end;
	gap: 1rem;
}
</style>
