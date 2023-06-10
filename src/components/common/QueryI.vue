<template lang="pug">
.node
	.not(@click="not = !not" :class="{active : not}")
		q-checkbox(label="Not" v-model="not" dense size="xs" color="negative")
	.myrow
		q-select(label="Контекстное правило" dense v-model="rule1" :options="ruleOptions")
		div
			q-select(dense
				v-model="keys1"
				use-input
				use-chips
				multiple
				clearable
				outlined
				input-debounce="0"
				:options="options"
				@filter="filterFn"
				bg-color="white"
				).keys
				template(v-slot:option="scope")
					q-item(clickable v-bind="scope.itemProps")
						q-item-section(side v-if="scope.opt.voc")
							component(:is="SvgIcon" name="vocabulary").lib
						q-item-section
							q-item-label {{scope.opt.label}}
				template(v-slot:no-option)
					q-item.text-grey
						q-item-section No results
			q-checkbox(v-model="wordforms" label="Искать производные формы" dense size="xs").wordform
		q-select(label="Канал" dense v-model="channel" :options="channelOptions")
		q-btn(round flat dense @click="clear").reload
			q-icon(name="mdi-reload" size="sm")

		.start(v-if="rule1 === 'Начало'")
			.full
				|Расстояние от начала записи, сек
				q-slider(v-model="fromStart" :min="0" :max="60" :step="1"  label color="primary")
			q-input(:model-value="fromStart" dense outlined bg-color="white" style="width: 50px")
		.start(v-if="rule1 === 'Завершение'")
			.full
				|Расстояние от конца записи, сек
				q-slider(v-model="fromStart" :min="0" :max="60" :step="1"  label color="primary")
			q-input(:model-value="fromStart" dense outlined bg-color="white" style="width: 50px")

		template(v-if="rule1 === 'Около'")
			div
			div
				q-select(dense
					v-model="keys2"
					use-input
					use-chips
					multiple
					clearable
					outlined
					input-debounce="0"
					:options="options"
					@filter="filterFn"
					bg-color="white"
					).keys
					template(v-slot:option="scope")
						q-item(clickable v-bind="scope.itemProps")
							q-item-section(side v-if="scope.opt.voc")
								component(:is="SvgIcon" name="vocabulary").lib
							q-item-section
								q-item-label {{scope.opt.label}}
					template(v-slot:no-option)
						q-item.text-grey
							q-item-section No results
				q-checkbox(v-model="wordforms" label="Искать формы" dense size="xs").wordform
			q-select(label="Канал" dense v-model="channel" :options="channelOptions")


			.start
				.full
					|Расстояние между словами, сек
					q-slider(v-model="fromStart" :min="0" :max="60" :step="1"  label color="primary")
				q-input(:model-value="fromStart" dense outlined bg-color="white" style="width: 50px")

</template>

<script setup lang="ts">
import { ref } from 'vue'
import { words } from '@/stores/list'
import SvgIcon from '@/components/SvgIcon.vue'

const keys1 = ref([])
const keys2 = ref([])
const not = ref(false)
const rule1 = ref('')
const stringOptions = words
const options = ref(stringOptions)
const wordforms = ref(false)
const channel = ref('')
const fromStart = ref(10)
const clear = () => {
	rule1.value = ''
	keys1.value = []
	keys2.value = []
	not.value = false
	wordforms.value = false
	channel.value = ''
	fromStart.value = 10
}

const filterFn = (val: string, update: Function) => {
	update(() => {
		if (val === '') {
			options.value = stringOptions
		} else {
			const needle = val.toLowerCase()
			options.value = stringOptions.filter((v) => v.label.toLowerCase().indexOf(needle) > -1)
		}
	})
}

const ruleOptions = ['Присутствует', 'Отсутствует', 'Около', 'Начало', 'Завершение']
const channelOptions = ['Все', 'Оператор', 'Клиент']
</script>

<style scoped lang="scss">
@import '@/assets/styles/myvariables.scss';

.node {
	background: $bgMain;
	border: 1px solid #ccc;
	border-radius: 4px;
	padding: 1rem;
	width: 100%;
	position: relative;
	min-height: 50px;
	padding-left: 100px;
	&:hover {
		border: 1px solid $primary;
	}
}
.not {
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 80px;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: 0.3s ease all;
	&.active {
		background: pink;
	}
}
.myrow {
	display: grid;
	grid-template-columns: 170px 1fr 130px auto;
	align-items: flex-start;
	column-gap: 2rem;
	row-gap: 1rem;
}
.wordform {
	margin-top: 5px;
}
.start {
	grid-column: 2/4;
	display: flex;
	font-size: 0.9rem;
	gap: 1rem;
	.full {
		width: 100%;
	}
}
.reload {
	color: #666;
}
</style>
