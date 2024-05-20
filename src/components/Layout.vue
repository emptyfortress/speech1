<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import type { Ref } from 'vue'
import { uid } from 'quasar'
import { GridItem, GridLayout } from 'vue-ts-responsive-grid-layout'
import SetupWidgetDialog from '@/components/dash/SetupWidgetDialog.vue'
import { useElementSize } from '@vueuse/core'
import VueApexCharts from 'vue3-apexcharts'
import { chartOptionsSpark1 } from '@/stores/charts1'

const layout: any[] = reactive([
	{
		x: 0,
		y: 0,
		w: 3,
		h: 3,
		i: 'el',
		set: false,
		data: { chart: 0, table: 2 },
	},
])
const remove = (e: number) => {
	let temp = [...document.getElementsByClassName('vue-grid-item')]
	temp.forEach((el) => el.classList.add('move'))
	layout.splice(e, 1)
}
const editMode = ref(true)

const date = new Date()

const add = () => {
	const tmp = {
		x: layout.length * 3,
		y: layout.length + 1, // puts it at the bottom
		w: 3,
		h: 3,
		i: uid(),
		set: false,
	}
	layout.push(tmp)
}

const dialog = ref(false)

const activeWidget = ref<Widget[]>([])

const grid = ref(null)
const { height, width } = useElementSize(grid)

const setup = (e: Widget, index: number) => {
	activeWidget.value.length = 0
	activeWidget.value.push(e)
	dialog.value = !dialog.value
}

const series1 = [{ name: 'Вызовы', data: [55, 57, 65, 70, 77, 80, 67] }]

const sparkOptions = {
	chart: {
		type: 'area',
		sparkline: {
			enabled: true,
		},
	},
	stroke: {
		curve: 'smooth',
	},
	fill: {
		opacity: 0.3,
	},
	xaxis: {
		crosshairs: {
			width: 1,
		},
	},
	// yaxis: {
	// 	min: 0,
	// },
	title: {
		text: '0',
		offsetX: 0,
		style: {
			fontSize: '24px',
		},
	},
	subtitle: {
		text: 'Текст',
		offsetX: 0,
		style: {
			fontSize: '14px',
		},
	},
}
</script>

<template lang="pug">
q-page(padding)
	.container
		q-btn.fab(round color="primary" icon="mdi-plus" @click="add" size="lg") 

		component(:is="GridLayout"
			ref="grid"
			:layout.sync="layout"
			:col-num="12"
			:row-height="30"
			:is-draggable="true"
			:is-resizable="true"
			:is-mirrored="false"
			:vertical-compact="true"
			:margin="[10, 10]"
			:show-close-button="false"
			:use-css-transforms="true" )

			component(:is="GridItem"
				v-for="( item, index ) in layout"
					:enableEditMode="editMode"
					:x="item.x"
					:y="item.y"
					:w="item.w"
					:h="item.h"
					:i="item.i"
					:show-close-button="false"
					:key="item.i")
					q-card
						// VueApexCharts(type="area" height="100%" width="100%" :options="chartOptionsSpark1" :series="series1")
						q-card-section
							q-btn(flat color="primary" label="Настроить" @click="setup(item, index)" size="sm") 
						q-icon.close(name="mdi-close" @click="remove(index)" dense)
						q-icon.resize(name="mdi-resize-bottom-right" @click="" dense size="16px") 

	// pre {{ height }}

	// .car
	// 	VueApexCharts(type="area" :options="sparkOptions" :series="series1" )

	component(:is="SetupWidgetDialog" v-model="dialog" :box="activeWidget" :width="width" :height="height" )

</template>

<style scoped lang="scss">
.car {
	width: 250px;
	// height: 250px;
	background: #fff;
	padding: 1rem;
	overflow: hidden;
	resize: both;
}
.move {
	transition: 0.2s ease all;
}
:deep(.vue-grid-item) {
	touch-action: none;
	position: relative;
}
.close {
	position: absolute;
	right: 3px;
	top: 3px;
	cursor: pointer;
}
.resize {
	position: absolute;
	right: 3px;
	bottom: 3px;
	cursor: pointer;
}
.q-card {
	width: 100%;
	height: 100%;
	z-index: 1001;
}
:deep(.vue-grid-item.vue-grid-placeholder) {
	background: green !important;
	opacity: 0.2;
	z-index: -1;
}
:deep(.vue-draggable-dragging) {
	z-index: 1000;
	box-shadow: 3px 3px 17px rgba(0, 0, 0, 0.4);
}
.fab {
	z-index: 1;
}
// p {
// 	color: v-bind(color);
// 	font-size: v-bind(size);
// }
</style>
