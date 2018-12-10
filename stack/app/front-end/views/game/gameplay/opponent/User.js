import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import Paper from '@material-ui/core/Paper';

import UserInfo from '../UserInfo';
import KeepersContainer from '../KeepersContainer';
import LeaveButton from "../../../LeaveButton";

const styles = theme => ({
    root: {
        height: '100%',
        width: 288,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: theme.palette.background.default
    },
    turnHighlight: {
        backgroundColor: '#EFE7EF'
    },
    userInfoRoot: {
        marginTop: 16,
        width: '100%',
        marginBottom: 16,
        height: 112
    },
    userInfoContent: {
        width: '100%',
        padding: 8,
        display: 'flex',
        marginBottom: 6,
        borderBottom: '1px solid ' + theme.palette.divider
    },
    userInfoContentTurn: {
        backgroundColor: '#FEFCE5'
    },
    userInfoHighlight: {
        width: 8,
        height: 64,
        marginRight: 8,
        marginLeft: -8,
        marginTop: -8,
        marginBottom: -8,
        borderRadius: '4px 0 0 0px',
        backgroundColor: theme.palette.secondary.main
    },
    actions: {
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-end',
        paddingRight: 6
    }
});

const User = ({ classes, name, playsRemaining, isTurn,  keeperIds }) => (
    <Paper square elevation={ 2 } classes={ { 
        root: classNames( classes.root, { [ classes.turnHighlight ]: isTurn } )
    } } >
        <Paper classes={ { root: classNames( classes.userInfoRoot, { [ classes.userInfoContentTurn ]: isTurn } ) } } >
            <div className={ classes.userInfoContent } >
            { (isTurn) ? <div className={ classes.userInfoHighlight } /> : '' }
            <UserInfo
                name={ name }
                playsRemaining={ playsRemaining }
                isTurn={ isTurn }
            />
            </div>
            <div className={ classes.actions } >
                <LeaveButton text />
            </div>
        </Paper>
        
            <KeepersContainer keeperIds={ keeperIds } />
        

    </Paper>
);



export default withStyles(styles)(User);