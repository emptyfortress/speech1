<script setup lang="ts">
import { ref, reactive, watchEffect } from 'vue'
import { useStore } from '@/stores/store'
import { records as myrecords } from '@/stores/operators'
import type { QTableProps } from 'quasar'

const mystore = useStore()
const records = reactive(myrecords)
const table = ref()

const columns: QTableProps['columns'] = [
	{ name: 'star', label: '', align: 'center', field: 'star', sortable: true },
	{ name: 'date', label: 'Дата, время', align: 'left', field: 'date', sortable: true },
	{ name: 'operator', label: 'Оператор', align: 'left', field: 'operator', sortable: true },
	{ name: 'client', label: 'Клиент', align: 'left', field: 'client', sortable: true },
	{ name: 'group', label: 'Группа', align: 'left', field: 'group', sortable: true },
	{ name: 'categ', label: 'Категория', align: 'left', field: 'categ', sortable: true },
	{ name: 'record', label: 'Контекст', align: 'left', field: 'record', sortable: false },
]

const getSelectedString = (e: number) => {
	return `Выбрана ${e} запись`
}
</script>

<template lang="pug">
q-page.rel(padding)
	.container
		q-expansion-item(v-model="mystore.req")
			template(v-slot:header)
				q-item-section.line(avatar)
					q-avatar(icon="mdi-star-outline" flat)
				q-item-section
					.zag Избранные записи
			q-card-section.q-px-md
				q-table.table(ref="table"
					:rows="records"
					:columns="columns"
					:selected-rows-label="getSelectedString"
					rows-per-page-label="Записей на странице"
					:filter="filter"
					:loading="mystore.loading"
					:rows-per-page-options='shownRows')

			template(v-slot:loading)
				q-inner-loading(showing color="primary" size="100px")

			// template(v-slot:top="props")
			// 	q-btn(unelevated color="grey" size="sm" label="Скачать одним архивом")
			// 	q-chip(v-for="chip in cat.getTags") {{ chip }}
			// 	q-space
			// 	q-input(dense debounce="300" color="primary" v-model="filter" clearable)
			// 		template(v-slot:prepend)
			// 			q-icon(name="mdi-magnify")
			// 	q-btn.q-ml-md(flat round dense :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'" @click="togg")

			template(v-slot:body-selection)

			template(v-slot:body="props")
				q-tr.rel(:props="props" @click="select(props.row)")
					q-td(auto-width key="star" :props="props")
						q-btn(flat round size="sm" @click.stop="setStar(props.row)")
							q-icon(v-if="props.row.star === true" name="mdi-star" color="orange")
							q-icon(v-else name="mdi-star-outline" color="grey" )
					q-td(key="date" :props="props") {{ props.row.date }}
					q-td(key="operator") {{ props.row.operator }}
					q-td(key="client") {{ props.row.client }}
					q-td(key="group") {{ props.row.group }}
					q-td(key="categ") {{ props.row.categ }}
					q-td(key="record" v-html="props.row.record")
					q-btn.dd(flat round color="primary" icon="mdi-download" size="sm" @click.stop="$q.notify({ message: 'Запись скачана', icon: 'mdi-check' })")
					.myplayer(v-if="selected === props.row.id")
						q-linear-progress(:value=".6" color="positive")
						q-icon(v-if="props.row.star" name="mdi-star" size="sm")
						q-icon(v-else name="mdi-star-outline" size="sm")
						div(v-if="!mystore.wide") {{ props.row.date }}
						div(v-if="!mystore.wide") {{ props.row.operator }}
						.player
							q-btn(round flat icon="mdi-rewind" @click.stop)
							q-btn(round flat icon="mdi-pause" @click.stop)
							q-btn(round flat icon="mdi-fast-forward" @click.stop)
						.time 02:31
						.row.items-center
							q-icon(name="mdi-volume-medium" size="sm")
							q-slider.slide(color="primary" v-model="sound")
							q-icon(name="mdi-volume-high" size="sm")

</template>

<style scoped lang="scss"></style>
