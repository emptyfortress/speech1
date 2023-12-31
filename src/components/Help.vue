<script setup lang="ts">
import { computed, reactive, ref, watchEffect } from 'vue'
import { useStore } from '@/stores/store'
import WordHighlighter from 'vue-word-highlighter'
import SvgIcon from './SvgIcon.vue';
import { useOnboard } from '@/stores/onboard'
import { driver } from "driver.js"
import "driver.js/dist/driver.css"

const store = useStore()
const onboard = useOnboard()

const filter = ref('')

const sections = reactive([
	{
		id: 0, icon: "mdi-book-open-page-variant-outline", expand: true, label: 'Ключевые слова', disable: false, children: [
			{ id: 0, label: 'Как добавить слово в библиотеку?' },
			{ id: 1, label: 'Как создать свой словарь?' },
		]
	},
	{ id: 1, icon: "mdi-finance", expand: false, label: 'Отчеты (в разработке)', disable: true },
	{ id: 2, icon: "mdi-toy-brick-search-outline", expand: false, label: 'Запросы (в разработке)', disable: true },
	{ id: 3, icon: "mdi-check-all", expand: false, label: 'Чек-листы (в разработке)', disable: true },
	{ id: 4, icon: "mdi-lan", expand: false, label: 'Темы (в разработке)', disable: true },
])

const filterByLabel = (array: any, searchTerm: string) => {
	return array.reduce((prev: any, curr: any) => {
		const children = curr.children ? filterByLabel(curr.children, searchTerm) : undefined

		return curr.label?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			curr.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			children?.length > 0
			? [...prev, { ...curr, children }]
			: prev
	}, [])
}

const filtered = computed(() => {
	if (filter.value.length > 0) {
		return filterByLabel(sections, filter.value)
	}
	return sections
})

const expandAll = (() => {
	return sections.map(sec => sec.expand = true)
})

watchEffect(() => {
	if (filter.value.length > 0) {
		expandAll()
	}
})

const driverObj = driver({
	overlayOpacity: .45,
	popoverClass: 'pop',
})

const driv = () => {
	store.closeHelp()
	driverObj.setSteps([
		{
			element: '#library',
			popover: {
				title: 'Откройте библиотеку',
				description: 'Она находится в правой панели.',
				side: "left", align: 'start',
				onNextClick: () => {
					store.openKeyDrawer()
					driverObj.moveNext()
				}
			},
		},
		{
			element: '#step1', popover: {
				title: 'Фильтр', description: 'Сначала проверьте, есть ли уже такое слово? Для этого введите его в поле фильтра.', side: "left", align: 'start',
				onNextClick: () => {
					store.setKeywordFilter('новое слово')
					driverObj.moveNext()
				}
			}
		},
		{
			element: '#step1', popover: {
				title: 'Фильтр', description: 'Если такого слова нет, то появится кнопка', side: "left", align: 'start',
				onNextClick: () => {
					driverObj.moveNext()
				}
			}
		},
		{
			element: '#step2', popover: {
				title: 'Добавить', description: 'Нажмите "Добавить" и слово появится в словаре вверху списка.', side: "left", align: 'start',
				onNextClick: () => {
					onboard.toggle()
					driverObj.moveNext()
				}
			}
		},
		{
			popover: {
				title: 'Завершить', description: 'Вот и все! Просто, не правда ли?', side: "left", align: 'start',
				onNextClick: () => {
					driverObj.moveNext()
					store.openHelp()
					setTimeout(() => {
						onboard.addNewWord = false
						onboard.addVoc = false
					}, 300)
				}
			},
		}
	])
	driverObj.drive()
}
</script>

<template lang="pug">
q-dialog(v-model="store.help" persistent)
	q-card.main(style="width: 800px; max-width: 80vw;")
		q-btn.close(round color="negative" icon="mdi-close" @click="store.closeHelp")
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
					q-expansion-item(v-model="sec.expand" v-for="sec in filtered" :key="sec.id" :label="sec.label" :icon="sec.icon" :disable="sec.disable")
						q-card
							q-card-section(v-if="sec.children")
								q-list
									q-item.link(clickable v-for="item in sec.children" :key="sec.id" @click="driv")
										q-item-section
											q-item-label
												WordHighlighter(:query="filter") {{ item.label }}

							q-card-section(v-else)
								.wip
									img(src="@/assets/img/vlc.svg")
									div Раздел в разработке

				br
				q-card-section
					p
						SvgIcon.q-mr-md(name="sound")
						a(href="") Полное руководство Speech-drive
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

.link {
	color: $primary;
}
</style>
