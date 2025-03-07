<template lang="pug">
q-expansion-item(v-model="veha")
	template(v-slot:header)
		q-item-section(avatar).line
			q-avatar(icon="mdi-map-marker-check-outline" flat)
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
				selection="single"
				v-model:selected="selected"
				:selected-rows-label="getSelectedString"
				rows-per-page-label="Записей на странице"
				).fixh.table

				template(v-slot:header="props")
					q-tr(:props="props")
						q-th(auto-width)
						q-th(v-for="col in props.cols", :key="col.name", :props="props") {{ col.label }}

				template(v-slot:body="props")
					q-tr(:props="props" @click='select(props.row)')
						q-td(auto-width)
							q-btn(color="primary" round flat dense @click.stop="props.expand = !props.expand" :icon="props.expand ? 'mdi-chevron-down' : 'mdi-chevron-right'")

						q-td(key='veha') {{ props.row.veha }}
						q-td.text-right(key='total') {{ props.row.total }}
						q-td.text-right(key='percent') {{ props.row.percent }}

					q-tr(v-show="props.expand" :props="props" v-for="el in props.row.children" :key='el.id' @click='select(el)' :class='calcSelectedRow(el)')
						q-td.text-right {{ el.num }}
						q-td {{ el.veha }}
						q-td.text-right {{ el.total }}
						q-td.text-right {{ el.percent }}

			q-card
				component(:is="VehCharts" v-if="selected.length === 0")
				component(:is="VehCharts1" v-else :veha="selected")
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { cols, rows } from '@/stores/vehi'
import VehCharts from '@/components/common/VehCharts.vue'
import VehCharts1 from '@/components/common/VehCharts1.vue'

interface Row {
	id: number
	num: number
	veha: string
	total: number
	percent: number
}

const veha = ref(true)
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

const calcSelectedRow = ((el: any) => {
	if (selected.value.length) {
		return el.id == selected.value[0].id ? 'selected' : ''
	}
	return ''
})

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
