import { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	grow: {
		flexGrow: 1
	},
	buttonRoot: {
		height: 32,
		borderRadius: 4
	},
	appBarRoot: {
		height: 48,
		backgroundColor: '#805184',
		boxShadow: theme.shadows[1]
	},
	toolbarRoot: {
		height: 48,
		minHeight: 48,
		paddingLeft: 16,
		paddingRight: 16
	}
});

const Header = ({ classes }) => (
	<div className={ classes.root } >
		<AppBar position='static' classes={{ root: classes.appBarRoot }}>
			<Toolbar classes={{ root: classes.toolbarRoot }}>
				<Button classes={{ root: classes.buttonRoot }} variant='contained' color='primary'>Leave Game</Button>
				<div className={ classes.grow } />
				<Button classes={{ root: classes.buttonRoot }} variant='contained' color='secondary'>Help</Button>
			</Toolbar>
		</AppBar>
	</div>
);

export default withStyles(styles)(Header);