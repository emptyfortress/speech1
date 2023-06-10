<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import WordHighlighter from 'vue-word-highlighter'
import { useLogic } from '@/stores/logic'
import draggable from 'vuedraggable'

const mystore = useLogic()

const firstItem = ref(true)
const secondItem = ref(true)

const alllogic = computed(() => {
	return mystore.allLogic.filter((item) => {
		if (query.value) {
			return item.label.toLowerCase().includes(query.value.toLowerCase())
		}
		return mystore.allLogic
	})
})

const mylogic = computed(() => {
	return alllogic.value.filter((item) => item.star === true)
})
const otherlogic = computed(() => {
	return alllogic.value.filter((item) => item.star !== true)
})

const query = ref('')
const clearFilter = () => (query.value = '')
watch(query, (val) => {
	if (val !== null) {
		secondItem.value = true
		firstItem.value = true
	} else return
})
</script>

<template lang="pug">
q-form.quick
	q-card-section.q-pt-xs
		q-input(dense
			v-model="query"
			autofocus
			clearable
			@clear="clearFilter"
			placeholder="фильтр"
			).query
			template(v-slot:prepend)
				q-icon(name="mdi-magnify")

	q-expansion-item(v-model="firstItem" header-class="text-bold")
		template(v-slot:header)
			q-item-section(avatar)
				q-icon(name="mdi-star-outline")
			q-item-section Мои запросы
			q-item-section(side) ({{mylogic.length}})

		component(:is="draggable" v-model="mylogic" itemKey="item.id" group="subcat").q-mb-lg
			template(#item="{ element }")
				q-item(tag="label" dense)
					q-item-section(side top)
						q-btn(dense unelevated round icon="mdi-star" size="10px" )
					q-item-section
						q-item-label
							WordHighlighter(:query="query") {{ element.label }}

	q-expansion-item(v-model="secondItem" header-class="text-bold")
		template(v-slot:header)
			q-item-section(avatar)
				q-icon(name="mdi-cloud-search-outline")
			q-item-section Другие запросы
			q-item-section(side) ({{otherlogic.length}})
		component(:is="draggable" v-model="otherlogic" itemKey="item.id" group="subcat").q-mb-lg
			template(#item="{ element }")
				q-item(tag="label" dense)
					q-item-section(side top)
						q-btn(dense unelevated round icon="mdi-star-outline" size="10px")
					q-item-section
						q-item-label
							WordHighlighter(:query="query") {{ element.label }}
</template>

<style scoped lang="scss">
@import '@/assets/styles/myvariables.scss';

.quick .q-field--dense .q-field__control,
.q-field--dense .q-field__marginal {
	height: 28px !important;
}
.quick {
	font-size: 0.9rem;
}
.query {
	font-size: 1rem;
	flex-grow: 1;
}
.selected {
	color: inherit;
	background: inherit;
}
.comment {
	font-size: 0.8rem;
	line-height: 100%;
}
.sortable-ghost,
.sortable-drag {
	background: $bgMain;
	border: 1px solid $primary;
	.q-checkbox,
	.q-icon {
		visibility: hidden;
	}
}
</style>
