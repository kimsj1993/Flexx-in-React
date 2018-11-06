import { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import OpponentsContainer from './opponent/OpponentsContainer';

import Paper from '@material-ui/core/Paper';

const styles = theme => ({
	root: {
		height: 'calc(100vh - 48px)',
		backgroundColor: '#FAFAFA'
	},
	opponentsRoot: {
		height: 400 - 48,
		backgroundColor: '#926496',
		zIndex: 2
	}
});

const Gameplay = ({ classes }) => (
	<section className={ classes.root } >
		<Paper square={ true } classes={{ root: classes.opponentsRoot }}>
			<OpponentsContainer />
		</Paper>
		<section />
	</section>
);

export default withStyles(styles)(Gameplay);