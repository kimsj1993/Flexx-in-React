import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import MainRules from './main-rules';
import CurrentGoals from './current-goals';
import CurrentRules from './current-rules';

import ChatContainer from '../../chat/ChatContainer';

const styles = theme => ( {
	root: {
		width: 432,
		position: 'relative'
	},
	header: {
		padding: 16,
		borderBottom: '1px solid ' + theme.palette.divider
	},
	title: {
		height: 24,
		fontSize: '14px',
		fontWeight: 500,
		marginBottom: 16,
		width: '100%',
		textAlign: 'center',
		color: theme.palette.grey[ 800 ]
	},
	info: {
		position: 'absolute',
		top: 16,
		right: 16,
		padding: 0
	},
	appbar: {
		backgroundColor: theme.palette.common.white,

		'& button': {
			maxWidth: '144px',
			minWidth: 144
		}
	}
} );

let Component = ( { classes, showInfo = () => {}, tab = 0, changeTab = () => {} } ) => (
	<Paper classes={ { root: classes.root } } >

		<header className={ classes.header } >

			<Typography classes={ { root: classes.title } } > Game Summary </Typography>

			<Tooltip title='More Info' >
				<IconButton classes={ { root: classes.info } } onClick={ showInfo } >
					<InfoIcon />
				</IconButton>
			</Tooltip>

			<MainRules />

		</header>

		<AppBar elevation={ 0 } position='static' classes={ { root: classes.appbar } } >

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

		{ tab == 0 && <CurrentGoals /> }
		{ tab == 1 && <CurrentRules /> }
		{ tab == 2 && <ChatContainer /> }

	</Paper>
);

export default withStyles( styles )( Component );