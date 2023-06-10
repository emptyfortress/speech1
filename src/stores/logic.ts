import { defineStore } from 'pinia'

interface Logic {
	id: number
	comment: string
	star: boolean
	selected: boolean
	label: string
}

export const useLogic = defineStore({
	id: 'logic',
	state: () => ({
		inception: false,
		currentLogic: {} as Logic,
		allLogic: [
			{
				id: 0,
				comment: 'В начале разговора отсутствует приветствие',
				star: true,
				selected: true,
				label: 'Отсутствует здравствуйте',
			},
			{
				id: 1,
				comment: 'Оператор здоровается с клиентом',
				star: true,
				selected: false,
				label: 'Приветствие',
			},
			{
				id: 2,
				comment: 'Оператор прощается с клиентом',
				star: true,
				selected: false,
				label: 'Прощание',
			},
			{
				id: 3,
				comment: 'Отсутствует благодарность за ожидание',
				star: true,
				selected: false,
				label: 'Отсутствует спасибо за ожидание',
			},
			{
				id: 4,
				comment: 'В конце разговора нет прощания',
				star: true,
				selected: false,
				label: 'Отсутствует до свидания',
			},
			{
				id: 5,
				comment: 'Присутствует нецензурная лексика',
				star: true,
				selected: false,
				label: 'Грубость в разговоре',
			},
			{
				id: 6,
				comment: 'Паузы более 10 сек',
				star: true,
				selected: false,
				label: 'Длинные паузы',
			},
			{
				id: 7,
				comment: 'Спасибо за обращение',
				star: true,
				selected: false,
				label: 'Завершение разговора',
			},
			{
				id: 8,
				comment: '',
				star: true,
				selected: false,
				label: 'Агрессия',
			},
			{
				id: 9,
				comment: '',
				star: true,
				selected: false,
				label: 'Проверка статуса',
			},
			{
				id: 10,
				comment: '',
				star: true,
				selected: false,
				label: 'Другая симка',
			},
			{
				id: 11,
				comment: '',
				star: false,
				selected: false,
				label: 'Pretium vulputate sapien',
			},
			{
				id: 12,
				comment: '',
				star: false,
				selected: false,
				label: 'Aenean sed adipiscing diam',
			},
			{
				id: 13,
				comment: '',
				star: false,
				selected: false,
				label: 'Diam phasellus',
			},
			{
				id: 14,
				comment: '',
				star: false,
				selected: false,
				label: 'Отстутствует отстутствие',
			},
			{
				id: 15,
				comment: '',
				star: false,
				selected: false,
				label: 'Arcu dictum varius',
			},
		],
		allList: [
			{
				id: 0,
				list: [
					{
						id: 0,
						condition: 'and',
						mod1: 'Отсутствует',
						mod2: ['здравствуйте', 'добрый вечер', 'доброе утро'],
					},
				],
			},
			{ id: 1, list: [{ id: 0, condition: 'and', mod1: '' }] },
			{ id: 2, list: [{ id: 0, condition: 'and', mod1: '' }] },
			{ id: 3, list: [{ id: 0, condition: 'and', mod1: '' }] },
			{ id: 4, list: [{ id: 0, condition: 'and', mod1: '' }] },
			{ id: 5, list: [{ id: 0, condition: 'and', mod1: '' }] },
			{ id: 6, list: [{ id: 0, condition: 'and', mod1: '' }] },
			{ id: 7, list: [{ id: 0, condition: 'and', mod1: '' }] },
			{ id: 8, list: [{ id: 0, condition: 'and', mod1: '' }] },
			{ id: 9, list: [{ id: 0, condition: 'and', mod1: '' }] },
			{ id: 10, list: [{ id: 0, condition: 'and', mod1: '' }] },
			{ id: 11, list: [{ id: 0, condition: 'and', mod1: '' }] },
			{ id: 12, list: [{ id: 0, condition: 'and', mod1: '' }] },
			{ id: 13, list: [{ id: 0, condition: 'and', mod1: '' }] },
			{ id: 14, list: [{ id: 0, condition: 'and', mod1: '' }] },
			{ id: 15, list: [{ id: 0, condition: 'and', mod1: '' }] },
		],
	}),
	getters: {
		activeLogic: (state) => state.allLogic.filter((item) => item.selected)[0],
	},

	actions: {
		showInception() {
			this.inception = true
		},
		duble() {
			const active = this.activeLogic
			const activeList = this.allList.find((e) => e.id === active.id)
			const temp = {} as Logic
			Object.assign(temp, active)
			temp.label = temp.label + ' - (копия)'
			this.allLogic.map((e) => (e.selected = false))
			temp.selected = true
			temp.id = active.id + 100
			this.allLogic.push(temp)
			const templist = {
				id: temp.id,
				list: activeList!.list,
			}
			this.allList.push(templist)
		},
		addLogic() {
			this.allLogic.map((e) => (e.selected = false))
			const item = {} as Logic
			item.id = this.allLogic.length
			item.star = true
			item.selected = true
			item.comment = 'Введите комментарий к запросу'
			item.label = 'Новый запрос'
			this.allLogic.push(item)
			const templist = {
				id: item.id,
				list: [{ id: 0, condition: 'and', mod1: '', mod2: '' }],
			}
			this.allList.push(templist)
		},
		deleteLogic() {
			const index = this.allLogic.findIndex((item) => item.selected)
			this.allLogic.splice(index, 1)
			this.allLogic[0].selected = true
		},
		updateLogicList(val: Logic[]) {
			this.allLogic = val
		},
	},
})
