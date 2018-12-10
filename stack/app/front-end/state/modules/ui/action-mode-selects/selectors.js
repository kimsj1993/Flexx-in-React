
const getSelectByIndex = ( state, index ) => state.ui.actionModeSelects.selects[ index ];

const getSelects = state => state.ui.actionModeSelects.selects;

const getCardId = state => state.ui.actionModeSelects.id;

const isVisible = state => state.ui.actionModeSelects.show;

const getSelectionOptions = ( state, pick ) => {

	const { kind, type, collection, self, index } = pick;

	if ( kind == 'PLAYER' ) {
		return state.data.players.allIds
	}

	if ( kind == 'DIRECTION' ) {
		return [ 'LEFT', 'RIGHT' ];
	}

	const thisUserId = state.user.id;

	const isOfType = type => id => {

		if ( Array.isArray( type ) )
			return type.some( t => {
				if ( t == 'ACTION' ) return state.data.cards.byId[ id ].type == 'action';
				if ( t == 'NEW_RULE' ) return state.data.cards.byId[ id ].type == 'rule';
				if ( t == 'KEEPER' ) return state.data.cards.byId[ id ].type == 'keeper';
				if ( t == 'GOAL' ) return state.data.cards.byId[ id ].type == 'goal';
			} );
		else {
			if ( type == 'ACTION' ) return state.data.cards.byId[ id ].type == 'action';
			if ( type == 'NEW_RULE' ) return state.data.cards.byId[ id ].type == 'rule';
			if ( type == 'KEEPER' ) return state.data.cards.byId[ id ].type == 'keeper';
			if ( type == 'GOAL' ) return state.data.cards.byId[ id ].type == 'goal';
		} 

		return false;
	};

	switch ( collection ) {

		case 'discard':

			let discards = state.data.table.discards;

			if ( type ) discards = discards.filter( isOfType( type ) );

			return discards;

		case 'player_keepers':

			return state.data.players.byId[ thisUserId ].keeperIds;

		case 'player_hand':

			if ( self === false ) {

				const playersCardCount = state.data.players.allIds
					.map( id => state.data.players.byId[ id ] )
					.filter( id => id != thisUserId )
					.reduce( ( total, player ) => total + player.cards );

				return Array( playersCardCount ).fill( null );

			}

			return state.data.hand.hand;

		case 'player_temp_hand':

			return state.data.hand.tempHand;

		case 'table_keepers':

			if ( self === true )
				return state.data.players.allIds
					.filter( id => id == thisUserId )
					.map( id => state.data.players.byId[ id ].keeperIds )
					.reduce( ( arr, ids ) => arr.concat( ids ), [] );

			if ( self === false )
				return state.data.players.allIds
					.filter( id => id != thisUserId )
					.map( id => state.data.players.byId[ id ].keeperIds )
					.reduce( ( arr, ids ) => arr.concat( ids ), [] );

			return state.data.players.allIds
				.map( id => state.data.players.byId[ id ].keeperIds )
				.reduce( ( arr, ids ) => arr.concat( ids ), [] );

		case 'rules':

			return state.data.table.rules + [
				'draw_' + state.data.table.draw,
				'play_' + state.data.table.play,
				'keeper_limit_' + ( state.data.table.keeperLimit || 0 ),
				'hand_limit_' + ( state.data.table.handLimit || 0 )
			];

		case 'goals':

			return state.data.table.goals;

		case 'table':

			const goals = state.data.table.goals;
			const rules = state.data.table.rules + [
				'draw_' + state.data.table.draw,
				'play_' + state.data.table.play,
				'keeper_limit_' + ( state.data.table.keeperLimit || 0 ),
				'hand_limit_' + ( state.data.table.handLimit || 0 )
			];

			const playerKeepers = state.data.players.allIds
				.filter( id => id == thisUserId )
				.map( id => state.data.players.byId[ id ].keeperIds )
				.reduce( ( arr, ids ) => arr.concat( ids ), [] );

			const opponentKeepers = state.data.players.allIds
				.filter( id => id != thisUserId )
				.map( id => state.data.players.byId[ id ].keeperIds )
				.reduce( ( arr, ids ) => arr.concat( ids ), [] );

			if ( type == 'NEW_RULE' ) return rules;
			if ( type == 'GOAL' ) return goals;

			if ( type == 'KEEPER' ) {

				if ( self === true ) return playerKeepers;
				if ( self === false ) return opponentKeepers;

				return [ ...playerKeepers, ...opponentKeepers ];

			}

			if ( self === true ) return playerKeepers;
			if ( self === false ) 
				return [
					...opponentKeepers,
					...goals,
					...rules
				];

			return [
				...playerKeepers,
				...opponentKeepers,
				...goals,
				...rules
			];

	}
}

const getPropsForIndex = ( state, props ) => ( {
	options: getSelectionOptions( state, getSelectByIndex( state, props.index ).pick ),
	selected: getSelectByIndex( state, props.index ).selected,
	pick: getSelectByIndex( state, props.index ).pick,
	satisfied: getSelectByIndex( state, props.index )
		.canSubmit( 
			getSelectionOptions( state, getSelectByIndex( state, props.index ).pick ).length
		)
} );

const getProps = ( state ) => ( {
	show: isVisible( state ),
	card: state.data.cards.byId[ getCardId( state ) ],
	canSubmit: state.ui.actionModeSelects.selects.every( ( select, index ) => 
		select.canSubmit( 
			getSelectionOptions( state, getSelectByIndex( state, index ).pick ).length 
		)
	),
	selects: getSelects( state )
} );

export {
	getPropsForIndex,
	getProps
};