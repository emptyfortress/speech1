<script setup lang="ts">
</script>

<template lang="pug">
ol
	li
		div Выбрать словари с нецензурной лексикой.
		q-btn(flat icon='mdi-binoculars' label="Проверить данные" @click="" size='sm' color="grey") 
		q-btn(flat icon='mdi-function-variant' label="View SQL" @click="" size='sm' color="grey") 
	li
		div Включить распознавание эмоций "Гнев", "Раздражение".
		q-btn(flat icon='mdi-binoculars' label="Проверить данные" @click="" size='sm' color="grey") 
		q-btn(flat icon='mdi-function-variant' label="View SQL" @click="" size='sm' color="grey") 
	li
		div Выбрать все записи за последний месяц.
		q-btn(flat icon='mdi-binoculars' label="Проверить данные" @click="" size='sm' color="grey") 
		q-btn(flat icon='mdi-function-variant' label="View SQL" @click="" size='sm' color="grey") 
	li
		div Отфильтровать выбранные записи по словарям и эмоциям из предыдущих шагов.
		q-btn(flat icon='mdi-binoculars' label="Проверить данные" @click="" size='sm' color="grey") 
		q-btn(flat icon='mdi-function-variant' label="View SQL" @click="" size='sm' color="grey") 

</template>

<style scoped lang="scss">
li {
	margin-bottom: 1rem;
}
</style>
