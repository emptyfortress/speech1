<template lang="pug">
q-drawer.rd(v-model="mystore.keyDrawer" overlay side="right" :width="300" )
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
	right: 1.3rem;
	top: 0.6rem;
}
</style>
