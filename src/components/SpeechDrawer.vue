<template lang="pug">
q-drawer(v-model="mystore.speechDrawer" overlay side="right" :width="width" ).rd.speech
	Speech
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/stores/store'
import Speech from '@/components/Speech.vue'

const mystore = useStore()

const width = computed(() => {
	if (mystore.wide === true) {
		return 800
	}
	return 400
})
</script>

<style scoped lang="scss">
.q-drawer {
	transition: 0.3s ease all;
}
</style>
