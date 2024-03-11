<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { operators } from '@/stores/operators'
import { date } from 'quasar'

const route = useRoute()
const oper = operators.find((el) => el.id.toString() == route.params.id)
const name = computed(() => {
	if (!!oper) {
		return oper.name
	} else return 'not found'
})
const list = ref([
	{
		id: 0,
		date: '2024-01-26 15:31',
		name: name,
		text: 'Я не согласен с оценкой. Никогда не грублю клиентам.',
	},
	{
		id: 1,
		date: '2024-01-27 20:37',
		name: 'Супервизор',
		text: 'Послушайте запись на отметке 1:34',
	},
])
const text = ref('')
const add = () => {
	if (text.value.length > 1) {
		const timeStamp = Date.now()
		const formattedString = date.formatDate(timeStamp, 'YYYY-MM-DD HH:mm')

		let comment = {
			id: list.value.length,
			date: formattedString,
			name: 'Супервизор',
			text: text.value,
		}
		list.value.push(comment)
		text.value = ''
	}
}
</script>

<template lang="pug">
div
	q-list(separator)
		q-item(v-for="item in list" :key="item.id" :class="{red : item.id == 0}")
			q-item-section(avatar top)
				q-avatar(size="30px")
					img(src="@/assets/img/user1.svg")
			q-item-section
				q-item-label(overline) {{ item.name }}
				q-item-label
					q-badge.q-mr-md(color="purple" v-if="item.id == 0") Эскалация
					span {{ item.text}}
			q-item-section(side top)
				q-item-label(caption) {{ item.date}}

	q-input.big(dense filled type="textarea" v-model="text" label="Комментарий")
		template(v-slot:after)
			q-btn(flat round icon="mdi-send" color="primary" @click="add" )
	q-separator

</template>

<style scoped lang="scss">
.big {
	margin-top: 1rem;
	margin-bottom: 1rem;
}
.red {
	color: red;
}
</style>
