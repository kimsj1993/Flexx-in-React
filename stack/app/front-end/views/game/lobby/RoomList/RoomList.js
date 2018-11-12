import { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';



const styles = theme => ({
    roomContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr 3fr 1fr 1fr 1.5fr',
        paddingLeft: '10px',
        paddingRight: '10px',

        justifyContent: 'center'


},
    top: {
        backgroundColor: '#FFC0CB',
        border: '1px solid',
        padding: '20px',
        textAlign: 'center'
    },
    room: {
        backgroundColor: '#D8BFD8',
        border: '1px solid',
        padding: '20px',
        textAlign: 'center'
    }

});

const RoomList = ({classes}) => (
    <div className={ classes.roomContainer}>
        <div className={classes.room}>WAITING</div>
        <div className={classes.room}>ROOM NAME</div>
        <div className={classes.room}>1/6</div>
        <div className={classes.room}>
            <Button variant="contained">SPECTATE</Button>
        </div>
        <div className={classes.room}>
            <Button variant="contained">JOIN</Button>
        </div>

    </div>
);


export default withStyles(styles)(RoomList);