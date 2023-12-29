import { defineStore } from 'pinia'
import { operators } from '@/stores/operators'

export const useOperatorList = defineStore({
	id: 'operatorList',
	state: () => ({
		operators: operators,
		aggregateData: [],
	}),
	getters: {},

	actions: {
		setAggregat(a: any) {
			this.aggregateData = a
		},
	},
})
