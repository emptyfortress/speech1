<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '@/stores/store'
import MySelect from '@/components/common/MySelect.vue'
import type { Ref } from 'vue'

const store = useStore()

const period = ['Последние 30 дней', 'Прошлый месяц', 'Текущий месяц', 'Сегодня']
const perModel: Ref<Range | String> = ref('Прошлый месяц')
const perModel1: Ref<Range | String> = ref('Текущий месяц')


const toggleCompare = (() => {
	store.toggleCompare()
})

const toggleTable = (() => {
	store.toggleTableCompare()
})
</script>

<template lang="pug">
.compareblock
	.text-bold Сравнить периоды:

	.compare
		q-avatar(size="md" color="primary" text-color="white") 1
		MySelect(v-model="perModel" :options="period" )

	.compare
		q-avatar(size="md" color="primary" text-color="white") 2
		MySelect(v-model="perModel1" :options="period" )

	.buttons
		q-btn(flat color="primary" label="Отмена" @click="toggleCompare") 
		q-btn(unelevated color="primary" label="Сравнить" @click="toggleTable") 
</template>


<style scoped lang="scss">
.grd {
	display: grid;
	grid-template-columns: auto 1fr;
	justify-items: start;
	align-items: start;
	column-gap: 1rem;
	row-gap: 0;
}

.container {
	width: 1200px;
	padding-top: 2rem;
}

.compareblock {
	border: 2px solid #d0d0c2;
	padding: 1rem;
	background: $accent2;
	display: grid;
	grid-template-columns: auto 1fr 1fr 200px;
	column-gap: 2rem;
	align-items: center;
	margin-bottom: .5rem;
}

.compare {
	background: $grey-3;
	font-size: .8rem;
	border: 1px solid #d0d0c2;
	position: relative;
	padding: .5rem;
	display: grid;
	grid-template-columns: auto 1fr;
	align-items: center;
	column-gap: .5rem;
}

.close {
	position: absolute;
	top: -.5rem;
	right: -.5rem;
}

.buttons {
	grid-column: 4/5;
	// align-self: end;
}
</style>
