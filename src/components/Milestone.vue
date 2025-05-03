<script setup lang="ts">
const props = defineProps({
	width: String,
	top: String,
	left: String,
})

const modelValue = defineModel<boolean>()

const words = [
	{ id: 0, time: '0:10:26', label: 'Привет' },
	{ id: 1, time: '0:19:56', label: 'Каг дела' },
	{ id: 2, time: '0:39:56', label: 'Потом' },
	{ id: 3, time: '0:57:34', label: 'Пока' },
]
const veha = [
	{ id: 0, time: '0:12:26', label: 'Веха 1' },
	{ id: 1, time: '0:17:56', label: 'Веха 1' },
]
const emo = [
	{ id: 0, time: '0:22:26', label: 'Гнев' },
	{ id: 1, time: '0:20:53', label: 'Ярость' },
]
const sys = [{ id: 0, time: '0:14:26', label: 'Удержание звонка' }]
</script>

<template lang="pug">
.milestone(v-if='modelValue')
	div
		.hd Слова и фразы
		q-list(dark)
			q-item(clickable v-for="item in words")
				q-item-section(side)
					.time.t1 {{ item.time }}
				q-item-section
					q-label {{ item.label }}
	div
		.hd Вехи
		q-list(dark)
			q-item(clickable v-for="item in veha")
				q-item-section(side)
					.time.t2 {{ item.time }}
				q-item-section
					q-label {{ item.label }}
	div
		.hd Эмоции
		q-list(dark)
			q-item(clickable v-for="item in emo")
				q-item-section(side)
					.time.t3 {{ item.time }}
				q-item-section
					q-label {{ item.label }}
	div
		.hd Системные
		q-list(dark)
			q-item(clickable v-for="item in sys")
				q-item-section(side)
					.time.t4 {{ item.time }}
				q-item-section
					q-label {{ item.label }}
</template>

<style scoped lang="scss">
.milestone {
	position: absolute;
	width: v-bind(width);
	height: 200px;
	top: v-bind(top);
	left: v-bind(left);
	background: hsla(200deg, 17.91%, 26.27%, 0.85);
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	column-gap: 1.5rem;
	padding: 0.5rem 1rem;
	.hd {
		font-size: 0.8rem;
		color: white;
		margin-left: 1rem;
		font-weight: 600;
		margin-bottom: 0.5rem;
	}
	.q-list {
		font-size: 0.8rem;
		margin-left: 1rem;
		.q-item {
			padding: 2px 5px;
			min-height: 16px;
		}
	}
	.time {
		&.t1 {
			color: yellow;
		}
		&.t2 {
			color: #0992ff;
		}
		&.t3 {
			color: #ff09d2;
		}
		&.t4 {
			color: white;
		}
	}
}
</style>
