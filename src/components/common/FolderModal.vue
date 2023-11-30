<script setup lang="ts">
import WordHighlighter from 'vue-word-highlighter'
const modelValue = defineModel()
</script>

<template lang="pug">
q-dialog(v-model="modelValue")
	q-card( style="width: 680px;")
		q-card-section.row.items-center.q-pb-none
			.text-h6 Выберите папку с запросами
			q-space
			q-btn(icon="mdi-close" flat round dense v-close-popup)

		// q-card-section
			.top
				q-btn(round flat dense icon="mdi-unfold-more-horizontal" @click="expandAll")
					q-tooltip Развернуть
				q-input(dense ref="input" debounce="0" hide-bottom-space color="primary" autofocus v-model="filter" clearable @clear="filter = ''").input
					template(v-slot:prepend)
						q-icon(name="mdi-magnify")

		// q-card-section
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
			div fuck
		q-card-section
			div Здесь будет дерево для выбора

		q-card-actions(align="right")
			q-btn(flat color="primary" label="Отмена" @click="" v-close-popup) 
			q-btn(unelevated color="primary" label="Выбрать" @click="" v-close-popup) 
</template>

<style scoped lang="scss">
.top {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem;
	padding-bottom: 0;
}
.input {
	width: 200px;
}
.scroll {
	height: 332px;
}
</style>
