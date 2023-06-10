import { randomArray } from '@/utils/utils'

const options = {
	chart: {
		type: 'bar',
		stacked: true,
		toolbar: {
			show: false,
		},
	},
	plotOptions: {
		bar: {
			horizontal: true,
		},
	},
	stroke: {
		width: 1,
		colors: ['#fff'],
	},
	xaxis: {
		categories: ['Екатерина', 'Елена', 'Ксения', 'Ирина', 'Ева', 'Дарья'],
	},
	yaxis: {
		title: {
			text: undefined,
		},
	},
	fill: {
		opacity: 1,
	},
	legend: {
		position: 'bottom',
		horizontalAlign: 'center',
	},
	colors: ['#29A1F9', '#FDB948', '#C72829'],
}

const options1 = {
	chart: {
		type: 'bar',
		stacked: true,
		toolbar: false,
	},
	plotOptions: {
		bar: {
			horizontal: true,
		},
	},
	stroke: {
		width: 1,
		colors: ['#fff'],
	},
	xaxis: {
		categories: [
			'Екатерина',
			'Елена',
			'Ксения',
			'Ирина',
			'Ева',
			'Дарья',
			'Кира',
			'Елизавета',
			'Ульяна',
			'Татьяна',
			'Юлия',
			'Софья',
			'Алина',
			'Злата',
			'Милана',
			'Ольга',
			'Светлана',
			'Ярослава',
			'Яна',
			'Кристина',
			'Алиса',
			'Маргарита',
			'Таисия',
			'Тамара',
			'Эмилия',
			'Диана',
			'Анфиса',
			'Аделина',
			'Евдокия',
			'Зоя',
			'Ираида',
			'Наталья',
			'Пелагея',
			'Сабина',
			'Антонина',
		],
		// labels: {
		// 	show: false,
		// 	minHeight: 0,
		// 	maxHeight: 0,
		// },
	},
	yaxis: {
		show: false,
		title: {
			text: undefined,
		},
	},
	fill: {
		opacity: 1,
	},
	legend: {
		position: 'top',
		horizontalAlign: 'center',
	},
	colors: ['#29A1F9', '#FDB948', '#C72829'],
}

const bigData = [
	{ id: 0, name: 'Екатерина', total: 169, ant: 9, loud: 15, interrupt: 47 },
	{ id: 1, name: 'Елена    ', total: 216, ant: 43, loud: 93, interrupt: 87 },
	{ id: 2, name: 'Ксения   ', total: 283, ant: 31, loud: 87, interrupt: 83 },
	{ id: 3, name: 'Ирина    ', total: 255, ant: 23, loud: 59, interrupt: 20 },
	{ id: 4, name: 'Ева      ', total: 210, ant: 9, loud: 19, interrupt: 87 },
	{ id: 5, name: 'Дарья    ', total: 225, ant: 24, loud: 54, interrupt: 67 },
	{ id: 6, name: 'Кира     ', total: 209, ant: 22, loud: 45, interrupt: 37 },
	{ id: 7, name: 'Елизавета', total: 204, ant: 31, loud: 63, interrupt: 53 },
	{ id: 8, name: 'Ульяна   ', total: 167, ant: 28, loud: 47, interrupt: 4 },
	{ id: 9, name: 'Татьяна  ', total: 257, ant: 21, loud: 53, interrupt: 59 },
	{ id: 10, name: 'Юлия     ', total: 227, ant: 37, loud: 83, interrupt: 77 },
	{ id: 11, name: 'Софья    ', total: 197, ant: 16, loud: 32, interrupt: 97 },
	{ id: 12, name: 'Алина    ', total: 295, ant: 18, loud: 53, interrupt: 17 },
	{ id: 13, name: 'Злата    ', total: 244, ant: 39, loud: 96, interrupt: 19 },
	{ id: 14, name: 'Милана   ', total: 190, ant: 38, loud: 73, interrupt: 48 },
	{ id: 15, name: 'Ольга    ', total: 263, ant: 18, loud: 47, interrupt: 3 },
	{ id: 16, name: 'Светлана ', total: 176, ant: 10, loud: 17, interrupt: 54 },
	{ id: 17, name: 'Ярослава ', total: 292, ant: 16, loud: 48, interrupt: 15 },
	{ id: 18, name: 'Яна      ', total: 284, ant: 11, loud: 30, interrupt: 60 },
	{ id: 19, name: 'Кристина ', total: 255, ant: 18, loud: 46, interrupt: 86 },
	{ id: 20, name: 'Алиса    ', total: 153, ant: 50, loud: 77, interrupt: 17 },
	{ id: 21, name: 'Маргарита', total: 161, ant: 60, loud: 97, interrupt: 96 },
	{ id: 22, name: 'Таисия   ', total: 235, ant: 12, loud: 29, interrupt: 29 },
	{ id: 23, name: 'Тамара   ', total: 203, ant: 42, loud: 86, interrupt: 45 },
	{ id: 24, name: 'Эмилия   ', total: 231, ant: 7, loud: 17, interrupt: 73 },
	{ id: 25, name: 'Диана    ', total: 183, ant: 11, loud: 20, interrupt: 47 },
	{ id: 26, name: 'Анфиса   ', total: 211, ant: 41, loud: 86, interrupt: 46 },
	{ id: 27, name: 'Аделина  ', total: 234, ant: 30, loud: 70, interrupt: 46 },
	{ id: 28, name: 'Евдокия  ', total: 237, ant: 16, loud: 37, interrupt: 86 },
	{ id: 29, name: 'Зоя      ', total: 185, ant: 36, loud: 67, interrupt: 45 },
	{ id: 30, name: 'Ираида   ', total: 215, ant: 21, loud: 45, interrupt: 53 },
	{ id: 31, name: 'Наталья  ', total: 276, ant: 9, loud: 24, interrupt: 32 },
	{ id: 32, name: 'Пелагея  ', total: 259, ant: 18, loud: 46, interrupt: 3 },
	{ id: 33, name: 'Сабина   ', total: 156, ant: 56, loud: 87, interrupt: 63 },
	{ id: 34, name: 'Антонина ', total: 249, ant: 12, loud: 30, interrupt: 70 },
]

const columns: Column[] = [
	{
		name: 'name',
		required: true,
		label: 'Фамилия, имя',
		align: 'left',
		field: 'name',
		sortable: true,
	},
	{
		name: 'total',
		required: true,
		label: 'Звонки',
		align: 'right',
		field: 'total',
		sortable: true,
	},
	{
		name: 'ant',
		required: true,
		label: 'АНТ',
		align: 'right',
		field: 'ant',
		sortable: true,
	},
	{
		name: 'loud',
		required: true,
		label: 'Тишина',
		align: 'right',
		field: 'loud',
		sortable: true,
	},
	{
		name: 'interrupt',
		required: true,
		label: 'Перебивания',
		align: 'right',
		field: 'interrupt',
		sortable: true,
	},
]

const series = [
	{
		name: 'AHT',
		data: [44, 55, 41, 43, 37, 21],
	},
	{
		name: 'Тишина',
		data: [53, 32, 52, 43, 33, 32],
	},
	{
		name: 'Перебивания',
		data: [12, 17, 9, 11, 11, 20],
	},
]

const bigSeries = [
	{
		name: 'AHT',
		data: randomArray(35, 40, 80),
	},
	{
		name: 'Тишина',
		data: randomArray(35, 60, 85),
	},
	{
		name: 'Перебивания',
		data: randomArray(35, 20, 40),
	},
]

export { options, options1, bigData, columns, series, bigSeries }
