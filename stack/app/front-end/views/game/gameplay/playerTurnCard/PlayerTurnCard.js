import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


import UserInfo from '../UserInfo';

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
        maxHeight: '300px',
        overflow: 'scroll',
        padding : '16px'

    },

	actionItem : {
		height: '128px',
		width: '128px',
        display: 'grid',
        gridTemplateRows: '1fr, 4fr'
	}

});

const PlayerTurnCard = ({ classes }) => (
	<Paper className={classes.root} >
		<div className={classes.actionTop} >
            <Typography  variant='subtitle2' align='center'>
                Available actions
            </Typography>
		</div>
        <div className={classes.actionContainer}>
            <Button className={classes.actionItem} >
                1
            </Button>
            <Button className={classes.actionItem}>
                2
            </Button>
            <Button className={classes.actionItem}>
                3
            </Button>
            <Button className={classes.actionItem}>
                4
            </Button>
            <Button className={classes.actionItem}>
                5
            </Button>
            <Button className={classes.actionItem}>
                5
            </Button>
            <Button className={classes.actionItem}>
                5
            </Button>
        </div>


	</Paper>
);

export default withStyles(styles)(PlayerTurnCard);