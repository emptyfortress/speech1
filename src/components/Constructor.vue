<template lang="pug">
q-dialog(v-model="props.dialog" persistent :maximized="props.maximized" transition-show="slide-up" transition-hide="slide-down")
	.cnt
		.top Добавляйте критерии и настраивайте условия запросов. Используйте контекстное меню, чтобы определить их порядок.
		.zg
			q-icon(name="mdi-android-studio" size="26px")
			span Конструктор запросов
		.content
			q-splitter(v-model="splitterModel" :limits="[0, 100]" :style="hei" @update:model-value="split")
				template(v-slot:before)
					component(:is="LogicList" :commentList="commentList")

				template(v-slot:after)
					component(:is="LogicCard"
						:splitter="splitterModel"
						@maximize="splitterModel = 0"
						@reset="splitterModel = 25" )
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import LogicList from '@/components/LogicList.vue'
import LogicCard from '@/components/LogicCard.vue'

const props = defineProps({
	dialog: Boolean,
	maximized: Boolean,
})

const splitterModel = ref(25)
const hei = computed(() => {
	return 'height: ' + (window.innerHeight - 105) + 'px;'
})

const commentList = ref(false)
const split = (val: number) => {
	if (val > 40) {
		commentList.value = true
	} else commentList.value = false
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/myvariables.scss';

.cnt {
	background: moz-linear-gradient(top, #d8e3f1 0%, #f4e8f4 52.6%, #fdf5e5 100%);
	background: webkit-linear-gradient(top, #d8e3f1 0%, #f4e8f4 52.6%, #fdf5e5 100%);
	background: linear-gradient(180deg, #d8e3f1 0%, #f4e8f4 52.6%, #fdf5e5 100%);
	background-attachment: fixed;
	.content {
		max-width: 1400px;
		margin: 0 auto;
	}
}

.zg {
	margin-top: 2rem;
	font-size: 1.3rem;
	text-align: center;
	vertical-align: baseline;
	.q-icon {
		margin-right: 1rem;
		transform: translateY(-5px);
	}
}
.top {
	background: #9db2c3;
	padding: 2px 2rem;
	font-size: 1rem;
	text-align: center;
	// color: white;
}
</style>
