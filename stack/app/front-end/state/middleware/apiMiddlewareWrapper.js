import { isRSAA, isValidRSAA } from 'redux-api-middleware';

const apiMiddlewareWrapper = ( { getState, dispatch } ) => next => action => {

	if ( !isRSAA( action ) ) {
		return next( action );
	}

	console.log( action )

	const { onSuccess, onFailure, ...rsaaAction } = action;

	console.log ( rsaaAction, isValidRSAA( rsaaAction ) );

	if ( !onSuccess && !onFailure ) {
		return next( rsaaAction );
	}

	return next( rsaaAction ).then( response => {

		if ( response.error && onFailure ) {

			dispatch( onFailure( response.error ) )

		} else if ( onSuccess ) {

			dispatch( onSuccess( response.payload ) );

		}

		return response;

	} );
};

export {
	apiMiddlewareWrapper
};