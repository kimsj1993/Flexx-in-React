import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';

import MainRules from './main-rules';

const styles = theme => ( {
	root: {
		width: 432,
		height: 430,
		position: 'relative'
	},
	header: {
		padding: 16
	},
	title: {
		height: 24,
		fontSize: '14px',
		fontWeight: 'medium',
		marginBottom: 16,
		width: '100%',
		textAlign: 'center'
	},
	info: {
		position: 'absolute',
		top: 16,
		right: 16,
		padding: 0
	}
} );

let Component = ( { classes, showInfo = () => {}, tab = 0, changeTab = () => {} } ) => (
	<Paper classes={ { root: classes.root } } >

		<header className={ classes.header } >

			<Typography classes={ { root: classes.title } } > Game Summary </Typography>

			<IconButton classes={ { root: classes.info } } onClick={ showInfo } >
				<InfoIcon />
			</IconButton>

			<MainRules />

		</header>

		<AppBar>

			<Tabs
				value={ tab }
				onChange={ changeTab }
				indicatorColor='primary'
				textColor='primary'
				fullWidth
			>

				<Tab label='Goals' />
				<Tab label='Rules' />
				<Tab label='Chat' />

			</Tabs>

		</AppBar>

	</Paper>
);

export default withStyles( styles )( Component );