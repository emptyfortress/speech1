<script setup lang="ts">
// import { ref } from 'vue'

const props = defineProps<{
	selected: Trainer
}>()

const trainer = props.selected

function getAvatarSrc(fileName: string): string {
	return new URL(`../assets/img/avatars/${fileName}`, import.meta.url).href
}

// const series1 = [{ name: 'Вызовы', data: randomArray(7, 20, 55) }]
// const series2 = [{ name: 'Вызовы', data: randomArray(7, 5, 10) }]

// const chartOptionsMarks = {
// 	chart: {
// 		type: 'area',
// 		sparkline: {
// 			enabled: true,
// 		},
// 		animations: {
// 			enabled: false,
// 		},
// 	},
// 	stroke: {
// 		curve: 'smooth',
// 	},
// 	fill: {
// 		opacity: 0.3,
// 	},
// 	xaxis: {
// 		crosshairs: {
// 			width: 1,
// 		},
// 	},
// 	yaxis: {
// 		min: 0,
// 	},
// 	title: {
// 		text: randomNumber(5, 25, 0),
// 		offsetX: 0,
// 		style: {
// 			fontSize: '24px',
// 		},
// 	},
// 	subtitle: {
// 		text: 'Оценки',
// 		offsetX: 0,
// 		style: {
// 			fontSize: '14px',
// 		},
// 	},
// }
// const chartOptionsComplain = {
// 	chart: {
// 		type: 'area',
// 		sparkline: {
// 			enabled: true,
// 		},
// 		animations: {
// 			enabled: false,
// 		},
// 	},
// 	stroke: {
// 		curve: 'smooth',
// 	},
// 	fill: {
// 		opacity: 0.3,
// 	},
// 	xaxis: {
// 		crosshairs: {
// 			width: 1,
// 		},
// 	},
// 	yaxis: {
// 		min: 0,
// 	},
// 	title: {
// 		text: randomNumber(7, 12, 0),
// 		offsetX: 0,
// 		style: {
// 			fontSize: '24px',
// 		},
// 	},
// 	subtitle: {
// 		text: 'Апелляции',
// 		offsetX: 0,
// 		style: {
// 			fontSize: '14px',
// 		},
// 	},
// }
</script>

<template lang="pug">
div
	.topname
		q-avatar(size="106px")
			img(:src="getAvatarSrc(trainer.photoUrl)", alt="avatar", style="object-fit: cover")
		.text-h6.text-center {{ trainer.lastName }}
		.details
			.caption Должность:
			label Тренер
			.caption Табельный №:
			label {{ trainer.id }}
			.caption Телефон:
			label +7 (535) 123-45-67
			.caption Email:
			label.link name@mail.ru
			.caption Начальник:
			label Орлов П.С.
			.caption Операторы:
			label {{ trainer.operatorCount }}

</template>

<style scoped lang="scss">
.topname {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
}
.link {
	color: $primary;
	text-decoration: underline;
}
.details {
	font-size: 0.9rem;
	display: grid;
	grid-template-columns: auto 1fr;
	column-gap: 1rem;
	row-gap: 0;
	.caption {
		opacity: 0.7;
	}
}
.graphs {
	margin-top: 1rem;
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1rem;
}
</style>
