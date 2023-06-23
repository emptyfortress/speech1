<script setup lang="ts">

interface Props {
	item: Row
}

const props = defineProps<Props>()

const dialog = defineModel<boolean>({ default: false })

const closeDialog = (() => {
	dialog.value = false
})

const emit = defineEmits(['add'])

const add = (() => {
	emit('add', props.item?.comment)
})
</script>

<template lang="pug">
q-dialog(v-model="dialog")
	q-card(style="width: 500px;")
		q-btn.close(round color="negative" icon="mdi-close" @click="closeDialog")
		q-card-section
			div Комментарий:
			q-input(v-model="props.item.comment" filled type="textarea" autofocus hide-bottom-space)
		q-card-actions.q-pa-md(align="right")
			q-btn(flat color="primary" label="Отмена" @click="closeDialog") 
			q-btn(unelevated color="primary" label="Добавить" @click="add" :disable="props.item.comment.length === 0") 
</template>

<style scoped lang="scss"></style>
