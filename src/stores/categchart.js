const series = [76, 67, 61]

const chartOptions1 = {
	chart: {
		type: 'radialBar',
	},
	plotOptions: {
		radialBar: {
			dataLabels: {
				name: {
					fontSize: '13px',
				},
				value: {
					fontSize: '16px',
				},
				total: {
					show: true,
					label: 'Всего',
					fontSize: '20px',
					formatter: function () {
						return 249
					},
				},
			},
		},
	},
	labels: ['Продажи', 'Сервис', 'Оплата'],
	colors: ['#29A1F9', '#FDB948', '#C72829'],
}

const barOptions = {
	chart: {
		type: 'bar',
		height: 183,
	},
	plotOptions: {
		bar: {
			horizontal: false,
			columnWidth: '55%',
			endingShape: 'rounded',
		},
	},
	dataLabels: {
		enabled: false,
	},
	stroke: {
		show: true,
		width: 2,
		colors: ['transparent'],
	},
	xaxis: {
		categories: ['Янв', 'Фев', 'Мар', 'Апр'],
	},
	yaxis: {
		title: {
			text: '$ (thousands)',
		},
	},
	fill: {
		opacity: 1,
	},
	tooltip: {
		y: {
			formatter: function (val) {
				return '$ ' + val + ' thousands'
			},
		},
	},
	colors: ['#29A1F9', '#FDB948', '#C72829'],
}

const barSeries = [
	{
		name: 'Продажи',
		data: [44, 55, 57, 56],
	},
	{
		name: 'Сервис',
		data: [76, 85, 101, 98],
	},
	{
		name: 'Оплата',
		data: [35, 41, 36, 26],
	},
]

export { series, chartOptions1, barOptions, barSeries }
