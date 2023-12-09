<template lang="pug">
q-dialog(v-model="props.dialog" persistent :maximized="props.maximized" transition-show="slide-up" transition-hide="slide-down")
	.cnt
		.top Настраивайте параметры FCR

		.content
			FcrCard()
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { fcr } from '@/stores/data'
// import LogicCard from '@/components/LogicCard.vue'
import FcrCard from '@/components/FcrCard.vue'

const props = defineProps({
	dialog: Boolean,
	maximized: Boolean,
})

const rep = ref(true)
const contain = ref(true)
const repNum = ref(2)
const timeFrame = ref('в день')
const options = ['в час', 'в день', 'в неделю']
const chips = reactive(fcr)
const editMode = ref(false)
const toggleEdit = () => (editMode.value = !editMode.value)

const chipClass = computed(() => {
	if (editMode.value) return 'shake'
	else return ''
})

const removeChip = (e: number) => {
	chips.splice(e, 1)
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
		max-width: 1200px;
		margin: 0 auto;
		.q-input {
			transform: translateY(-7px);
			width: 230px;
			&.small {
				width: 70px;
			}
		}
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
.rowline {
	margin-top: 2rem;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	gap: 1rem;
	.q-select {
		transform: translateY(-5px);
	}
}
.inf {
	color: $primary;
	position: absolute;
	width: 20px;
	height: 20px;
	background: white;
	border-radius: 20px;
	top: 4px;
	right: 4px;
	text-align: center;
	font-size: 1rem;
	font-weight: bold;
	line-height: 20px;
}
.infmenu {
	padding: 1rem;

	.zg {
		margin-top: 0;
		font-size: 0.9rem;
		font-weight: bold;
	}

	.desc {
		font-size: 0.8rem;
	}
}
</style>
