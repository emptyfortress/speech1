<script setup lang="ts">
import { date, useQuasar } from 'quasar'

const $q = useQuasar()

const timeStamp = Date.now()
const formattedString = date.formatDate(timeStamp, 'YYYY-MM-DD HH:mm')

const send = () => {
	$q.notify({
		icon: 'mdi-check-bold',
		message: 'Спасибо! Оценка отправлена оператору.',
	})
}
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
	.common Прохождение чек-листа
	div Приветствие
	div 50
	div Прогрев
	div 40
	div Выяснение проблем
	div 30
	div Отработка возражений
	div 20
	div Товары по акции
	div 50
	div Тон разговора
	div 40
	div Заврешение разговора
	div 50
	.common1 Средний балл:
	.common1 84
	br
	q-btn.full-width(unelevated color="primary" label="Отправить оператору" @click="send") 

</template>

<style scoped lang="scss">
.grid {
	display: grid;
	grid-template-columns: 2fr 1fr;
	justify-items: start;
	align-items: center;
	column-gap: 1rem;
	margin: 0 auto;
	width: 500px;
	padding: 1rem;
}
.common {
	font-weight: 600;
	grid-column: 1/-1;
	margin-top: 1rem;
}
.common1 {
	font-weight: 600;
	margin-top: 1rem;
	font-size: 1.2rem;
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
