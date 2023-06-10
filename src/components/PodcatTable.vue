<template lang="pug">
.myrow
	.text-body1 Подкатегории: {{ cat.getTickedRows.length }}. Выбрано: {{ cat.selectedPodcategories.length}}
	div
		label(@click="tabl = false") Граф
		q-toggle(v-model="tabl" dense size="xs")
		label(@click="tabl = true") Таблица

transition(name="fade")
	component(:is="NotPodcat" v-if="levelCheck").full-width
	.full-width(v-else)
		transition(name="slide-bottom")
			component(:is="CatTable" v-if="tabl" :rows="cat.getTickedRows" :level="getLevel").full-width
			.full-width(v-else)
				component(:is="PodcatChart")
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCat } from '@/stores/category1'
import CatTable from '@/components/CatTable.vue'
import PodcatChart from '@/components/PodcatChart.vue'
import NotPodcat from '@/components/NotPodcat.vue'

const props = defineProps({
	label: String,
})

const tabl = ref(true)
const cat = useCat()

const getLevel = computed(() => {
	if (cat.getItem && cat.getItem.level) {
		return cat.getItem.level
	}
})

const levelCheck = computed(() => {
	if (cat.getItem?.level! > 2 || cat.getItemChildren?.length! == 0) {
		return true
	} else return false
})
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';

.myrow {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem;
}
label {
	font-size: 0.8rem;
	margin: 0 0.5rem;
	cursor: pointer;
}
</style>
