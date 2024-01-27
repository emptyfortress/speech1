<script setup lang="ts">
import { ref, computed } from 'vue'
import { operators } from '@/stores/operators'
import { useRoute } from 'vue-router'
import Speech from '@/components/Speech.vue'
import EvalProcess from '@/components/evaluate/EvalProcess.vue'

const route = useRoute()
const oper = operators.find((el) => el.id.toString() == route.params.id)
const splitterModel = ref(60)
const hei = computed(() => {
	return 'height: ' + (window.innerHeight - 125) + 'px;'
})
const star = ref(false)
const sound = ref(50)
</script>

<template lang="pug">
q-page(padding)
	.container
		q-breadcrumbs
			q-breadcrumbs-el(icon="home" to="/")
			q-breadcrumbs-el(label="Операторы" to="/operators")
			q-breadcrumbs-el(:label="oper.name" :to="`/oper/${oper.id}`")
			q-breadcrumbs-el(label="Оценка качества" to="`/oper/${oper.id}/eval`")
		q-splitter(v-model="splitterModel" :limits="[0, 100]" :style="hei")
			template(v-slot:before)
				EvalProcess

			template(v-slot:after)
				.after
					.myplayer
						q-linear-progress(:value=".6" color="positive")
						q-btn(flat round size="sm" @click.stop="star = true")
							q-icon(v-if="star === true" name="mdi-star" color="primary")
							q-icon(v-else name="mdi-star-outline" color="grey" )
						.player
							q-btn(round flat icon="mdi-rewind" @click.stop)
							q-btn(round flat icon="mdi-pause" @click.stop)
							q-btn(round flat icon="mdi-fast-forward" @click.stop)
						.time 02:31
						.row.items-center
							q-icon(name="mdi-volume-medium" size="sm")
							q-slider.slide(color="primary" v-model="sound")
							q-icon(name="mdi-volume-high" size="sm")
					.q-mt-md.q-pa-md
						Speech(drawer)
</template>

<style scoped lang="scss">
.after {
	// height: 100%;
	position: relative;
	background: $blue-grey-10;
	// padding: 1rem;
}
.myplayer {
	position: sticky;
	left: 0;
	top: 0;
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
	border-bottom: 1px solid $primary;

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
		width: 50px;
	}
}
</style>
