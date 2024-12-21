<script setup lang="ts">
import { ref } from 'vue'
import VehOperChart2 from '@/components/VehOperChart2.vue'

const modelValue = defineModel<boolean>()

const props = defineProps({
	oper: {
		type: String,
		required: true,
		default: 'Елена'
	},
})

</script>

<template lang="pug">
q-dialog(v-model="modelValue")
	q-card(style='min-width: 850px; max-width:80vw')
		q-btn.close(icon="mdi-close" color="negative" round dense v-close-popup)
		q-card-section.row.items-center.q-pb-none.justify-between
			.text-h6 {{ props.oper }}
			div Интегральный чек-лист

		.horiz
			VehOperChart2
			q-list.q-mt-md(dense)
				q-item
					q-item-section(side) 1
					q-item-section презентация автострахование
				q-item
					q-item-section(side) 2
					q-item-section выявление автострахование
				q-item
					q-item-section(side) 3
					q-item-section презентация командировки
				q-item
					q-item-section(side) 4
					q-item-section выявление командировки
				q-item
					q-item-section(side) 5
					q-item-section презентация лизинг
				q-item
					q-item-section(side) 6
					q-item-section выявление лизинг
				q-item
					q-item-section(side) 7
					q-item-section презентация мойка
				q-item
					q-item-section(side) 8
					q-item-section выявление мойка
				q-item
					q-item-section(side) 9
					q-item-section презентация платные дороги
				q-item
					q-item-section(side) 10
					q-item-section выявление платные дороги
				q-item
					q-item-section(side) 11
					q-item-section презентация ремонт
				q-item
					q-item-section(side) 12
					q-item-section выявление ремонт
				q-item
					q-item-section(side) 13
					q-item-section презентация сервис
				q-item
					q-item-section(side) 14
					q-item-section выявление сервис
				q-item
					q-item-section(side) 15
					q-item-section презентация такси
				q-item
					q-item-section(side) 16
					q-item-section выявление такси
</template>

<style scoped lang="scss">
.q-card {
	padding: 1rem;
}
.horiz {
	display: grid;
	grid-template-columns: 1fr auto;
	column-gap: 1rem;
}
.q-list {
	font-size: .7rem;
}
.q-list--dense > .q-item {
	min-height: 20px;
	padding: 0 16px;
}
</style>
