<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useStore } from '@/stores/store'
import { records as myrecords } from '@/stores/operators'
import RecordsTable from '@/components/RecordsTable.vue'
import { AVWaveform } from 'vue-audio-visual'
// import { useAVWaveform } from 'vue-audio-visual'
import { useAVWaveform } from 'vue-audio-visual'

const mystore = useStore()

const records = reactive(myrecords)

const starRecords = computed(() => {
	return records.filter((item) => item.star === true)
})

const audio = ref(null)
const canvas = ref(null)
const soc = 'http://localhost:5173/assets/g.mp3'

useAVWaveform(audio, canvas, { src: soc, canvHeight: 80, canvWidth: 800 })

const action = () => {
	// player.value?.play()
	if (audio.value.paused || audio.value.ended) {
		audio.value.play()
		// playPauseButton.classList.add('playing');
		// playPauseButton.innerHTML = 'Pause'; // Or update icon class
	} else {
		audio.value.pause()
		// playPauseButton.classList.remove('playing');
		// playPauseButton.innerHTML = 'Play'; // Or update icon class
	}
}
</script>

<template lang="pug">
q-page(padding)
	.container
		q-expansion-item(v-model="mystore.req")
			template(v-slot:header)
				q-item-section.line(avatar)
					q-avatar(icon="mdi-star-outline" flat)
				q-item-section
					.zag Избранные записи
			q-card-section.q-px-md
				component(:is="RecordsTable" :rows="starRecords")

		// div
		// 	AVWaveform(:src="soc")
		div
			audio(ref="audio" :src="soc" )
			canvas(ref="canvas" )

		q-btn(unelevated color="primary" label="Отмена" @click="action") 
</template>

<style scoped lang="scss"></style>
