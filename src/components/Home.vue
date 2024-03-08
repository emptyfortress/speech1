<script setup lang="ts">
import { ref } from 'vue'
import Trends1 from '@/components/Trends1.vue'
import Events from '@/components/Events.vue'
import Addition from '@/components/Addition.vue'
import ChipCalendar1 from '@/components/ChipCalendar1.vue'
import CreatePanelDialog from '@/components/dash/CreatePanelDialog.vue'
import { useDash } from '@/stores/dash'

interface Panel {
	id: string
	label: string
	descr: string
	name: string
	gap: number
	radius: number
	flat: boolean
	marg: boolean
}
const dash = useDash()

const tabs = ref('home')
const dialog = ref(false)
const toggleDialog = () => {
	dialog.value = !dialog.value
}
const create = (e: Panel) => {
	tabs.value = e.name
}
</script>

<template lang="pug">
q-page
	.container
		q-tabs(v-model="tabs" active-color="primary")
			q-tab(:name="panel.name" :label="panel.label" v-for="panel in dash.panels" :key="panel.id")
			q-btn(flat round icon="mdi-plus" @click="toggleDialog" dense) 
		q-tab-panels(v-model="tabs" animated)
			q-tab-panel(name="home")
				.row.justify-between.items-center
					.zag Тренды
					component(:is="ChipCalendar1")
				component(:is="Trends1")
				component(:is="Events")

				.row.justify-between.items-center.q-mt-lg
					.zag Дополнительно
					component(:is="ChipCalendar1")
				component(:is="Addition")

			template(v-for="panel in dash.panels" :key="panel.id" v-if="dash.panels.length > 1")
				q-tab-panel(:name="panel.name")
					.zag {{panel.label}}

	CreatePanelDialog(v-model="dialog" @create="create")
</template>

<style scoped lang="scss">
.container {
	padding-top: 0;
	margin-top: 0;
}
.q-tab-panels {
	background: transparent;
}
</style>
