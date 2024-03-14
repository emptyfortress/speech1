<template lang="pug">
q-expansion-item(v-model="treepanel")
	template(v-slot:header)
		q-item-section(avatar).line
			q-avatar(icon="mdi-file-tree" flat)
		q-item-section
			.zag Дерево категорий

	q-splitter(v-model="splitterModel" style="height: 450px;")
		template(v-slot:before)
			q-card.left
				CategTree

		template(v-slot:after)
			q-card.right
				component(:is="PodcatTable" :label="label")
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watchEffect } from 'vue'
import { useCat } from '@/stores/category1'
import PodcatTable from '@/components/PodcatTable.vue'
import CategTree from '@/components/CategTree.vue'

const cat = useCat()
const selected = ref('100')

const splitterModel = ref(30)
const treepanel = ref(true)

const label = computed(() => {
	return cat.getItem?.label
})

watchEffect(() => {
	cat.setCatselect(selected.value)
})

onMounted(() => {
	watchEffect(() => {
		cat.setCatselect(selected.value)
	})
})
</script>

<style scoped lang="scss">
@import '@/assets/styles/myvariables.scss';

.top {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem;
	padding-bottom: 0;
}
.q-card {
	margin: 0.5rem;
}
.razv {
	font-size: 0.7rem;
	color: #666;
	cursor: pointer;
}
.scroll {
	height: 332px;
}
.input {
	width: 200px;
}
.right {
	height: 420px;
	overflow: hidden;
}
</style>
