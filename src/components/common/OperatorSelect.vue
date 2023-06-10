<script setup lang="ts">
import { ref } from 'vue'
import { operators } from '@/stores/operators'

const menu = ref(false)
// const operators = ref([])
const selectedOperators = ref([])
</script>

<template lang="pug">
.item(@click="menu = true")
	span test
	q-menu(anchor="top left" self="top left" v-if="menu" )
		q-select(outlined v-model="selectedOperators"
			clearable
			autofocus
			use-input
			input-debounce="0"
			label="Оператор"
			:options="operators"
			behavior="menu").men

				template(v-slot:option="scope")
					q-item(clickable v-bind="scope.itemProps" @click="")
						q-item-section
							q-item-label {{scope.opt.name}}
				template(v-slot:no-option)
					q-item(clickable)
						q-item-section.text-grey No results

</template>

<style scoped lang="scss"></style>
