<template lang="pug">
.starred
	q-card-section
		.row.justify-between.items-center
			.subtitle-1(@click="toggleEdit")
				q-icon(name="mdi-star-outline").q-mr-sm
				|Избранное
				q-icon(name="mdi-pencil-outline" ).editicon
			q-input(dense v-model="filter" clearable hide-bottom-space @clear="filter = ''")
				template(v-slot:prepend)
					q-icon(name="mdi-magnify")
	q-card-section
		Starred
		//- StarChip(v-for="item in filteredReports"
		//- 	:label="item.label"
		//- 	:selected="item.selected"
		//- 	:editMode="editMode")

</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { starredReports } from '@/stores/data'
import Starred from '@/components/Starred.vue'

const chips = reactive(starredReports)
const filter = ref('')
const editMode = ref(false)
const toggleEdit = () => (editMode.value = !editMode.value)

const filteredReports = computed(() => chips.filter((item) => item.label.includes(filter.value)))
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
.starred {
	grid-column: 1 / -1;
	padding: 0;
	.q-card__section {
		padding: 1rem 0 0 0;
	}
}
.subtitle-1 {
	cursor: pointer;
	.editicon {
		display: none;
		margin-left: 0.5rem;
	}
	&:hover {
		.editicon {
			display: inline-block;
		}
	}
}
.q-icon {
	margin-bottom: 3px;
}
.q-input {
	transform: translateY(-7px);
	width: 230px;
}
.q-chip {
	max-width: 200px;
}
</style>
