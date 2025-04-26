<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '@/stores/store'
import { useAVWaveform } from 'vue-audio-visual'

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

const setStar = (e: Row) => {
	e.star = !e.star
}
// const showComment = (e: Row) => {
// 	item.value = e
// 	currentComment.value = e.comment
// 	dialog.value = true
// }
const sound = ref(50)

const src = 'http://localhost:5173/assets/g.mp3'
const player = ref(null)
const canvas = ref(null)
useAVWaveform(player, canvas, { src: src })
</script>

<template lang="pug">
.myplayer()
	audio(ref='player' controls :src='src')
	canvas(ref='canvas')

	// q-linear-progress(:value=".6" color="positive")
	// q-btn(flat round size="sm" @click.stop="setStar(props.row)")
	// 	q-icon(v-if="props.row.star === true" name="mdi-star" color="primary")
	// 	q-icon(v-else name="mdi-star-outline" color="grey" )
	// // q-btn(flat round size="sm" @click.stop="showComment(props.row)")
	// // 	q-icon(v-if="props.row.comment" name="mdi-comment-text-outline" color="primary")
	// // 	q-icon(v-else name="mdi-comment-plus-outline" color="grey" )
	// // 	q-tooltip.bg-primary(v-if="props.row.comment" anchor="top middle" self="bottom middle" max-width="150px" :offset="[7, 7]") {{ props.row.comment }}
	// div(v-if="!mystore.wide") {{ props.row.date }}
	// div(v-if="!mystore.wide") {{ props.row.operator }}
	// .player
	// 	q-btn(round flat icon="mdi-rewind" @click.stop)
	// 	q-btn(round flat icon="mdi-pause" @click.stop)
	// 	q-btn(round flat icon="mdi-fast-forward" @click.stop)
	// .time 02:31
	// .row.items-center
	// 	q-icon(name="mdi-volume-medium" size="sm")
	// 	q-slider.slide(color="primary" v-model="sound")
	// 	q-icon(name="mdi-volume-high" size="sm")
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
</style>
