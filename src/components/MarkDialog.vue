<script setup lang="ts">
import { ref } from 'vue'
const modelValue = defineModel()

const props = defineProps<{
	operator: Operator
	record: any
}>()
const step = ref(1)
const star = ref()
const sound = ref(50)
</script>

<template lang="pug">
q-dialog(v-model="modelValue")
	q-card(style="min-width: 800px; min-height: 50vh;")
		q-card-section.row.justify-between.items-center.q-pb-none
			.text-h6 Оценка качества {{ props.operator.name }}
			q-btn(icon="mdi-close" flat round dense v-close-popup)

		q-card-section
			q-stepper(v-model="step" ref="stepper" header-nav color="primary" animated flat alternative-labels)
				q-step(:name="1" title="Выбор анкеты" prefix="1" :done="step > 1")
					p For each ad campaign that you create, you can control how much you're willing to spend on clicks and conversions, which networks and geographical locations you want your ads to show on, and more.
				q-step(:name="2" title="Стенограмма" prefix="2" :done="step > 2")
					p For each ad campaign that you create, you can control how much you're willing to spend on clicks and conversions, which networks and geographical locations you want your ads to show on, and more.
				q-step(:name="3" title="Оценки" prefix="3"  :done="step > 3")
					p For each ad campaign that you create, you can control how much you're willing to spend on clicks and conversions, which networks and geographical locations you want your ads to show on, and more.
				q-step(:name="4" title="Комментарий" prefix="4"  :done="step > 4")
					p For each ad campaign that you create, you can control how much you're willing to spend on clicks and conversions, which networks and geographical locations you want your ads to show on, and more.
				q-step(:name="5" title="Сохранение" prefix="5"  :done="step > 4")
    
		.myplayer
			q-linear-progress(:value=".6" color="positive")
			q-btn(flat round size="sm" @click.stop="star = true")
				q-icon(v-if="star === true" name="mdi-star" color="primary")
				q-icon(v-else name="mdi-star-outline" color="grey" )
			div {{ props.record.date }}
			.player
				q-btn(round flat icon="mdi-rewind" @click.stop)
				q-btn(round flat icon="mdi-pause" @click.stop)
				q-btn(round flat icon="mdi-fast-forward" @click.stop)
			.time 02:31
			.row.items-center
				q-icon(name="mdi-volume-medium" size="sm")
				q-slider.slide(color="primary" v-model="sound")
				q-icon(name="mdi-volume-high" size="sm")
</template>

<style scoped lang="scss">
.myplayer {
	position: absolute;
	left: 0;
	bottom: 0;
	right: 0;
	background: $blue-grey-9;
	color: #6d8e9e;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	padding-left: 1rem;
	gap: 2rem;
	font-size: 0.9rem;
	height: 48px;

	.q-linear-progress {
		position: absolute;
		top: 0;
		left: 0;
	}

	.player {
		color: white;
		display: flex;
		justify-items: flex-start;
		align-items: center;
		height: 100%;
	}

	.time {
		font-size: 2rem;
		font-weight: lighter;
		letter-spacing: 1px;
		color: white;
	}

	.slide {
		width: 150px;
	}
}
</style>
