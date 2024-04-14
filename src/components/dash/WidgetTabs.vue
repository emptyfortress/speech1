<script setup lang="ts">
import { ref } from 'vue'

const tabs = ref('data')
</script>

<template lang="pug">
q-tabs.q-mt-lg(v-model="tabs" align="left" active-color="primary")
	q-tab(name="data" label="Данные")
	q-tab(name="style" label="Оформление")
	q-tab(name="color" label="Цвет")

q-tab-panels(v-model="tabs" animated)
	q-tab-panel(name="data")
		p Здесь настраиваем данные, задаем источник
	q-tab-panel(name="style")
		p Здесь настраиваем шрифты, легенды и тп
	q-tab-panel(name="color")
		p Здесь настраиваем темы и цвет
</template>

<style scoped lang="scss">
.q-tab-panel {
	min-height: 300px;
}
</style>
