<template lang="pug">
.row.justify-between.items-center
	q-btn(flat round icon="mdi-unfold-more-vertical" color="white" size="md" @click="mystore.wide = !mystore.wide")
	#speech
.talk(v-for="talk in filterTalks")
	.grid(v-if="talk.send")
		q-btn(flat color="blue-5" padding="xs" :label="talk.time" size="md")
		q-chat-message(name="оператор"
			bg-color="blue-3"
			).receive
			div(v-html="talk.text")
	.grid(v-else)
		q-btn(flat color="primary" padding="xs" :label="talk.time" size="md")
		q-chat-message(name="клиент"
			bg-color="blue-grey-3"
			sent).sent
			div(v-html="talk.text")

</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/stores/store'
import { talks, talks2, talks3 } from '@/stores/speech'

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
	}
	.sent {
		margin-left: 2rem;
		justify-self: flex-end;
	}
	.q-btn {
		align-self: start;
		margin-top: 1rem;
	}
}
</style>
