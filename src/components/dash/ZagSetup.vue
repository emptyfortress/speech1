<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useWidget } from '@/stores/widgetStore'
import MyInput from '@/components/common/MyInput.vue'
import MySelect from '@/components/common/MySelect.vue'

const widget = useWidget()
const title = ref('')
const subtitle = ref('')
const zagAuto = ref(false)
const podzagAuto = ref(false)
const zagData = ref(false)
const podzagData = ref(false)

const wOptions = [300, 400, 500, 600]
const sOptions = ['normal', 'italic']
const aOptions = ['left', 'center', 'right']

onMounted(() => {
	title.value = 'fuck'
})
</script>

<template lang="pug">
.grid2
	div
		MyInput(filled bg="#ccc" label="Заголовок" v-model="widget.currentWidget.text" :disable="zagData")
		q-checkbox(v-model="zagData" dense label="Показывать данные вместо заголовка")
	div
		MyInput(filled bg="#ccc" label="Подзаголовок" v-model="subtitle" :disable="podzagData")
		q-checkbox(v-model="podzagData" dense label="Показывать данные вместо подзаголовка")

	fieldset
		legend Настройки
		q-checkbox(v-model="zagAuto" dense label="Использовать настройки по умолчанию")
		.form.q-mt-md(v-if="!zagAuto")
			label Размер шрифта, rem:
			q-slider(v-model="widget.head.size" label :min="0.3" :max="1.8" :step="0.01" )
			label Жирность
			q-select(v-model="widget.head.weight" dense filled bg-color="#ccc" :options="wOptions" )
			label Стиль
			q-select(v-model="widget.head.style" dense filled bg-color="#ccc" :options="sOptions" )
			label Выравнивание
			q-select(v-model="widget.head.align" dense filled bg-color="#ccc" :options="aOptions" )
			label Цвет шрифта
			q-input(dense filled bg-color="#ccc" v-model="widget.head.fontColor" )
				template(v-slot:append)
					q-icon(name="mdi-eyedropper-variant" class="cursor-pointer")
						q-popup-proxy(cover transition-show="scale" transition-hide="scale")
							q-color(v-model="widget.head.fontColor")

	fieldset
		legend Настройки
		q-checkbox(v-model="podzagAuto" dense label="Использовать настройки по умолчанию")
		.form.q-mt-md(v-if="!podzagAuto")
			label Размер шрифта, rem:
			q-slider( v-model="widget.subhead.size" label :min="0.3" :max="1.8" :step="0.01" )
			label Жирность
			q-select(v-model="widget.subhead.weight" dense filled bg-color="#ccc" :options="wOptions" )
			label Стиль
			q-select(v-model="widget.subhead.style" dense filled bg-color="#ccc" :options="sOptions" )
			label Выравнивание
			q-select(v-model="widget.subhead.align" dense filled bg-color="#ccc" :options="aOptions" )
			label Цвет шрифта
			q-input(dense filled bg-color="#ccc" v-model="widget.subhead.fontColor" )
				template(v-slot:append)
					q-icon(name="mdi-eyedropper-variant" class="cursor-pointer")
						q-popup-proxy(cover transition-show="scale" transition-hide="scale")
							q-color(v-model="widget.subhead.fontColor")
</template>

<style scoped lang="scss">
.full {
	grid-column: 1/-1;
}
.grid2 {
	display: grid;
	grid-template-columns: 1fr 1fr;
	align-items: start;
	column-gap: 3rem;
	row-gap: 1rem;
}
legend {
	padding: 0 5px;
	font-size: 0.9rem;
}
fieldset {
	border: 3px double #ccc;
	padding: 1rem;
	width: 99%;
	&.dis {
		opacity: 0.6;
	}
}
.form {
	display: grid;
	grid-template-columns: auto 1fr;
	justify-items: stretch;
	align-items: center;
	column-gap: 1rem;
	row-gap: 0.5rem;
	font-size: 0.9rem;
}
.small {
	width: 70px;
}
</style>
