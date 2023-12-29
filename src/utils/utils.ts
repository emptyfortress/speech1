import { uid } from 'quasar'

export interface MyColumns {
	name: string
	label: string
	field: string | ((row: any) => any)
	required?: boolean
	align?: 'left' | 'right' | 'center'
	sortable?: boolean
	sort?: (a: any, b: any, rowA: any, rowB: any) => number
	sortOrder?: 'ad' | 'da'
	format?: (val: any, row: any) => any
	style?: string | ((row: any) => string)
	classes?: string | ((row: any) => string)
	headerStyle?: string
	headerClasses?: string
}

const randomArray = (length: number, min: number, max: number) => {
	let result = []
	while (result.length < length) {
		let random = Math.floor(Math.random() * (max - min + 1) + min)
		result.push(random)
	}
	return result
}

const randomNumber = (min: number, max: number, fixed: number) => {
	return (Math.random() * (max - min + 1) + min).toFixed(fixed)
}

const getMembers = (members: RowCategory[]): RowCategory[] => {
	let children = [] as RowCategory[]
	return members
		.map((mem) => {
			const m = { ...mem } // use spread operator
			if (m.children && m.children.length) {
				children = [...children, ...m.children]
			}
			delete m.children // this will not affect the original array object
			return m
		})
		.concat(children.length ? getMembers(children) : children)
}

function getNodeFromTree(node: Category, nodeId: any): Category | null {
	if (node.id == nodeId) {
		return node
	} else if (node.children != null) {
		var result = null
		for (let i = 0; result == null && i < node.children.length; i++) {
			result = getNodeFromTree(node.children[i], nodeId)
		}
		return result
	}
	return null
}

function deleteNodeFromTree<T extends { id: string; children: T[] }>(node: T, nodeId: string) {
	if (node.children != null) {
		for (let i = 0; i < node.children.length; i++) {
			let filtered = node.children.filter((f) => f.id == nodeId)
			if (filtered && filtered.length > 0) {
				node.children = node.children.filter((f) => f.id != nodeId)
				return
			}
			deleteNodeFromTree(node.children[i], nodeId)
		}
	}
}

function insertNodeIntoTree<T extends { id: string; children: T[] }>(
	node: T,
	nodeId: string,
	newNode: T
) {
	if (node.id == nodeId) {
		node.children?.push(newNode)
	} else if (node.children != null) {
		for (let i = 0; i < node.children.length; i++) {
			insertNodeIntoTree(node.children[i], nodeId, newNode)
		}
	}
}

function buildAggregate(array: Operator[], iteration: String[]) {
	let agg: AggregatBlock[] = []
	iteration.forEach((it: any) => {
		const block = [...new Set(array.map((item: any) => item[it]))]
		const blockname = (it: string) => {
			switch (it) {
				case 'city':
					return 'Город'
				case 'group':
					return 'Группа'
				default:
					return 'Остальное'
			}
		}
		const list = block.map((el: any) => {
			const length = array.filter((item: any) => item[it] === el).length
			return {
				title: el,
				value: false,
				badge: length,
			}
		})
		list.sort((a, b) => b.badge - a.badge)

		const blocks: AggregatBlock = {
			col: it,
			name: blockname(it),
			list: list,
		}
		agg.push(blocks)
	})
	return agg
}
// function updateAggregat(array: Operator[], iteration: String[]) {
// 	let agg: AggregatBlock[] = []
// 	iteration.forEach((it: any) => {
// 		const block = [...new Set(array.map((item: any) => item[it]))]
// 		const blockname = (it: string) => {
// 			switch (it) {
// 				case 'city':
// 					return 'Город'
// 				case 'group':
// 					return 'Группа'
// 				default:
// 					return 'Остальное'
// 			}
// 		}
// 		const list = block.map((el: any) => {
// 			const length = array.filter((item: any) => item[it] === el).length
// 			return {
// 				title: el,
// 				badge: length,
// 			}
// 		})
// 		list.sort((a, b) => b.badge - a.badge)
//
// 		const blocks: AggregatBlock = {
// 			col: it,
// 			name: blockname(it),
// 			list: list,
// 		}
// 		// agg.push(blocks)
// 	})
// 	return agg
//
// }

export {
	buildAggregate,
	randomArray,
	randomNumber,
	getMembers,
	getNodeFromTree,
	deleteNodeFromTree,
	insertNodeIntoTree,
}
