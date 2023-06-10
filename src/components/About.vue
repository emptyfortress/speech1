<template lang="pug">
q-page(padding)
	.container
		.zag О программе
		.all-center
			.txt
				component(:is="SvgIcon" name="sound" color="#1565c0").q-mr-md
				|Речевая платформа SpeechDrive
			br
			q-img(src="@/assets/img/about1.jpg" width="400px")
			.descr.q-mt-md Версия 1.01 (сборка 89.987.33)
			.descr.q-mt-md Aenean euismod elementum nisi, quis eleifend quam. Ante metus, dictum at tempor commodo, ullamcorper a lacus vestibulum sed arcu non odio euismod lacinia at quis risus sed vulputate odio ut!
			.q-mt-md
				a(href="#") Онлайн-справка
			.q-mt-md
				a(href="#") Информация о стороннем программном обеспечении
			.q-mt-lg (c) 2017-2022 SpeechDrive. Все права защищены.

</template>

<script setup lang="ts">
import SvgIcon from '@/components/SvgIcon.vue'
</script>

<style scoped lang="scss">
//@import '@/assets/css/colors.scss';
.mygrid {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 1rem;
	.txt {
		font-size: 1.1rem;
		// transform: translateY(13px);
	}
}
.all-center {
	width: 400px;
	margin: 0 auto;
}
.txt {
	font-size: 1.2rem;
}
</style>
