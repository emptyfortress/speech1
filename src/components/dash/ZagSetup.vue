<script setup lang="ts">
import { ref } from 'vue'
import MyInput from '@/components/common/MyInput.vue'

const name = ref('')
const status = ref('')
</script>

<template lang="pug">
.grid2
	.q-gutter-y-md
		MyInput(filled bg="#ccc" label="Заголовок" v-model="name")
		MyInput(filled bg="#ccc" label="Подзаголовок" v-model="status")

	MyInput(filled bg="#ccc" label="Заголовок" v-model="name" )
</template>

<style scoped lang="scss">
.grid2 {
	display: grid;
	grid-template-columns: 300px 1fr;
	align-items: start;
	column-gap: 1rem;
}
</style>
