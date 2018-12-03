import { isRSAA, isValidRSAA } from 'redux-api-middleware';

const apiMiddlewareWrapper = ( { getState, dispatch } ) => next => action => {

	if ( !isRSAA( action ) ) {
		return next( action );
	}

	const { onSuccess, onFailure, ...rsaaAction } = action;

	if ( !onSuccess && !onFailure ) {
		return next( rsaaAction );
	}

	return next( rsaaAction ).then( response => {

		if ( response.error && onFailure ) {

			dispatch( onFailure( response.error ) )

		} else if ( !response.error && onSuccess ) {

			dispatch( onSuccess( response.payload ) );

		}

		return response;

	} );
};

export {
	apiMiddlewareWrapper
};