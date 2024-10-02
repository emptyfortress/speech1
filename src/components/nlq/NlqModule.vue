<script setup lang="ts">
import { ref, computed } from 'vue'
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
		presearch.value = false
		place.value = 'Вы можете уточнить вопрос.'
	}, 2000)
}
const label = computed(() => {
	return result.value ? 'Искать с метаданными' : 'Искать'
})
</script>

<template lang="pug">
q-card-section
	q-linear-progress(indeterminate color="accent" v-if='loading')
	div
		.input(:class='{done: result}')
			q-input(v-model="query" type='textarea' outlined autogrow class="bg-white" :placeholder='place')
			.filt(v-if='result')
				Options
				CommonOptions

		.search
			.txt Вы всегда сможете дополнить и уточнить свой вопрос.
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
	min-height: 100px;
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
</style>
