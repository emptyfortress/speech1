<template lang="pug">
.starred
	.row.justify-between.items-center
		.subtitle-1(@click="toggleEdit")
			slot(name="header")
			q-icon(name="mdi-pencil-outline" ).editicon
		.row
			slot(name="addbutton")
			q-input(dense v-model="filter" clearable hide-bottom-space @clear="filter = ''").q-ml-lg
				template(v-slot:prepend)
					q-icon(name="mdi-magnify")
	q-card-section
		q-chip(v-for="(item,index) in filteredChips"
			v-model:selected="item.selected"
			:key="item.id"
			:removable="editMode"
			:class="chipClass"
			clickable
			@remove="removeChip(index)"
			@click="click(item)").rel
			.inf(@click.stop) ?
				q-menu(transition-show="jump-down" transition-hide="jump-up" anchor="bottom middle" self="top middle")
					.infmenu
						.zg {{item.label}}
						.desc(v-html="item.comment")
						.desc.q-mt-md Создано: 23.10.2022 Автор: Иванов П.С.
			WordHighlighter(:query="filter").ellipsis {{ item.label }}
			q-tooltip(v-if="props.tooltip" anchor="top middle" self="bottom middle" :delay="800") {{ item.label}}
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useStore } from '@/stores/store'
import { useQuasar } from 'quasar'
import WordHighlighter from 'vue-word-highlighter'

const props = defineProps<{
	chips: Chip[]
	multiple: boolean
	tooltip: boolean
}>()

const mystore = useStore()
const filter = ref('')

const chips = reactive(props.chips)
const filteredChips = computed(() => {
	if (filter.value.length > 0) {
		return chips.filter((item) => item.label.toLowerCase().includes(filter.value.toLowerCase()))
	}
	return chips
})

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
const show = (e: Chip) => {
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
const undo = (e: Chip) => {
	chips.push(e)
}

const click = (e: Chip) => {
	if (props.multiple === true) {
		if (e.selected === true) {
			mystore.addKey(e.value)
		} else {
			mystore.removeKey(e)
		}
	} else {
		if (e.selected === true) {
			chips.map((item) => (item.selected = false))
			mystore.addKey(e.value)
			e.selected = true
		} else {
			mystore.removeKey(e)
		}
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
.inf {
	color: $primary;
	position: absolute;
	width: 20px;
	height: 20px;
	background: white;
	border-radius: 20px;
	top: 4px;
	right: 4px;
	text-align: center;
	font-size: 1rem;
	font-weight: bold;
	line-height: 20px;
}
.infmenu {
	padding: 1rem;
	.zg {
		font-size: 0.9rem;
		font-weight: bold;
	}
	.desc {
		font-size: 0.8rem;
	}
}
</style>
