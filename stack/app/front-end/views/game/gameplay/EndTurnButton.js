import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';

import Fab from '@material-ui/core/Fab';

import { gameSelectors, gameOperations } from '../../../state/modules/data/game';
import * as userSelectors from "../../../state/modules/user/selectors";

const mapStateToProps = state => {
	const userId = userSelectors.getUserId( state );
    const isTurn = gameSelectors.isPlayerTurn( state, userId );
    const canEndTurn = true;

    return {
        isTurn,
        canEndTurn
    };
};

const mapDispatchToProps = dispatch => ( {
	endTurn: () => dispatch( gameOperations.endTurn() )
} );

const styles = theme => ( {
	root: {
		marginTop: 16,
		width: '100%'
	}
} );

let EndTurnButton = ( { classes, isTurn, canEndTurn, endTurn } ) => (
	<>
	{ isTurn ?
		<Fab 
			variant='extended' 
			color='primary'  
			classes={ { root: classes.root } } 
			disabled={ !canEndTurn } 
			onClick={ endTurn } 
			elevation={ 8 }
		>
			End Turn
		</Fab> 

		: 

		''
	}
	</>
);

EndTurnButton = withStyles( styles )( EndTurnButton );

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EndTurnButton);