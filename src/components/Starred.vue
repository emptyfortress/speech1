<template lang="pug">
.starred
	.row.justify-between.items-center
		.subtitle-1(@click="toggleEdit")
			q-icon(name="mdi-star-outline").q-mr-sm
			|Избранное
			q-icon(name="mdi-pencil-outline" ).editicon
		q-input(dense v-model="filter" clearable hide-bottom-space @clear="filter = ''")
			template(v-slot:prepend)
				q-icon(name="mdi-magnify")
	q-card-section
		q-chip(v-for="(item,index) in chips"
			v-model:selected="item.selected"
			:key="item.id"
			:removable="editMode"
			:class="chipClass"
			clickable
			@remove="removeChip(index)"
			@click="click(item)")
			.ellipsis
				|{{ item.label}}
			q-tooltip(anchor="top middle" self="bottom middle" :delay="800") {{ item.label}}
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useStore } from '@/stores/store'
import { useQuasar } from 'quasar'
import { starredReports } from '@/stores/data'

const props = defineProps({
	chips: {
		type: String,
		default: 'test',
	},
})

const mystore = useStore()
const init = mystore.setChips(starredReports)
const chips = reactive(starredReports)

const filter = ref('')
const editMode = ref(false)
const toggleEdit = () => (editMode.value = !editMode.value)

const chipClass = computed(() => {
	if (editMode.value) return 'shake'
	else return ''
})

const removeChip = (e: number) => {
	let item = chips[e]
	chips.splice(e, 1)
	mystore.removeKeyByIndex(e)
	show(item)
}

const $q = useQuasar()
const show = (e: any) => {
	let message = e.label + ' - удалено.'
	$q.notify({
		message: message,
		color: 'negative',
		actions: [
			{
				label: 'Вернуть',
				color: 'white',
				handler: () => undo(e),
			},
		],
	})
}
const undo = (e: any) => {
	chips.push(e)
}

const click = (e: any) => {
	if (e.selected === true) {
		mystore.addKey(e.value)
	} else {
		mystore.removeKey(e)
	}
}
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
.starred {
	padding: 0;
	.q-card__section {
		padding: 1rem 0 0 0;
	}
}
.q-field--dense {
	height: 32px;
}
.q-chip {
	max-width: 200px;
}
.subtitle-1 {
	cursor: pointer;
	.editicon {
		display: none;
		margin-left: 0.5rem;
	}
	&:hover {
		.editicon {
			display: inline-block;
		}
	}
}
.q-icon {
	margin-bottom: 3px;
}
.q-input {
	transform: translateY(-7px);
	width: 230px;
}
</style>
