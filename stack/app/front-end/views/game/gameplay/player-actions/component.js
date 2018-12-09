import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';

import Action from './action'


const noActionsStyles = theme => ( {
	root: {
		color: theme.palette.text.hint,
		textAlign: 'center',
		fontSize: '14px',
		fontWeight: 500,
		textAlign: 'center',
		width: '100%',
		height: 144,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 32,
	}
} );

let NoActions = ( { classes } ) => (
	<Typography classes={ { root: classes.root } } > 
		Action Rules in play allow you to perform certain actions during your turn without using up a play. Available actions will appear here.
	</Typography>
);

NoActions = withStyles( noActionsStyles )( NoActions );


const styles = theme => ({
	root : {
		padding: 16,
		width: 416,
		position: 'relative'
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

    actionContainer : {
        display: 'grid',
        gridTemplateColumns: '128px 128px 128px',
        overflow: 'scroll'
    },

	actionItem : {
		height: '128px',
		width: '128px',
        position: 'relative',

        '&:hover': {
            backgroundColor: '#926496'
        },

        '&:hover $text': {
            color: theme.palette.common.white
        },
        padding: '5px'

	},
    text: {
        textAlign: 'center',
        height: 24,
        width: '100%'
    }

});


const Component = ({ classes, actions, showInfo = () => {}, showActionInfo = () => {}, invokeAction = () => {} }) => (
	<Paper classes={ { root: classes.root } } >

        <Typography  classes={ { root: classes.title } } >
            Available Actions
        </Typography>

        <Tooltip title='More Info' >
			<IconButton classes={ { root: classes.info } } onClick={ showInfo } >
				<InfoIcon />
			</IconButton>
		</Tooltip>

        <div className={ classes.actionContainer }>
            { actions.map( action => 
            	<Action 
	            	label={ action.name } 
	            	invoke={ invokeAction( action.id ) } 
	            	showInfo={ showActionInfo( action.id ) } 
            	/> ) }
        </div>

        { actions.length == 0 && <NoActions /> }


	</Paper>
);

export default withStyles( styles )( Component );