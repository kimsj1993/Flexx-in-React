import { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import RoomList from './RoomList/RoomList'



const styles = theme => ({
    roomContainer: {
        display: 'grid',
        gridTemplateColumns: '1fr 3fr 1fr 1fr 1.5fr',
        padding: '10px',
        justifyContent: 'center'


    },
    top: {
        backgroundColor: '#FFC0CB',
        border: '1px solid',
        padding: '20px',
        textAlign: 'center'
    }

});

    const Lobby = ({classes}) => (
    <div>
        <div className={ classes.roomContainer}>
            <div className={classes.top}>WAITING</div>
            <div className={classes.top}>NAME</div>
            <div className={classes.top}>Player</div>
            <div className={classes.top}>-</div>
            <div className={classes.top}>-</div>
        </div>
        <RoomList></RoomList>
        <RoomList></RoomList>
        <RoomList></RoomList>
        <RoomList></RoomList>

    </div>


);


export default withStyles(styles)(Lobby);