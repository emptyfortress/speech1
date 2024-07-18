import { defineStore } from 'pinia'

export const useWidget = defineStore({
	id: 'widgetStore',
	state: () => ({
		sparkOptions: {
			chart: {
				sparkline: {
					enabled: true,
				},
			},
			title: {
				text: '0',
				style: {
					fontSize: '24px',
				},
			},
			subtitle: {
				text: 'Spark chart',
				style: {
					fontSize: '14px',
				},
			},
		},
		areaOptions: {
			xaxis: {
				type: 'datetime',
				categories: [
					'2022-03-04',
					'2022-03-11',
					'2022-03-18',
					'2022-03-24',
					'2022-04-01',
					'2022-04-08',
					'2022-04-14',
				],
			},
			chart: {
				zoom: {
					enabled: false,
				},
			},
			title: {
				text: 'Area chart',
				align: 'left',
			},
			yaxis: {
				opposite: true,
			},
		},
		barOptions: {
			title: {
				text: 'Bar chart',
				align: 'left',
			},
			plotOptions: {
				bar: {
					horizontal: false,
				},
			},
		},
		donutOptions: {
			title: {
				text: 'Pie chart',
				align: 'left',
			},
		},
		head: {
			auto: false,
			size: 1.7,
			weight: 600,
			style: 'normal',
			align: 'left',
			fontColor: 'green',
			padding: [6, 16],
			bgColor: '#ffffff',
			borderWidth: [0, 0, 0, 0],
			borderColor: '#e0e0e0',
			shadowColor: '#000000',
		},
		subhead: {
			auto: false,
			size: 0.9,
			weight: 400,
			style: 'normal',
			align: 'left',
			fontColor: '#333',
			padding: [6, 16],
			bgColor: '#ffffff',
			borderWidth: [0, 0, 0, 0],
			borderColor: '#e0e0e0',
			shadowColor: '#000000',
		},
		currentWidget: null as null | Widget,
	}),
	getters: {
		zag: (state) => state.currentWidget?.text,
	},
	actions: {
		setCurrentWidget(w: Widget) {
			this.currentWidget = w
		},
		updateZag(t: string) {
			this.sparkOptions.subtitle.text = t
			this.areaOptions.title.text = t
		},
	},
})
