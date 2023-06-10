<template lang="pug">
q-page(padding)
	.container
		.huge
			.ava
				.q-avatar
					img(src="@/assets/img/user1.svg")
				div
					.text-weight-bold Голомудько
					.name Разубай Буранович
				q-space
				q-btn(label="Выйти" unelevated color="primary")
			q-btn(color="white" round icon="mdi-camera" text-color="black" size="sm").photo
		br
		br
		br
		br
		q-tabs(v-model="tab" dense active-color="primary" indicator-color="primary" align="left" )
			q-tab(name="info" label="Информация")
			q-tab(name="setup" label="Права")
			q-tab(name="notific" label="Уведомления")
			q-tab(name="login" label="Безопасность")
		q-separator

		q-tab-panels(v-model="tab" animated)
			q-tab-panel(name="info")
				.inf( v-if="inf") Чтобы изменить значения кликните по нему.
					q-btn(flat round icon="mdi-close" dense size="10px" @click="inf = false")
				.mygrid
					template(v-for="item in items" :key="item.id")
						.label {{item.label}}:
						.value(@click="edit = true")
							|{{item.value}}
							q-popup-edit(v-model="item.value" auto-save v-slot="scope").border-primary
								q-input(v-model="scope.value" dense autofocus counter @keyup.enter="scope.set")
				q-separator.q-mt-lg
				q-card-actions(v-if="edit")
					q-btn(flat color="primary" @click="edit = false") Отмена
					q-btn(unelevated color="primary" @click="edit = false") Сохранить

			q-tab-panel(name="setup")
				.mygrid
					.label Уровень доступа:
					.label Администратор
					q-separator
					.label Разрешенные для анализа операторы:
					.label Все

					.label Разрешенные для анализа регионы:
					.label Все
					.label Разрешенные для анализа группы:
					.label Все
					.label Разрешенные для анализа клиенты:
					.label Все

			q-tab-panel(name="notific")
				NotificSetup
				q-card-actions()
					q-btn(flat color="primary") Отмена
					q-btn(unelevated color="primary") Сохранить
			q-tab-panel(name="login")
				.mygrid
					.label Email:
					q-input(outlined dense v-model="mail").twenty
					.label Текущий пароль:
					q-input(outlined dense v-model="old" type="password").twenty
					.label Новый пароль:
					q-input(outlined dense v-model="old" type="password").twenty
					.label Подтвердите пароль:
					q-input(outlined dense v-model="old" type="password").twenty
				q-separator.q-mt-lg
				q-card-actions()
					q-btn(flat color="primary") Отмена
					q-btn(unelevated color="primary") Сохранить

</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import NotificSetup from '@/components/NotificSetup.vue'

const tab = ref('setup')
const mail = ref('admin@admin.ru')
const old = ref('')
const inf = ref(true)
const edit = ref(false)
const level = ref('администратор')
const commonOption = ref(['Option 1', 'Option 2', 'Option 3', 'Option 4'])
const all = ref('Все')
const items = reactive([
	{ id: 1, label: 'Логин', value: 'razubai' },
	{ id: 2, label: 'Почта', value: 'razubai@mail.ru' },
	{ id: 3, label: 'Имя', value: 'Разубaй' },
	{ id: 4, label: 'Отчество', value: 'Буранович' },
	{ id: 5, label: 'Фамилия', value: 'Голомудько' },
	{ id: 6, label: 'Местоположение', value: 'Санкт-Петербург' },
])
const check = ref([false, true, true, false, true, false, false, false, false, false])

onMounted(() => {
	if (location.hash === '#/profile#tab3') {
		tab.value = 'notific'
	}
})
</script>

<style scoped lang="scss">
@import '@/assets/styles/myvariables.scss';
.huge {
	height: 100px;
	background: url(@/assets/img/abstract.jpg);
	background-size: cover;
	background-position: 0 30%;
	position: relative;
}
.photo {
	position: absolute;
	bottom: -70px;
	left: 40px;
}
.ava {
	height: 100px;
	width: 100%;
	position: absolute;
	bottom: -70px;
	left: 0;
	display: flex;
	padding-left: 50px;
	justify-content: flex-start;
	align-items: flex-end;
	gap: 2rem;
	font-size: 1.2rem;
	.q-avatar {
		width: 100px;
		height: 100px;
	}
}
.mygrid {
	display: grid;
	grid-template-columns: auto 1fr;
	justify-content: start;
	gap: 1rem;
	grid-column-gap: 2rem;
	align-items: center;
	.q-separator {
		grid-column: 1/-1;
	}
	.twenty {
		width: 300px;
	}
}
.mygrid1 {
	display: grid;
	grid-template-columns: auto 1fr;
	justify-content: start;
	gap: 1rem;
	grid-column-gap: 2rem;
}
.q-tab-panels {
	min-height: 500px;
	box-shadow: $card-shadow;
	padding: 1rem;
	border-radius: 0 0 4px 4px;
	font-size: 0.9rem;
}
.value {
	font-weight: bold;
	cursor: pointer;
}
.inf {
	background: $bgLight;
	border: 1px solid #dedede;
	font-size: 0.7rem;
	padding: 0.3rem 0.6rem;
	margin-bottom: 2rem;
	position: relative;
	.q-btn {
		position: absolute;
		right: 3px;
		top: 2px;
	}
}
</style>
