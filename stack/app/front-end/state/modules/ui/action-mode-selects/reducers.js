import { combineReducers } from "redux";
import { handleActions } from 'redux-actions';
import * as types from "./types";

const createCanSubmit = count => {

	if ( typeof count == 'number' ) {

		return selectedLength => selectedLength == count;

	} else if ( count.value ) {

		if ( count.op == '>' )

			return selectedLength => selectedLength > count.value;

		if ( count.op == '<' )

			return selectedLength => selectedLength < count.value;

		if ( count.op == '>=' )

			return selectedLength => selectedLength >= count.value;

		if ( count.op == '<=' )

			return selectedLength => selectedLength <= count.value;

		if ( count.op == '==' )

			return selectedLength => selectedLength == count.value;

		if ( count.op == '!=' )

			return selectedLength => selectedLength != count.value;

	} else if ( count.share ) {

		if ( count.op == '>' )

			return ( selectedLength, collectionLength ) => {

				const ratio = selectedLength / collectionLength;

				if ( ratio == count.share && count.round == 'up' )

					return true;

				return ratio > count.share;

			}

		if ( count.op == '<' )

			return ( selectedLength, collectionLength ) => {

				const ratio = selectedLength / collectionLength;

				if ( ratio == count.share && count.round == 'down' )

					return true;

				return ratio < count.share;

			}

		if ( count.op == '>=' )

			return ( selectedLength, collectionLength ) => {

				const ratio = selectedLength / collectionLength;

				return ratio >= count.share;

			}

		if ( count.op == '<=' )

			return ( selectedLength, collectionLength ) => {

				const ratio = selectedLength / collectionLength;

				return ratio <= count.share;

			}

		if ( count.op == '==' )

			return ( selectedLength, collectionLength ) => {

				const ratio = selectedLength / collectionLength;

				return ratio == count.share;

			}

		if ( count.op == '!=' )

			return ( selectedLength, collectionLength ) => {

				const ratio = selectedLength / collectionLength;

				return ratio != count.share;

			}

	}

	return selectedLength => selectedLength == 1;
};

const select = handleActions(
	{
		[ types.ADD_SELECT ]: ( state, { payload } ) => ( {
			...payload,
			selected: [],
			canSubmit: createCanSubmit( payload.count )
		} ),

		[ types.ADD_SELECTION ]: ( state, { payload } ) => ( {
			...state,
			selected: [
				...state.selected,
				payload.selection
			]
		} ),

		[ types.REMOVE_SELECTION ]: ( state, { payload } ) => ( {
			...state,
			selected: state.selected.filter( s => s != payload.selection )
		} )
	},

	{
		selected: [],
		canSubmit: () => true,
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
	selects
} );

export default reducer;