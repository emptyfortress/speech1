<template lang="pug">
q-expansion-item(v-model="veha")
	template(v-slot:header)
		q-item-section(avatar).line
			q-avatar(icon="mdi-map-marker-check-outline" flat)
				a
		q-item-section
			.zag Статистика по вехам
		q-item-section(side)
			q-btn(round flat icon="mdi-cloud-download-outline")
	q-card-section.q-px-md.q-pt-md
		.grid
			q-table(
				:columns="cols"
				:rows="rows"
				row-key="id"
				binary-state-sort
				v-model:selected="selected"
				:selected-rows-label="getSelectedString"
				rows-per-page-label="Записей на странице"
				).fixh.table
				template(v-slot:body="props")
					q-tr(:props="props" @click="select(props.row)")
						q-td(key="num" auto-width).text-right {{props.row.num}}
						q-td(key="veha") {{props.row.veha}}
						q-td(key="total").text-right {{props.row.total}}
						q-td(key="percent").text-right {{props.row.percent}}%
			q-card
				component(:is="VehCharts" v-if="selected.length === 0")
				component(:is="VehCharts1" v-else :veha="selected")
				//- component(:is="Test")
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { cols, rows } from '@/stores/vehi'
import VehCharts from '@/components/common/VehCharts.vue'
import VehCharts1 from '@/components/common/VehCharts1.vue'
import Test from '@/components/common/Test.vue'

interface Row {
	id: number
	num: number
	veha: string
	total: number
	percent: number
}

const veha = ref(false)
const selected: Ref<Row[]> = ref([])

const select = (e: Row) => {
	if (selected.value.length === 0) {
		selected.value.push(e)
	} else if (selected.value[0].id === e.id) {
		selected.value = []
	} else {
		selected.value = []
		selected.value.push(e)
	}
}
const getSelectedString = (e: number) => {
	return 'Выбранa веха'
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/myvariables.scss';
.grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 1rem;
}
.fixh {
	min-height: 340px;
}
.q-tr {
	cursor: pointer;
}
</style>
