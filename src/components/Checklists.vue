<template lang="pug">
q-page.rel(padding)
	FabButton.fab(:dialog="dialog1" @clicked="openDialog")
	.container
		q-expansion-item(v-model="mystore.chec")
			template(v-slot:header)
				q-item-section(avatar).line
					q-avatar(icon="mdi-check-all" flat)
				q-item-section
					.zag Чеклисты
			q-card-section
				component(:is="Chiplist" :chips="chips" :multiple="false" :tooltip="false")
					template(v-slot:header)
						q-icon(name="mdi-pin-outline").q-mr-sm
						|Мои чеклисты
			q-card-section.q-py-none
				component(:is="CommonOptions")
				q-card-actions.q-px-none
					q-btn(flat color="primary" label="Сбросить").q-mr-sm
					q-space
					q-btn(color="primary" flat label="Добавить к сравнению" @click='compare')
					q-btn(unelevated color="primary" icon="mdi-check-bold" label="Применить" @click="toggle")
				.compare(v-if='mystore.compare')
					Compare

		// OperStat1
		Graph1
		VehaStat
		OperStat
		VehaRecord

		Constructor1(:dialog="dialog1" :maximized="maximizedToggle")
		// WindowConstructor
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useStore } from '@/stores/store'
import { useCheck } from '@/stores/check'
import Chiplist from '@/components/common/Chiplist.vue'
import CommonOptions from '@/components/common/CommonOptions.vue'
import Graph1 from '@/components/Graph1.vue'
import VehaStat from '@/components/VehaStat.vue'
import OperStat from '@/components/OperStat.vue'
import OperStat1 from '@/components/OperStat1.vue'
import VehaRecord from '@/components/VehaRecord.vue'
import Constructor1 from '@/components/Constructor1.vue'
// import WindowConstructor from '@/components/WindowConstructor.vue'
import FabButton from '@/components/common/FabButton.vue'
import Compare from '@/components/Compare.vue'

const mystore = useStore()
const mycheck = useCheck()
const dialog1 = ref(false)
const chips = mycheck.allCheck.filter((e) => e.star)
const maximizedToggle = ref(true)

const toggle = () => {
	mystore.loading = true
	mystore.chec = false
	mystore.integral = true
	setTimeout(() => {
		mystore.loading = false
	}, 1700)
}

const openDialog = () => {
	if (mycheck.activeCheck === undefined) {
		mycheck.allCheck[0].selected = true
	}
	dialog1.value = !dialog1.value
}

const compare = (() => {
	mystore.setCompare(true)
})
</script>

<style scoped lang="scss"></style>
