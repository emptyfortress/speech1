import { defineStore } from 'pinia'

export const useCheck = defineStore({
	id: 'check',
	state: () => ({
		allCheck: [
			{
				id: 0,
				comment: 'Оператор здоровается и прощается с клиентом',
				star: true,
				selected: true,
				label: 'Приветствие и прощание',
			},
			{
				id: 1,
				comment: 'Оператор не употребляет бранные слова',
				star: true,
				selected: false,
				label: 'Вежливое общение',
			},
			{
				id: 2,
				comment: 'Оператор предлагает новые услуги.',
				star: true,
				selected: false,
				label: 'Новые услуги',
			},
			{
				id: 3,
				comment: 'Описание чеклиста',
				star: false,
				selected: false,
				label: 'Чеклист 1',
			},
			{
				id: 4,
				comment: 'Описание чеклиста',
				star: false,
				selected: false,
				label: 'Чеклист 2',
			},
		],
		allList: [
			{
				id: 0,
				list: [
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
				],
			},
			{ id: 1, list: [] },
			{ id: 2, list: [] },
			{ id: 3, list: [] },
			{ id: 4, list: [] },
			{ id: 5, list: [] },
		],
	}),
	getters: {
		activeCheck: (state) => state.allCheck.filter((item) => item.selected)[0],
	},

	actions: {
		deleteCheckList() {
			const index = this.allCheck.findIndex((item) => item.selected)
			this.allCheck.splice(index, 1)
			this.allCheck[0].selected = true
		},
		addNewCheckList(tmp: Logic) {
			this.allList[0].list.push(tmp)
		},
		addCheckList() {
			this.allCheck.map((e) => (e.selected = false))
			const item = {} as Logic
			item.id = this.allCheck.length
			item.star = true
			item.selected = true
			item.comment = 'Введите комментарий к чеклисту'
			item.label = 'Новый чеклист'
			this.allCheck.push(item)
			const templist = {
				id: item.id,
				list: [],
			}
			this.allList.push(templist)
		},
		duble() {
			const active = this.activeCheck
			const activeList = this.allList.find((e) => e.id === active.id)
			const temp = {} as Logic
			Object.assign(temp, active)
			temp.label = temp.label + ' - (копия)'
			this.allCheck.map((e) => (e.selected = false))
			temp.selected = true
			temp.id = active.id + 100
			this.allCheck.push(temp)
			const templist = {
				id: temp.id,
				list: activeList!.list,
			}
			this.allList.push(templist)
		},
	},
})
