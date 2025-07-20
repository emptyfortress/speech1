<script setup lang="ts">
import { ref, computed } from 'vue'
import SuflerChat from '@/components/SuflerChat.vue'

const modelValue = defineModel<boolean>()

type DialogItem = {
	id: number
	title: string
	content: string
	operator: string
	client: string
	startTime: number
	in: boolean
}

const props = defineProps<{
	selectedDialog: DialogItem
	currentTime: number
}>()

function formatTime(ms: number): string {
	const totalSeconds = Math.floor(ms / 1000)
	const hours = Math.floor(totalSeconds / 3600)
	const minutes = Math.floor((totalSeconds % 3600) / 60)
	const seconds = totalSeconds % 60
	return [hours, minutes, seconds].map((n) => String(n).padStart(2, '0')).join(':')
}

const time = computed(() => {
	return formatTime(props.currentTime - props.selectedDialog.startTime)
})
const close = () => {
	modelValue.value = false
}

type EventItem = {
	label: string
	time: number // миллисекунды от начала диалога
}
const events = ref<EventItem[]>([
	{ label: 'Жалоба', time: 120000 }, // 2:00
	{ label: 'Раздражение', time: 245000 }, // 4:05
	{ label: 'Отказ от услуги', time: 540000 }, // 9:00
])
</script>

<template lang="pug">
q-dialog(v-model="modelValue" persistent)
	q-card(style="min-width: 900px; max-width: 90vw")
		q-btn(round color="negative" icon="mdi-close" @click="close").close
		q-card-section
			.text-h6
				template(v-if='props.selectedDialog.in')
					q-icon.q-mr-sm(name="mdi-phone-incoming" size='22px')
					|Входящий звонок
				template(v-if='!props.selectedDialog.in')
					q-icon.q-mr-sm(name="mdi-phone-outgoing" size='22px')
					|Исходящий звонок
		q-card-section.q-pt-none
			.row.align-center.justify-between
				div
					strong Оператор:
					|  {{ props.selectedDialog.operator }}
				strong Таймер: {{ time }}
			q-separator(class="q-my-md")
			.grid
				.text
					q-list(dense)
						q-item(
							v-for="(event, index) in events"
							:key="index"
							clickable
							@click=""
						)
							q-item-section(side)
								q-icon(name="mdi-lightning-bolt-circle" color="deep-orange")

							q-item-section
								q-item-label {{ event.label }}

							q-item-section(side)
								q-item-label(caption) {{ formatTime(event.time) }}

				.list
					SuflerChat

		q-card-actions(align="right")
			q-btn(flat label="Закрыть" color="primary" v-close-popup)
</template>

<style scoped lang="scss">
.grid {
	display: grid;
	grid-template-columns: 2fr 3fr;
	column-gap: 1rem;
}
</style>
