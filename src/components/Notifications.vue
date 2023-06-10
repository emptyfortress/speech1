<template lang="pug">
q-page(padding)
	.container
		q-table(:columns="columns"
			:rows="items"
			binary-state-sort
			:pagination="pagination"
			:filter="filter"
			selection="multiple"
			v-model:selected="selected"
			:selected-rows-label="label"
			rows-per-page-label="Строк на стр."
			).table
			template(v-slot:top="props")
				.zag
					q-icon(name="mdi-bell-outline").q-mr-md
					|Уведомления
					span.q-ml-md ({{notifications.length}})
				q-space
				q-input(dense debounce="300" color="primary" v-model="filter" clearable)
					template(v-slot:prepend)
						q-icon(name="mdi-magnify")

			template(v-slot:body="props")
				q-tr(:props="props" :class="{'unread' : props.row.unread}" @click="select(props.row.id)").rel
					q-td(auto-width)
						q-checkbox(v-model="selected" :val="props.row")
					q-td(key="date" :props="props") {{ props.row.date }}, {{props.row.time}}
					q-td(key="name" :props="props" ) {{ props.row.name }}
					q-td(key="oper" :props="props") {{props.row.oper}}
					q-td(key="channel" :props="props") {{props.row.channel}}
					q-td Velit, scelerisque in <span class="yellow">dictum</span> non, consectetur a erat nam at lectus urna duis.
					.myplayer(v-if="selectedRow === props.row.id")
						q-linear-progress(:value=".6" color="positive")
						div {{props.row.date}}
						div {{props.row.operator}}
						.player
							q-btn(round flat icon="mdi-rewind" @click.stop)
							q-btn(round flat icon="mdi-pause" @click.stop)
							q-btn(round flat icon="mdi-fast-forward" @click.stop)
						.time 02:31
						.row.items-center
							q-icon(name="mdi-volume-medium" size="sm")
							q-slider(color="primary" v-model="sound").slide
							q-icon(name="mdi-volume-high" size="sm")

		transition(name="slide-top")
			.mybuttons(v-show="selected.length")
				q-btn(color="primary" label="Прочитать"  @click="read")
				q-btn(color="primary" label="Удалить" @click="remove")
Teleport(to="#speech")
	.recdate(v-if="selectedRow !== null") {{items[selectedRow].date}} - {{items[selectedRow].time}}
</template>

<script setup lang="ts">
import { notifications } from '@/stores/notifications'
import { watchEffect, ref } from 'vue'
import type { Ref } from 'vue'
import { useStore } from '@/stores/store'

const filter = ref('')
// const selected:  = ref([])
const selected: Ref<RowNotific[]> = ref([])
const items = ref(notifications as RowNotific[])
const sound = ref(50)
const selectedRow: Ref<null | number> = ref(null)

const columns: Column[] = [
	{ name: 'date', label: 'Дата, время', field: 'date', sortable: true, align: 'left' },
	{ name: 'name', label: 'Ключевое слово', field: 'name', sortable: true, align: 'left' },
	{ name: 'oper', label: 'Оператор', field: 'oper', sortable: true, align: 'left' },
	{ name: 'channel', label: 'Канал', field: 'channel', sortable: true, align: 'left' },
	{ name: 'context', label: 'Контекст', field: 'context', sortable: false, align: 'left' },
]
const pagination = ref({
	page: 1,
	rowsPerPage: 10,
})

const label = () => {
	return `Выбрано ${selected.value.length} строк`
}

const read = () => {
	if (selected.value.length === 10) {
		selected.value.forEach((item) => (item.unread = true))
	}
	selected.value.forEach((item) => (item.unread = !item.unread))
}
const remove = () => {
	items.value = items.value.filter((item) => !selected.value.includes(item))
}

const props = defineProps({
	id: {
		type: String,
		default: undefined,
	},
})
const handleChange = (e: string | undefined) => {
	if (e === undefined) {
		selected.value = []
	} else {
		selected.value = notifications.filter((item) => item.id === +e)
	}
}
watchEffect(() => handleChange(props.id))

const mystore = useStore()
const select = (e: number) => {
	if (selectedRow.value === null) {
		selectedRow.value = e
		mystore.setRecord('группа 1')
		mystore.openSpeechDrawer()
	} else if (selectedRow.value === e) {
		selectedRow.value = null
		mystore.closeSpeechDrawer()
	} else {
		selectedRow.value = e
		mystore.setRecord('группа 2')
	}
}
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
.mybuttons {
	margin-top: 1rem;
	transition: 0.3s ease all;
	button {
		margin-right: 4px;
	}
}
.yellow {
	background: yellow;
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
	gap: 2rem;
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
</style>
