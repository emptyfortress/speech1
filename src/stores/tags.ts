import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTagsStore = defineStore('tags', () => {
	const tags = ref<Tag[]>([
		{
			id: 0,
			label: 'Все',
			selected: true,
		},
		{
			id: 1,
			label: 'тэг 1',
			selected: false,
		},
		{
			id: 2,
			label: 'тэг 2',
			selected: false,
		},
		{
			id: 3,
			label: 'тэг 3',
			selected: false,
		},
	])

	let nextId = 1

	function addTag(label: string) {
		if (label && !tags.value.some((t) => t.label === label)) {
			tags.value.push({ id: nextId++, label, selected: false })
		}
	}

	function removeTag(id: number) {
		tags.value = tags.value.filter((t) => t.id !== id)
	}

	function toggleTag(id: number) {
		const tag = tags.value.find((t) => t.id === id)
		if (tag) {
			tag.selected = !tag.selected
		}
	}

	function clearTags() {
		tags.value = []
		nextId = 1
	}

	return {
		tags,
		addTag,
		removeTag,
		toggleTag,
		clearTags,
	}
})
