<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Siri from '@/components/Siri.vue'

type DialogItem = {
	id: number
	title: string
	content: string
	operator: string
	client: string
	startTime: number
}

const props = defineProps<{
	channels: DialogItem[]
}>()

const selectedDialog = ref<DialogItem | null>(null)
const isDialogOpen = ref(false)
const selectedClient = ref<string | null>(null)
const currentTime = ref(Date.now())

let interval: number
onMounted(() => {
	interval = window.setInterval(() => {
		currentTime.value = Date.now()
	}, 1000)
})
onBeforeUnmount(() => {
	clearInterval(interval)
})

function formatTime(ms: number): string {
	const totalSeconds = Math.floor(ms / 1000)
	const hours = Math.floor(totalSeconds / 3600)
	const minutes = Math.floor((totalSeconds % 3600) / 60)
	const seconds = totalSeconds % 60
	return [hours, minutes, seconds].map((n) => String(n).padStart(2, '0')).join(':')
}

function openDialog(dialog: DialogItem) {
	selectedDialog.value = dialog
	isDialogOpen.value = true
}
</script>

<template lang="pug">
.channel(
	v-for="dialog in props.channels"
	:key="dialog.id"
	@click="openDialog(dialog)"
)
	.row
		q-icon.q-mr-sm(name="mdi-headset" size='18px')
		.text-bold {{ dialog.operator }}

	Siri

	p.text-caption.text-grey Таймер: {{ formatTime(currentTime - dialog.startTime) }}

q-dialog(v-model="isDialogOpen" persistent)
	q-card(style="min-width: 600px; max-width: 90vw")
		q-card-section
			.text-h6 {{ selectedDialog?.title }}
		q-card-section
			p
				strong Оператор:
				|  {{ selectedDialog?.operator }}
			p
				strong Клиент:
				|  {{ selectedDialog?.client }}
			p
				strong Таймер:
				|  {{ selectedDialog ? formatTime(currentTime - selectedDialog.startTime) : '' }}
			q-separator(class="q-my-md")
			p {{ selectedDialog?.content }}
		q-card-actions(align="right")
			q-btn(flat label="Закрыть" color="primary" @click="isDialogOpen = false")
</template>

<style scoped lang="scss">
.channel {
	padding: 0.75rem;
	background: #fff;
	border-radius: 6px;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
	cursor: pointer;
	transition: all 0.2s ease;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	&:hover {
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
		background-color: #f9f9f9;
	}
}
</style>
