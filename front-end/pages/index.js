import { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	grow: {
		flexGrow: 1
	}
});

class App extends Component {

	render () {
		const { classes } = this.props;

		return (
			<AppBar position='static'>
				<Toolbar>
					<Typography variant='h6'>Hello!</Typography>
					<div className={ classes.grow } />
					<Button variant='contained' color='secondary'>Help</Button>
				</Toolbar>
			</AppBar>
		)
	};
}

export default withStyles(styles)(App);