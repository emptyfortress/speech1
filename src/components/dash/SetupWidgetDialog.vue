<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import WidgetTree from '@/components/dash/WidgetTree.vue'
import WidgetTabs from '@/components/dash/WidgetTabs.vue'
import VueApexCharts from 'vue3-apexcharts'
import { chartOptionsSpark1 } from '@/stores/charts1'
import { GridItem, GridLayout } from 'vue-ts-responsive-grid-layout'

const props = defineProps({
	box: {
		type: Object,
		default: {
			x: 0,
			y: 0,
			w: 3,
			h: 3,
			i: 'el',
			set: false,
			data: { chart: 0, table: 2 },
		},
	},
	width: Number,
})

// const calcHeight = computed(() => {
// 	return props.box.height + 'px'
// })

const calcWidth = computed(() => {
	return 'width: ' + props.width + 'px;'
})
const modelValue = defineModel()

const splitterModel = ref(20)

const hei = computed(() => {
	return 'height: ' + (window.innerHeight - 115) + 'px;'
})

const widgetSet = ref(false)

const dropWidget = ref()

const drop = (evt: DragEvent) => {
	over.value = false
	widgetSet.value = true
	dropWidget.value = JSON.parse(evt.dataTransfer!.getData('item'))
}
const over = ref(false)

const series1 = [{ name: 'Вызовы', data: [55, 57, 65, 70, 77, 80, 67] }]
const cancel = () => {
	modelValue.value = false
}
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
					WidgetTree( )
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
							:use-css-transforms="true" )

							component(:is="GridItem"
								v-for="( item, index ) in props.box"
									:x="0"
									:y="0"
									:w="item.w"
									:h="item.h"
									:i="item.i"
									:show-close-button="false"
									:key="item.i")
									q-card.preview(flat @dragover.prevent="over = true" @dragleave.prevent="over = false" @drop="drop($event)"  :class="{over: over}")
										q-icon.resize(name="mdi-resize-bottom-right" @click="" dense size="16px") 
										.cent
											.empty(v-if="!widgetSet") Перетащите сюда виджет или его тип
											.notempty(v-else)
												.digit(v-if="dropWidget.type == 'digit'" )
													.dig 127
													div Параметр
												.spark(v-if="dropWidget.type == 'spark'" )
													VueApexCharts(type="area" :height="calcHeight" :options="chartOptionsSpark1" :series="series1")

						transition(name="fade")
							div(v-if="props.box.set || widgetSet" )
								WidgetTabs
						q-card-actions(align="center")
							q-btn(flat color="primary" label="Отмена" @click="cancel") 
							q-btn(v-if="widgetSet" flat color="primary" label="Применить" v-close-popup) 
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
}
.dig {
	font-size: 2rem;
	font-weight: 600;
	line-height: 0.9;
}

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
.q-card {
	width: 100%;
	height: 100%;
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
</style>
