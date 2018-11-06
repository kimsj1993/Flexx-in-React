const dummyState = {
	data: {
		cards: {
			keepers: {
				'1': {
					id: 1,
					name: 'Cookies',
					imageUrl: ''
				},
				'2': {
					id: 2,
					name: 'Chocolate',
					imageUrl: ''
				},
				'3': {
					id: 3,
					name: 'BTHO',
					imageUrl: ''
				},
				'4': {
					id: 4,
					name: 'Gigem',
					imageUrl: ''
				},
				'5': {
					id: 5,
					name: 'The Brain',
					imageUrl: ''
				},
				'6': {
					id: 6,
					name: 'Sleep',
					imageUrl: ''
				},
				'7': {
					id: 7,
					name: 'Ring Day',
					imageUrl: ''
				},
				'8': {
					id: 8,
					name: 'Dreams',
					imageUrl: ''
				},
				'9': {
					id: 9,
					name: 'The Eye',
					imageUrl: ''
				},
				'10': {
					id: 10,
					name: 'The Party',
					imageUrl: ''
				},
				'11': {
					id: 11,
					name: 'The Television',
					imageUrl: ''
				},
				'12': {
					id: 12,
					name: 'The Rocket',
					imageUrl: ''
				}
			}
		},
		playerId: null,
		players: {
			'1': {
				id: 1,
				name: 'test1',
				imageUrl: ''
			},
			'2': {
				id: 2,
				name: 'test2',
				imageUrl: ''
			},
			'3': {
				id: 3,
				name: 'test3',
				imageUrl: ''
			},
			'4': {
				id: 4,
				name: 'test4',
				imageUrl: ''
			},
			'5': {
				id: 5,
				name: 'test5',
				imageUrl: ''
			},
			'6': {
				id: 6,
				name: 'test6',
				imageUrl: ''
			},
			'7': {
				id: 7,
				name: 'test7',
				imageUrl: ''
			}
			,'8': {
				id: 8,
				name: 'test8',
				imageUrl: ''
			}
		},
		game: {
			playerData: {
				isTurn: true,
				playsRemaining: 2,
				hand: []
			},
			opponentData: {
				'1': {
					id: 1,
					isTurn: false,
					playsRemaining: null,
					cardCount: 4,
					keeperIds: [2, 6 ,7]
				},
				'2': {
					id: 2,
					isTurn: false,
					playsRemaining: null,
					cardCount: 2,
					keeperIds: [1, 3]
				},
				'3': {
					id: 3,
					isTurn: false,
					playsRemaining: null,
					cardCount: 5,
					keeperIds: [4, 8, 9, 11, 12]
				}
			}
		}
	},
	ui: {

	}
};

export default dummyState;