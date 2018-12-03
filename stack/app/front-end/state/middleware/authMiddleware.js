import { replace } from 'connected-next-router';

import { routerTypes, routerOperations } from '../modules/router';
import { authTypes, userSelectors, userOperations } from '../modules/user';
import { socketOperations } from '../modules/socket';
import { appUITypes } from '../modules/ui/app';
import { apiOperations } from '../modules/api';

import fetch from 'cross-fetch';


const checkLogin = 
	state => userSelectors.getUserId( state ) != null;


const authMiddleware = ( { getState, dispatch } ) => next => action => {

	switch( action.type ) {

		case routerTypes.CHECK_ROUTE:

			return dispatch( apiOperations.getSession( { 

					types: [ 
						appUITypes.APP_LOAD_REQUEST,
						appUITypes.APP_LOAD_SUCCESS,
						appUITypes.APP_LOAD_ERROR
					]

				} ) ).then( apiResponse => {

					if ( checkLogin( getState() ) ) {

						dispatch( socketOperations.socketConnect() );

						return next( action );

					} else {

						dispatch( socketOperations.socketDisconnect() );

						return dispatch( replace( '/' ) );

					}
				}

			);

	}

	return next( action );

};

export {
	authMiddleware
};