<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useStore } from '@/stores/store'
import { talks, talks2, talks3 } from '@/stores/speech'
import { useQuasar } from 'quasar'
import VueDraggableResizable from 'vue-draggable-resizable'
import { useTextSelection } from '@vueuse/core'
import { useDebouncedRefHistory } from '@vueuse/core'
import addSelectionToVoc from '@/components/addSelectionToVoc.vue'

const props = defineProps({
	drawer: {
		type: Boolean,
		default: false,
	},
})

const mystore = useStore()

const filterTalks = computed(() => {
	switch (mystore.record) {
		case 'группа 2':
			return talks2
		case 'группа 3':
			return talks3
		default:
			return talks
	}
})
const $q = useQuasar()

const show = () => {
	let message = 'Скопировано'
	$q.notify({
		message: message,
		color: 'primary',
		icon: 'mdi-check',
		position: 'top',
	})
}

const nav = ref(false)
const closeNav = () => {
	nav.value = false
}


const calcX = computed(() => {
	return window.innerWidth - 680
})

// let body = document.querySelector('body')
// const { height } = useElementSize(body)
const calcY = computed(() => {
	return -800
	// return height.value * (-1) + 300
})


const showNav = ((e: any) => {
	nav.value = !nav.value
})

const state = useTextSelection()

const { history, undo, redo } = useDebouncedRefHistory(state.text, { deep: true, debounce: 1000 })

const dialog = ref(false)

let sel = ''

watch(history, (val) => {
	if (val && mystore.speechDrawer) {
		sel = history.value[0].snapshot
		dialog.value = true
	}
})

</script>

<template lang="pug">

.row.justify-between.items-center(v-if="!props.drawer")
	q-btn(flat round icon="mdi-unfold-more-vertical" color="white" size="md" @click="mystore.wide = !mystore.wide")
	#speech
.rezume Резюме записи

.aiblock
	ul.txt
		li Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam enim praesentium vitae! Explicabo repudiandae vero ipsum, voluptate aperiam nulla maiores modi quaerat eum iusto earum ipsam, et aut, sed dolore?
		li Consectetur adipisicing elit. Ullam enim praesentium vitae!
		li Explicabo repudiandae vero ipsum, voluptate aperiam nulla maiores modi quaerat eum.
	.copy
		.text-center
			q-btn(unelevated color="primary" label="Копировать" @click="show")
			.ai Составлено с использованием генеративного искусственного интеллекта

br
.row.items-center.justify-between
	.rezume Стенограмма
	q-btn.nav(flat color="primary" label="Навигация" @click="showNav" size="sm")

.talk(v-for="talk in filterTalks" :key="talk.time")
	.grid(v-if="talk.send")
		q-btn(flat color="blue-5" padding="xs" :label="talk.time" size="md")
		.rel
			q-chat-message(name="оператор"
				:class="talk.class").receive
				div(v-html="talk.text")
			.emo1(v-html="talk.emo") 
			q-tooltip.emotooltip(v-if="talk.ttext" :class="talk.tt" anchor="top middle" self="center middle") {{ talk.ttext }}
	.grid(v-else)
		q-btn(flat color="primary" padding="xs" :label="talk.time" size="md")
		.rel
			q-chat-message(name="клиент"
				:class="talk.class"
				sent).sent
				div(v-html="talk.text")
			.emo2(v-html="talk.emo") 
			q-tooltip.emotooltip(v-if="talk.ttext" :class="talk.tt" anchor="top middle" self="center middle") {{ talk.ttext }}

Teleport(to='body')
	vue-draggable-resizable(v-if='nav && mystore.speechDrawer' :x="calcX" :y="calcY" :w="250" :h="270" :active="true" :z="2000" )
		.bar
			div Навигация по стенограмме
			q-icon(name="mdi-close" @click='closeNav')
		.list
			.item Слово 1:
			.time
				div 00:33,
				div 01:15,
				div 05:23,
			.item Слово длинное 2:
			.time
				div 02:33,
				div 04:15,
				div 07:23,
				div 08:55,
				div 10:30,
				div 11:03,
			.item Фраза дфоыдвлодфоыв
			.time
				div 02:33,
				div 04:15,
				div 07:23,
				div 08:55,
				div 10:30,
				div 11:03,

addSelectionToVoc(v-model="dialog" :selection="sel")
</template>


<style scoped lang="scss">
#speech {
	color: white;
	margin-bottom: 0.5rem;
}

.talk {
	padding: 0;
	font-size: 0.9rem;
	line-height: 140%;
}

.grid {
	display: grid;
	grid-template-columns: auto 1fr;
	justify-items: start;
	gap: 1rem;

	.receive {
		margin-right: 2rem;
		position: relative;
	}

	.sent {
		margin-left: 2rem;
		justify-self: flex-end;
		position: relative;
	}

	.q-btn {
		align-self: start;
		margin-top: 1rem;
	}
}

:deep(.q-message-text--received) {
	color: #90caf9;
}

.red :deep(.q-message-text--received) {
	color: #f99eae;

	.q-message-text-content--received {
		color: #550000;
	}
}

.red :deep(.q-message-text--sent) {
	color: #f99eae;

	.q-message-text-content--sent {
		color: #550000;
	}
}

.orange :deep(.q-message-text--received) {
	color: orange;

	.q-message-text-content--received {
		color: #550000;
	}
}

.orange :deep(.q-message-text--sent) {
	color: orange;

	.q-message-text-content--sent {
		color: #550000;
	}
}

.green :deep(.q-message-text--received) {
	color: #74df74;
}

.green :deep(.q-message-text--sent) {
	color: #74df74;
}

.emo1 {
	position: absolute;
	top: 1.1rem;
	right: 0.4rem;
	font-size: 1.3rem;
}

.emo2 {
	position: absolute;
	top: 1.1rem;
	left: 0.4rem;
	font-size: 1.3rem;
}

.rezume {
	color: #fff;
	text-transform: uppercase;
}

.aiblock {
	position: relative;

	.copy {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba($color: #000000, $alpha: 0.7);
		border-radius: 0.5rem;
		display: none;
		justify-content: center;
		align-items: center;
	}

	&:hover {
		.copy {
			display: grid;
		}
	}
}

.txt {
	color: #fff;
	background: #242e33;
	border-radius: 0.5rem;
	font-size: 0.9rem;
	padding: 0.5rem;

	li {
		margin-left: 1rem;
		margin-bottom: 1rem;
	}
}

.copy {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba($color: #000000, $alpha: 0.7);
	border-radius: 0.5rem;
	display: grid;
	justify-content: center;
	align-items: center;
}

.ai {
	margin-top: 2rem;
	color: #fff;
	font-size: 0.8rem;
	padding: 1rem;
	background: #000;
	line-height: 1;
}

:deep(.q-tab--inactive) {
	color: #ffffff99;
}

.q-tab-panels {
	background: transparent;
}

.q-tab-panel {
	padding: 0;
}

.bar {
	height: 32px;
	background: $blue-grey-10;
	padding: 0 12px;
	font-size: 0.9rem;
	line-height: 32px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: white;
	overflow: hidden;

	div {
		white-space: nowrap;
	}

	.q-icon {
		cursor: pointer;
	}
}

.vdr {
	background: $blue-grey-9;
}

.list {
	padding: 0.5rem;
	color: #ffffffaa;
	width: 100%;
	height: calc(100% - 32px);
	overflow: hidden;
	font-size: .9rem;

	.item {
		margin-top: 1rem;

		&:first-child {
			margin-top: 0;
		}
	}

	.time {
		display: flex;
		flex-wrap: wrap;

		div {
			margin-left: 1rem;
			color: $blue-5;
			cursor: pointer;
		}
	}
}
</style>
