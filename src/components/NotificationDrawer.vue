<template lang="pug">
q-drawer(v-model="mystore.notificationDrawer" overlay side="right" :width="300" ).rd.noti
	.text-h6.row.justify-between.items-center
		span(@click="$router.push('/notifications')").cursor-pointer.text-primary Уведомления

		q-btn(round flat icon="mdi-dots-horizontal")
			q-menu(transition-show="jump-down" transition-hide="jump-up")
				q-list
					q-item(clickable v-close-popup)
						q-item-section(avatar)
							q-icon(name="mdi-check-all")
						q-item-section Прочитать все
					q-item(clickable v-close-popup @click="$router.push('/notifications')")
						q-item-section(avatar)
							q-icon(name="mdi-bell-outline")
						q-item-section Открыть уведомления
					q-item(clickable v-close-popup @click="$router.push('/profile#tab3')")
						q-item-section(avatar)
							q-icon(name="mdi-cog-outline")
						q-item-section Настройки уведомлений

		q-btn(unelevated round icon="mdi-close" color="primary" @click="mystore.notificationDrawer = false" size="sm") 

	.row.justify-between.items-center
		div
			q-chip(clickable :label="chip.label" v-for="chip in chips" :key="chip.id" :class="{'selected' : chip.selected}" @click="select(chip)")
		q-btn(flat round icon="mdi-check-all" @click="readAll")
			q-tooltip Прочитать все
	.text-body1.text-weight-bold.q-mt-md.row.justify-between
		div Новые
		.normal ({{newitems.length}})
	q-list(separator).list
		q-item(clickable v-ripple v-for="item in newitems" :key="item.id" :class="{'active' : item.unread}" @click="goTo(item.id)")
			q-item-section
				q-item-label(overline) {{item.date}}, {{item.time}}
				q-item-label(:class="{'text-weight-bold' : item.unread}").text-subtitile1 {{item.name}}
				q-item-label оператор: Катя
			q-item-section(side)
				q-item-label
				q-item-label.normal {{item.channel}}
			.mybt
				q-btn(round color="white" text-color="black" icon="mdi-check" size="sm" @click.stop="read(item)").q-mr-xs
				q-btn(round color="white" text-color="black" icon="mdi-trash-can-outline" size="sm" @click.stop="")
					q-menu
						q-list
							q-item(clickable @click.stop="remove(item)" v-close-popup).pink
								q-item-section Удалить
	.text-body1.text-weight-bold.q-mt-md.row.justify-between
		div Остальные
		div.normal ({{olditems.length}})
	q-list(separator).list
		q-item(clickable v-ripple v-for="item in olditems" :key="item.id" :class="{'active' : item.unread}" @click="goTo(item.id)")
			q-item-section
				q-item-label(overline).thin {{item.date}}, {{item.time}}
				q-item-label(:class="{'text-weight-bold' : item.unread}") {{item.name}}
				q-item-label оператор: Катя
			q-item-section(side)
				q-item-label &nbsp;
				q-item-label.normal {{item.channel}}
			.mybt
				q-btn(round color="white" text-color="black" icon="mdi-check" size="sm" @click.stop="read(item)").q-mr-xs
				q-btn(round color="white" text-color="black" icon="mdi-trash-can-outline" size="sm" @click.stop="remove(item)")

</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from '@/stores/store'
import { notifications } from '@/stores/notifications'
import { router } from '@/router/router'

const noti = ref(notifications)
const chips = ref([
	{ id: 0, label: 'Все', selected: true },
	{ id: 1, label: 'Непрочитанные', selected: false },
])
const mystore = useStore()

const select = (e: Chip) => {
	chips.value.forEach((item) => (item.selected = false))
	e.selected = !e.selected
}

const newitems = computed(() => {
	return noti.value.filter((e) => e.old === false)
})
const olditems = computed(() => {
	return noti.value.filter((e) => e.old === true)
})

const read = (e: any) => {
	return (e.unread = !e.unread)
}
const readAll = () => {
	return noti.value.map((item) => (item.unread = false))
}

const remove = (e: any) => {
	let ind = noti.value.findIndex((item) => item.id === e.id)
	noti.value.splice(ind, 1)
}
const goTo = (e: number) => {
	router.push('/notifications/' + e)
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/myvariables.scss';
.date {
	margin-top: 0;
}
.q-chip {
	cursor: pointer;
	&.selected {
		background: $accent1;
		color: $blue-9;
	}
}
.q-list {
	font-size: 0.8rem;
}
.thin {
	font-weight: 300;
}
.list .q-item {
	line-height: 100%;
	// padding-left: 4px;
	// padding-right: 4px;
	position: relative;
	.mybt {
		position: absolute;
		right: 4px;
		top: 50%;
		transform: translateY(-50%);
		display: none;
	}
	&:hover .mybt {
		display: block;
	}
	&.active {
		border-left: 3px solid $primary;
	}
}
.q-drawer {
	background: white;
}
.normal {
	font-weight: 400;
}
</style>
