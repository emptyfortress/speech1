<template lang="pug">
q-page(padding)
	.container
		.notific
			q-card
				q-card-section
					.zag
						q-icon(name="mdi-cog-outline").q-mr-md
						|Настройки уведомлений
				q-card-section
					q-list(separator)
						q-item(clickable v-for="n in 9" :key="n")
							q-item-section
								q-item-label Настройка {{n}}
								q-item-label(overline) дескрипшн настройки
							q-item-section(side)
								q-checkbox(v-model="check[n]")
</template>

<script setup lang="ts">
import { ref } from 'vue'

const check = ref([false, false, false, false, false, false, false, false, false, false])
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
</style>
