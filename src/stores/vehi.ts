const cols: Column[] = [
	// { name: 'num', label: '', field: 'num', align: 'right', sortable: false },
	{ name: 'veha', label: 'Название', field: 'veha', align: 'left', sortable: true },
	{
		name: 'total',
		label: 'Выполнено',
		field: 'total',
		align: 'right',
		sortable: true,
	},
	{
		name: 'percent',
		label: '%',
		field: 'total',
		align: 'right',
		sortable: true,
	},
]

const rows = [
	{
		id: 0, veha: 'Группа Приветствие', total: 345, percent: 98,
		children: [
			{ id: 1, num: 1, veha: 'Поздороваться', total: 280, percent: 80 },
			{ id: 2, num: 2, veha: 'Назвать себя', total: 276, percent: 30 },
			{ id: 3, num: 3, veha: 'Предложить помощь', total: 230, percent: 60 },
		]
	},
	{
		id: 4, veha: 'Группа Проблемы', total: 158, percent: 66,
		children: [
			{ id: 5, num: 1, veha: 'Локализация проблемы', total: 80, percent: 80 },
			{ id: 6, num: 2, veha: 'Предложение решения', total: 76, percent: 35 },
			{ id: 7, num: 3, veha: 'Благодарность за ожидание', total: 20, percent: 69 },
		]
	},
	{
		id: 8, veha: 'Группа Прощание', total: 258, percent: 96,
		children: [
			{ id: 9, num: 1, veha: 'Новые услуги', total: 180, percent: 66 },
			{ id: 10, num: 2, veha: 'Прощание', total: 85, percent: 49 },
		]
	},
]

const catrows = [
	{ id: 0, num: 1, veha: 'Продажи', total: 345, percent: 98 },
	{ id: 1, num: 2, veha: 'Холодные', total: 280, percent: 80 },
	{ id: 2, num: 3, veha: 'Наводки', total: 179, percent: 91 },
	{ id: 3, num: 4, veha: 'Сервис', total: 345, percent: 79 },
	{ id: 4, num: 5, veha: 'Оплата', total: 200, percent: 82 },
	{ id: 5, num: 6, veha: 'Нал', total: 120, percent: 60 },
	{ id: 4, num: 7, veha: 'Безнал', total: 300, percent: 96 },

	{ id: 4, num: 7, veha: 'Крипто', total: 123, percent: 40 },
	{ id: 4, num: 7, veha: 'Жалобы', total: 420, percent: 50 },
	{ id: 4, num: 7, veha: 'Неисправности', total: 178, percent: 61 },
	{ id: 4, num: 7, veha: 'Услуги', total: 231, percent: 55 },
	{ id: 4, num: 7, veha: 'Работа', total: 190, percent: 33 },
	{ id: 4, num: 7, veha: 'Регионы', total: 174, percent: 38 },
	{ id: 4, num: 7, veha: 'Грубость', total: 220, percent: 97 },
	{ id: 4, num: 7, veha: 'Остальное', total: 120, percent: 85 },
]

export { cols, rows, catrows }
