<script setup lang="ts">
import { useStore } from '@/stores/store'

const mystore = useStore()
</script>

<template lang="pug">
q-page(padding)
	.container
		q-expansion-item(v-model="mystore.req")
			template(v-slot:header)
				q-item-section.line(avatar)
					q-avatar(icon="mdi-star-outline" flat)
				q-item-section
					.zag Избранные записи
			q-card-section.q-px-md section
</template>

<style scoped lang="scss"></style>
