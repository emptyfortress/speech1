interface Chip {
	id: number
	label: string
	star?: boolean
	selected: boolean
	comment?: string
	value?: string
}

interface Logic {
	id: number
	label: string
	comment: string
	star: boolean
	selected: boolean
}

interface Condition {
	id: number
	condition: ConditionEnum
	mod1: string
	mod2: string
}

interface List {
	id: number
	list: Condition[]
}

interface Column {
	id?: number
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

interface Podcategory {
	id: string
	label: string
	typ: number
	name?: string
}

interface RowCategory {
	id: number
	label: string
	call?: string
	ant?: string
	loud?: string
	interrupt?: string
	dynamics?: any
	volume?: any
	donut?: number[]
	spark?: Array
	selected?: boolean
	classname?: string
	children?: RowCategory[]
	childs?: Podcategory[]
}

interface Category {
	id: string
	label: string
	level: number
	breads?: string[]
	typ?: number
	header?: string
	childs?: Podcategory[]
	children?: Category[]
}

interface Request {
	id: string
	label: string
	typ: number
	header?: string
	children?: Request[] | null
}

interface RowNotific {
	id: number
	name: string
	channel: string
	date: string
	time: string
	oper: string
	unread?: boolean
	old?: boolean
	selected?: boolean
	classname?: string
	context?: string
}
