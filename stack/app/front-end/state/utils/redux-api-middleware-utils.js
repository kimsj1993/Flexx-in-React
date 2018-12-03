import { RSAA } from 'redux-api-middleware';

const createApiAction = ( rsaa, transform = () => {} ) => 
	( ...args ) => ( {
		[ RSAA ]: {
			...rsaa,
			...transform( rsaa, ...args )
		}
	} );

export {
	createApiAction
};