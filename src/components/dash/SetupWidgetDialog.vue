<script setup lang="ts">
import { ref, reactive, computed, watchEffect, nextTick } from 'vue'
import WidgetTree from '@/components/dash/WidgetTree.vue'
import WidgetTabs from '@/components/dash/WidgetTabs.vue'
import VueApexCharts from 'vue3-apexcharts'
import { GridItem, GridLayout } from 'vue-ts-responsive-grid-layout'
import { randomArray, randomNumber } from '@/utils/utils'
import { templateRef } from '@vueuse/core'
import { useWidget } from '@/stores/widgetStore'

interface Props {
	width: number
	box: Widget[]
}
const props = withDefaults(defineProps<Props>(), {
	width: 1000,
	box: () => [
		{
			x: 0,
			y: 0,
			w: 3,
			h: 3,
			i: 'el',
			set: false,
			data: { chart: 0, table: 2 },
		},
	],
})

const widget = useWidget()
const modelValue = defineModel()

const calcWidth = computed(() => {
	return 'width: ' + props.width + 'px'
})

const splitterModel = ref(16)

const hei = computed(() => {
	return 'height: ' + (window.innerHeight - 115) + 'px;'
})

const widgetSet = ref(false)

const dropWidget = ref<null | Widget>(null)

const series = ref([{ name: 'Параметр', data: randomArray(7, 80, 5) }])
const barSeries = ref([
	{
		data: [
			{ x: '1', y: 15 },
			{ x: '2', y: 93 },
			{ x: '3', y: 87 },
			{ x: '4', y: 59 },
			{ x: '5', y: 19 },
		],
	},
])
const donutSeries = randomArray(4, 20, 5)

const cancel = () => {
	modelValue.value = false
	dropWidget.value = null
	widgetSet.value = false
}

const over = ref(false)

const drop = (evt: DragEvent) => {
	over.value = false
	widgetSet.value = true
	dropWidget.value = JSON.parse(evt.dataTransfer!.getData('item'))
	widget.setCurrentWidget(dropWidget.value)
	console.log(dropWidget.value)
}
const calcSubtitle = computed(() => {
	return widget.currentWidget ? widget.currentWidget.text : 'fuck'
})

function calcNew() {
	const length = randomNumber(3, 8, 0)
	let arr = []
	arr.length = length
	arr.forEach((item, index) => {})
}

const apply = () => {
	series.value[0].data = randomArray(7, 90, 5)
	barSeries.value[0].data = calcNew()
	console.log(dropWidget.value.text)

	sparkChart.value[0].updateOptions(widget.sparkOptions)
}
const barChart = templateRef('barChart')
const sparkChart = templateRef('spark')

const horizontal = ref(false)
const rotate = () => {
	horizontal.value = !horizontal.value
	barChart.value[0].updateOptions({
		plotOptions: {
			bar: {
				horizontal: horizontal.value,
			},
		},
	})
}
const pie = ref('pie')

const switchPie = () => {
	if (pie.value == 'donut') {
		pie.value = 'pie'
	} else pie.value = 'donut'
}
const cols = [
	{
		name: 'name',
		required: true,
		label: 'Колонка 1',
		align: 'left',
		field: 'name',
		sortable: true,
	},
	{
		name: 'total',
		required: false,
		label: 'Колонка 2',
		align: 'right',
		field: 'total',
		sortable: true,
	},
	{
		name: 'good',
		required: false,
		label: 'Колонка 3',
		align: 'right',
		field: 'good',
		sortable: true,
	},
]
const headsize = computed(() => {
	return widget.head.size + 'rem;'
})
const fuck = ref('red')
</script>

<template lang="pug">
q-dialog(v-model="modelValue" persistent maximized transition-show="slide-up" transition-hide="slide-down")
	.cnt
		.tip Настройте виджет или выберите готовый из библиотеки
		.zg
			q-icon(name="mdi-widgets-outline" size="26px")
			span Конструктор виджетов
		.content

			q-splitter(v-model="splitterModel" :limits="[0, 100]" :style="hei")
				template(v-slot:before)
					WidgetTree()
				template(v-slot:after)
					.right(:style="calcWidth")

						component(:is="GridLayout"
							:layout.sync="props.box"
							:col-num="12"
							:row-height="30"
							:is-draggable="false"
							:is-resizable="true"
							:is-mirrored="false"
							:vertical-compact="true"
							:margin="[10, 10]"
							:show-close-button="false"
							:use-css-transforms="true")

							component(:is="GridItem"
								v-for="( item, index ) in props.box"
									:x="0"
									:y="0"
									:w="item.w"
									:h="item.h"
									:i="item.i"
									:show-close-button="false"
									:key="item.i")
									q-btn(v-if="widgetSet && dropWidget.type == 'gist'" flat round dense icon="mdi-rotate-left-variant" @click="rotate") 
									q-btn(v-if="widgetSet && dropWidget.type == 'pie'" flat round dense @click="switchPie") 
										q-icon(:name="pie == 'pie' ? 'mdi-chart-donut' : 'mdi-chart-pie'")
									q-card.preview(flat @dragover.prevent="over = true" @dragleave.prevent="over = false" @drop="drop($event)"  :class="{over: over}")
										q-icon.resize(name="mdi-resize-bottom-right" @click="" dense size="16px") 

										.cent(v-if="!widgetSet")
											.empty Перетащите сюда виджет или его тип

										.cent(v-if="widgetSet && dropWidget.type == 'widget'")
											div {{ widget.currentWidget.text}}

										.cent(v-if="widgetSet && dropWidget.type == 'digit'")
											.digit
												.dig 123
												div {{ widget.currentWidget.text}}

										.cent(v-if="widgetSet && dropWidget.type == 'percent'")
											.digit
												.dig 5%
												div {{ widget.currentWidget.text}}

										VueApexCharts(ref="spark" v-if="widgetSet && dropWidget.type == 'spark'" type="area" height="100%" :options="widget.sparkOptions" :series="series")
										VueApexCharts(v-if="widgetSet && dropWidget.type == 'chart'" type="area" height="100%" :options="widget.areaOptions" :series="series")
										VueApexCharts(ref="barChart" v-if="widgetSet && dropWidget.type == 'gist'" type="bar" height="100%" :options="widget.barOptions" :series="barSeries")
										VueApexCharts(v-if="widgetSet && dropWidget.type == 'pie'" :type="pie" height="100%" :options="widget.donutOptions" :series="donutSeries" )
										q-table(v-if="widgetSet && dropWidget.type == 'table'" flat :rows="rows" :columns="cols")


						transition(name="fade")
							WidgetTabs(v-if="props.box.set || widgetSet")
						q-card-actions(align="center")
							q-btn(flat color="primary" label="Отмена" @click="cancel") 
							q-btn(v-if="widgetSet" flat color="primary" label="Применить" @click="apply") 
							q-btn(v-if="widgetSet" unelevated color="primary" label="Сохранить" v-close-popup) 
	
</template>

<style scoped lang="scss">
.cnt {
	background: moz-linear-gradient(top, #d8e3f1 0%, #f4e8f4 52.6%, #fdf5e5 100%);
	background: webkit-linear-gradient(top, #d8e3f1 0%, #f4e8f4 52.6%, #fdf5e5 100%);
	background: linear-gradient(180deg, #d8e3f1 0%, #f4e8f4 52.6%, #fdf5e5 100%);
	background-attachment: fixed;
	.content {
		margin: 1rem;
	}
}
.preview {
	height: 100%;
	overflow: hidden;
	&.over {
		background: #dcffe4;
	}
}
.cent {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}
.empty {
	font-size: 0.8rem;
	text-align: center;
	color: #aaa;
	margin: auto;
}
// .dig {
// 	font-size: 2rem;
// 	font-weight: 600;
// 	line-height: 0.9;
// }

.zg {
	margin-top: 1rem;
	font-size: 1.3rem;
	text-align: center;
	vertical-align: baseline;
	.q-icon {
		margin-right: 1rem;
		transform: translateY(-5px);
	}
}
.tip {
	background: #9db2c3;
	padding: 2px 2rem;
	font-size: 1rem;
	text-align: center;
}

.resize {
	position: absolute;
	right: 3px;
	bottom: 3px;
	cursor: pointer;
}
:deep(.vue-grid-item) {
	touch-action: none;
	position: relative;
}
:deep(.vue-grid-item.vue-grid-placeholder) {
	background: green !important;
	opacity: 0.2;
	z-index: -1;
}
.vue-grid-item {
	position: relative;
	.q-btn {
		position: absolute;
		top: 0;
		right: -2rem;
	}
}

.dig {
	// font-size: v-bind(headsize);
	font-size: 2rem;
	font-weight: 600;
	color: v-bind('fuck');
}
</style>
