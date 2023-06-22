<script setup lang="ts">
import { ref, computed, reactive, watchEffect } from 'vue'
import { useStore } from '@/stores/store'
import { records as myrecords } from '@/stores/operators'
import type { QTableProps } from 'quasar'
import type { Ref } from 'vue'
import FilterSelect from '@/components/common/FilterSelect.vue'

interface Row {
	id: number
	date: string
	group: string
	record: string
	categ?: string
	operator: string
	client: string
	expand: boolean
	star?: boolean
	comment: string
}

const mystore = useStore()
const table = ref()
const filter = ref('')
const shownRows = ref([10, 20, 50])
const sound = ref(50)
const togg = () => {
	table.value.toggleFullscreen()
	table.value.setPagination({
		rowsPerPage: 0,
	})
}
const records = reactive(myrecords)

const starRecords = computed(() => {
	return records.filter(item => item.star === true)
})

const columns: QTableProps['columns'] = [
	{ name: 'star', label: '', align: 'center', field: 'star', sortable: true },
	{ name: 'comment', label: '', align: 'center', field: 'coment', sortable: true },
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

const selected: Ref<number | null> = ref(null)

const select = (e: Row) => {
	if (selected.value === null) {
		selected.value = e.id
		mystore.setRecord(e.group)
		mystore.openSpeechDrawer()
	} else if (selected.value === e.id) {
		selected.value = null
		mystore.setRecord('группа1')
		mystore.closeSpeechDrawer()
	} else {
		selected.value = e.id
		mystore.setRecord(e.group)
	}
}
const setStar = ((e: Row) => {
	e.star = !e.star
})

const item: Ref<null | Row> = ref(null)
const commentValue: Ref<string> = ref('')

const commentDialog = ref(false)
const showComment = ((e: Row) => {
	item.value = e
	commentValue.value = e.comment
	commentDialog.value = true
})
const addComment = (() => {
	if (commentValue.value.length > 0) {
		item.value!.comment = commentValue.value
	}
	item.value = null
	commentDialog.value = false
})
const closeDialog = (() => {
	item.value = null
	commentDialog.value = false
})
const duration = ref({ min: 20, max: 290 })
const showFilter = ref(true)
const toggleFilter = (() => {
	showFilter.value = !showFilter.value
})
const oper = ref([])
const client = ref([])
const group = ref([])
const category = ref([])

const operOptions = computed(() => {
	return starRecords.value.map(item => item.operator)
})
const clientOptions = computed(() => {
	return starRecords.value.map(item => item.client)
})
const groupOptions = computed(() => {
	return starRecords.value.map(item => item.group)
})
const categoryOptions = computed(() => {
	const temp = starRecords.value.map(item => item.categ)
	return [...new Set(temp)]
})
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
					:rows="starRecords"
					:columns="columns"
					:selected-rows-label="getSelectedString"
					rows-per-page-label="Записей на странице"
					:filter="filter"
					:loading="mystore.loading"
					:rows-per-page-options='shownRows')

					template(v-slot:loading)
						q-inner-loading(showing color="primary" size="100px")

					template(v-slot:top="props")
						q-btn(v-if="showFilter" unelevated round icon="mdi-filter-outline" color="primary" @click="toggleFilter") 
						q-btn(v-else flat round icon="mdi-filter-outline" color="primary" @click="toggleFilter") 
						q-space
						.label(v-if="showFilter") Длительность, сек:
						q-range.range(v-if="showFilter" v-model="duration" :min="10" :max="300" :step="2" label color="primary" )
						q-space
						q-input.filter(v-if="showFilter" dense debounce="300" color="primary" v-model="filter" clearable)
							template(v-slot:prepend)
								q-icon(name="mdi-magnify")
						q-btn.q-ml-md(flat round dense :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'" @click="togg")

					template(v-slot:top-row v-if="showFilter")
						q-tr.filt
							q-td
							q-td
							q-td
							q-td
								FilterSelect(v-model="oper" :options="operOptions")
							q-td
								FilterSelect(v-model="client" :options="clientOptions")
							q-td
								FilterSelect(v-model="group" :options="groupOptions")
							q-td
								FilterSelect(v-model="category" :options="categoryOptions")
							q-td

					template(v-slot:body-selection)

					template(v-slot:body="props")
						q-tr.rel(:props="props" @click="select(props.row)")
							q-td.small(key="star" :props="props")
								q-btn(flat round size="sm" @click.stop="")
									q-icon(v-if="props.row.star === true" name="mdi-star" color="orange")
									q-icon(v-else name="mdi-star-outline" color="grey" )
									q-menu
										q-list
											q-item.pink(clickable @click="setStar(props.row)" v-close-popup)
												q-item-section Удалить
												q-item-section(side)
													q-icon(name="mdi-star")

							q-td.small(key="comment" :props="props")
								q-btn.comment(flat round size="sm" @click.stop="showComment(props.row)")
									q-icon(v-if="props.row.comment" name="mdi-comment-text-outline" color="primary")
									q-icon(v-else name="mdi-comment-plus-outline" color="grey" )
									q-tooltip.bg-primary(v-if="props.row.comment" anchor="top middle" self="bottom middle" max-width="150px" :offset="[7, 7]") {{ props.row.comment }}
							q-td(key="date" :props="props") {{ props.row.date }}
							q-td(key="operator") {{ props.row.operator }}
							q-td(key="client") {{ props.row.client }}
							q-td(key="group") {{ props.row.group }}
							q-td(key="categ") {{ props.row.categ }}
							q-td(key="record" v-html="props.row.record")
							q-btn.dd(flat round color="primary" icon="mdi-download" size="sm" @click.stop="$q.notify({ message: 'Запись скачана', icon: 'mdi-check' })")
							.myplayer(v-if="selected === props.row.id")
								q-linear-progress(:value=".6" color="positive")
								q-btn(flat round size="sm" @click.stop="")
									q-icon(v-if="props.row.star === true" name="mdi-star" color="primary")
									q-icon(v-else name="mdi-star-outline" color="grey" )
									q-menu
										q-list
											q-item.pink(clickable @click="setStar(props.row)" v-close-popup)
												q-item-section Удалить
												q-item-section(side)
													q-icon(name="mdi-star")
								q-btn(flat round size="sm" @click.stop="showComment(props.row)")
									q-icon(v-if="props.row.comment" name="mdi-comment-text-outline" color="primary")
									q-icon(v-else name="mdi-comment-plus-outline" color="grey" )
									q-tooltip.bg-primary(v-if="props.row.comment" anchor="top middle" self="bottom middle" max-width="150px" :offset="[7, 7]") {{ props.row.comment }}
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

q-dialog(v-model="commentDialog")
	q-card(style="width: 500px;")
		q-btn.close(round color="negative" icon="mdi-close" @click="closeDialog")
		q-card-section
			div Комментарий:
			q-input(v-model="commentValue" filled type="textarea" autofocus hide-bottom-space)

		q-card-actions.q-pa-md(align="right")
			q-btn(flat color="primary" label="Отмена" @click="closeDialog") 
			q-btn(unelevated color="primary" label="Добавить" @click="addComment") 

</template>

<style scoped lang="scss">
@import '@/assets/styles/myvariables.scss';


.q-tr.rel {
	position: relative;
	cursor: pointer;

	.dd {
		position: absolute;
		top: 50%;
		right: 1rem;
		transform: translateY(-50%);
		visibility: hidden;
	}

	&:hover {
		.dd {
			visibility: visible;
		}
	}
}

td.ellipsis {
	max-width: 400px;
}

.myplayer {
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background: $blue-grey-9;
	color: #6d8e9e;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	padding-left: 1rem;
	gap: 1rem;
	font-size: 0.9rem;

	.q-linear-progress {
		position: absolute;
		top: 0;
		left: 0;
	}

	.player {
		color: white;
		display: flex;
		justify-items: flex-start;
		align-items: center;
		height: 100%;
	}

	.time {
		font-size: 2rem;
		font-weight: lighter;
		letter-spacing: 1px;
		color: white;
	}

	.slide {
		width: 150px;
	}
}

.q-table td.small {
	padding: 7px 5px;
	background-color: inherit;
}

.q-tooltip.tooltip {
	background: $primary;
	color: white;
}

.range {
	width: clamp(150px, 50%, 600px);
}

.filter {
	width: 200px;
}

.label {
	font-size: .8rem;
	margin-right: 1rem;
}


.filt {
	background: $bgHead;

	td {
		padding: 0 5px;
	}
}
</style>
