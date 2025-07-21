<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import type { QTableProps } from 'quasar'

const props = defineProps<{
	trainers: Trainer[]
}>()

const emit = defineEmits<{
	(e: 'select', trainer: Trainer): void
}>()

const columns: QTableProps['columns'] = ref([
	{
		name: 'avatar',
		label: '',
		field: 'avatar',
		align: 'center',
		style: 'width: 56px',
		sortable: false,
	},
	{
		name: 'lastName',
		label: 'Тренер',
		field: 'lastName',
		align: 'left',
		sortable: true,
	},
	{
		name: 'operatorCount',
		label: 'Операторы',
		field: 'operatorCount',
		align: 'center',
		sortable: true,
	},
	{
		name: 'evaluationCount',
		label: 'Оценки',
		field: 'evaluationCount',
		align: 'center',
		sortable: true,
	},
	{
		name: 'averageScore',
		label: 'Средний балл',
		field: 'averageScore',
		align: 'center',
		format: (val) => val.toFixed(2),
		sortable: true,
	},
])

const selected = ref<Trainer>()

function handleRowClick(_: Event, row: Trainer, index: number) {
	console.log(row)
	console.log(index)
	emit('select', row)
	selected.value = row
}

function getAvatarSrc(fileName: string): string {
	return new URL(`../assets/img/avatars/${fileName}`, import.meta.url).href
}

const getRowClass = () => {
	console.log(111)
}

const pagination = {
	rowsPerPage: 0,
}
</script>

<template lang="pug">
q-table.table.thinhd(
  :rows="trainers"
  :columns="columns"
  row-key="id"
  flat
	:pagination="pagination"
	:selected="selected"
  @row-click="handleRowClick"
  :row-class="getRowClass"
	hide-bottom
)

	template(v-slot:body-cell-avatar="props")
		q-td(:props="props")
			q-avatar(size="32px")
				img(
					:src="getAvatarSrc(props.row.photoUrl)",
					alt="avatar",
					style="object-fit: cover"
				)

</template>
