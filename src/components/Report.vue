<template lang="pug">
q-page(padding)
	.container
		q-expansion-item(v-model="mystore.nat")
			template(v-slot:header)
				q-item-section(avatar).line
					q-avatar(flat)
						svg(xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24")
							path(fill="none" stroke="#888888" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 9a3 3 0 0 1 3-3m-2 15h4m0-3c0-4.1 4-4.9 4-9A6 6 0 1 0 6 9c0 4 4 5 4 9z")
				q-item-section
					.zag Спросить по-русски

			NlqModule

		br
		br
		q-expansion-item(v-model="mystore.sett")
			template(v-slot:header)
				q-item-section(avatar).line
					q-avatar(icon="mdi-finance" flat)
				q-item-section
					.zag Отчеты
			q-card-section
				Chiplist(:chips="starredReports" :multiple="true" :tooltip="true")
					// template(v-slot:addbutton)
					template(v-slot:header)
						q-icon(name="mdi-pin-outline").q-mr-sm
						|Мои отчеты

				Options
				Options1
				br
		Graph
		Stat
		Operatorstat
		Records

	SynBlock

</template>

<script setup lang="ts">
import { useStore } from '@/stores/store'
import Options from '@/components/Options.vue'
import Options1 from '@/components/Options1.vue'
import Graph from '@/components/Graph.vue'
import Stat from '@/components/Stat.vue'
import Operatorstat from '@/components/Operatorstat.vue'
import Records from '@/components/Records.vue'
import Chiplist from '@/components/common/Chiplist.vue'
import { starredReports } from '@/stores/data'
import SynBlock from '@/components/SynBlock.vue'
import NlqModule from '@/components/nlq/NlqModule.vue'

const mystore = useStore()
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
</style>
