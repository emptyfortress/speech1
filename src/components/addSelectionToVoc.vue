<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar'

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
])

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
</script>

<template lang="pug">
q-dialog(v-model="modelValue")
	q-card
		q-btn.close(icon="mdi-close" color="negative" round dense v-close-popup)
		q-card-section
			.text-h6 Добавить в словарь
			div Выберите словарь, куда добавить <span class="selection">{{ props.selection }}</span> 

		q-card-section
			q-list(dense)
				q-item(clickable v-for="item in vocs" :key="item.id" @click.stop="select(item)" :class="{ selected: item.selected }")
					q-item-section(avatar)
						q-icon(name="mdi-book")
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

.selected {
	background: #b1ddfc;
}

.q-card {
	min-width: 400px;
}
</style>
