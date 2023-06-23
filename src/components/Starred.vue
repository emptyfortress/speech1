<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useStore } from '@/stores/store'
import { records as myrecords } from '@/stores/operators'
import RecordsTable from '@/components/RecordsTable.vue'

const mystore = useStore()

const records = reactive(myrecords)

const starRecords = computed(() => {
	return records.filter(item => item.star === true)
})

const test = ref(true)
</script>

<template lang="pug">
q-page(padding)
	.container
		q-expansion-item(v-model="test")
			template(v-slot:header)
				q-item-section.line(avatar)
					q-avatar(icon="mdi-star-outline" flat)
				q-item-section
					.zag Избранные записи
			q-card-section.q-px-md
				RecordsTable(:rows="myrecords" starred)
</template>

<style scoped lang="scss"></style>
