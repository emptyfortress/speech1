<script setup lang="ts">
import { talks } from '@/stores/speech'
</script>

<template lang="pug">
.talk(v-for="talk in talks" :key="talk.time")
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

<style scoped lang="scss">
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
</style>
