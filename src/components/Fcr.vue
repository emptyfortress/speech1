<script setup lang="ts">
import Chiplist from '@/components/common/Chiplist.vue'
import { frc } from '@/stores/data'
</script>

<template lang="pug">
q-page(padding)
	.container
		q-expansion-item
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

</template>

<style scoped lang="scss"></style>
