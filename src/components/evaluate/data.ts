import type { QTableColumn } from 'quasar'
import { uid } from 'quasar'

const columns: QTableColumn[] = [
	{ name: 'star', label: '', align: 'center', field: 'star', sortable: true },
	{ name: 'date', label: 'Дата', field: 'date', sortable: true, align: 'left' },
	{ name: 'client', label: 'Клиент', field: 'client', sortable: true, align: 'left' },
	{ name: 'group', label: 'Группа', field: 'group', sortable: true, align: 'right' },
	{ name: 'category', label: 'Категория', field: 'category', sortable: true, align: 'left' },
	{ name: 'supervisor', label: 'Супервизор', field: 'supervisor', sortable: true, align: 'left' },
	{ name: 'anketa', label: 'Анкета', field: 'anketa', sortable: true, align: 'left' },
	{ name: 'mark', label: 'Оценка', field: 'mark', sortable: true, align: 'right' },
]

const rows = [
	{
		id: uid(),
		star: false,
		date: '2022-04-25 18:11',
		mark: 65,
		anketa: 'Квартальная',
		supervisor: 'Соловьев П.С.',
		client: 'Григорий',
		group: 'Юрлица',
		category: 'Продажи',
	},
	{
		id: uid(),
		star: false,
		date: '2022-04-25 18:10',
		client: 'Александр',
		group: 'Юрлица',
		category: 'Продажи',
	},
	{
		id: uid(),
		star: false,
		date: '2022-04-24 18:09',
		mark: 77,
		anketa: 'Выборочная',
		supervisor: 'Орлова Г.Н.',
		client: 'Лев',
		group: 'Физлица',
		category: 'Сервис',
	},
	{
		id: uid(),
		star: false,
		date: '2022-04-24 18:09',
		client: 'Андрей',
		group: 'История',
		category: 'Продажи',
	},
	{ star: false, date: '2022-04-24 18:08', client: 'Роман', group: 'Юрлица', category: 'Оплата' },
	{
		id: uid(),
		star: false,
		date: '2022-04-24 16:44',
		client: 'Арсений',
		group: 'История',
		category: 'Сервис',
	},
	{ star: false, date: '2022-04-24 16:43', client: 'Степан', group: 'Юрлица', category: 'Продажи' },
	{
		id: uid(),
		star: false,
		date: '2022-04-24 16:08',
		client: 'Владислав',
		group: 'Юрлица',
		category: 'Оплата',
	},
	{ star: false, date: '2022-04-24 16:07', client: 'Никита', group: 'История', category: 'Сервис' },
	{ star: false, date: '2022-04-24 16:06', client: 'Глеб', group: 'История', category: 'Оплата' },
]

export { columns, rows }
