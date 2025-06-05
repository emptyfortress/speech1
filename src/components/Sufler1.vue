<script setup lang="ts">
import { ref } from 'vue'
import IcOutlineSupportAgent from '@/components/icons/IcOutlineSupportAgent.vue'
import { useQuasar } from 'quasar'

const list = ref([
	{ id: 0, selected: false, event: 'Не хочу', hint: 'Подсказка для не хочу' },
	{ id: 1, selected: false, event: 'Нет времени', hint: 'Подсказка для нет времени' },
	{ id: 2, selected: false, event: 'Не нужно', hint: 'Подсказка для не нужно' },
	{ id: 3, selected: false, event: 'Потом', hint: 'Подсказка для потом' },
])

const selection = ref(list.value[0])
const editedHint = ref(selection.value.hint)

const select = (item: any) => {
	selection.value = item
	editedHint.value = item.hint
}

const $q = useQuasar()
const save = () => {
	const index = list.value.findIndex((i) => i.id === selection.value.id)
	if (index !== -1) {
		list.value[index].hint = editedHint.value
		$q.notify({
			icon: undefined,
			message: 'Сохранено',
			color: 'teal',
			position: 'bottom',
		})
	}
}
</script>

<template lang="pug">
q-page.rel(padding)
	.container
		.zag
			IcOutlineSupportAgent.icon
			|Суфлер - настройка
		.grid
			div
				.hd События
				q-list
					q-item(
						clickable,
						v-for="item in list",
						:key='item.id',
						@click="select(item)",
						:class="{ selected : item.id == selection.id }"
					)
						q-item-section(side)
							q-icon(name="mdi-flag-outline")
						q-item-section {{ item.event }}

			div
				.text-bold Подсказка
				q-input.q-mt-sm.q-mb-md(outlined v-model="editedHint" type='textarea' bg-color="white")
				q-btn(unelevated color="primary" label="Сохранить" @click='save') 
</template>

<style scoped lang="scss">
.zag {
	padding-bottom: 0.5rem;
	border-bottom: 1px solid #ccc;
}
.icon {
	width: 36px;
	height: 36px;
	margin-right: 1rem;
}
.grid {
	margin-top: 1rem;
	display: grid;
	grid-template-columns: 1fr 1fr;
	column-gap: 3rem;
}
.hd {
	font-weight: 600;
	margin-left: 1rem;
}
:deep(.q-field__native) {
	font-size: 1rem;
}
.selected {
	background: #b1ddfc;
}
</style>
