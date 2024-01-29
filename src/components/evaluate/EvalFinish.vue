<script setup lang="ts">
import { ref } from 'vue'
import { date } from 'quasar'
const timeStamp = Date.now()
const formattedString = date.formatDate(timeStamp, 'YYYY-MM-DD HH:mm')
const agree = ref(false)
</script>

<template lang="pug">
q-card.grid
	div Оператор:
	div Алиса
	div Дата:
	div {{formattedString}}
	div Супервизор:
	div Голомудько
	div Анкета:
	div Квартальная
	div Средний балл:
	div 84
	br
	q-btn.full-width(unelevated color="primary" label="Отправить оператору") 

.grid
	q-checkbox(v-model="agree" dense label="Оператор согласен")

</template>

<style scoped lang="scss">
.grid {
	display: grid;
	grid-template-columns: auto 1fr;
	justify-items: start;
	align-items: center;
	column-gap: 1rem;
	margin: 0 auto;
	width: 300px;
	padding: 1rem;
}
.q-separator,
.q-checkbox {
	grid-column: 1/-1;
}
.q-btn {
	grid-column: 1/-1;
	margin-top: 1rem;
}
</style>
