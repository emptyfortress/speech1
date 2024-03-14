<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '@/stores/store'
import MySelect from '@/components/common/MySelect.vue'
import type { Ref } from 'vue'
import CategoryModal from '@/components/CategoryModal.vue'

interface Range {
	from: String
	to: String
}

const mystore = useStore()
const toggle = () => {
	mystore.loading = true
	mystore.sett = false
	mystore.integral = true
	setTimeout(() => {
		mystore.loading = false
	}, 1700)
}
const dialog = ref(false)
const name = ref('')
const period = ['Последние 30 дней', 'Прошлый месяц', 'Текущий месяц', 'Сегодня']
const perModel: Ref<Range | String> = ref('Последние 30 дней')
const date = ref('2019/03/01')
const setRange = () => {
	let temp = Object.values(date.value)
	perModel.value = temp[0] + ' -- ' + temp[1]
}
const cat = ref(['Все'])
const modal = ref(false)
</script>

<template lang="pug">
.grid
	div
		.label Категории
		q-select(dense
			outlined
			use-chips
			multiple
			clearable
			bg-color="white"
			v-model="cat"
			@click="modal = true"
		)
	MySelect(label="Период" v-model="perModel" :options="period")

	div
		q-btn(flat round icon="mdi-calendar")
			q-popup-proxy( cover transition-show="scale" transition-hide="scale")
				q-date(v-model="date" range)
					.row.items-center.justify-end.q-gutter-sm
						q-btn(label="Cancel" color="primary" flat v-close-popup)
						q-btn(label="OK" color="primary" flat v-close-popup @click="setRange")

q-card-actions.q-px-none.q-mt-md
	q-btn(flat color="primary" label="Сбросить").q-mr-sm
	q-space
	q-btn(color="primary" flat label="Добавить к сравнению")
	q-btn(unelevated color="primary" icon="mdi-star-outline"  label="Сохранить" @click="dialog = !dialog").q-mr-sm
	q-btn(unelevated color="primary" icon="mdi-check-bold" label="Применить" @click="toggle")

CategoryModal(v-model="modal")
q-dialog(v-model="dialog" persistent)
	q-card.save
		q-card-section(class="row items-center q-pb-none")
			div(class="text-h6") Сохранить отчет
			q-space
			q-btn(icon="mdi-close" flat round dense v-close-popup)
		q-card-section
			q-input(label="Имя" v-model="name" autofocus)
		q-card-actions(align="right")
			q-btn(flat label="Отмена" color="primary" v-close-popup)
			q-btn(flat label="Сохранить" color="primary" v-close-popup)

</template>

<style scoped lang="scss">
.label {
	font-size: 0.8rem;
	font-weight: 600;
}
.save {
	min-width: 300px;
}
.grid {
	display: grid;
	grid-template-columns: 2fr 1fr 30px;
	align-items: flex-end;
	column-gap: 1rem;
	margin-top: 0.5rem;
}
.label {
	font-size: 0.8rem;
	font-weight: 600;
}
</style>
