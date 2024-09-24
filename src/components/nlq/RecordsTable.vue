<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import type { QTableProps } from 'quasar'
import type { Ref } from 'vue'

interface Props {
	rows: Row[]
}

const props = withDefaults(defineProps<Props>(), {
	rows: () => [],
})

const shownRows = ref([10, 20, 50])

const records = reactive(props.rows)

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

const selected: Ref<number | null> = ref(null)

const emit = defineEmits(['select'])
const select = (e: Row) => {
	selected.value = e.id
	emit('select', e)
}
const setStar = (e: Row) => {
	e.star = !e.star
}

const item = ref(props.rows[0])

const currentComment = ref('')

const dialog = ref(false)

const showComment = (e: Row) => {
	item.value = e
	currentComment.value = e.comment
	dialog.value = true
}

const closeDialog = () => {
	dialog.value = false
}

const addComment = (e: string) => {
	if (e.length > 0) {
		item.value.comment = e
	}
	dialog.value = false
}
const deleteComment = () => {
	item.value.comment = ''
	dialog.value = false
}

</script>

<template lang="pug">
q-table(flat
	:rows="records"
	:columns="columns"
	rows-per-page-label="Записей на странице"
	:rows-per-page-options='shownRows')

	template(v-slot:loading)
		q-inner-loading(showing color="primary" size="100px")

	template(v-slot:body="props")
		q-tr.rel(:props="props" @click="select(props.row)" :class='{selected: selected == props.row.id }')
			q-td.small(key="star" :props="props")
				q-btn(flat round size="sm" @click.stop="setStar(props.row)")
					q-icon(v-if="props.row.star === true" name="mdi-star" color="orange")
					q-icon(v-else name="mdi-star-outline" color="grey" )

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


q-dialog(v-model="dialog")
	q-card(style="width: 500px;")
		q-btn.close(round color="negative" icon="mdi-close" @click="closeDialog")
		q-card-section
			div Комментарий:
			q-input(v-model="currentComment" filled type="textarea" autofocus hide-bottom-space)
		q-card-actions.q-pa-md(align="right")
			q-btn(flat round icon="mdi-trash-can-outline" color="primary" @click="deleteComment") 
			q-space
			q-btn(flat color="primary" label="Отмена" @click="closeDialog") 
			q-btn(unelevated color="primary" label="Добавить" @click="addComment(currentComment)" :disable="currentComment.length === 0")

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


.label {
	font-size: 0.8rem;
	margin-right: 1rem;
}

.recdate {
	font-weight: 600;
}
.selected {
	// background: $bgSelection;
	background: #37474f;

	color: #6dee9e;
}
</style>
