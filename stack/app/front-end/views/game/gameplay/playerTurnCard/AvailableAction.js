import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';


const styles = theme => ({
	root : {
		display: 'grid',
		gridTemplateColumns: '1fr',

    },
    actionTop : {
        height: '24px',
        textAlign: 'center',
        marginBottom: '16px'
    },

    actionContainer : {
        display: 'grid',
        gridTemplateColumns: '128px 128px 128px',
        maxHeight: '290px',
        overflow: 'scroll',
        padding : '16px'
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
    },

    info: {
        position: 'absolute',
        bottom: 4,
        right: 4,
        color: theme.palette.common.white,
        height: 24,
        width: 24,
        padding: 0
    }

});

const AvailableAction = ({ classes }) => (
	<Paper className={classes.root} >
		<div className={classes.actionTop} >
            <Typography  variant='subtitle2' align='center'>
                Available actions
            </Typography>
		</div>
        <div className={classes.actionContainer}>
            <Paper className={classes.actionItem} >
                <Typography className={classes.text} variant='subtitle2'> instruction </Typography>
                <IconButton className={classes.info}  >
                    <InfoIcon />
                </IconButton>
            </Paper>

            <Paper className={classes.actionItem} >
                <Typography className={classes.text} variant='subtitle2'> instruction </Typography>
                <IconButton className={classes.info}  >
                    <InfoIcon />
                </IconButton>
            </Paper>

            <Paper className={classes.actionItem} >
                <Typography className={classes.text} variant='subtitle2'> instruction </Typography>
                <IconButton className={classes.info}  >
                    <InfoIcon />
                </IconButton>
            </Paper>
        </div>


	</Paper>
);

export default withStyles(styles)(AvailableAction);