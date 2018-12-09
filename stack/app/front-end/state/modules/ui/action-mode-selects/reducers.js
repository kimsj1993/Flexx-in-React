import { combineReducers } from "redux";
import { handleActions } from 'redux-actions';
import * as types from "./types";

const id = handleActions(
	{
		[ types.ADD_CARD_ID ]: ( state, { payload } ) => payload,

		[ types.CLEAR_CARD_ID ]: () => null
	},

	null
);

const createCanSubmit = ( count, selectedLength ) => {

	if ( typeof count == 'number' ) {

		return () => selectedLength == count;

	} else if ( count.value ) {

		if ( count.op == '>' )

			return () => selectedLength > count.value;

		if ( count.op == '<' )

			return () => selectedLength < count.value;

		if ( count.op == '>=' )

			return () => selectedLength >= count.value;

		if ( count.op == '<=' )

			return () => selectedLength <= count.value;

		if ( count.op == '==' )

			return () => selectedLength == count.value;

		if ( count.op == '!=' )

			return () => selectedLength != count.value;

	} else if ( count.share ) {

		if ( count.op == '>' )

			return collectionLength => {

				const ratio = selectedLength / collectionLength;

				if ( ratio == count.share && count.round == 'up' )

					return true;

				return ratio > count.share;

			}

		if ( count.op == '<' )

			return collectionLength => {

				const ratio = selectedLength / collectionLength;

				if ( ratio == count.share && count.round == 'down' )

					return true;

				return ratio < count.share;

			}

		if ( count.op == '>=' )

			return collectionLength => {

				const ratio = selectedLength / collectionLength;

				return ratio >= count.share;

			}

		if ( count.op == '<=' )

			return collectionLength => {

				const ratio = selectedLength / collectionLength;

				return ratio <= count.share;

			}

		if ( count.op == '==' )

			return collectionLength => {

				const ratio = selectedLength / collectionLength;

				return ratio == count.share;

			}

		if ( count.op == '!=' )

			return collectionLength => {

				const ratio = selectedLength / collectionLength;

				return ratio != count.share;

			}

	}

	return () => selectedLength == 1;
};

const show = handleActions(
	{
		[ types.SHOW_DIALOG ]: () => true,

		[ types.HIDE_DIALOG ]: () => false
	},

	false
);

const selected = handleActions(
	{
		[ types.ADD_SELECTION ]: ( state, { payload } ) => [
			...state,
			payload.selection
		],

		[ types.REMOVE_SELECTION ]: ( state, { payload } ) =>
			state.filter( s => s != payload.selection )
	},

	[]
);

const select = handleActions(
	{
		[ types.ADD_SELECT ]: ( state, action ) => ( {
			...action.payload,
			selected: selected( undefined, action ),
			canSubmit: createCanSubmit( action.payload.pick.count, state.selected.length )
		} ),

		[ types.ADD_SELECTION ]: ( state, action ) => ( {
			...state,
			selected: selected( state.selected, action ),
			canSubmit: createCanSubmit( action.payload.pick.count, state.selected.length )
		} ),

		[ types.REMOVE_SELECTION ]: ( state, action ) => ( {
			...state,
			selected: selected( state.selected, action ),
			canSubmit: createCanSubmit( action.payload.pick.count, state.selected.length )
		} )
	},

	{
		canSubmit: () => true,
		selected: [],
		pick: {}
	}
);

const selects = handleActions(
	{
		[ types.ADD_SELECT ]: ( state, action ) => [
			...state,
			select( undefined, action )
		],

		[ types.CLEAR_SELECTS ]: () => [],

		[ types.ADD_SELECTION ]: ( state, action ) => [
			...state.slice( 0, action.payload.index ),
			select( state[ action.payload.index ], action ),
			...state.slice( action.payload.index + 1 )
		],

		[ types.REMOVE_SELECTION ]: ( state, action ) => [
			...state.slice( 0, action.payload.index ),
			select( state[ action.payload.index ], action ),
			...state.slice( action.payload.index + 1 )
		]
	},

	[]
);

const reducer = combineReducers( {
	show,
	id,
	selects
} );

export default reducer;