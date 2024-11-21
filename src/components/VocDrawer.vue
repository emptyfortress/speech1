<template lang="pug">
q-drawer.rd(v-model="mystore.vocDrawer" overlay side="right" :width="600" )
	.movedcontent
		q-btn.bt(unelevated round icon="mdi-close" color="primary" @click="mystore.vocDrawer = false" size="sm") 

		.zg
			SvgIcon(name="vocabulary" class="voc")
			|{{ mystore.currentVoc?.name }} ({{ mystore.currentVoc?.keys.length }})

		q-input#step1(ref="input" dense v-model="filter" clearable hide-bottom-space)
			template(v-slot:prepend)
				q-icon(name="mdi-magnify")

		q-list(dense )
			draggable(v-model="mystore.currentVoc.keys" itemKey="id" @drop="add")
				template(#item="{ element }")
					q-item#voc(clickable dense)
						q-item-section
							.row.items-center
								WordHighlighter(:query="filter") {{ element }}
						q-item-section(side)
							q-icon.hov(name="mdi-close" size="xs" @click="remove(element)")
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useStore } from '@/stores/store'
import SvgIcon from '@/components/SvgIcon.vue'
import draggable from 'vuedraggable'
import WordHighlighter from 'vue-word-highlighter'

const mystore = useStore()

const filter = ref('')

const items = ref([])

onMounted(() => {
	items.value = mystore.currentVoc?.keys
})

const add = (() => {
	if (mystore.currentVoc.keys.filter((item) => item == mystore.draggingWord).length > 0) {
		return
	}
	mystore.addKeyToCurrentVoc(mystore.draggingWord)
})
</script>

<style scoped lang="scss">
.date {
	margin-top: 0;
}

.rd {
	position: relative;
}

.movedcontent {
	width: 275px;
	position: relative;
}

.bt {
	position: absolute;
	right: 0px;
	top: -.5rem;
	z-index: 5;
}

.zg {
	margin-bottom: 1rem;
	font-size: 1rem;
	font-weight: 600;
	display: flex;
	justify-content: flex-start;
	gap: 0.5rem;
}
.q-item {
	.hov {
		display: none;
	}

	&:hover {
		.hov {
			display: block;
		}
	}
}
</style>
