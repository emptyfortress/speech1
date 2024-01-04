<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { operators } from '@/stores/operators'
import { useOperatorList } from '@/stores/operatorList'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const initOperator = operators.find((el: any) => el.id == route.params.id)

const oper = ref(initOperator)
const opList = useOperatorList()

const idx = computed(() => {
	if (!!oper) {
		return opList.selectedOperators.findIndex((el) => el == oper.value)
	}
	return null
})
const prev = () => {
	if (idx.value == 0) return
	if (!!idx.value) {
		const prevItem: Operator = opList.selectedOperators[idx.value - 1]
		router.push(`/oper/${prevItem.id}`)
		oper.value = prevItem
	}
}
const next = () => {
	if (idx.value == opList.selectedOperators.length - 1) return
	if (!!idx.value) {
		const nextItem: Operator = opList.selectedOperators[idx.value + 1]
		router.push(`/oper/${nextItem.id}`)
		oper.value = nextItem
	}
}
</script>

<template lang="pug">
q-page(padding)
	.container(v-if="oper")
		.huge
			.ava
				.q-avatar
					img(src="@/assets/img/user1.svg")
				div
					.text-weight-bold Фамилия
					.name {{ oper.name }}
				q-space
				.q-gutter-x-xs(v-if="opList.selectedOperators.length > 1")
					q-btn(round unelevated icon="mdi-chevron-left" color="primary" @click="prev" :disable="idx == 0")
						q-tooltip Предыдущий оператор
					q-btn(round unelevated icon="mdi-chevron-right" color="primary" @click="next" :disable="idx == opList.selectedOperators.length - 1")
						q-tooltip Следущюий оператор
			q-btn(color="white" round icon="mdi-camera" text-color="black" size="sm").photo
		br
		br
		br
		pre {{ oper }}
		pre {{ idx }}
</template>

<style scoped lang="scss">
.huge {
	height: 100px;
	background: url(@/assets/img/abstract.jpg);
	background-size: cover;
	background-position: 0 30%;
	position: relative;
}
.photo {
	position: absolute;
	bottom: -70px;
	left: 40px;
}
.ava {
	height: 100px;
	width: 100%;
	position: absolute;
	bottom: -70px;
	left: 0;
	display: flex;
	padding-left: 50px;
	justify-content: flex-start;
	align-items: flex-end;
	gap: 2rem;
	font-size: 1.2rem;
	.q-avatar {
		width: 100px;
		height: 100px;
	}
}
</style>
