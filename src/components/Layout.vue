<script setup lang="ts">
import { ref, reactive } from 'vue'
import { GridItem, GridLayout } from 'vue-ts-responsive-grid-layout'

const layout = reactive([
	{ x: 0, y: 0, w: 3, h: 4, i: '0' },
	{ x: 3, y: 0, w: 3, h: 4, i: '1' },
])
const remove = (e: number) => {
	let temp = [...document.getElementsByClassName('vue-grid-item')]
	temp.forEach((el) => el.classList.add('move'))
	layout.splice(e, 1)
}
const editMode = ref(true)
</script>

<template lang="pug">
q-page(padding)
	.container
		GridLayout(
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

			GridItem(v-for="( item, index ) in layout"
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
					q-icon.close(name="mdi-close" @click="remove(index)" dense size="14px") 
					q-icon.resize(name="mdi-resize-bottom-right" @click="" dense size="16px" ) 
					q-card-section {{item.i}}
q-btn.fab(round color="primary" icon="mdi-plus" @click="" size="lg") 
</template>

<style scoped lang="scss">
.container {
	background: pink;
	padding: 0;
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
	opacity: 0.3;
	z-index: -10;
}
:deep(.vue-draggable-dragging) {
	z-index: 1000;
	box-shadow: 3px 3px 17px rgba(0, 0, 0, 0.4);
}
.fab {
	position: fixed;
	bottom: 2rem;
	right: 2rem;
}
</style>
