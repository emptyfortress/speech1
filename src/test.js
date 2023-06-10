const test = [
	{
		nodeId: 0,
		level: 0,
		children: [
			{
				nodeId: 1,
				level: 1,
				children: [
					{
						nodeId: 2,
						level: 2,
						children: [
							{
								nodeId: 3,
								level: 3,
								children: [
									{
										nodeId: 4,
										level: 4,
										children: [],
									},
									{
										nodeId: 5,
										level: 4,
										children: [],
									},
								],
							},
						],
					},
				],
			},
		],
	},
]

const fuck = (e) => console.log(e)
test.forEach(fuck)
