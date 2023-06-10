const chartOptions1 = {
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
		type: 'area',
		zoom: {
			enabled: false,
		},
	},
	dataLabels: {
		enabled: true,
	},
	stroke: {
		curve: 'smooth',
	},
	title: {
		text: 'Вызовы',
		align: 'left',
	},
	yaxis: {
		opposite: true,
	},
}

const chartOptions2 = {
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
		type: 'area',
		zoom: {
			enabled: false,
		},
	},
	dataLabels: {
		enabled: true,
	},
	stroke: {
		curve: 'smooth',
	},
	title: {
		text: 'АНТ',
		align: 'left',
	},
	yaxis: {
		opposite: true,
	},
}

const chartOptions3 = {
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
		type: 'area',
		zoom: {
			enabled: false,
		},
	},
	dataLabels: {
		enabled: true,
	},
	stroke: {
		curve: 'smooth',
	},
	title: {
		text: 'Тишина',
		align: 'left',
	},
	yaxis: {
		opposite: true,
	},
}

const chartOptions4 = {
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
		type: 'area',
		zoom: {
			enabled: false,
		},
	},
	dataLabels: {
		enabled: true,
	},
	stroke: {
		curve: 'smooth',
	},
	title: {
		text: 'Перебивания',
		align: 'left',
	},
	yaxis: {
		opposite: true,
	},
	colors: ['#21BA45'],
}

const chartOptionsSpark1 = {
	chart: {
		type: 'area',
		height: 130,
		sparkline: {
			enabled: true,
		},
	},
	stroke: {
		curve: 'smooth',
	},
	fill: {
		opacity: 0.3,
	},
	xaxis: {
		crosshairs: {
			width: 1,
		},
	},
	yaxis: {
		min: 0,
	},
	title: {
		text: '234',
		offsetX: 0,
		style: {
			fontSize: '24px',
		},
	},
	subtitle: {
		text: 'Вызовы',
		offsetX: 0,
		style: {
			fontSize: '14px',
		},
	},
}

const chartOptionsSpark2 = {
	chart: {
		type: 'area',
		height: 130,
		sparkline: {
			enabled: true,
		},
	},
	stroke: {
		curve: 'smooth',
	},
	fill: {
		opacity: 0.3,
	},
	xaxis: {
		crosshairs: {
			width: 1,
		},
	},
	yaxis: {
		min: 0,
	},
	title: {
		text: '3:15',
		offsetX: 0,
		style: {
			fontSize: '24px',
		},
	},
	subtitle: {
		text: 'АНТ',
		offsetX: 0,
		style: {
			fontSize: '14px',
		},
	},
}

const chartOptionsSpark3 = {
	chart: {
		type: 'area',
		height: 130,
		sparkline: {
			enabled: true,
		},
	},
	stroke: {
		curve: 'smooth',
	},
	fill: {
		opacity: 0.3,
	},
	xaxis: {
		crosshairs: {
			width: 1,
		},
	},
	yaxis: {
		min: 0,
	},
	title: {
		text: '2:07',
		offsetX: 0,
		style: {
			fontSize: '24px',
		},
	},
	subtitle: {
		text: 'Тишина',
		offsetX: 0,
		style: {
			fontSize: '14px',
		},
	},
}

const chartOptionsSpark4 = {
	chart: {
		type: 'area',
		height: 130,
		sparkline: {
			enabled: true,
		},
	},
	stroke: {
		curve: 'smooth',
	},
	fill: {
		opacity: 0.3,
	},
	xaxis: {
		crosshairs: {
			width: 1,
		},
	},
	yaxis: {
		min: 0,
	},
	colors: ['#21BA45'],
	title: {
		text: '21',
		offsetX: 0,
		style: {
			fontSize: '24px',
		},
	},
	subtitle: {
		text: 'Перебивания',
		offsetX: 0,
		style: {
			fontSize: '14px',
		},
	},
}

const randomArray = (length, min, max) => {
	let result = []
	while (result.length < length) {
		let random = Math.floor(Math.random() * (max - min + 1) + min)
		result.push(random)
	}
	return result
}

const seriesTable1 = [{ data: randomArray(9, 100, 70) }]
const seriesTable2 = [{ data: randomArray(9, 10, 50) }]
const seriesTable3 = [{ data: randomArray(9, 40, 100) }]

const chartTable1 = {
	chart: {
		type: 'line',
		height: 35,
		sparkline: {
			enabled: true,
		},
	},
	stroke: {
		width: 3,
		curve: 'smooth',
	},
	tooltip: {
		enabled: false,
		x: {
			show: false,
		},
		y: {
			title: {
				formatter: function (seriesName) {
					return ''
				},
			},
		},
		marker: {
			show: false,
		},
	},
}
const chartTableAreaBig = {
	chart: {
		type: 'area',
	},
	stroke: {
		width: 3,
		curve: 'smooth',
	},
	tooltip: {
		enabled: true,
		x: {
			show: false,
		},
		y: {
			title: {
				formatter: function (seriesName) {
					return ''
				},
			},
		},
		marker: {
			show: true,
		},
	},
}

const seriesTable4 = randomArray(4, 20, 5)
const seriesTable5 = randomArray(4, 20, 5)
const seriesTable6 = randomArray(4, 100, 30)

const chartTable4 = {
	chart: {
		type: 'donut',
		width: 35,
		height: 35,
		sparkline: {
			enabled: true,
		},
	},
	stroke: {
		width: 1,
	},
	tooltip: {
		enabled: false,
	},
	plotOptions: {
		pie: {
			expandOnClick: false,
		},
	},
}
const chartTableDonutBig = {
	chart: {
		type: 'donut',
	},
	stroke: {
		width: 1,
	},
	tooltip: {
		enabled: true,
	},
}

export {
	chartOptions1,
	chartOptions2,
	chartOptions3,
	chartOptions4,
	chartOptionsSpark1,
	chartOptionsSpark2,
	chartOptionsSpark3,
	chartOptionsSpark4,
	chartTable1,
	seriesTable1,
	seriesTable2,
	seriesTable3,
	chartTable4,
	seriesTable4,
	seriesTable5,
	seriesTable6,
	chartTableAreaBig,
	chartTableDonutBig,
}
