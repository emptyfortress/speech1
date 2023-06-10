<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import WordHighlighter from 'vue-word-highlighter'
import { useLogic } from '@/stores/logic'
const props = defineProps({
	commentList: { type: Boolean, default: false },
})

const mystore = useLogic()

const firstItem = ref(true)
const secondItem = ref(false)

const alllogic = computed(() => {
	return mystore.allLogic.filter((item) => {
		if (query.value) {
			return (
				item.label.toLowerCase().includes(query.value.toLowerCase()) ||
				item.comment.toLowerCase().includes(query.value.toLowerCase())
			)
		}
		return mystore.allLogic
	})
})

const mylogic = computed(() => {
	return alllogic.value.filter((item) => item.star === true)
})
const otherlogic = computed(() => {
	return alllogic.value.filter((item) => item.star !== true)
})

const query = ref('')
const clearFilter = () => (query.value = '')
watch(query, (val) => {
	if (val !== null) {
		secondItem.value = true
		firstItem.value = true
	} else return
})

const setActive = (e: number) => {
	const index = mystore.allLogic.findIndex((item) => item.id === e)
	mystore.allLogic.map((item) => {
		item.selected = false
	})
	mystore.allLogic[index].selected = true
}
const setStar = (e: number) => {
	const index = mystore.allLogic.findIndex((item) => item.id === e)
	mystore.allLogic[index].star = !mystore.allLogic[index].star
}
</script>

<template lang="pug">
q-scroll-area.list
	q-form.quick
		q-card-section.q-pt-xs
			q-input(dense
				v-model="query"
				autofocus
				clearable
				@clear="clearFilter"
				placeholder="фильтр"
				).query
				template(v-slot:prepend)
					q-icon(name="mdi-magnify")

		q-expansion-item(v-model="firstItem" header-class="text-bold")
			template(v-slot:header)
				q-item-section(avatar)
					q-icon(name="mdi-star-outline")
				q-item-section Мои запросы
				q-item-section(side) ({{mylogic.length}})

			q-list(dense).q-mb-lg
				q-item(v-for="item in mylogic" :key="item.id" tag="label" v-ripple :active="item.selected" active-class="selected" @click.prevent="setActive(item.id)" )
					q-item-section(side top)
						q-btn(dense unelevated round icon="mdi-star" size="10px" @click.stop="setStar(item.id)")
					q-item-section
						q-item-label
							WordHighlighter(:query="query") {{ item.label }}
					q-item-section(v-show="props.commentList")
						div(v-if="item.comment.length !== 28").comment
							WordHighlighter(:query="query") {{ item.comment }}

		q-expansion-item(v-model="secondItem" header-class="text-bold")
			template(v-slot:header)
				q-item-section(avatar)
					q-icon(name="mdi-cloud-search-outline")
				q-item-section Другие запросы
				q-item-section(side) ({{otherlogic.length}})
			q-list(dense).q-mb-lg
				q-item(v-for="item in otherlogic" :key="item.id" tag="label" v-ripple :active="item.selected" active-class="selected" @click.prevent="setActive(item.id)" )
					q-item-section(side top)
						q-btn(dense unelevated round icon="mdi-star-outline" size="10px" @click.stop="setStar(item.id)")
					q-item-section
						q-item-label
							WordHighlighter(:query="query") {{ item.label }}
					q-item-section(v-show="props.commentList")
						div(v-if="item.comment.length !== 28").comment
							WordHighlighter(:query="query") {{ item.comment }}
</template>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
.quick .q-field--dense .q-field__control,
.q-field--dense .q-field__marginal {
	height: 28px !important;
}
.query {
	font-size: 1rem;
	flex-grow: 1;
}
.list {
	padding: 0.5rem;
	margin-right: 0.5rem;
	height: calc(100vh - 105px);
}
.selected {
	color: white;
	background: $primary;
	.q-btn {
		color: white;
	}
}
.list {
	font-size: 0.9rem;
}
.comment {
	font-size: 0.8rem;
	line-height: 100%;
}
</style>
