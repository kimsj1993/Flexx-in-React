import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
	root: {
		height: 192,
		width: 128,
		borderRadius: 8,
		backgroundColor: theme.palette.common.white,
		display: 'flex',
		position: 'relative'
	},
	sash: {
		width: 36,
		height: '100%',
		borderRadius: '8px 0 0 8px',
	},
	keeper: {
		backgroundColor: theme.palette.cards.keeper
	},
	goal: {
		backgroundColor: theme.palette.cards.goal
	},
	rule: {
		backgroundColor: theme.palette.cards.rule
	},
	action: {
		backgroundColor: theme.palette.cards.action
	},
	cardInfo: {
		maxWidth: 128-36,
		padding: 8,
		paddingRight: 0
	},
	typeText: {
		fontSize: '18px',
		fontWeight: 200,
		fontFamily: "'Roboto Condensed', sans-serif",
		height: 32,
		color: theme.palette.grey[ 700 ]
	},
	rotate: {
		transform: 'rotate( -90deg )',
		transformOrigin: 'right bottom 0'
	},
	sashText: {
		width: 150,
		height: 36,
		textAlign: 'right',
		fontSize: '14px',
		fontFamily: "'Roboto Condensed', sans-serif",
		fontWeight: 'bold',
		marginLeft: -90,
		paddingTop: 8,
		color: 'white'
	},
	icon: {
		borderRadius: '50%',
		backgroundColor: theme.palette.grey[ 200 ],
		height: 64,
		width: 64,
		marginLeft: 14-8
	},
	nameText: {
		height: 16,
		fontSize: '12px',
		fontWeight: 500,
		marginTop: 4,
		color: theme.palette.grey[ 700 ]
	},
	subtypeText: {
		height: 16,
		fontSize: '9px',
		fontWeight: 500,
		marginTop: 0,
		color: theme.palette.grey[ 700 ]
	},
	info: {
		position: 'absolute',
		bottom: 4,
		right: 4,
		height: 24,
		width: 24,
		padding: 0
	}
});

const subtypeText = ( id, subtype ) => {

	if ( id.slice( 0, 4 ) == 'play' )
		return 'Replaces Play Rule';

	if ( id == 'draw_2' || id == 'draw_3' || id == 'draw_4' || id == 'draw_5' )
		return 'Replaces Draw Rule'

	if ( id.slice( 0, 10 ) == 'hand_limit')
		return 'Replaces Hand Limit';

	if ( id.slice( 0, 12 ) == 'keeper_limit')
		return 'Replaces Keeper Limit';

	if ( subtype == 'action_rule' )
		return 'Action Rule';

	if ( subtype == 'game_rule' )
		return 'Game Rule';

	if ( subtype == 'bonus' )
		return 'Bonus Rule';

	return null
};

const Card = ({ classes, name, type, subtype, id, showInfo = () => {} }) => (
	<Paper classes={{ root: classes.root }} >
		<div className={ classNames( classes.sash, classes[ type ] ) }>
			<div className={ classes.rotate } >
				<div className={ classes.sashText } >
				{ name.toUpperCase() }
				</div>
			</div>
		</div>
		<div className={ classes.cardInfo } >

			<Typography classes={ { root: classes.typeText } } >
				{ type == 'rule' && 'NEW RULE' }
				{ type == 'action' && 'ACTION' }
				{ type == 'goal' && 'GOAL' }
				{ type == 'keeper' && 'KEEPER' }
			</Typography>

			<div className={ classes.icon } />

			<Typography classes={ { root: classes.nameText } } >
				{ name }
			</Typography>

			{ 
				subtypeText( id, subtype ) && 

				<Typography classes={ { root: classes.subtypeText } } >

					{ subtypeText( id, subtype ) }

				</Typography>
			}

			<IconButton classes={ { 
				root: classes.info
			} } onClick={ showInfo } >
				<InfoIcon />
			</IconButton>

		</div>

	</Paper>
);

export default withStyles(styles)(Card);