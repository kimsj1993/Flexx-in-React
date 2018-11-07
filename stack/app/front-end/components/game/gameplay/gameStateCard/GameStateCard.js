import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import GameSummaryTabContainer from './gameSummaryTab/GameSummaryTabContainer';
import GameRulesTabContainer from './gameRulesTab/GameRulesTabContainer';

const styles = theme => ({
	root: {
	    backgroundColor: theme.palette.background.paper,
	    boxShadow: theme.shadows[2]
	},
	appBarRoot: {
		width: 416
	},
	tabRoot: {
		minWidth: 'calc(100% / 3)'
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
		</AppBar>
		<div className={ classes.content } >
			{ tabIndex == 0 && <GameSummaryTabContainer /> }
			{ tabIndex == 1 && <GameRulesTabContainer /> }
			{ tabIndex == 2 && <div /> }
		</div>
	</div>
);

export default withStyles(styles)(GameStateCard);