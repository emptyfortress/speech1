<script setup lang="ts">
import { ref } from 'vue'

const help = defineModel<Boolean>({ default: false })
const filter = ref()

</script>

<template lang="pug">
q-dialog(v-model="help" persistent)
	q-card(style="width: 800px; max-width: 80vw;")
		q-btn.close(round color="negative" icon="mdi-close" @click="help = false")
		q-card-section
			.row.justify-between
				.zg
					q-icon.q-mr-sm(name="mdi-comment-question-outline" size="lg")
					span Быстрая помощь
				q-input.q-mr-lg(dense v-model="filter" clearable hide-bottom-space @clear="filter = ''")
					template(v-slot:prepend)
						q-icon(name="mdi-magnify")
		q-card-section
			q-list
				q-item(clickable)
					q-item-section Как создать свою библиотеку?
				q-item(clickable)
					q-item-section Как добавить слово в библиотеку?
				q-item(clickable)
					q-item-section Lorem ipsum dolor sit amet consectetur adipisicing elit
				q-item(clickable)
					q-item-section Iure vel nihil error distinctio nobis
</template>

<style scoped lang="scss">
@import '@/assets/styles/myvariables.scss';

.zg {
	font-size: 1.3rem;
	font-weight: 600;
	display: flex;
	justify-content: space-between;
}

.q-input {
	width: 200px;
}
</style>
