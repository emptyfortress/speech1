<script setup lang="ts">
import { ref, computed } from 'vue'
import WidgetTree from '@/components/dash/WidgetTree.vue'
import WidgetTabs from '@/components/dash/WidgetTabs.vue'

const props = defineProps({
	width: {
		type: Number,
		required: true,
		default: 100,
	},
	height: {
		type: Number,
		required: true,
		default: 100,
	},
})

const width = computed(() => {
	return 'width:' + props.width + 'px; height: ' + props.height + 'px;'
})
const modelValue = defineModel()

const splitterModel = ref(20)

const hei = computed(() => {
	return 'height: ' + (window.innerHeight - 115) + 'px;'
})

const widgetSet = ref(false)
const drop = () => {
	over.value = false
	widgetSet.value = true
}
const over = ref(false)
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
					.right
						q-card.preview(:style="width" @dragover.prevent="over = true" @dragleave="over = false" @drop="drop" :class="{over: over}" )
							.cent
								.empty Перетащите сюда виджет или его тип

						transition(name="fade")
							div(v-if="widgetSet")
								WidgetTabs
								q-card-actions(align="center")
									q-btn(flat color="primary" label="Отмена" v-close-popup) 
									q-btn(unelevated color="primary" label="Сохранить" v-close-popup) 
	
</template>

<style scoped lang="scss">
.cnt {
	background: moz-linear-gradient(top, #d8e3f1 0%, #f4e8f4 52.6%, #fdf5e5 100%);
	background: webkit-linear-gradient(top, #d8e3f1 0%, #f4e8f4 52.6%, #fdf5e5 100%);
	background: linear-gradient(180deg, #d8e3f1 0%, #f4e8f4 52.6%, #fdf5e5 100%);
	background-attachment: fixed;
	.content {
		max-width: 1200px;
		margin: 0 auto;
		margin-top: 1rem;
	}
}
.right {
	padding: 1rem;
}
.preview {
	padding: 0.5rem;
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
</style>
