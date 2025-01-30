<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Options from '@/components/Options.vue'
// import Options1 from '@/components/Options1.vue'
import CommonOptions from '@/components/common/CommonOptions.vue'

const loading = ref(false)
const result = ref(false)
const place = ref('Запрос на естественном языке')
const query = ref('')


const ask = () => {
	loading.value = true
	setTimeout(() => {
		loading.value = false
		result.value = true
		query.value = ''
		place.value = 'Вы можете уточнить вопрос.'
	}, 2000)
}
const label = computed(() => {
	return result.value ? 'Искать с метаданными' : 'Искать'
})

const voice = ref(false)
const toggleVoice = (() => {
	voice.value = !voice.value
})
const calcSize = computed(() => {
	return voice.value ? 'lg' : 'sm'
})
// random circle ***************************

const mic1 = ref()
function getRandomSize(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
const minSize = 24
const maxSize = 35

const setSize = (() => {
	const size = getRandomSize(minSize, maxSize)
	if (mic1.value) {
		mic1.value.style.width = `${size}px`
		mic1.value.style.height = `${size}px`
		mic1.value.style.backgroundColor = 'red'
	}
})

const toggle1 = (() => {
	setInterval(setSize, 100)
})

</script>

<template lang="pug">
q-card-section
	q-linear-progress(indeterminate color="accent" v-if='loading')
	div
		.input(:class='{ done: result }')
			q-input(v-model="query" type='textarea' outlined autogrow class="bg-white" :placeholder='place')
				template(v-slot:append)
					q-btn.mic(unelevated round :size="calcSize" icon="mdi-microphone" @click="toggleVoice" :class="{ active: voice }") 
						.wave
					.mic1(ref='mic1' @click="toggle1" size="sm") 
						q-icon(name="mdi-microphone" color="white" size="sm")

			.filt(v-if='result')
				Options
				CommonOptions

		.search Вы всегда сможете дополнить и уточнить свой вопрос.
			q-btn(unelevated color="primary" :label="label" @click="ask") 
</template>

<style scoped lang="scss">
@import "@/assets/styles/myvariables.scss";

.input {
	position: relative;

	.filt {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		background: $bgSelection;
		padding: .3rem 1rem;
		border: 2px solid $primary;
	}
}

:deep(.q-textarea .q-field__native) {
	padding-top: 0.5rem;
	padding-bottom: 1.5rem;
	font-size: 1rem;
	min-height: 150px;
}

:deep(.done .q-textarea .q-field__native) {
	min-height: 220px;

}

.search {
	margin-top: 0.5rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 0.9rem;
}

.focus {
	max-width: 600px;
}

.mic {
	position: absolute;
	bottom: .5rem;
	left: .5rem;
	background: #aaa;
	color: white;
	width: 24px;
	height: 24px;
	transition: .3s ease all;

	&.active {
		background: red;

		.wave {
			animation: pulse 1s ease-out infinite;
		}
	}

	.wave {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 0;
		height: 0;
		background-color: rgba(0, 0, 0, 0.5);
		border-radius: 50%;
		transform: translate(-50%, -50%);
		opacity: 0;
		z-index: 1;
	}
}


/* Keyframes for the wave effect */
@keyframes pulse {
	0% {
		width: 0;
		height: 0;
		opacity: 0.5;
	}

	100% {
		width: 200px;
		height: 200px;
		opacity: 0;
	}
}

.mic1 {
	position: absolute;
	bottom: .5rem;
	left: 5rem;
	background: #ccc;
	width: 32px;
	height: 32px;
	border-radius: 50%;
	display: inline-block;
	transition: width 0.5s, height 0.5s;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
