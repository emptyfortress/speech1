<template lang="pug">
.grid(:class="{ timeon: time }")
	component(:is="MySelect" label="Регион" v-model="regModel" :options="region")
	component(:is="MySelect" label="Группа" v-model="groupModel" :options="group")
	component(:is="MySelect" label="Оператор" v-model="operModel" :options="operator")

	div(v-if='!time')
		component(:is="MySelect" label="Период" v-model="perModel" :options="period")
		q-checkbox.time(v-model="time" dense label="Указать время")

	template(v-else)
		div
			component(:is="DateTimePicker" label="Старт периода" icon='mdi-calendar' v-model="start")
			q-checkbox.time(v-model="time" dense label="Указать время")
		component(:is="DateTimePicker" label="Конец периода" icon='mdi-calendar' v-model="finish" :options="period")

	.cal(v-if="!time")
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
import DateTimePicker from '@/components/common/DateTimePicker.vue'

interface Range {
	from: String
	to: String
}

const region = ['Все', 'Не определен']
const group = ['Все', 'Не все', 'Самые-самые']
const operator = ['Все', 'Катя', 'Маша', 'Миша']
const period = ['Последние 30 дней', 'Прошлый месяц', 'Текущий месяц', 'Сегодня']
const time = ref(false)
const start = ref()
const finish = ref()

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
	align-items: flex-start;
	gap: 1rem;

	&.timeon {
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
	}
}

.time {
	font-size: .9rem;
	margin-top: .5rem;
}

.cal {
	margin-top: 1rem;
}
</style>
