import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import GameSummaryTabContainer from './gameSummaryTab/GameSummaryTabContainer';
import GameRulesTabContainer from './gameRulesTab/GameRulesTabContainer';
import GameChat from './gameChatTab/GameChat';

const styles = theme => ({
	root: {
	    backgroundColor: theme.palette.background.paper,
	    boxShadow: theme.shadows[2]
	},
	appBarRoot: {
		width: 416
	},
	tabRoot: {
		minWidth: 'calc(100% / 3)',
		backgroundColor: theme.palette.background.paper,
	},
	content: {
		height: 292,
		maxHeight: 292,
		overflow: 'scroll'
	}
});

const GameStateCard = ({ classes, theme, tabIndex, changeTab }) => (
	<div className={ classes.root } >
		<AppBar classes={{ root: classes.appBarRoot }} position="static" color="default">
			<Tabs
				value={ tabIndex }
				onChange={ changeTab }
				indicatorColor="primary"
				textColor="primary"
				fullWidth
			>
				<Tab classes={{ root: classes.tabRoot}} label='Summary' />
				<Tab classes={{ root: classes.tabRoot}} label='Rules' />
				<Tab classes={{ root: classes.tabRoot}} label='Chat' />
			</Tabs>
			<Divider />
		</AppBar>
		<div className={ classes.content } >
			{ tabIndex == 0 && <GameSummaryTabContainer /> }
			{ tabIndex == 1 && <GameRulesTabContainer /> }
			{ tabIndex == 2 && <GameChat /> }
		</div>
	</div>
);

export default withStyles(styles)(GameStateCard);