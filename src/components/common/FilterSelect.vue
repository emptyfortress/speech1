<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'

const props = defineProps({
	options: {
		type: Array,
		required: true,
		default: []
	}
})
const modelValue = defineModel()
const selected = ref([false, false, false, false])

const selection: Ref<String[]> = ref([])
const toggle = ((opt: string, ind: number) => {
	selection.value.push(opt)
	selected.value[ind] = !selected.value[ind]
})
</script>

<template lang="pug">
p {{ selection }}
q-btn(flat round icon="mdi-filter"  @click="action" dense size="sm") 
	q-menu
		q-list
			q-item(v-for="(opt, index) in options" clickable @click="toggle(opt, index)")
				q-item-section(side)
					q-checkbox(:model-value="selected[index]" dense @update:model-value="toggle(opt, index)")
				q-item-section
					q-item-label {{ opt }}
q-item-se
//
// q-select(v-model="modelValue"
// 	:options="props.options"
// 	standout
// 	multiple
// 	map-options
// 	emit-value
// 	dense
// 	filled)
//
// 	template(v-slot:option="{ itemProps, opt, selected, toggleOption }")
// 		q-item(v-bind="itemProps")
// 			q-item-section(side)
// 				q-checkbox(:modelValue="selected" dense @update:model-value="toggleOption(opt)")
// 			q-item-section
// 				q-item-label {{ opt }}
</template>

<style scoped lang="scss">
.q-select {
	font-size: .7rem;
}

:deep(.q-field--auto-height.q-field--dense .q-field__control),
:deep(.q-field--auto-height.q-field--dense .q-field__native) {
	min-height: 28px;
}

:deep(.q-field--dense .q-field__marginal) {
	height: 30px;
}

:deep(.q-field--filled .q-field__control) {
	padding: 0 3px;
	background: rgba(255, 255, 255, .7);
}

:deep(.q-field--dense .q-field__after),
:deep(.q-field--dense .q-field__append) {
	padding-left: 0;
}
</style>
