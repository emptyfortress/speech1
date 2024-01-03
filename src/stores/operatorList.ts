import { defineStore } from 'pinia'

export const useOperatorList = defineStore({
	id: 'operatorList',
	state: () => ({
		aggregateData: [] as AggregatBlock[],
		cityFilters: [] as String[],
		groupFilters: [] as String[],
		dateFilters: [] as String[],
		selectedOperators: [],
	}),
	getters: {},
	actions: {
		setAggregat(a: AggregatBlock[]) {
			this.aggregateData = a
		},
		addToCityFilters(el: string) {
			this.cityFilters.push(el)
		},
		removeFromCityFilters(el: string) {
			this.cityFilters = this.cityFilters.filter((item) => item !== el)
		},
		addToGroupFilters(el: string) {
			this.groupFilters.push(el)
		},
		removeFromGroupFilters(el: string) {
			this.groupFilters = this.groupFilters.filter((item) => item !== el)
		},
		addToDateFilters(el: string) {
			this.dateFilters.push(el)
		},
		removeFromDateFilters(el: string) {
			this.dateFilters = this.dateFilters.filter((item) => item !== el)
		},
	},
})
