const operators = [
	{ id: 0, name: 'Екатерина', total: 169, percent: 9, good: 15, notgood: 47, bad: 53 },
	{ id: 1, name: 'Елена    ', total: 216, percent: 43, good: 93, notgood: 87, bad: 29 },
	{ id: 2, name: 'Ксения   ', total: 283, percent: 31, good: 87, notgood: 83, bad: 67 },
	{ id: 3, name: 'Ирина    ', total: 255, percent: 23, good: 59, notgood: 20, bad: 19 },
	{ id: 4, name: 'Ева      ', total: 210, percent: 9, good: 19, notgood: 87, bad: 17 },
	{ id: 5, name: 'Дарья    ', total: 225, percent: 24, good: 54, notgood: 67, bad: 3 },
	{ id: 6, name: 'Кира     ', total: 209, percent: 22, good: 45, notgood: 37, bad: 53 },
	{ id: 7, name: 'Елизавета', total: 204, percent: 31, good: 63, notgood: 53, bad: 86 },
	{ id: 8, name: 'Ульяна   ', total: 167, percent: 28, good: 47, notgood: 4, bad: 17 },
	{ id: 9, name: 'Татьяна  ', total: 257, percent: 21, good: 53, notgood: 59, bad: 63 },
	{ id: 10, name: 'Юлия     ', total: 227, percent: 37, good: 83, notgood: 77, bad: 60 },
	{ id: 11, name: 'Софья    ', total: 197, percent: 16, good: 32, notgood: 97, bad: 37 },
	{ id: 12, name: 'Алина    ', total: 295, percent: 18, good: 53, notgood: 17, bad: 73 },
	{ id: 13, name: 'Злата    ', total: 244, percent: 39, good: 96, notgood: 19, bad: 20 },
	{ id: 14, name: 'Милана   ', total: 190, percent: 38, good: 73, notgood: 48, bad: 46 },
	{ id: 15, name: 'Ольга    ', total: 263, percent: 18, good: 47, notgood: 3, bad: 32 },
	{ id: 16, name: 'Светлана ', total: 176, percent: 10, good: 17, notgood: 54, bad: 83 },
	{ id: 17, name: 'Ярослава ', total: 292, percent: 16, good: 48, notgood: 15, bad: 4 },
	{ id: 18, name: 'Яна      ', total: 284, percent: 11, good: 30, notgood: 60, bad: 77 },
	{ id: 19, name: 'Кристина ', total: 255, percent: 18, good: 46, notgood: 86, bad: 48 },
	{ id: 20, name: 'Алиса    ', total: 153, percent: 50, good: 77, notgood: 17, bad: 86 },
	{ id: 21, name: 'Маргарита', total: 161, percent: 60, good: 97, notgood: 96, bad: 70 },
	{ id: 22, name: 'Таисия   ', total: 235, percent: 12, good: 29, notgood: 29, bad: 46 },
	{ id: 23, name: 'Тамара   ', total: 203, percent: 42, good: 86, notgood: 45, bad: 3 },
	{ id: 24, name: 'Эмилия   ', total: 231, percent: 7, good: 17, notgood: 73, bad: 87 },
	{ id: 25, name: 'Диана    ', total: 183, percent: 11, good: 20, notgood: 47, bad: 15 },
	{ id: 26, name: 'Анфиса   ', total: 211, percent: 41, good: 86, notgood: 46, bad: 45 },
	{ id: 27, name: 'Аделина  ', total: 234, percent: 30, good: 70, notgood: 46, bad: 59 },
	{ id: 28, name: 'Евдокия  ', total: 237, percent: 16, good: 37, notgood: 86, bad: 54 },
	{ id: 29, name: 'Зоя      ', total: 185, percent: 36, good: 67, notgood: 45, bad: 87 },
	{ id: 30, name: 'Ираида   ', total: 215, percent: 21, good: 45, notgood: 53, bad: 47 },
	{ id: 31, name: 'Наталья  ', total: 276, percent: 9, good: 24, notgood: 32, bad: 97 },
	{ id: 32, name: 'Пелагея  ', total: 259, percent: 18, good: 46, notgood: 3, bad: 47 },
	{ id: 33, name: 'Сабина   ', total: 156, percent: 56, good: 87, notgood: 63, bad: 9 },
	{ id: 34, name: 'Антонина ', total: 249, percent: 12, good: 30, notgood: 70, bad: 45 },
]

const records = [
	{
		id: 0,
		date: '2022-04-25 18:11',
		group: 'группа 1',
		categ: 'Продажи',
		record: 'Urna condimentum <span class="found">претензия</span> mattis pellentesque id.',
		operator: 'Екатерина',
		client: 'Григорий',
		expand: false,
	},
	{
		id: 1,
		date: '2022-04-25 18:10',
		group: 'группа 2',
		categ: 'Оплата',
		record:
			'Arcu felis, bibendum  <span class="found">претензия</span> ut tristique et, egestas quis? Nisl suscipit adipiscing.',
		operator: 'Елена',
		client: 'Лев',
		expand: false,
	},
	{
		id: 2,
		date: '2022-04-24 18:09',
		group: 'группа 3',
		categ: 'Сервис',
		record:
			'Ut placerat orci  <span class="found">претензия</span> nulla pellentesque dignissim enim, sit?',
		operator: 'Ксения',
		client: 'Андрей',
		expand: false,
	},
	{
		id: 3,
		date: '2022-04-24 18:09',
		group: 'группа 1',
		categ: 'Продажи',
		record:
			'In nibh mauris, cursus mattis  <span class="found">претензия</span> molestie a, iaculis.',
		operator: 'Ирина',
		client: 'Роман',
		expand: false,
	},
	{
		id: 4,
		date: '2022-04-24 18:08',
		group: 'группа 2',
		categ: 'Сервис',
		record:
			'Id neque aliquam vestibulum  <span class="found">претензия</span> morbi blandit cursus risus?',
		operator: 'Ева',
		client: 'Арсений',
		expand: false,
	},
	{
		id: 5,
		date: '2022-04-24 16:44',
		group: 'группа 3',
		categ: 'Сервис',
		record:
			'Amet, porttitor eget dolor morbi non  <span class="found">претензия</span> arcu risus!',
		operator: 'Дарья',
		client: 'Степан',
		expand: false,
	},
	{
		id: 6,
		date: '2022-04-24 16:43',
		group: 'группа 1',
		categ: 'Продажи',
		record:
			'Varius duis  <span class="found">претензия</span> at consectetur lorem donec massa sapien.',
		operator: 'Кира',
		client: 'Владислав',
		expand: false,
	},
	{
		id: 7,
		date: '2022-04-24 16:08',
		group: 'группа 2',
		categ: 'Оплата',
		record:
			'Morbi tincidunt ornare  <span class="found">претензия</span> massa, eget egestas purus viverra.',
		operator: 'Елизавета',
		client: 'Никита',
		expand: false,
	},
	{
		id: 8,
		date: '2022-04-24 16:07',
		group: 'группа 3',
		categ: 'Продажи',
		record:
			'Egestas  <span class="found">претензия</span> integer eget aliquet nibh praesent tristique magna?',
		operator: 'Ульяна',
		client: 'Глеб',
		expand: false,
	},
	{
		id: 9,
		date: '2022-04-24 16:06',
		group: 'группа 1',
		categ: 'Сервис',
		record:
			'Lacus, viverra  <span class="found">претензия</span> vitae congue eu, consequat ac felis?',
		operator: 'Татьяна',
		client: 'Марк',
		expand: false,
	},
	{
		id: 10,
		date: '2022-04-23 16:05',
		group: 'группа 2',
		categ: 'Оплата',
		record:
			'Nec tincidunt praesent  <span class="found">претензия</span> semper feugiat nibh sed pulvinar.',
		operator: 'Юлия',
		client: 'Давид',
		expand: false,
	},
	{
		id: 11,
		date: '2022-04-15 20:49',
		group: 'группа 3',
		categ: 'Продажи',
		record:
			'Vitae  <span class="found">претензия</span> turpis massa sed elementum tempus egestas sed!',
		operator: 'Софья',
		client: 'Ярослав',
		expand: false,
	},
	{
		id: 12,
		date: '2022-04-15 20:48',
		group: 'группа 1',
		categ: 'Сервис',
		record:
			'Pulvinar mattis nunc, sed  <span class="found">претензия</span> blandit libero volutpat sed.',
		operator: 'Алина',
		client: 'Евгений',
		expand: false,
	},
	{
		id: 13,
		date: '2022-04-15 20:47',
		group: 'группа 2',
		categ: 'Продажи',
		record: 'Enim, sed faucibus  <span class="found">претензия</span> turpis in eu mi bibendum.',
		operator: 'Злата',
		client: 'Матвей',
		expand: false,
	},
	{
		id: 14,
		date: '2022-04-15 20:46',
		group: 'группа 2',
		categ: 'Оплата',
		record:
			'Faucibus turpis in  <span class="found">претензия</span> eu mi bibendum neque egestas.',
		operator: 'Милана',
		client: 'Фёдор',
		expand: false,
	},
	{
		id: 15,
		date: '2022-04-15 20:45',
		group: 'группа 3',
		categ: 'Оплата',
		record:
			'Dictum varius  <span class="found">претензия</span> duis at consectetur lorem donec massa.',
		operator: 'Ольга',
		client: 'Николай',
		expand: false,
	},
	{
		id: 16,
		date: '2022-04-15 20:44',
		group: 'группа 1',
		categ: 'Сервис',
		record: 'Vel eros donec ac odio  <span class="found">претензия</span> tempor orci dapibus?',
		operator: 'Светлана',
		client: 'Алексей',
		expand: false,
	},
	{
		id: 17,
		date: '2022-04-11 17:55',
		group: 'группа 1',
		categ: 'Сервис',
		record:
			'Sem fringilla ut morbi tincidunt  <span class="found">претензия</span> augue interdum velit?',
		operator: 'Ярослава',
		client: 'Андрей',
		expand: false,
	},
	{
		id: 18,
		date: '2022-04-11 17:54',
		group: 'группа 1',
		categ: 'Сервис',
		record: 'Purus, in mollis  <span class="found">претензия</span> nunc sed id semper risus!',
		operator: 'Яна',
		client: 'Артемий',
		expand: false,
	},
	{
		id: 19,
		date: '2022-04-11 17:53',
		group: 'группа 1',
		categ: 'Продажи',
		record: 'Senectus  <span class="found">претензия</span> et netus et malesuada fames ac turpis.',
		operator: 'Кристина',
		client: 'Виктор',
		expand: false,
	},
	{
		id: 20,
		date: '2022-04-10 17:53',
		group: 'группа 1',
		categ: 'Оплата',
		record:
			'Scelerisque  <span class="found">претензия</span> mauris pellentesque pulvinar pellentesque habitant morbi tristique.',
		operator: 'Алиса',
		client: 'Никита',
		expand: false,
	},
	{
		id: 21,
		date: '2022-03-24 18:11',
		group: 'группа 1',
		categ: 'Продажи',
		record:
			'A,  <span class="found">претензия</span> condimentum vitae sapien pellentesque habitant morbi tristique.',
		operator: 'Маргарита',
		client: 'Даниил',
		expand: false,
	},
	{
		id: 22,
		date: '2022-03-24 18:10',
		group: 'группа 1',
		categ: 'Сервис',
		record:
			'Dignissim convallis aenean et  <span class="found">претензия</span> tortor at risus viverra!',
		operator: 'Таисия',
		client: 'Денис',
		expand: false,
	},
	{
		id: 23,
		date: '2022-03-24 18:09',
		group: 'группа 1',
		categ: 'Оплата',
		record: 'At varius vel, pharetra vel  <span class="found">претензия</span> turpis nunc eget!',
		operator: 'Тамара',
		client: 'Егор',
		expand: false,
	},
	{
		id: 24,
		date: '2022-03-24 18:09',
		group: 'группа 1',
		categ: 'Продажи',
		record:
			'Et molestie ac,  <span class="found">претензия</span> feugiat sed lectus vestibulum mattis?',
		operator: 'Эмилия',
		client: 'Игорь',
		expand: false,
	},
	{
		id: 25,
		date: '2022-03-24 18:08',
		group: 'группа 1',
		categ: 'Сервис',
		record:
			'Vitae justo eget  <span class="found">претензия</span> magna fermentum iaculis eu non?',
		operator: 'Диана',
		client: 'Лев',
		expand: false,
	},
	{
		id: 26,
		date: '2022-03-24 16:44',
		group: 'группа 1',
		categ: 'Оплата',
		record:
			'Et tortor consequat id  <span class="found">претензия</span> porta nibh venenatis cras.',
		operator: 'Анфиса',
		client: 'Леонид',
		expand: false,
	},
	{
		id: 27,
		date: '2022-03-24 16:43',
		group: 'группа 1',
		categ: 'Оплата',
		record:
			'Turpis egestas integer  <span class="found">претензия</span> eget aliquet nibh praesent tristique!',
		operator: 'Аделина',
		client: 'Павел',
		expand: false,
	},
	{
		id: 28,
		date: '2022-03-24 16:08',
		group: 'группа 1',
		categ: 'Продажи',
		record:
			'Tellus at urna  <span class="found">претензия</span> condimentum mattis pellentesque id nibh?',
		operator: 'Евдокия',
		client: 'Петр',
		expand: false,
	},
	{
		id: 29,
		date: '2022-03-24 16:07',
		group: 'группа 1',
		categ: 'Сервис',
		record:
			'Hac habitasse  <span class="found">претензия</span> platea dictumst quisque sagittis, purus sit.',
		operator: 'Зоя',
		client: 'Роман',
		expand: false,
	},
	{
		id: 30,
		date: '2022-03-23 16:06',
		group: 'группа 1',
		categ: 'Сервис',
		record:
			'Sit amet est placerat in  <span class="found">претензия</span> egestas erat imperdiet.',
		operator: 'Ираида',
		client: 'Руслан',
		expand: false,
	},
	{
		id: 31,
		date: '2022-03-23 16:05',
		group: 'группа 1',
		categ: 'Сервис',
		record:
			'Viverra maecenas accumsan, lacus vel  <span class="found">претензия</span> facilisis volutpat, est?',
		operator: 'Наталья',
		client: 'Сергей',
		expand: false,
	},
	{
		id: 32,
		date: '2022-03-15 20:49',
		group: 'группа 1',
		categ: 'Оплата',
		record:
			'Varius morbi enim  <span class="found">претензия</span> nunc, faucibus a pellentesque sit!',
		operator: 'Пелагея',
		client: 'Семён',
		expand: false,
	},
	{
		id: 33,
		date: '2022-03-15 20:48',
		group: 'группа 1',
		categ: 'Сервис',
		record:
			'Ac tincidunt vitae,  <span class="found">претензия</span> semper quis lectus nulla at.',
		operator: 'Сабина',
		client: 'Тимофей',
		expand: false,
	},
	{
		id: 34,
		date: '2022-03-15 20:47',
		group: 'группа 1',
		categ: 'Продажи',
		record: 'Eu ultrices vitae, auctor eu  <span class="found">претензия</span> augue ut lectus!',
		operator: 'Антонина',
		client: 'Степан',
		expand: false,
	},
	{
		id: 35,
		date: '2022-03-15 20:46',
		group: 'группа 1',
		categ: 'Оплата',
		record:
			'Morbi tristique  <span class="found">претензия</span> senectus et netus et malesuada fames?',
		operator: 'Екатерина',
		client: 'Владимир',
		expand: false,
	},
	{
		id: 36,
		date: '2022-03-14 20:45',
		group: 'группа 1',
		categ: 'Продажи',
		record: 'Orci, a scelerisque purus semper  <span class="found">претензия</span> eget duis at.',
		operator: 'Елена',
		client: 'Тимофей',
		expand: false,
	},
	{
		id: 37,
		date: '2022-03-14 20:44',
		group: 'группа 1',
		categ: 'Сервис',
		record:
			'Convallis convallis tellus, id  <span class="found">претензия</span> interdum velit laoreet id!',
		operator: 'Ксения',
		client: 'Ярослав',
		expand: false,
	},
	{
		id: 38,
		date: '2022-03-11 17:55',
		group: 'группа 1',
		categ: 'Оплата',
		record:
			'Quis viverra nibh  <span class="found">претензия</span> cras pulvinar mattis nunc, sed!',
		operator: 'Ирина',
		client: 'Павел',
		expand: false,
	},
	{
		id: 39,
		date: '2022-03-11 17:54',
		group: 'группа 1',
		categ: 'Оплата',
		record: 'Id eu nisl  <span class="found">претензия</span> nunc mi ipsum, faucibus vitae.',
		operator: 'Ева',
		client: 'Егор',
		expand: false,
	},
	{
		id: 40,
		date: '2022-03-11 17:53',
		group: 'группа 1',
		categ: 'Продажи',
		record: 'Nam  <span class="found">претензия</span> aliquam sem et tortor consequat id porta.',
		operator: 'Дарья',
		client: 'Сергей',
		expand: false,
	},
	{
		id: 41,
		date: '2022-03-10 17:53',
		group: 'группа 1',
		categ: 'Сервис',
		record:
			'Amet  <span class="found">претензия</span> commodo nulla facilisi nullam vehicula ipsum a!',
		operator: 'Кира',
		client: 'Владислав',
		expand: false,
	},
	{
		id: 42,
		date: '2022-02-24 18:11',
		group: 'группа 1',
		categ: 'Продажи',
		record:
			'Dui vivamus arcu felis, bibendum  <span class="found">претензия</span> ut tristique et.',
		operator: 'Елизавета',
		client: 'Федор',
		expand: false,
	},
	{
		id: 43,
		date: '2022-02-24 18:10',
		group: 'группа 1',
		categ: 'Оплата',
		record:
			'Erat pellentesque  <span class="found">претензия</span> adipiscing commodo elit, at imperdiet dui.',
		operator: 'Ульяна',
		client: 'Константин',
		expand: false,
	},
	{
		id: 44,
		date: '2022-02-24 18:09',
		group: 'группа 1',
		categ: 'Продажи',
		record:
			'Amet commodo  <span class="found">претензия</span> nulla facilisi nullam vehicula ipsum a?',
		operator: 'Татьяна',
		client: 'Максим',
		expand: false,
	},
	{
		id: 45,
		date: '2022-02-24 18:09',
		group: 'группа 1',
		categ: 'Сервис',
		record: 'Sed  <span class="found">претензия</span> euismod nisi porta lorem mollis aliquam ut.',
		operator: 'Юлия',
		client: 'Артём',
		expand: false,
	},
	{
		id: 46,
		date: '2022-02-24 18:08',
		group: 'группа 1',
		categ: 'Оплата',
		record:
			'Integer  <span class="found">претензия</span> eget aliquet nibh praesent tristique magna sit!',
		operator: 'Софья',
		client: 'Никита',
		expand: false,
	},
	{
		id: 47,
		date: '2022-02-24 16:44',
		group: 'группа 1',
		categ: 'Продажи',
		record:
			'Donec adipiscing  <span class="found">претензия</span> tristique risus nec feugiat in fermentum.',
		operator: 'Алина',
		client: 'Григорий',
		expand: false,
	},
	{
		id: 48,
		date: '2022-02-24 16:43',
		group: 'группа 1',
		categ: 'Оплата',
		record:
			'Condimentum lacinia quis  <span class="found">претензия</span> vel eros donec ac odio!',
		operator: 'Злата',
		client: 'Лев',
		expand: false,
	},
	{
		id: 49,
		date: '2022-02-24 16:08',
		group: 'группа 1',
		categ: 'Сервис',
		record:
			'Est ante in nibh mauris,  <span class="found">претензия</span> cursus mattis molestie.',
		operator: 'Милана',
		client: 'Андрей',
		expand: false,
	},
	{
		id: 50,
		date: '2022-02-24 16:07',
		group: 'группа 1',
		categ: 'Продажи',
		record:
			'Faucibus vitae  <span class="found">претензия</span> aliquet nec, ullamcorper sit amet risus!',
		operator: 'Ольга',
		client: 'Роман',
		expand: false,
	},
	{
		id: 51,
		date: '2022-02-24 16:06',
		group: 'группа 1',
		categ: 'Сервис',
		record:
			'Morbi tincidunt  <span class="found">претензия</span> ornare massa, eget egestas purus viverra.',
		operator: 'Светлана',
		client: 'Арсений',
		expand: false,
	},
	{
		id: 52,
		date: '2022-02-23 16:05',
		group: 'группа 1',
		categ: 'Оплата',
		record:
			'Mollis aliquam  <span class="found">претензия</span> ut porttitor leo a diam sollicitudin.',
		operator: 'Ярослава',
		client: 'Степан',
		expand: false,
	},
	{
		id: 53,
		date: '2022-02-15 20:49',
		group: 'группа 1',
		categ: 'Оплата',
		record: 'Et tortor  <span class="found">претензия</span> at risus viverra adipiscing at in.',
		operator: 'Яна',
		client: 'Владислав',
		expand: false,
	},
	{
		id: 54,
		date: '2022-02-15 20:48',
		group: 'группа 1',
		categ: 'Сервис',
		record: 'Volutpat  <span class="found">претензия</span> sed cras ornare arcu dui vivamus arcu?',
		operator: 'Кристина',
		client: 'Никита',
		expand: false,
	},
	{
		id: 55,
		date: '2022-02-15 20:47',
		group: 'группа 1',
		categ: 'Продажи',
		record:
			'Praesent semper  <span class="found">претензия</span> feugiat nibh sed pulvinar proin gravida.',
		operator: 'Алиса',
		client: 'Глеб',
		expand: false,
	},
	{
		id: 56,
		date: '2022-02-15 20:46',
		group: 'группа 1',
		categ: 'Сервис',
		record:
			'Cursus in hac  <span class="found">претензия</span> habitasse platea dictumst quisque sagittis.',
		operator: 'Маргарита',
		client: 'Марк',
		expand: false,
	},
	{
		id: 57,
		date: '2022-02-15 20:45',
		group: 'группа 1',
		categ: 'Оплата',
		record:
			'Quis lectus nulla at volutpat diam ut  <span class="found">претензия</span> venenatis.',
		operator: 'Таисия',
		client: 'Давид',
		expand: false,
	},
	{
		id: 58,
		date: '2022-02-15 20:44',
		group: 'группа 1',
		categ: 'Сервис',
		record:
			'Nulla malesuada pellentesque  <span class="found">претензия</span> elit eget gravida cum sociis.',
		operator: 'Тамара',
		client: 'Ярослав',
		expand: false,
	},
	{
		id: 59,
		date: '2022-02-11 17:55',
		group: 'группа 1',
		categ: 'Сервис',
		record:
			'Facilisi  <span class="found">претензия</span> nullam vehicula ipsum a arcu cursus vitae!',
		operator: 'Эмилия',
		client: 'Евгений',
		expand: false,
	},
	{
		id: 60,
		date: '2022-02-11 17:54',
		group: 'группа 1',
		categ: 'Оплата',
		record:
			'Turpis massa  <span class="found">претензия</span> sed elementum tempus egestas sed sed.',
		operator: 'Диана',
		client: 'Матвей',
		expand: false,
	},
	{
		id: 61,
		date: '2022-02-11 17:53',
		group: 'группа 1',
		categ: 'Оплата',
		record:
			'Suspendisse sed nisi  <span class="found">претензия</span> lacus, sed viverra tellus in?',
		operator: 'Анфиса',
		client: 'Фёдор',
		expand: false,
	},
	{
		id: 62,
		date: '2022-02-11 17:53',
		group: 'группа 1',
		categ: 'Сервис',
		record:
			'Sed pulvinar proin  <span class="found">претензия</span> gravida hendrerit lectus a molestie.',
		operator: 'Аделина',
		client: 'Николай',
		expand: false,
	},
]

export { operators, records }
