<script setup lang="ts">
import { reactive } from 'vue'
const list = reactive([
	{ id: 0, text: 'Приветствие', auto: true, mark: 53 },
	{ id: 1, text: 'Прогрев', auto: false },
	{ id: 2, text: 'Выяснение проблем', auto: false },
	{ id: 3, text: 'Отработка возражений', auto: false },
	{ id: 4, text: 'Предложение товаров по акции', auto: true, mark: 67 },
	{ id: 5, text: 'Тон разговора' },
	{ id: 6, text: 'Завершение разговора', auto: true, mark: 92 },
])
</script>

<template lang="pug">
q-list()
	q-expansion-item(expand-separator v-for="item in list" :key="item.id")
		template(v-slot:header)
			q-item-section(avatar)
				q-avatar(text-color="black") {{item.id + 1}}
			q-item-section
				q-item-label {{ item.text }}
				.text-caption(v-if="item.auto") AUTO
			q-item-section(avatar side v-if="item.mark")
				q-avatar(color="secondary" text-color="white" size="md" ) {{item.mark}}

		q-card-section
			.grid
				.condition
					.text-weight-bold Условия
					p Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis nesciunt officiis dicta quae voluptates sequi? Minima eaque, repellat neque praesentium perspiciatis amet expedita. Vitae at quam, veniam ipsa sequi quia.
				.request(v-if="item.auto") Запрос для автоматической оценки: <span class="text-weight-bold">Запрос запросыч</span>
				.request(v-else) Оценка:
				q-input(filled type="number" dense v-model="item.mark")

</template>

<style scoped lang="scss">
:deep(.q-expansion-item.q-expansion-item--expanded .q-expansion-item__container) {
	background: white;
}
.grid {
	display: grid;
	grid-template-columns: 1fr 70px;
	justify-items: start;
	align-items: center;
	column-gap: 1rem;
	row-gap: 0.5rem;
	font-size: 0.9rem;
}
.condition {
	grid-column: 1/-1;
}
.q-input {
	grid-column: 2/-1;
	font-size: 1.3rem;
}
.request {
	grid-column: 1/2;
	text-align: right;
	justify-self: end;
}
</style>
