<template lang="pug">
q-dialog(v-model="props.show")
	q-card(style="width: 1000px; max-width: 80vw;")
		q-btn(round color="negative" icon="mdi-close" @click="close").close
		component(:is="Podcat" :categoryName="props.category")
</template>

<script setup lang="ts">
import Podcat from '@/components/Podcat.vue'

const props = defineProps({
	show: Boolean,
	category: String,
})
const emit = defineEmits(['close'])

const close = () => {
	emit('close')
}
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
</style>
