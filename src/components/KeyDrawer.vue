<template lang="pug">
q-drawer.rd(v-model="mystore.keyDrawer" overlay side="right" :width="300" )
	.bt
		q-btn#start(unelevated flat round icon="mdi-help-circle-outline" color="primary" @click="start") 
		q-btn(unelevated flat round icon="mdi-close" color="primary" @click="mystore.keyDrawer = false" ) 
	component(:is="KeywordList")
</template>

<script setup lang="ts">
import { useStore } from '@/stores/store'
import KeywordList from '@/components/KeywordList.vue'

const emit = defineEmits(['start'])

const mystore = useStore()

const start = (() => {
	emit('start')
})
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
	right: 1.1rem;
	top: 0.3rem;
}
</style>
