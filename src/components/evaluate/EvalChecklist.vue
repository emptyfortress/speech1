<script setup lang="ts">
import { ref, reactive } from 'vue'
const props = defineProps({
	mark: {
		type: Number,
		default: 50,
	},
})
const list = reactive([
	{ id: 0, text: 'Группа приветствие', mark: 67 },
	{ id: 1, text: 'Группа вежливость', mark: 53 },
	{ id: 2, text: 'Группа грубость', mark: 65 },
	{ id: 3, text: 'Группа для примера', mark: 65 },
	{ id: 4, text: 'Группа прощание', mark: 65 },
])

const checks = ref([
	{ id: 0, label: 'Презентация автострахование', mark: 33 },
	{ id: 1, label: 'Выявление автострахование', mark: 29 },
	{ id: 2, label: 'Презентация командировки', mark: 59 },
	{ id: 3, label: 'Выявление командировки', mark: 68 },
])
</script>

<template lang="pug">
q-list()
	q-expansion-item(expand-separator v-for="item in list" :key="item.id")
		template(v-slot:header)
			q-item-section(avatar)
				q-avatar(text-color="black") {{ item.id + 1 }}
			q-item-section
				q-item-label {{ item.text }}
			q-item-section(avatar side) {{ item.mark }}

		.grid
			template(v-for="item in checks" :key='item.id')
				label {{ item.label }}
				.val {{ item.mark }}
					q-popup-edit(v-model="item.mark" auto-save v-slot="scope")
						q-input(v-model="scope.value" dense autofocus counter @keyup.enter="scope.set")
		br

	q-separator(space)
	.total
		.text-h6 Средний балл:
		.text-h6
			q-avatar(color="secondary" text-color="white" size="md") {{ props.mark }}

</template>

<style scoped lang="scss">
:deep(.q-expansion-item.q-expansion-item--expanded .q-expansion-item__container) {
	background: white;
}

.grid {
	display: grid;
	width: 400px;
	grid-template-columns: auto auto;
	justify-items: start;
	align-items: center;
	column-gap: 1rem;
	row-gap: 0.5rem;
	font-size: 0.9rem;
	margin-bottom: 2rem;
	margin-left: 5rem;
}

.condition {
	grid-column: 1/-1;
}

.q-input {
	grid-column: 2/-1;
	font-size: 1.3rem;
}

.request {
	grid-column: 1/2;
	text-align: right;
	justify-self: end;
}

.total {
	display: flex;
	justify-content: space-between;
	margin: 0.5rem 3rem 0 4rem;
}

.val {
	color: $primary;
	border-bottom: 1px dotted $primary;

}
</style>
