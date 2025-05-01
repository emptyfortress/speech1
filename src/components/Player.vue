<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from '@/stores/store'
import { useAVWaveform } from 'vue-audio-visual'
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

const row = ref()
const { x, y, top, right, bottom, left, width, height } = useElementBounding(row)

const setStar = (e: Row) => {
	e.star = !e.star
}

const emit = defineEmits(['showComment'])

const showComment = () => {
	emit('showComment')
}
const sound = ref(50)

const isPlaying = ref(false)
const play = () => {
	isPlaying.value == true ? player.value?.pause() : player.value?.play()
	isPlaying.value = !isPlaying.value
}

const isWave = ref(true)
const showWave = () => {
	isWave.value = !isWave.value
}

const placeWave = computed(() => {
	return `top: ${top.value - 101}px; left: ${left.value}px;`
})
const waveWidth = computed(() => {
	return width.value
})

const src = '/assets/g.mp3'
const player = ref<HTMLAudioElement | null>(null)
const canvas = ref(null)
useAVWaveform(player, canvas, { src: src, canvWidth: 500, canvHeight: 100 })
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
		canvas(v-show='isWave' ref='canvas' :style='placeWave')
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
	// bottom: 54px;
	// left: 0;
	// right: 0;
	// width: 100%;
	// height: 200px;
	background: hsla(200deg, 17.91%, 26.27%, 0.8);
	// z-index: 100;
}
</style>
