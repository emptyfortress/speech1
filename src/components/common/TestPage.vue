<script setup lang="ts">
import { ref, computed } from 'vue'
import { useWidget } from '@/stores/widgetStore'

const widget = useWidget()

const color = ref('red')

const headsize = computed(() => {
	return widget.head.size + 'rem'
})
console.log(headsize.value)
</script>

<template lang="pug">
q-page(padding)
	.panel
		.dog 123
		q-slider(v-model="widget.head.size" label :min="0.8" :max="3.0" :step="0.01")
		q-input(dense filled bg-color="#ccc" v-model="widget.head.fontColor" )
			template(v-slot:append)
				q-icon(name="mdi-eyedropper-variant" class="cursor-pointer")
					q-popup-proxy(cover transition-show="scale" transition-hide="scale")
						q-color(v-model="widget.head.fontColor")
		// ZagSetup
</template>

<style scoped lang="scss">
.panel {
	min-height: 400px;
	max-width: 1000px;
	background: white;
	padding: 1rem;
}
.dog {
	font-size: 2rem;
	font-weight: 600;
	font-size: v-bind(headsize);
	color: v-bind('widget.head.fontColor');
}
</style>
