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
.rezume Стенограмма
.talk(v-for="talk in filterTalks" :key="talk.time")
	.grid(v-if="talk.send")
		q-btn(flat color="blue-5" padding="xs" :label="talk.time" size="md")
		.rel
			q-chat-message(name="оператор"
				:class="talk.class").receive
				div(v-html="talk.text")
			.emo1(v-html="talk.emo") 
			q-tooltip.emotooltip(v-if="talk.ttext" :class="talk.tt" anchor="top middle" self="center middle") {{talk.ttext}}
	.grid(v-else)
		q-btn(flat color="primary" padding="xs" :label="talk.time" size="md")
		.rel
			q-chat-message(name="клиент"
				:class="talk.class"
				sent).sent
				div(v-html="talk.text")
			.emo2(v-html="talk.emo") 
			q-tooltip.emotooltip(v-if="talk.ttext" :class="talk.tt" anchor="top middle" self="center middle") {{talk.ttext}}

</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/stores/store'
import { talks, talks2, talks3 } from '@/stores/speech'
import { useQuasar } from 'quasar'
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
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
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
</style>
