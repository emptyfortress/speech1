const sparkOptions = {
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
		text: 'Заголовок',
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
		zoom: {
			enabled: false,
		},
	},
	title: {
		text: 'Заголовок',
		align: 'left',
	},
	yaxis: {
		opposite: true,
	},
}

const barOptions = {
	// chart: {
	// 	type: 'bar',
	// },
	title: {
		text: 'Заголовок',
		align: 'left',
	},
	plotOptions: {
		bar: {
			horizontal: false,
		},
	},
}

const donutOptions = {
	chart: {
		type: 'donut',
	},
	title: {
		text: 'Заголовок',
		align: 'left',
	},
	// stroke: {
	// 	width: 1,
	// },
}
export { sparkOptions, areaOptions, barOptions, donutOptions }
