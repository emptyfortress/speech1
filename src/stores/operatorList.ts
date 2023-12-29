import { defineStore } from 'pinia'

export const useOperatorList = defineStore({
	id: 'operatorList',
	state: () => ({
		aggregateData: [] as AggregatBlock[],
		// checkedList: [] as AggregatList[],
	}),
	getters: {},
	actions: {
		setAggregat(a: AggregatBlock[]) {
			this.aggregateData = a
		},
		// addToAggregat(el: AggregatList) {
		// 	this.checkedList.push(el)
		// },
		// removeFromAggregat(el: AggregatList) {
		// 	this.checkedList = this.checkedList.filter((item) => item !== el)
		// },
	},
})
