<script setup lang="ts">
import { ref } from 'vue'

interface Props {
	label?: string
	filled?: boolean
	bg?: string
	disable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	filled: false,
	bg: 'white',
})

const modelValue = defineModel<string | null | undefined>()
</script>

<template lang="pug">
div
	.label {{ label }}
	q-input(
		v-model="modelValue"
		:filled="props.filled"
		:outlined="!props.filled"
		:bg-color="props.bg"
		:disable="props.disable"
		hide-bottom-space
		dense
		)
		template(v-slot:prepend)
			q-icon(name="mdi-calendar" class="cursor-pointer")
				q-popup-proxy(cover transition-show="scale" transition-hide="scale")
					q-date(v-model="modelValue" mask="YYYY-MM-DD HH:mm")
						.row.items-center.justify-end
							q-btn(v-close-popup label="Close" color="primary" flat)

		template(v-slot:append)
			q-icon(name="mdi-clock-outline" class="cursor-pointer")
				q-popup-proxy(cover transition-show="scale" transition-hide="scale")
					q-time(v-model="modelValue" mask="YYYY-MM-DD HH:mm" format24h)
						.row.items-center.justify-end
							q-btn(v-close-popup label="Close" color="primary" flat)

</template>

<style scoped lang="scss">
.label {
	font-size: 0.8rem;
	font-weight: 600;
}

:deep(.q-input) {
	width: 100%;
}
</style>
