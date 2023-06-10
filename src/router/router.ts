import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/components/Home.vue'

declare module 'vue-router' {
	interface RouteMeta {
		// is optional
		isAdmin?: boolean
		// must be declared by every route
		requiresAuth: boolean
		title: string
	}
}

export const router = createRouter({
	history: createWebHashHistory(),

	routes: [
		{
			path: '/',
			component: Home,
			meta: { transition: 'slide-left', title: 'Speech Drive', requiresAuth: false },
		},
		{
			path: '/report',
			component: () => import('@/components/Report.vue'),
			meta: { transition: 'slide-left', title: 'Отчеты', requiresAuth: false },
		},
		{
			path: '/compare',
			component: () => import('@/components/Compare.vue'),
			meta: { transition: 'slide-left', title: 'Сравнить', requiresAuth: false },
		},
		{
			path: '/users',
			component: () => import('@/components/Users.vue'),
			meta: { transition: 'slide-left', title: 'Пользователи', requiresAuth: false },
		},
		{
			path: '/checklists',
			component: () => import('@/components/Checklists.vue'),
			meta: { transition: 'slide-left', title: 'Чек-листы', requiresAuth: false },
		},
		{
			path: '/categories',
			component: () => import('@/components/Categories.vue'),
			meta: { transition: 'slide-left', title: 'Категории', requiresAuth: false },
		},
		{
			path: '/requests',
			component: () => import('@/components/Requests.vue'),
			meta: { transition: 'slide-left', title: 'Логические запросы', requiresAuth: false },
		},
		{
			path: '/notifications',
			component: () => import('@/components/Notifications.vue'),
			meta: { transition: 'slide-left', title: 'Уведомления', requiresAuth: false },
		},
		{
			path: '/about',
			component: () => import('@/components/About.vue'),
			meta: { transition: 'slide-left', title: 'О программе', requiresAuth: false },
		},
		{
			path: '/profile',
			component: () => import('@/components/Profile.vue'),
			meta: { transition: 'slide-left', title: 'О программе', requiresAuth: false },
		},
		{
			path: '/notifications/:id',
			component: () => import('@/components/Notifications.vue'),
			props: true,
			meta: { transition: 'slide-left', title: 'Уведомления', requiresAuth: false },
		},
		{
			path: '/setup',
			component: () => import('@/components/Setup.vue'),
			meta: { transition: 'slide-left', title: 'Настройка уведомлений', requiresAuth: false },
		},
		{
			path: '/board',
			component: () => import('@/components/Board.vue'),
			meta: { transition: 'slide-left', title: 'Логические запросы', requiresAuth: false },
		},
		{
			path: '/:pathMatch(.*)*',
			redirect: '/404',
		},
		{
			path: '/404',
			component: () => import('@/components/NotFound.vue'),
			meta: { transition: 'slide-left', title: 'Not Found', requiresAuth: false },
		},
	],
})

const DEFAULT_TITLE = 'DV Web-Client'
router.beforeEach((to) => {
	document.title = to.meta.title || DEFAULT_TITLE
})
