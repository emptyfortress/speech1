<script setup lang="ts">
import { ref, reactive } from 'vue'
import { GridItem, GridLayout } from 'vue-ts-responsive-grid-layout'

const layout = reactive([
	{ x: 0, y: 0, w: 2, h: 2, i: '0' },
	{ x: 2, y: 0, w: 2, h: 4, i: '1' },
	{ x: 4, y: 0, w: 2, h: 5, i: '2' },
	{ x: 6, y: 0, w: 2, h: 3, i: '3' },
	{ x: 8, y: 0, w: 2, h: 3, i: '4' },
	{ x: 10, y: 0, w: 2, h: 3, i: '5' },
	{ x: 0, y: 5, w: 2, h: 5, i: '6' },
	{ x: 2, y: 5, w: 2, h: 5, i: '7' },
	{ x: 4, y: 5, w: 2, h: 5, i: '8' },
	{ x: 6, y: 3, w: 2, h: 4, i: '9' },
	{ x: 8, y: 4, w: 2, h: 4, i: '10' },
	{ x: 10, y: 4, w: 2, h: 4, i: '11' },
	{ x: 0, y: 10, w: 2, h: 5, i: '12' },
	{ x: 2, y: 10, w: 2, h: 5, i: '13' },
	{ x: 4, y: 8, w: 2, h: 4, i: '14' },
	{ x: 6, y: 8, w: 2, h: 4, i: '15' },
	{ x: 8, y: 10, w: 2, h: 5, i: '16' },
	{ x: 10, y: 4, w: 2, h: 2, i: '17' },
	{ x: 0, y: 9, w: 2, h: 3, i: '18' },
	{ x: 2, y: 6, w: 2, h: 2, i: '19' },
])
const test = (e: number) => {
	let temp = [...document.getElementsByClassName('vue-grid-item')]
	temp.forEach((el) => el.classList.add('move'))
	layout.splice(e, 1)
}
const editMode = ref(true)
</script>

<template lang="pug">
grid-layout(
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

	grid-item(v-for="( item, index ) in layout"
		:enableEditMode="editMode"
		:x="item.x"
		:y="item.y"
		:w="item.w"
		:h="item.h"
		:i="item.i"
		:show-close-button="false"
		:key="item.i"
		)
		q-card
			q-card-section {{item.i}}
			q-icon(name="mdi-close" @click="test(index)" dense) 
</template>

<style scoped lang="scss">
.move {
	transition: 0.2s ease all;
}
:deep(.vue-grid-item) {
	touch-action: none;
	position: relative;
}
.q-icon {
	position: absolute;
	right: 3px;
	top: 3px;
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
</style>
