<script setup lang="ts">
import { ref, computed } from 'vue'
import { columns, rows } from '@/components/evaluate/data'
import type { Ref } from 'vue'
import { useStore } from '@/stores/store'
import { useRouter } from 'vue-router'

const props = defineProps<{
	oper: Operator
	private: Boolean
}>()

const router = useRouter()
const pagination = ref({
	page: 1,
	rowsPerPage: 8,
})
const recRows = ref(rows)

const mystore = useStore()
const filter = ref('')
const setStar = (e: any) => {
	e.star = !e.star
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
const sound = ref(50)
const evaluate = () => {
	let path = '/oper/' + props.oper.id + '/eval'
	router.push(path)
}
const calcColumn = computed(() => {
	return props.private ? columns.filter((el) => el.name !== 'star') : columns
})
const showEval = (mark: any) => {
	if (mark == undefined && props.private == false) {
		return true
	} else return false
}
</script>

<template lang="pug">
div
	q-table.table(:columns="calcColumn"
		:rows="recRows"
		:pagination="pagination"
		:filter="filter"
		rows-per-page-label="Строк на стр."
		row-key="id")
		template(v-slot:body="props")
			q-tr.rel(:props="props" @click="select(props.row)")
				q-td(auto-width key="star" :props="props")
					q-btn(flat round size="sm" @click.stop="setStar(props.row)")
						q-icon(v-if="props.row.star === true" name="mdi-star" color="orange")
						q-icon(v-else name="mdi-star-outline" color="grey" )
				q-td(key="date" :props="props") {{ props.row.date }}
				q-td(key="client") {{ props.row.client }}
				q-td(key="group") {{ props.row.group }}
				q-td(key="categ") {{ props.row.categ }}
				q-td(key="supervisor") {{ props.row.supervisor }}
				q-td(key="anketa") {{ props.row.anketa }}
				q-td.text-right(key="mark")
					.q-mr-md(v-if="props.row.mark") {{ props.row.mark }}
					q-btn(v-if="showEval(props.row.mark)" flat color="primary" label="Оценить" @click.stop="evaluate" size="sm" )
				.myplayer(v-if="selected === props.row.id")
					q-linear-progress(:value=".6" color="positive")
					q-btn(flat round size="sm" @click.stop="setStar(props.row)")
						q-icon(v-if="props.row.star === true" name="mdi-star" color="primary")
						q-icon(v-else name="mdi-star-outline" color="grey" )
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
					Teleport(to="#speech")
						.recdate(v-if="selected !== null") {{props.row.date}}
</template>

<style scoped lang="scss">
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
.recdate {
	font-weight: 600;
}
</style>
