<template lang="pug">
.myrow
	//- video( autoplay loop playsinline muted ).vid
	//- 	source(src="@/assets/img/autumn.mp4" type="video/mp4")
	q-card.card.shadow-5
		.logo
			q-avatar
				img(src="@/assets/img/user1.svg")
		.he Модуль речевой аналитики ANALYZE
		q-card-section
			form
				q-input(type="text" dense placeholder="Email" v-model="mail").big
					template(v-slot:append)
						q-icon(name="mdi-email-outline")
				q-input(type="password" dense placeholder="Пароль" v-model="pass").big
					template(v-slot:append)
						q-icon(name="mdi-eye-off")

			.q-mt-md
				q-checkbox(v-model="alien" color="negative" label="Чужой компьютер" dense size="sm")
		q-card-section
			q-btn(:loading="loading" color="primary" label="Вход" @click="login").full-width
		//- .forget
		//- 	a(href="#") Напомнить пароль
	.dv
		.row.justify-start.items-center
			SvgIcon(name="sound" color="#fff").q-mr-md
			.txt Speech Drive
		.txt Речевая платформа
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SvgIcon from '@/components/SvgIcon.vue'
const emit = defineEmits(['login'])

const alien = ref(false)
const loading = ref(false)

const mail = ref('')
const pass = ref('')
const login = () => {
	loading.value = true
	setTimeout(() => {
		loading.value = false
		emit('login')
	}, 400)
}
</script>

<style scoped lang="scss">
.myrow {
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
	background: url(@/assets/img/city.webp) no-repeat;
	background-position: 30%;
	background-size: cover;
	.dv {
		position: absolute;
		top: 50%;
		left: 0;
		display: flex;
		justify-content: space-between;
		width: 100%;
		/* background: rgba(0,0,0,.4); */
		background: rgba(0, 0, 0, 0.4);
		padding: 1rem 2rem;
		.txt {
			color: white;
			font-size: 2rem;
			font-weight: 300;
		}
	}
}
.vid {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	object-fit: cover;
}
.card {
	margin-top: -8rem;
	box-sizing: border-box;
	width: 450px;
	background: #fff;
	padding: 2rem;
	padding-top: 3rem;
	padding-top: 3rem;
	position: relative;
	box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
	border-radius: 5px;
	z-index: 2;
	.icon-mail {
		font-size: 1rem;
		margin-right: 1rem;
	}
	.logo {
		position: absolute;
		top: -3rem;
		left: 50%;
		transform: translateX(-50%);
		background: #fff;
		padding: 1rem;
		border-radius: 6rem;
	}
	a:hover {
		text-decoration: underline;
	}
	.forget {
		position: absolute;
		bottom: -1.7rem;
		left: 0;
		a:link,
		a:visited {
			color: #fff;
			text-decoration: none;
			opacity: 0.5;
			&:hover {
				text-decoration: underline;
				opacity: 1;
			}
		}
	}
	.registration {
		position: absolute;
		bottom: -1.7rem;
		right: 0;
	}
}
.he {
	font-size: 1.1rem;
	transform: translateY(-15px);
	text-align: center;
}
.big {
	font-size: 1.1rem;
}
</style>
