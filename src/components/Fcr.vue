<script setup lang="ts">
import Chiplist from '@/components/common/Chiplist.vue'
import Options1 from '@/components/Options1.vue'
import { frc } from '@/stores/data'
import { useStore } from '@/stores/store'
import Graph from '@/components/Graph.vue'
import Operatorstat from '@/components/Operatorstat.vue'
import Records from '@/components/Records.vue'
import FolderModal from '@/components/common/FolderModal.vue'

const mystore = useStore()
</script>

<template lang="pug">
q-page(padding)
	.container
		q-expansion-item(v-model="mystore.fcr" )
			template(v-slot:header)
				q-item-section(avatar).line
					q-avatar(icon="mdi-phone-ring" flat)
				q-item-section
					.zag First call resolution
			q-card-section
				Chiplist(:chips="frc" :multiple="true" :tooltip="true" repeat)
					template(v-slot:header)
						q-icon(name="mdi-pin-outline").q-mr-sm
						|Настройка повторных звонков
			// q-card-section
			// 	.rowline
			// 		q-checkbox(v-model="rep") Звонки от:
			// 		q-input.small(dense v-model="repNum" outlined bg-color="white" type="number" min="1")
			// 		div раз
			// 		q-select(dense v-model="timeFrame" outlined bg-color="white" :options="options")
			Options1
		Graph
		Operatorstat
		Records

	FolderModal(v-model="mystore.folderModal")
</template>

<style scoped lang="scss">
.rowline {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	gap: 1rem;
	.q-select {
		transform: translateY(-5px);
	}
}
</style>
