import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	root: {
		display: 'flex',
		justifyContent: 'flex-start',
		marginBottom: 8
	},
	card: {
		height: 48,
		width: 32,
		backgroundColor: theme.palette.primary.dark,
		border: '1px solid white',
		borderRadius: 2,
		boxShadow: theme.shadows[1],
		marginRight: -20
	}
});

const OpponentHand = ({ classes, count }) => (
	<div className={ classes.root } >
		{ Array(count).fill(null).map((val, index) => (<div className={ classes.card } key={ index } />)) }
	</div>
);

export default withStyles(styles)(OpponentHand);