<template lang="pug">
.grid
	div
		.label Ключевые слова
		q-select(dense
			v-model="mystore.keys"
			use-input
			use-chips
			multiple
			clearable
			outlined
			input-debounce="0"
			:options="options"
			@filter="filterFn"
			@clear="clear"
			bg-color="white").keys
			template(v-slot:option="scope")
				q-item(clickable v-bind="scope.itemProps")
					q-item-section(side v-if="scope.opt.voc")
						component(:is="SvgIcon" name="vocabulary").lib
					q-item-section
						q-item-label {{scope.opt.label}}
			template(v-slot:no-option)
				q-item.text-grey
					q-item-section No results

	MySelect(label="Тип искомых слов" :model="typmodel" :options="typ")
	MySelect(label="Положение слова в записи" :model="placemodel" :options="place")
	MySelect(label="Канал" :model="channelmodel" :options="channel")

</template>

<script setup>
import { ref } from 'vue'
import { words } from '@/stores/list'
import { useStore } from '@/stores/store'
import MySelect from '@/components/common/MySelect.vue'
import SvgIcon from '@/components/SvgIcon.vue'

const typ = ['Рекомендованные', 'Запрещенные']
const place = ['Весь файл', 'Первые', 'Последние']
const channel = ['Все', 'Оператор', 'Клиент']
const typmodel = ref('Рекомендованные')
const placemodel = ref('Весь файл')
const channelmodel = ref('Все')

const mystore = useStore()
const stringOptions = words
const options = ref(stringOptions)
const filterFn = (val, update, abort) => {
	update(() => {
		if (val === '') {
			options.value = stringOptions
		} else {
			const needle = val.toLowerCase()
			options.value = stringOptions.filter((v) => v.label.toLowerCase().indexOf(needle) > -1)
		}
	})
}
const clear = () => {
	mystore.clearSelected()
}
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';

.grid {
	margin-top: 1rem;
	margin-bottom: 1rem;
	display: grid;
	grid-template-columns: 1fr 210px 230px 130px;
	gap: 1rem;
}
.label {
	font-size: 0.8rem;
	font-weight: 600;
}
.lib {
	font-size: 0.8rem;
}
</style>
