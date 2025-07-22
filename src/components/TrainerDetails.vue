<script setup lang="ts">
// import { ref } from 'vue'

const props = defineProps<{
	selected: Trainer
}>()

const trainer = props.selected

function getAvatarSrc(fileName: string): string {
	return new URL(`../assets/img/avatars/${fileName}`, import.meta.url).href
}
</script>

<template lang="pug">
div
	.topname
		q-avatar(size="106px")
			img(:src="getAvatarSrc(trainer.photoUrl)", alt="avatar", style="object-fit: cover")
		.text-h6.text-center {{ trainer.lastName }}
		.details
			.caption Должность:
			label Тренер
			.caption Табельный №:
			label {{ trainer.id }}
			.caption Телефон:
			label +7 (535) 123-45-67
			.caption Email:
			label.link name@mail.ru
			.caption Начальник:
			label Орлов П.С.
			.caption Операторы:
			label {{ trainer.operatorCount }}

</template>

<style scoped lang="scss">
.topname {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
}
.link {
	color: $primary;
	text-decoration: underline;
}
.details {
	font-size: 0.9rem;
	display: grid;
	grid-template-columns: auto 1fr;
	column-gap: 1rem;
	row-gap: 0;
	.caption {
		opacity: 0.7;
	}
}
.graphs {
	margin-top: 1rem;
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1rem;
}
</style>
