<template lang="pug">
q-page(padding)
	.container
		.huge
			.ava
				.q-avatar
					img(src="@/assets/img/user1.svg")
				div
					.text-weight-bold Голомудько
					.name Разубай Буранович
				q-space
				q-btn(label="Выйти" unelevated color="primary")
			q-btn(color="white" round icon="mdi-camera" text-color="black" size="sm").photo
		br
		br
		br
		br
		q-tabs(v-model="tab" dense active-color="primary" indicator-color="primary" align="left" )
			q-tab(name="marks" label="Оценки")
			q-tab(name="records" label="Мои записи")
		q-separator

		q-tab-panels(v-model="tab" animated)
			q-tab-panel(name="marks")
				.mygrid
					.q-pt-lg
						q-list
							q-item(v-for="item in pagemarks" clickable :key="item.id" :class="{ 'text-weight-bold' : item.read == false }")
								q-item-section(avatar)
									q-icon(name="mdi-trophy-outline" v-if="item.read")
									q-icon(name="mdi-trophy" v-else)
								q-item-section
									q-item-label {{ item.text }}
								q-item-section(side) {{ item.mark }}
						.flex.flex-center.q-ma-lg
							q-pagination(v-model="current" :max="2")

					VueApexCharts(type="area" height="340" :options="options" :series="series")

			q-tab-panel(name="records" )
				div records

</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { marks } from '@/stores/marks'
import VueApexCharts from 'vue3-apexcharts'

const tab = ref('marks')
const current = ref(1)
const pagemarks = computed(() => {
	return current.value == 1
		? marks.filter((el: any) => el.id < 7)
		: marks.filter((el: any) => el.id >= 7)
})

const calcCat = computed(() => {
	return marks.map((el) => el.text)
})
const calcSer = computed(() => {
	return marks.map((el) => el.mark)
})

const series = [{ name: 'Оценки', data: calcSer.value }]
const options = {
	xaxis: {
		type: 'datetime',
		categories: calcCat.value,
	},
	chart: {
		type: 'area',
		zoom: {
			enabled: false,
		},
	},
	dataLabels: {
		enabled: true,
	},
	stroke: {
		curve: 'smooth',
	},
	title: {
		text: 'Оценки',
		align: 'left',
	},
	yais: {
		opposite: true,
		data: calcSer.value,
	},
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/myvariables.scss';
.huge {
	height: 100px;
	background: url(@/assets/img/abstract.jpg);
	background-size: cover;
	background-position: 0 30%;
	position: relative;
}
.photo {
	position: absolute;
	bottom: -70px;
	left: 40px;
}
.ava {
	height: 100px;
	width: 100%;
	position: absolute;
	bottom: -70px;
	left: 0;
	display: flex;
	padding-left: 50px;
	justify-content: flex-start;
	align-items: flex-end;
	gap: 2rem;
	font-size: 1.2rem;
	.q-avatar {
		width: 100px;
		height: 100px;
	}
}
.mygrid {
	display: grid;
	grid-template-columns: 1fr 2fr;
	justify-content: start;
	grid-column-gap: 3rem;
	align-items: center;
	.q-separator {
		grid-column: 1/-1;
	}
	.test {
		height: 100%;
		width: 100%;
		background: pink;
	}
}
.mygrid1 {
	display: grid;
	grid-template-columns: auto 1fr;
	justify-content: start;
	gap: 1rem;
	grid-column-gap: 2rem;
}
.q-tab-panels {
	min-height: 500px;
	box-shadow: $card-shadow;
	padding: 1rem;
	padding-top: 0;
	border-radius: 0 0 4px 4px;
	font-size: 0.9rem;
}
</style>
