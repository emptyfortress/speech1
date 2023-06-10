<template lang="pug">
q-page(padding).rel
	q-btn(round color="primary" icon="mdi-plus" size="lg" @click="openDialog" :class="{rot : dialog}").fab
	.container
		q-expansion-item(v-model="mystore.req")
			template(v-slot:header)
				q-item-section(avatar).line
					q-avatar(icon="mdi-toy-brick-search-outline" flat)
				q-item-section
					.zag Логические запросы
			q-card-section
				component(:is="Chiplist" :chips="chips" :multiple="false" :tooltip="false")
					template(v-slot:header)
						q-icon(name="mdi-star-outline").q-mr-sm
						|Мои запросы
			q-card-section.q-py-none
				component(:is="CommonOptions")
				q-card-actions.q-px-none
					q-btn(flat color="primary" label="Сбросить").q-mr-sm
					q-space
					q-btn(color="primary" flat label="Добавить к сравнению")
					q-btn(unelevated color="primary" icon="mdi-check-bold" label="Применить" @click="toggle")
				br
		component(:is="Graph")
		component(:is="Operatorstat")
		component(:is="Records")

		component(:is="Constructor" :dialog="dialog" :maximized="maximizedToggle")
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Chiplist from '@/components/common/Chiplist.vue'
import CommonOptions from '@/components/common/CommonOptions.vue'
import Graph from '@/components/Graph.vue'
import Operatorstat from '@/components/Operatorstat.vue'
import Records from '@/components/Records.vue'
import Constructor from '@/components/Constructor.vue'
import { useStore } from '@/stores/store'
import { useLogic } from '@/stores/logic'

const mylogic = useLogic()
const mystore = useStore()
const chips = mylogic.allLogic.filter((e) => e.star)
const dialog = ref(false)
const maximizedToggle = ref(true)

const toggle = () => {
	mystore.loading = true
	mystore.req = false
	mystore.integral = true
	setTimeout(() => {
		mystore.loading = false
	}, 1700)
}

const openDialog = () => {
	if (mylogic.activeLogic === undefined) {
		mylogic.allLogic[0].selected = true
	}
	dialog.value = !dialog.value
}
</script>

<style scoped lang="scss"></style>
