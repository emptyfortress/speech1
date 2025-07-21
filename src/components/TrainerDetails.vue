<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
	selected: Trainer
}>()

// const trainer = props.selected

const trainer = {
	id: 1,
	lastName: 'Иванов И.И.',
	operatorCount: 5,
	evaluationCount: 42,
	averageScore: 4.6,
	photoUrl: '1.jpeg',
}

function getAvatarSrc(fileName: string): string {
	return new URL(`../assets/img/avatars/${fileName}`, import.meta.url).href
}
</script>

<template lang="pug">
.topname
	q-avatar(size="96px")
		img(:src="getAvatarSrc(trainer.photoUrl)", alt="avatar", style="object-fit: cover")
	div
		.text-h6 {{ trainer.lastName }}
		.details
			.caption Должность:
			label Тренер
			.caption Табельный №:
			label {{ trainer.id }}
			.caption Телефон:
			label +7 (535) 123-45-67
			.caption Начальник:
			label Орлов П.С.
			.caption Операторы:
			label {{ trainer.operatorCount }}

</template>

<style scoped lang="scss">
.topname {
	display: flex;
	gap: 1rem;
}
.details {
	font-size: 0.8rem;
	display: grid;
	grid-template-columns: auto 1fr;
	column-gap: 1rem;
	row-gap: 0;
}
</style>
