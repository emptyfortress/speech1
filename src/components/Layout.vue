<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { uid } from 'quasar'
import { GridItem, GridLayout } from 'vue-ts-responsive-grid-layout'
import SetupWidgetDialog from '@/components/dash/SetupWidgetDialog.vue'
import { useElementSize } from '@vueuse/core'

const layout = reactive([{ x: 0, y: 0, w: 3, h: 3, i: 'el' }])
const remove = (e: number) => {
	let temp = [...document.getElementsByClassName('vue-grid-item')]
	temp.forEach((el) => el.classList.add('move'))
	layout.splice(e, 1)
}
const editMode = ref(true)

const date = new Date()
const add = () => {
	const tmp = { ...layout.at(-1) }
	tmp.i = uid()
	layout.push(tmp)
}

const dialog = ref(false)

const setup = (e: string) => {
	dialog.value = !dialog.value
	// console.log(e)
	// console.log(cardRef.value)
	// console.log(width.value)
}

const cardRef = ref([])
const { width, height } = useElementSize(cardRef.value)
</script>

<template lang="pug">
q-page(padding)
	.container
		q-btn.fab(round color="primary" icon="mdi-plus" @click="add" size="lg") 

		component(:is="GridLayout"
			:layout.sync="layout"
			:col-num="12"
			:row-height="30"
			:is-draggable="true"
			:is-resizable="true"
			:is-mirrored="false"
			:vertical-compact="true"
			:margin="[10, 10]"
			:show-close-button="false"
			:use-css-transforms="true")

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
				q-card(ref="cardRef")
					q-card-section
						q-btn(flat color="primary" label="Настроить" @click="setup(item.i)" size="sm") 
					q-icon.close(name="mdi-close" @click="remove(index)" dense)
					q-icon.resize(name="mdi-resize-bottom-right" @click="" dense size="16px") 

	SetupWidgetDialog(v-model="dialog" :width="width" :height="height")
</template>

<style scoped lang="scss">
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
	opacity: 0.3;
	z-index: -10;
}
:deep(.vue-draggable-dragging) {
	z-index: 1000;
	box-shadow: 3px 3px 17px rgba(0, 0, 0, 0.4);
}
.fab {
	z-index: 1;
}
p {
	color: v-bind(color);
	font-size: v-bind(size);
}
</style>
