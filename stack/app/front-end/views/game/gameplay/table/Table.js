import { withStyles } from '@material-ui/core/styles';

import DeckContainer from './DeckContainer';
import HandContainer from './HandContainer';
import DiscardContainer from './DiscardContainer';
import Fab from '@material-ui/core/Fab';
import Button from "@material-ui/core/Button/Button";
import Paper from "@material-ui/core/Paper/Paper";



const styles = theme => ({
	root: {
		height: 72,
		width: '100%',
		display: 'flex',
		marginTop: 16
	},
	discard: {
		marginRight: 16
	},
	deck: {
		marginRight: 16
	},
	hand: {
		flexGrow: 2
	},
	buttonsContainer: {
		display:'grid',
        gridTemplateColumns: 'auto',
		width: 416,
	},
	buttonItem : {
        border: '1px solid rgba(0, 0, 0, 0.8)',
		padding: '20px',
		margin: '20px',
        textAlign: 'center'
},
	center: {
		display: 'flex',
		justifyContent: 'center'
	}
});

const Table = ({ classes, isTurn, canEndTurn, endTurn }) => (
	<div className={ classes.root } >
		<div className={ classes.discard } >
			<DiscardContainer />
		</div>
		<div className={ classes.deck } >
			<DeckContainer />
		</div>
		<div className={ classes.hand } >
			<div className={ classes.center }>
				<HandContainer />
			</div>
		</div>
		<div className={classes.buttonsContainer}>
            { (isTurn) ? (<Fab variant='extended' color='primary'  className={classes.buttonItem} disabled={ !canEndTurn } onClick={ endTurn } >End Turn</Fab>) : ''}
		</div>
	</div>
);

export default withStyles(styles)(Table);