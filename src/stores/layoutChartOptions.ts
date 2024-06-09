const sparkOptions = {
	chart: {
		type: 'area',
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
	title: {
		text: '0',
		offsetX: 0,
		style: {
			fontSize: '24px',
		},
	},
	subtitle: {
		text: 'Текст',
		offsetX: 0,
		style: {
			fontSize: '14px',
		},
	},
}

const areaOptions = {
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
		// height: 'auto',
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

export { sparkOptions, areaOptions }
