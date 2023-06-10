<template lang="pug">
q-drawer(v-model="mystore.keyDrawer" overlay side="right" :width="300" ).rd
	.bt
		q-btn(unelevated round icon="mdi-close" color="primary" @click="mystore.keyDrawer = false" size="sm") 
	component(:is="KeywordList")
</template>

<script setup lang="ts">
import { useStore } from '@/stores/store'
import KeywordList from '@/components/KeywordList.vue'

const mystore = useStore()
</script>

<style scoped lang="scss">
.date {
	margin-top: 0;
}
.rd {
	position: relative;
}
.bt {
	position: absolute;
	right: 1.2rem;
	top: 0.8rem;
}
</style>
