<template lang="pug">
CommonOptions
q-card-actions.q-px-none
	q-btn(flat color="primary" label="Сбросить").q-mr-sm
	q-space
	q-btn(color="primary" flat label="Добавить к сравнению")
	q-btn(unelevated color="primary" icon="mdi-star-outline"  label="Сохранить" @click="dialog = !dialog").q-mr-sm
	q-btn(unelevated color="primary" icon="mdi-check-bold" label="Применить" @click="toggle")

q-dialog(v-model="dialog" persistent)
	q-card.save
		q-card-section(class="row items-center q-pb-none")
			div(class="text-h6") Сохранить отчет
			q-space
			q-btn(icon="mdi-close" flat round dense v-close-popup)
		q-card-section
			q-input(label="Имя" v-model="name" autofocus)
		q-card-actions(align="right")
			q-btn(flat label="Отмена" color="primary" v-close-popup)
			q-btn(flat label="Сохранить" color="primary" v-close-popup)

</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '@/stores/store'
import CommonOptions from '@/components/common/CommonOptions.vue'

const mystore = useStore()
const toggle = () => {
	mystore.loading = true
	mystore.sett = false
	mystore.integral = true
	setTimeout(() => {
		mystore.loading = false
	}, 1700)
}
const dialog = ref(false)
const name = ref('')
</script>

<style scoped lang="scss">
.label {
	font-size: 0.8rem;
	font-weight: 600;
}
.save {
	min-width: 300px;
}
</style>
