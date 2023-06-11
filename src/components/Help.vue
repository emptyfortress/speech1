<script setup lang="ts">
import { ref } from 'vue'
import WordHighlighter from 'vue-word-highlighter'

const help = defineModel<boolean>({ required: true, default: false })
const filter = ref()

const sections = [
	{
		id: 0, icon: "mdi-book-open-page-variant-outline", label: 'Ключевые слова', children: [
			{ id: 0, label: 'Как создать свою библиотеку?', action: '' },
			{ id: 1, label: 'Как добавить слово в библиотеку?', action: '' },
		]
	},
	{ id: 1, icon: "mdi-finance", label: 'Отчеты' },
	{ id: 2, icon: "mdi-toy-brick-search-outline", label: 'Запросы' },
	{ id: 3, icon: "mdi-check-all", label: 'Чек-листы' },
	{ id: 4, icon: "mdi-lan", label: 'Темы' },
]
</script>

<template lang="pug">
q-dialog(v-model="help" persistent)
	q-card.main(style="width: 800px; max-width: 80vw;")
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
			q-scroll-area.scroll
				q-list.q-mx-md
					q-expansion-item(v-for="sec in sections" :key="sec.id" expand-separator :label="sec.label" :icon="sec.icon")
						q-card
							q-card-section(v-if="sec.children")
								q-list
									q-item(clickable v-for="item in sec.children" :key="sec.id")
										q-item-section
											q-item-label
												WordHighlighter(:query="filter")  {{ item.label }}

							q-card-section(v-else)
								.wip
									img(src="@/assets/img/vlc.svg")
									div Раздел в разработке
</template>

<style scoped lang="scss">
@import '@/assets/styles/myvariables.scss';

.main {
	height: 80vh;
}

.scroll {
	height: calc(80vh - 100px);
}

.zg {
	font-size: 1.3rem;
	font-weight: 600;
	display: flex;
	justify-content: space-between;
}

.q-input {
	width: 200px;
}

.wip {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 1rem;

	img {
		height: 36px;
	}
}
</style>
