const widgets = [
	{
		id: 'ready',
		text: 'Widgets',
		icon: 'mdi-widgets-outline',
		drag: false,
		children: [
			{ id: '1', drag: true, type: 'widget', text: 'Вызовы', children: [] },
			{ id: '2', drag: true, type: 'widget', text: 'АНТ', children: [] },
			{ id: '3', drag: true, type: 'widget', text: 'Тишина', children: [] },
			{ id: '4', drag: true, type: 'widget', text: 'Перебивания', children: [] },
			{ id: '5', drag: true, type: 'widget', text: 'Голос клиента', children: [] },
			{ id: '6', drag: true, type: 'widget', text: 'Операторы', children: [] },
		],
	},
	{
		id: 'charts',
		text: 'Charts',
		icon: 'mdi-chart-line',
		drag: false,
		children: [
			{ id: '7', drag: true, type: 'digit', text: 'Число', children: [] },
			{ id: '8', drag: true, type: 'chart', text: 'Sparkline', children: [] },
			{ id: '9', drag: true, type: 'chart', text: 'Area chart', children: [] },
			{ id: '10', drag: true, type: 'chart', text: 'Bar chart', children: [] },
			{ id: '11', drag: true, type: 'chart', text: 'Column chart', children: [] },
			{ id: '12', drag: true, type: 'chart', text: 'Pie/donut chart', children: [] },
		],
	},
	{
		id: 'tables',
		text: 'Tables',
		icon: 'mdi-table',
		drag: false,
		children: [
			{ id: '13', drag: true, type: 'table', text: 'Операторы', children: [] },
			{ id: '14', drag: true, type: 'table', text: 'Звонки', children: [] },
			{ id: '15', drag: true, type: 'table', text: 'Категории', children: [] },
		],
	},
]

export { widgets }
