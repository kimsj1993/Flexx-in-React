import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import UserInfo from '../UserInfo';

const styles = theme => ({
	root: {
		padding: 8,
		backgroundColor: theme.palette.common.white,
		display: 'flex',
		width: 416
	},
	spacer: {
		flexGrow: 1
	},
	userInfoHighlight: {
		width: 8,
	    height: 64,
	    marginRight: 8,
	    marginLeft: -8,
	    marginTop: -8,
	    marginBottom: -8,
	    borderRadius: '4px 0 0 4px',
	    backgroundColor: theme.palette.secondary.main
	}
});

const PlayerTurnCard = ({ classes, isTurn, name, playsRemaining, canEndTurn, endTurn }) => (
	<Paper classes={{ root: classes.root }} >
		{ (isTurn) ? (<div className={ classes.userInfoHighlight } />) : '' }
		<UserInfo name={ name } playsRemaining={ playsRemaining } isTurn={ isTurn } />
		<div className={ classes.spacer } />
		{ (isTurn) ? (<Button variant='contained' color='primary' disabled={ !canEndTurn } onClick={ endTurn } >End Turn</Button>) : ''}
	</Paper>
);

export default withStyles(styles)(PlayerTurnCard);