<template lang="pug">
q-page(padding).rel
	q-btn(round color="primary" icon="mdi-plus" size="lg" @click="openDialog" :class="{rot : dialog}").fab
	.container
		q-expansion-item(v-model="mystore.cat")
			template(v-slot:header)
				q-item-section(avatar).line
					q-avatar(icon="mdi-lan" flat)
				q-item-section
					.zag Темы
			q-card-section.q-py-none
				component(:is="CommonOptions")
				q-card-actions.q-px-none
					q-btn(flat color="primary" label="Сбросить").q-mr-sm
					q-space
					q-btn(color="primary" flat label="Добавить к сравнению")
					q-btn(unelevated color="primary" icon="mdi-check-bold" label="Применить")
				br
		component(:is="CategNew")
		component(:is="Records")

		component(:is="Constructor3" :dialog="dialog" :maximized="maximizedToggle")
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '@/stores/store'
import CommonOptions from '@/components/common/CommonOptions.vue'
import CategNew from '@/components/CategNew.vue'
import Records from '@/components/Records.vue'

import Constructor3 from '@/components/Constructor3.vue'

const mystore = useStore()
const dialog = ref(false)
const maximizedToggle = ref(true)

const openDialog = () => {
	dialog.value = !dialog.value
}
</script>

<style scoped lang="scss"></style>
