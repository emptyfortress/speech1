<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import RecordsTable from '@/components/nlq/RecordsTable.vue'
import { records as myrecords } from '@/stores/operators'

const modelValue = defineModel()

const star = ref()
const sound = ref(50)

const records = reactive(myrecords)
const starRecords = computed(() => {
	return records.filter(item => item.star === true)
})
const filter = ref('')
const selection = ref(null)
const setSelection = ((e: any) => {
	selection.value = e
})
const emit = defineEmits(['choose'])

const choose = (() => {
	emit('choose', selection.value)
	modelValue.value = false
})
</script>

<template lang="pug">
q-dialog(v-model="modelValue")
	q-card(style="min-width: 1200px;")
		q-btn.close(icon="mdi-close" round dense color="negative" v-close-popup)
		q-card-section.row.justify-between.items-center.q-pb-none
			.text-h6 Выбрать запись для оценки
			q-input.filter(dense debounce="300" color="primary" v-model="filter" clearable)
				template(v-slot:prepend)
					q-icon(name="mdi-magnify")

		q-card-section
			component(:is="RecordsTable" :rows="starRecords" @select='setSelection')

		q-card-actions.q-pa-md(align="center")
			q-btn(flat color="primary" label="Отмена" v-close-popup) 
			q-btn(unelevated color="primary" label="Выбрать" @click="choose")
    
</template>

<style scoped lang="scss">
.filter {
	width: 200px;
	margin-right: 1rem;
}
</style>
