<script setup lang="ts">
import { ref, computed } from 'vue'

const modelValue = defineModel()

const splitterModel = ref(25)
const hei = computed(() => {
	return 'height: ' + (window.innerHeight - 205) + 'px;'
})
</script>

<template lang="pug">
q-dialog(v-model="modelValue" persistent maximized transition-show="slide-up" transition-hide="slide-down")
	.cnt
		.tip Настройте виджет или выберите готовый из библиотеки
		.zg
			q-icon(name="mdi-widgets-outline" size="26px")
			span Конструктор виджетов
		q-splitter(v-model="splitterModel" :limits="[0, 100]" :style="hei" @update:model-value="split")
			template(v-slot:before)
				.div before
			template(v-slot:after)
				.div after
		q-card-actions(align="center")
			q-btn(flat color="primary" label="Отмена" v-close-popup) 
			q-btn(unelevated color="primary" label="Отмена" v-close-popup) 
</template>

<style scoped lang="scss">
.cnt {
	background: moz-linear-gradient(top, #d8e3f1 0%, #f4e8f4 52.6%, #fdf5e5 100%);
	background: webkit-linear-gradient(top, #d8e3f1 0%, #f4e8f4 52.6%, #fdf5e5 100%);
	background: linear-gradient(180deg, #d8e3f1 0%, #f4e8f4 52.6%, #fdf5e5 100%);
	background-attachment: fixed;
	// .content {
	// 	max-width: 1200px;
	// 	margin: 0 auto;
	// }
}

.zg {
	margin-top: 2rem;
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
.div {
	height: 200px;
}
</style>
