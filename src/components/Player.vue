<script setup lang="ts">
import { ref, onUnmounted, nextTick, computed } from 'vue'
import WaveSurfer from 'wavesurfer.js'
import { useStore } from '@/stores/store'
import { useElementBounding } from '@vueuse/core'
import { useWindowSize } from '@vueuse/core'
import type { CSSProperties } from 'vue'

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
const player = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)
const sound = ref(50)

const src = '/assets/g3.wav'

// 👇 ref для waveform-контейнера
const waveContainer = ref<HTMLDivElement | null>(null)
let wavesurfer: WaveSurfer | null = null

const play = () => {
	if (!wavesurfer) return

	if (wavesurfer.isPlaying()) {
		wavesurfer.pause()
		isPlaying.value = false
	} else {
		wavesurfer.play()
		isPlaying.value = true
	}
}

const emit = defineEmits(['showComment'])

const setStar = (e: Row) => {
	e.star = !e.star
}

const showComment = () => emit('showComment')

const isWave = ref(false)

// 👇 Метод для отображения waveform
const showWave = async () => {
	isWave.value = !isWave.value
	await nextTick() // гарантируем наличие DOM

	if (wavesurfer) {
		wavesurfer.destroy()
		wavesurfer = null
	}

	wavesurfer = WaveSurfer.create({
		container: waveContainer.value!,
		waveColor: '#00ff00',
		progressColor: '#00796B',
		height: 40,
		barWidth: 2,
		responsive: true,
		normalize: true,
		splitChannels: true,
		cursorWidth: 2,
	})

	wavesurfer.load(src)

	wavesurfer.on('ready', () => {
		console.log('Waveform готов 🚀')
	})
}

onUnmounted(() => {
	if (wavesurfer) {
		wavesurfer.destroy()
	}
})

const { top, left, width } = useElementBounding(row)
const { width: winsize } = useWindowSize()

const canvaWidth = computed(() => {
	return winsize.value - left.value - 400
})
//
// 🎯 Стили canvas — реактивный объект
const canvasStyle = computed<CSSProperties>(() => ({
	position: 'absolute',
	top: `${top.value - 81}px`,
	left: `${left.value}px`,
	width: `${canvaWidth.value}px`,
	height: `80px`,
}))
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

	// 👇 Контейнер для waveform
	Teleport(to="body")
		.waveform(v-if="isWave" ref="waveContainer" :style="canvasStyle")
	
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
.waveform {
	position: absolute;
	background: hsl(200deg, 17.91%, 26.27%);
	z-index: 10;
}
</style>
