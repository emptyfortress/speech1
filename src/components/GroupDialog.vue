<script setup lang="ts">
import { ref, computed } from 'vue'

const dialog = defineModel<boolean>('dialog')
const groupname = defineModel<string>('groupname')

const props = defineProps({
	edit: {
		type: Boolean,
		required: true,
		default: false
	}
})

const emit = defineEmits(['create', 'update'])

const addGroup = (() => {
	if (props.edit) {
		emit('update', groupname.value)
	} else emit('create', groupname.value)
	dialog.value = false
})

const req = computed(() => {
	return [(val: string) => (val && val.length > 0) || 'Это обязательное поле']
})
</script>

<template lang="pug">
q-dialog(v-model="dialog")
	q-card(style="min-width: 300px")
		q-btn.close(icon="mdi-close" color="negative" round dense v-close-popup)

		q-form.one(ref="myform" no-error-focus @submit="addGroup")
			q-card-section
				.text-h6(v-if='props.edit') Редактировать группу
				.text-h6(v-else) Новая группа
				q-input.q-mt-md(filled v-model="groupname" label='Название группы' autofocus lazy-rules :rules="req")
			q-card-actions.q-mr-md.q-mb-md(align='right')
				q-btn(flat color="primary" label="Отмена" v-close-popup) 
				q-btn(unelevated color="primary" label="Сохранить" type='submit') 
</template>

<style scoped lang="scss"></style>
