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
				.top
					q-btn(round flat dense icon="mdi-unfold-more-horizontal" @click="expandAll")
						q-tooltip Развернуть
					q-input(dense ref="input" debounce="0" hide-bottom-space color="primary" autofocus v-model="filter" clearable @clear="filter = ''").input
						template(v-slot:prepend)
							q-icon(name="mdi-magnify")

				q-card-section
					q-scroll-area.scroll
						q-tree(:nodes="cat.cat"
							ref="tree"
							node-key="id"
							no-results-label="Ничего нет"
							v-model:expanded="expanded"
							v-model:ticked="ticked"
							tick-strategy="leaf-filtered"
							:filter="filter").cat
							template(v-slot:default-header="prop")
								.nod
									component(:is="WordHighlighter" :query="filter") {{prop.node.label}}

		template(v-slot:after)
			q-card.right
				component(:is="PodcatTable" :label="label")
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watchEffect } from 'vue'
import type { Ref } from 'vue'
import { useCat } from '@/stores/category1'
import WordHighlighter from 'vue-word-highlighter'
import PodcatTable from '@/components/PodcatTable.vue'

const cat = useCat()
const selected = ref('100')
const ticked = ref([])
const expanded: Ref<string[]> = ref(['0', '1'])

const splitterModel = ref(30)
const treepanel = ref(true)
const filter = ref('')

const label = computed(() => {
	return cat.getItem?.label
})

const tree = ref()
const expandAll = () => {
	if (expanded.value.length === 0) {
		tree.value.expandAll()
	} else tree.value.collapseAll()
}
watchEffect(() => {
	cat.setCatselect(selected.value)
	cat.setTicked(ticked.value)
})

onMounted(() => {
	watchEffect(() => {
		if (filter.value.length > 1) {
			tree.value.expandAll()
		}
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
.nod {
	font-size: 0.8rem;
}
.input {
	width: 200px;
}
.right {
	height: 420px;
	overflow: hidden;
}
</style>
