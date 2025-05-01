<script setup lang="ts">
import { ref, watch, nextTick, computed } from 'vue'
import { useStore } from '@/stores/store'
import { useElementBounding } from '@vueuse/core'

const mystore = useStore()

interface Props {
	row: Row
}

const props = withDefaults(defineProps<Props>(), {
	row: () => ({
		id: 1,
		date: '',
		group: '',
		record: '',
		categ: '',
		operator: '',
		client: '',
		expand: false,
		star: false,
		comment: '',
	}),
})

const row = ref(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const player = ref<HTMLAudioElement | null>(null)
const isWave = ref(false)
const isPlaying = ref(false)
const sound = ref(50)

const { top, left, width } = useElementBounding(row)

// 🎯 Стили canvas — реактивный объект
const canvasStyle = computed(() => ({
	position: 'absolute',
	top: `${top.value - 101}px`,
	left: `${left.value}px`,
	width: `${width.value}px`,
	height: `100px`,
	zIndex: 999,
	pointerEvents: 'none',
}))

const src = '/assets/g.mp3'

const play = () => {
	isPlaying.value = !isPlaying.value
	isPlaying.value ? player.value?.play() : player.value?.pause()
}

const emit = defineEmits(['showComment'])

const setStar = (e: Row) => {
	e.star = !e.star
}

const showComment = () => emit('showComment')

// 🔥 Главная функция — показать waveform
const showWave = async () => {
	isWave.value = !isWave.value

	if (isWave.value) {
		await nextTick()

		const canvas = canvasRef.value
		if (!canvas) return

		const dpr = window.devicePixelRatio || 1
		const canvasW = width.value
		const canvasH = 100

		// Установка физических размеров canvas
		canvas.width = canvasW * dpr
		canvas.height = canvasH * dpr
		const ctx = canvas.getContext('2d')
		ctx?.scale(dpr, dpr)

		// ✅ Загружаем useAVWaveform динамически
		const { useAVWaveform } = await import('vue-audio-visual')

		useAVWaveform(player, canvasRef, {
			src,
			canvHeight: canvasH,
			// canvWidth: canvasW — не нужно, ты уже установил руками
		})
	}
}
</script>

<template lang="pug">
.myplayer(ref='row')
	q-linear-progress(:value=".6" color="positive")
	q-btn(flat round size="sm" @click.stop="setStar(props.row)")
		q-icon(v-if="props.row.star === true" name="mdi-star" color="primary")
		q-icon(v-else name="mdi-star-outline" color="grey" )
	q-btn(flat round size="sm" @click.stop="showComment")
		q-icon(v-if="props.row.comment" name="mdi-comment-text-outline" color="primary")
		q-icon(v-else name="mdi-comment-plus-outline" color="grey" )
		q-tooltip.bg-primary(v-if="props.row.comment" anchor="top middle" self="bottom middle" max-width="150px" :offset="[7, 7]") {{ props.row.comment }}
	div(v-if="!mystore.wide") {{ props.row.date }}
	div(v-if="!mystore.wide") {{ props.row.operator }}
	.player
		q-btn(round flat icon="mdi-rewind" @click.stop)
		q-btn(round flat @click.stop='play')
			q-icon(v-if='isPlaying' name="mdi-pause")
			q-icon(v-else name="mdi-play")
		q-btn(round flat icon="mdi-fast-forward" @click.stop)
	.time 02:31
	.row.items-center
		q-icon(name="mdi-volume-medium" size="sm")
		q-slider.slide(color="primary" v-model="sound")
		q-icon(name="mdi-volume-high" size="sm")
	q-btn.q-ml-md(flat round dense color="primary" @click.stop="showWave") 
		q-icon(name="mdi-waveform" color="primary" size='32px')

	audio(ref='player' :src='src')
	Teleport(to="body")
		canvas(v-if="isWave" ref="canvasRef" :style="canvasStyle")
</template>

<style scoped lang="scss">
.myplayer {
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background: $blue-grey-9;
	color: #6d8e9e;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	padding-left: 1rem;
	gap: 1rem;
	font-size: 0.9rem;

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
canvas {
	position: absolute;
	background: hsla(200deg, 17.91%, 26.27%, 0.8);
}
</style>
