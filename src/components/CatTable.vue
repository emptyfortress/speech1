<template lang="pug">
q-table(:rows="props.rows"
	:columns='columns'
	row-key="id"
	flat
	binary-state-sort
	hide-bottom
	selection="multiple"
	v-model:selected="cat.selectedPodcategories"
	:rows-per-page-options="[0]"
	color="primary"
	).stikytable
	template(v-slot:top-row v-if="props.rows.length == 0")
		q-td(colspan="5").text-center Категория не настроена.

</template>

<script setup lang="ts">
import { useCat } from '@/stores/category1'

const props = defineProps<{
	rows: String[]
	level: number
}>()

const cat = useCat()

const columns: Column[] = [
	{ name: 'label', label: 'Подкатегория', field: 'label', sortable: true, align: 'left' },
	{ name: 'call', label: 'Звонки', field: 'call', sortable: true, align: 'right' },
	{
		name: 'ant',
		label: 'АНТ',
		field: 'ant',
		sortable: true,
		align: 'right',
		format: (val) => `${val} мин.`,
	},
	{
		name: 'loud',
		label: 'Тишина',
		field: 'loud',
		sortable: true,
		align: 'right',
		format: (val) => `${val}%`,
	},
	{
		id: 4,
		name: 'interrupt',
		label: 'Перебивания',
		field: 'interrupt',
		sortable: true,
		align: 'right',
		format: (val) => `${val}%`,
	},
]
</script>

<style scoped lang="scss">
@import '@/assets/styles/myvariables.scss';

.q-table tbody tr.selected td::after {
	background: transparent;
}
.selected {
	background: $bgSelection;
}
</style>
