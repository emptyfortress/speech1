<script setup lang="ts">
import { ref } from 'vue'
import { useDash } from '@/stores/dash'
import { uid } from 'quasar'

const modelValue = defineModel()
const dash = useDash()

const panel = ref('Моя панель')
const descr = ref('Здесь описание')
const gap = ref(8)
const radius = ref(4)
const flat = ref(true)
const marg = ref(true)
const def = ref(false)

const emit = defineEmits(['create'])

const create = () => {
	const id = uid()
	let temp = {
		id: id,
		label: panel.value,
		descr: descr.value,
		name: id,
		gap: gap.value,
		radius: radius.value,
		flat: flat.value,
		marg: marg.value,
		def: def.value,
	}
	dash.addPanel(temp)
	emit('create', temp)
	modelValue.value = false
}
</script>

<template lang="pug">
q-dialog(v-model="modelValue")
	q-card
		q-btn.close(round color="negative" icon="mdi-close" v-close-popup)
		q-card-section.row.items-top.q-pb-none
			div
				.text-overline.text-uppercase Создать панель
				.text-h6 {{ panel }}
			q-space
			q-icon.q-mr-lg(name="mdi-monitor-dashboard" color="primary" size="54px")

		q-card-section
			q-input(v-model="panel" label="Название")
			q-input(v-model="descr" label="Описание")
		.form
			.label Зазор между блоками, px
			q-input(v-model="gap" dense type="number" outlined bg-color="white")
			.label Радиус скругления, px
			q-input(v-model="radius" dense type="number" outlined bg-color="white")
			q-checkbox.q-mt-md(v-model="flat" dense label="Тень от карточек")
			q-checkbox.q-mt-md(v-model="marg" dense label="Поля на странице (глобальная настройка)")
			q-checkbox.q-mt-md(v-model="def" dense label="Панель по умолчанию")
		q-card-actions.q-ma-md(align="right")
			q-btn(flat color="primary" label="Отмена" v-close-popup) 
			q-btn(unelevated color="primary" label="Сохранить" @click="create") 
</template>

<style scoped lang="scss">
.q-card {
	min-width: 480px;
}
.form {
	display: grid;
	grid-template-columns: 1fr auto;
	justify-items: start;
	align-items: baseline;
	column-gap: 1rem;
	row-gap: 0.5rem;
	padding: 1rem;
	background: #eee;
	margin: 0.5rem 1rem;
}
.q-checkbox {
	grid-column: 1/-1;
}
</style>
