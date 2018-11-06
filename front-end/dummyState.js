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
			},
			rules: {
				'1': {
					id: 1,
					name: 'test1',
					subtype: 'action-rule',
					imageUrl: ''
				},
				'2': {
					id: 2,
					name: 'test2',
					subtype: 'action-rule',
					imageUrl: ''
				},
				'3': {
					id: 3,
					name: 'test3',
					subtype: 'action-rule',
					imageUrl: ''
				}
			},
			goals: {
				'1': {
					id: 1,
					name: 'Graduation',
					requirements: 'The Party + Degree'
				},
				'2': {
					id: 2,
					name: 'test2',
					requirements: 'req2'
				}
			},
			actions: {},
		},
		playerId: 5,
		users: {
			'1': {
				id: 1,
				name: 'Sierra',
				imageUrl: ''
			},
			'2': {
				id: 2,
				name: 'Ajit',
				imageUrl: ''
			},
			'3': {
				id: 3,
				name: 'John',
				imageUrl: ''
			},
			'4': {
				id: 4,
				name: 'Lily',
				imageUrl: ''
			},
			'5': {
				id: 5,
				name: 'Tamir',
				imageUrl: ''
			},
			'6': {
				id: 6,
				name: 'Lee',
				imageUrl: ''
			},
			'7': {
				id: 7,
				name: 'Sarah',
				imageUrl: ''
			}
			,'8': {
				id: 8,
				name: 'Philip',
				imageUrl: ''
			}
		},
		game: {
			playerData: {
				isTurn: false,
				canEndTurn: true,
				playsRemaining: 2,
				hand: [{ type: 'keeper', id: 7}, { type: 'goal', id: 2}, { type: 'keeper', id: 12}],
				tempHand: [],
				keeperIds: [4,5,6]
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
					isTurn: true,
					playsRemaining: 3,
					cardCount: 2,
					keeperIds: [1, 3]
				},
				'3': {
					id: 3,
					isTurn: false,
					playsRemaining: null,
					cardCount: 5,
					keeperIds: [4, 8, 9, 11, 12]
				},
				'7': {
					id: 7,
					isTurn: false,
					playsRemaining: null,
					cardCount: 4,
					keeperIds: []
				}
			},
			currentRules: {
				drawRule: 2,
				playRule: 4,
				handLimit: 6,
				keeperLimit: '—',
				actionRules: [1],
				gameplayRules: [2, 3],
				bonusRules: []
			},
			currentGoals: [1],
			deckCount: 45,
			discards: [{ type: 'goal', id: 1}, { type: 'keeper', id: 10}, { type: 'keeper', id: 12}]
		}
	},
	ui: {

	}
};

export default dummyState;