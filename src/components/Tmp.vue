<script setup lang="ts">
import { useStore } from '@/stores/store'
import TableCompare0 from '@/components/TableCompare0.vue'
import TableCompare1 from '@/components/TableCompare1.vue'

const store = useStore()

</script>

<template lang='pug'>
q-expansion-item(v-model="store.table")
	template(v-slot:header)
		q-item-section(avatar).line
			q-avatar(icon="mdi-headset" flat)

		q-item-section
			.zag Операторы
		q-item-section(side)
			q-btn(round flat icon="mdi-cloud-download-outline")

	q-card-section.q-px-md.q-pt-md
		TableCompare1(v-if='store.tableCompare')
		TableCompare0(v-else)

</template>

<style scoped lang="scss"></style>
