import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	root: {
		display: 'flex',
		justifyContent: 'flex-start'
	},
	card: {
		height: 48,
		width: 32,
		marginRight: -16,
		backgroundColor: theme.palette.primary.dark
	}
});

const OpponentHand = ({ classes, cardCount }) => (
	<div className={ classes.root } >
		{ new Array(cardCount).fill(<div className={ classes.card } />) }
	</div>
);

export default withStyles(styles)(OpponentHand);