<template lang="pug">
.padding
	q-input(ref="input" dense v-model="filter" autofocus clearable hide-bottom-space @clear="filter = ''" @update:model-value="test")
		template(v-slot:prepend)
			q-icon(name="mdi-magnify" @click="test")
</template>

<script setup>
import { onMounted, ref } from 'vue'

// const watch = () => document.querySelector('#input')!.focus()

const filter = ref('')

const test = () => {
	input.value.focus()
}
onMounted(() => {
	input.value.focus()
})

const input = ref(null)
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
.q-input {
	transform: translateY(-7px);
	// width: 230px;
}
.q-field--dense {
	height: 32px;
}
</style>
