<script setup lang="ts">
import { ref, onUnmounted, nextTick, computed } from 'vue'
import WaveSurfer from 'wavesurfer.js'
import { useStore } from '@/stores/store'
import { useElementBounding } from '@vueuse/core'
import { useWindowSize } from '@vueuse/core'
import type { CSSProperties } from 'vue'
import RegionsPlugin from 'wavesurfer.js/plugins/regions'

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
const isPlaying = ref(false)
const sound = ref(50)
const currentTime = ref(0)
const duration = ref(0)

const src = '/assets/g3.wav'

const waveContainer = ref<HTMLDivElement | null>(null)
let wavesurfer: WaveSurfer | null = null
const regions = RegionsPlugin.create()

const isWave = ref(false)
const isWaveReady = ref(false)
let playPending = false

const createWaveSurfer = async () => {
	await nextTick() // ждем DOM

	if (wavesurfer) return
	if (!waveContainer.value) return

	wavesurfer = WaveSurfer.create({
		container: waveContainer.value,
		waveColor: '#00ff00',
		progressColor: '#00796B',
		height: 40,
		barWidth: 2,
		responsive: true,
		normalize: true,
		splitChannels: true,
		cursorWidth: 2,
		plugins: [regions],
	})

	wavesurfer.load(src)

	wavesurfer.on('ready', () => {
		isWaveReady.value = true
		duration.value = wavesurfer?.getDuration() ?? 0

		if (playPending) {
			wavesurfer?.play()
			playPending = false
		}
	})

	wavesurfer.on('decode', () => {
		regions.addRegion({
			start: 18,
			end: 120,
			content: 'Resize me',
			color: 'rgba(255, 87, 34, 0.3)',
			drag: false,
			resize: false,
		})
		regions.addRegion({
			start: 300,
			content: 'Marker',
			color: '#ff0000',
			drag: false,
		})
	})

	wavesurfer.on('play', () => {
		isPlaying.value = true
	})
	wavesurfer.on('pause', () => {
		isPlaying.value = false
	})
	wavesurfer.on('finish', () => {
		isPlaying.value = false
	})

	wavesurfer.on('audioprocess', () => {
		currentTime.value = wavesurfer?.getCurrentTime() ?? 0
	})
}

const play = async () => {
	if (!wavesurfer) {
		await createWaveSurfer()
	}
	if (isWaveReady.value) {
		wavesurfer!.isPlaying() ? wavesurfer!.pause() : wavesurfer!.play()
	} else {
		playPending = true
	}
}

const showWave = async () => {
	isWave.value = !isWave.value

	if (isWave.value && !wavesurfer) {
		await createWaveSurfer()
	}
}

onUnmounted(() => {
	if (wavesurfer) {
		wavesurfer.destroy()
		wavesurfer = null
		isWaveReady.value = false
		playPending = false
	}
})

const emit = defineEmits(['showComment'])

const setStar = (e: Row) => {
	e.star = !e.star
}

const showComment = () => emit('showComment')

const { top, left } = useElementBounding(row)
const { width: winsize } = useWindowSize()

const canvaWidth = computed(() => {
	return winsize.value - left.value - 400
})

// 🎯 Стили canvas — реактивный объект
const canvasStyle = computed<CSSProperties>(() => ({
	position: 'absolute',
	top: `${top.value - 121}px`,
	left: `${left.value}px`,
	width: `${canvaWidth.value}px`,
	height: `120px`,
}))

function formatTime(t: number): string {
	const min = Math.floor(t / 60)
	const sec = Math.floor(t % 60)
		.toString()
		.padStart(2, '0')
	return `${min}:${sec}`
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
	.time
		|{{ formatTime(currentTime) }} 
		span / {{ formatTime(duration) }}
	.row.items-center
		q-icon(name="mdi-volume-medium" size="sm")
		q-slider.slide(color="primary" v-model="sound")
		q-icon(name="mdi-volume-high" size="sm")
	q-btn.q-ml-md(flat round dense color="primary" @click.stop="showWave") 
		q-icon(name="mdi-waveform" color="primary" size='32px')

	Teleport(to="body")
		.waveform(:class="{ hidden: !isWave }" ref="waveContainer" :style="canvasStyle")
	
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
		letter-spacing: 1px;
		color: white;
		span {
			font-size: 0.9rem;
		}
	}

	.slide {
		width: 150px;
	}
}
.waveform {
	position: absolute;
	background: hsl(200deg, 17.91%, 26.27%);
	z-index: 10;
	&.hidden {
		display: none;
	}
}
.waveform ::part(wrapper) {
	height: 120px;
}
.waveform ::part(region-content) {
	position: absolute;
	top: 90px;
	color: white;
	font-size: 0.7rem;
}
</style>
