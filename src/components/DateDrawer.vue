<template lang="pug">
q-drawer(v-model="mystore.dateDrawer" overlay side="right" :width="300" ).rd
	q-btn(flat round icon="mdi-close" @click="toggle")
	q-btn(flat round icon="mdi-check" color="blue-9")
	q-btn(flat round icon="mdi-check-circle" color="blue-9" @click="toggle" )
	q-date(v-model="model" range flat color="blue-9").date
	q-btn(flat color="blue-9") Первый квартал
	q-btn(flat color="blue-9") Второй квартал
	q-btn(flat color="blue-9") Прошлый год
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '@/stores/store'

const model = ref(null)

const mystore = useStore()
const toggle = () => mystore.toggleDateDrawer()
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
.date {
	margin-top: 0;
}
</style>
