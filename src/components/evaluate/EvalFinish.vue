<script setup lang="ts">
import { date } from 'quasar'
const timeStamp = Date.now()
const formattedString = date.formatDate(timeStamp, 'YYYY-MM-DD HH:mm')
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
	q-separator(space)
	q-btn.full-width(unelevated color="primary" label="Отправить оператору") 

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
.q-btn {
	grid-column: 1/-1;
	margin-top: 1rem;
}
</style>
