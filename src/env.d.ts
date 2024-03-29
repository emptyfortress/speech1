/// <reference types="vite/client" />

declare module '*.vue' {
	import type { DefineComponent } from 'vue'
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
	const component: DefineComponent<{}, {}, any>
	export default component
}

// declare module '@globalhive/vuejs-tour'
declare module 'v-onboarding'
declare module 'vue-create-ripple'
declare module 'vue-ts-responsive-grid-layout'
