<script setup lang="ts">
import { computed, ref } from 'vue'
import { useQuasar } from 'quasar'
import SvgIcon from '@/components/SvgIcon.vue'

const props = defineProps({
	selection: {
		type: String,
		required: true,
		default: ''
	}
})

const modelValue = defineModel<boolean>()

const sel = props.selection

const vocs = ref([
	{ id: 0, selected: false, label: 'Приветствие' },
	{ id: 1, selected: false, label: 'Прощание' },
	{ id: 2, selected: false, label: 'Жалобы' },
	{ id: 3, selected: false, label: 'Приветствие' },
	{ id: 4, selected: false, label: 'Прощание' },
	{ id: 5, selected: false, label: 'Жалобы' },
	{ id: 6, selected: false, label: 'Приветствие' },
	{ id: 7, selected: false, label: 'Прощание' },
	{ id: 8, selected: false, label: 'Жалобы' },
	{ id: 9, selected: false, label: 'Приветствие' },
	{ id: 10, selected: false, label: 'Прощание' },
	{ id: 11, selected: false, label: 'Жалобы' },
	{ id: 12, selected: false, label: 'Приветствие' },
	{ id: 13, selected: false, label: 'Прощание' },
	{ id: 14, selected: false, label: 'Жалобы' },
	{ id: 15, selected: false, label: 'Приветствие' },
	{ id: 16, selected: false, label: 'Прощание' },
	{ id: 17, selected: false, label: 'Жалобы' },
	{ id: 18, selected: false, label: 'Приветствие' },
	{ id: 19, selected: false, label: 'Прощание' },
	{ id: 20, selected: false, label: 'Жалобы' },
	{ id: 21, selected: false, label: 'Приветствие' },
	{ id: 22, selected: false, label: 'Прощание' },
	{ id: 23, selected: false, label: 'Жалобы' },
	{ id: 24, selected: false, label: 'Приветствие' },
	{ id: 25, selected: false, label: 'Прощание' },
	{ id: 26, selected: false, label: 'Жалобы' },
	{ id: 27, selected: false, label: 'Приветствие' },
	{ id: 28, selected: false, label: 'Прощание' },
	{ id: 29, selected: false, label: 'Жалобы' },
])

const filtervocs = computed(() => {
	return vocs.value.filter(item => item.label.toLowerCase().includes(filter.value.toLowerCase()))
})

const select = ((item: any) => {
	vocs.value.map((v) => v.selected = false)
	item.selected = true
})

const $q = useQuasar()

const added = (e: string) => {
	let message = 'Добавлено ' + e
	$q.notify({
		message: message,
		icon: 'mdi-check',
		position: 'top',
	})
}

const add = (() => {
	added(props.selection)

	modelValue.value = false
})
const filter = ref('')
</script>

<template lang="pug">
q-dialog(v-model="modelValue")
	q-card
		q-btn.close(icon="mdi-close" color="negative" round dense v-close-popup)
		q-card-section
			.text-h6 Добавить в словарь
			div Выберите словарь, куда добавить <span class="selection">{{ props.selection }}</span> 

		.q-mx-lg
			q-input(v-model="filter" dense clearable clear-icon="mdi-close-circle" filled @clear="filter = ''")
				template(v-slot:prepend)
					q-icon(name="mdi-magnify")
		q-card-section.scroll
			q-list(dense)
				q-item(clickable v-for="item in filtervocs" :key="item.id" @click.stop="select(item)" :class="{ selected: item.selected }")
					q-item-section(avatar)
						component(:is="SvgIcon" name="vocabulary")
					q-item-section {{ item.label }}
		q-card-actions.q-ma-md(align="right")
			q-btn(flat color="primary" label="Отмена" v-close-popup) 
			q-btn(unelevated color="primary" label="Добавить" @click='add') 
</template>

<style scoped lang="scss">
.selection {
	background: #b1ddfc;
	color: #37474f;
	font: 1rem monospace;
	font-weight: 600;
	padding: 0 5px;
}

.scroll {
	height: 60vh;
	overflow: auto;
}

.selected {
	background: #b1ddfc;
}

.q-card {
	min-width: 400px;
}
</style>
