<script setup lang="ts">
import QueryI from '@/components/common/QueryI.vue'

const props = defineProps<{
	stat: Stat
}>()

const next = (e: Stat) => {
	e.data.and = !e.data.and
}
const toggle = (e: Stat) => {
	e.open = !e.open
}
</script>

<template lang="pug">
	.zero(v-if='props.stat.data.type == 10')
		q-icon.trig(name="mdi-chevron-down" v-if="props.stat.children.length" @click.stop="toggle(props.stat)" :class="{ 'closed': !stat.open }")
		.row.items-center.cursor-pointer
			.icon(:class="{or : props.stat.data.and === false}" @click.stop="next(props.stat)")
			.q-ml-md Оператор
			.text-weight-bold.q-ml-sm {{props.stat.data.and ? 'И' : 'ИЛИ'}}

	QueryI(
		v-else,
		v-model:notcheck='props.stat.data.not',
		v-model:context='props.stat.data.context',
		v-model:keys1='props.stat.data.keys1',
		v-model:keys2='props.stat.data.keys2',
		v-model:syn='props.stat.data.syn',
		v-model:channel='props.stat.data.channel',
	)
</template>

<style scoped lang="scss">
.zero {
	display: flex;
	justify-content: start;
	align-items: center;
	margin-bottom: 2px;
}
.trig {
	font-size: 1.3rem;
	transition: 0.2s ease all;
	margin-right: 0.25rem;

	&.closed {
		transform: rotate(-90deg);
	}
}
.icon {
	width: 49px;
	height: 36px;
	background-image: url('@/assets/img/andor.svg');
	transition: 0.2s ease-out all;
	background-position: top left;
	cursor: pointer;
	&.or {
		background-position: bottom left;
	}
}
</style>
