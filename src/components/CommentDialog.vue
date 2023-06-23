<script setup lang="ts">
import { ref, onMounted } from 'vue'

// interface Props {
// 	item: Row
// }

// const props = defineProps<Props>()

const props = defineProps({
	comment: {
		type: String,
		default: ''
	}
})

const dialog = defineModel<boolean>({ default: false })

const closeDialog = (() => {
	dialog.value = false
})

const fuck = ref()

// onMounted(() => {
// 	console.log(props.comment)
// 	// fuck.value = props.comment
// })

const emit = defineEmits(['add'])

const add = (() => {
	// emit('add', props.comment)
})
</script>

<template lang="pug">
q-dialog(v-model="dialog")
	q-card(style="width: 500px;")
		q-btn.close(round color="negative" icon="mdi-close" @click="closeDialog")
		q-card-section
			div Комментарий:
			q-input(:model-value="props.comment" filled type="textarea" autofocus hide-bottom-space)
		q-card-actions.q-pa-md(align="right")
			q-btn(flat color="primary" label="Отмена" @click="closeDialog") 
			q-btn(unelevated color="primary" label="Добавить" @click="add" :disable="fuck.length === 0") 
</template>

<style scoped lang="scss"></style>
