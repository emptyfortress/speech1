<script setup lang="ts">
import { ref, computed } from 'vue'
import draggable from 'vuedraggable'
import WordHighlighter from 'vue-word-highlighter'
import { useLogic } from '@/stores/logic'


const mylogic = useLogic()
const query = ref('')
const firstItem = ref(true)

const clearFilter = () => {
	query.value = ''
}

const alllogic = computed({
	get: () => {
		if (query.value) {
			return mylogic.allLogic.filter((e) =>
				e.label.toLowerCase().includes(query.value.toLowerCase())
			)
		} else return mylogic.allLogic
	},
	set: (val) => mylogic.updateLogicList(val),
})

const start = (() => {
	console.log(111)
})
</script>

<template lang="pug">
q-form.quick
	q-card-section.q-pt-xs
		q-input(dense
			v-model="query"
			clearable
			@clear="clearFilter"
			placeholder="фильтр"
			).query
			template(v-slot:prepend)
				q-icon(name="mdi-magnify")
	q-expansion-item(v-model="firstItem" header-class="text-bold")
		template(v-slot:header)
			q-item-section Логические запросы
			q-item-section(side) ({{ mylogic.allLogic.length }})
		q-list(dense).q-mb-lg
			component(:is="draggable"
				v-model="alllogic"
				itemKey="id"
				@start='start'
				:group="{ name: 'vehi', pull: 'clone', put: false }"
				)

				template(#item="{ element }")
					q-item(tag="label" v-ripple dense)
						q-item-section(side v-if="element.star")
							q-icon(dense name="mdi-star" size="10px")
						q-item-section(side v-else)
							q-icon(dense name="" size="10px")
						q-item-section
							q-item-label
								WordHighlighter(:query="query") {{ element.label }}
</template>

<style scoped lang="scss">
.quick .q-field--dense .q-field__control,
.q-field--dense .q-field__marginal {
	height: 28px !important;
}

.query {
	font-size: 1rem;
	flex-grow: 1;
}
</style>
