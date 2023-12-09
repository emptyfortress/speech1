<script setup lang="ts">
import { ref } from 'vue'
import Options1 from '@/components/Options1.vue'
import { fcr } from '@/stores/data'
import { useStore } from '@/stores/store'
import Graph from '@/components/Graph.vue'
import Operatorstat from '@/components/Operatorstat.vue'
import Records from '@/components/Records.vue'
import FabButton from '@/components/common/FabButton.vue'
import ConstructorFcr from '@/components/ConstructorFcr.vue'

const mystore = useStore()
const dialog = ref(false)
const openDialog = () => {
	dialog.value = !dialog.value
}

const rep = ref(true)
const repNum = ref(1)
const timeFrame = ref('в день')
const options = ['в час', 'в день', 'в неделю']
</script>

<template lang="pug">
q-page(padding)
	FabButton.fab(:dialog="dialog" @clicked="openDialog")
	.container
		q-expansion-item(v-model="mystore.fcr")
			template(v-slot:header)
				q-item-section(avatar).line
					q-avatar(icon="mdi-phone-ring" flat)
				q-item-section
					.zag First call resolution
			q-card-section.sec
				.ro Звонки клиента от <span>2</span> раз в день, содержат фразы:&nbsp;
					q-chip(v-for="chip in fcr" color="primary" text-color="white") {{chip.label}}
				q-btn(flat round icon="mdi-menu" @click="openDialog") 
			.q-pl-md
				Options1
		Graph
		Operatorstat
		Records

	component(:is="ConstructorFcr" :dialog="dialog" :maximized="true")
</template>

<style scoped lang="scss">
.sec {
	border: 2px solid #ccc;
	margin: 1rem;
	margin-top: 0;
	padding-right: 5rem;
	position: relative;
	background: #d8d8d8;
	.q-btn {
		position: absolute;
		right: 0.5rem;
		top: 0.8rem;
	}
}
.q-input {
	transform: translateY(-7px);
	width: 230px;
	&.small {
		width: 70px;
	}
}
.ro span {
	font-size: 1.3rem;
	margin-left: 0.3rem;
	margin-right: 0.3rem;
	font-weight: 600;
}
</style>
