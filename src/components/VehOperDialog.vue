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
	q-card(style='min-width: 780px; max-width:80vw')
		q-btn.close(icon="mdi-close" color="negative" round dense v-close-popup)
		q-card-section.row.items-center.q-pb-none.justify-between
			.text-h6 {{ props.oper }}
			div Интегральный чек-лист

		q-card-section
			VehOperChart2
		q-card-section
			q-list(dense)
				q-item 'презентация автострахование',
				q-item 'выявление автострахование',
				q-item 'презентация командировки',
				q-item 'выявление командировки',
				q-item 'презентация лизинг',
				q-item 'выявление лизинг',
				q-item 'презентация мойка',
				q-item 'выявление мойка',
				q-item 'презентация платные дороги',
				q-item 'выявление платные дороги',
				q-item 'презентация ремонт',
				q-item 'выявление ремонт',
				q-item 'презентация сервис',
				q-item 'выявление сервис',
				q-item 'презентация такси',
				q-item 'выявление такси',
</template>

<style scoped lang="scss">
.q-card {
	padding: 1rem;
}
</style>
