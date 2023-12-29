import { defineStore } from 'pinia'

export const useOperatorList = defineStore({
	id: 'operatorList',
	state: () => ({
		aggregateData: [] as AggregatBlock[],
		cityFilters: [] as String[],
		groupFilters: [] as String[],
	}),
	getters: {},
	actions: {
		setAggregat(a: AggregatBlock[]) {
			this.aggregateData = a
		},
		addToCityFilters(el) {
			this.cityFilters.push(el)
		},
		removeFromCityFilters(el) {
			this.cityFilters = this.cityFilters.filter((item) => item !== el)
		},
		addToGroupFilters(el) {
			this.groupFilters.push(el)
		},
		removeFromGroupFilters(el) {
			this.groupFilters = this.groupFilters.filter((item) => item !== el)
		},
	},
})
