import { replace } from 'connected-next-router';

import { routerTypes } from '../modules/router';

const routerMiddleware = ( { getState, dispatch } ) => next => action => {

	switch( action.type ) {

		case routerTypes.CHECK_ROUTE:

			const currentRoute = getState().router.location.pathname;

			if ( currentRoute != '/game' ) dispatch( replace( '/game' ) );

			break;

	}

	return next( action );

};

export {
	routerMiddleware
};