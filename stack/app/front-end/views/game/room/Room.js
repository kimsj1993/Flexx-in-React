import { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography/Typography";
import Participant from'./Participant'
import Button from '@material-ui/core/Button';
import GameChat from '../gameplay/gameStateCard/gameChatTab/GameChat'

const styles = theme => ({
    root: {
        display : 'grid',
        gridTemplateColumns: '2.5fr 2fr',
        gridGap: '30px',
        padding: '50px'
    },
    currentUserContainer: {
        gridRowStart: '1',
        gridRowEnd: '2',
        display: 'grid',
        gridTemplateColumns: '1fr, 1fr',
        gridGap: '15px'
    },
    participants: {
        display: 'flex',
        flexDirection: 'column',
        gridRowStart: '1',
        gridRowEnd: '5'
    },
    userImageContainer: {
        gridColumnStart: '1',
        gridColumnEnd: '2',
        backgroundColor: '#FFC0CB',
        border: '1px solid',
    },

    buttonsContainer: {
        gridColumnStart: '2',
        gridColumnEnd:'3',
        display: 'flex',
        flexDirection: 'column',
    },
    roomChat: {
        gridRowStart: '2',
        gridRowEnd:5,
        gridGap: '30px'
    },
    button: {
        margin: '30px'
    }


});

const Room = ({ classes, players, startGameHandler, deleteGameHandler }) => (
    <Paper classes={{ root: classes.root }} >
        <div className={classes.currentUserContainer}>
            <div className={classes.userImageContainer}>

            </div>
            <div className={classes.buttonsContainer}>
                <Button 
                    variant="contained" 
                    color="primary" 
                    className={classes.button}
                    onClick={ startGameHandler }
                >
                    Start
                </Button>
                <Button variant="contained" color="secondary" className={classes.button}>
                    Invite
                </Button>
                <Button 
                    variant="contained" 
                    className={classes.button}
                    onClick={ deleteGameHandler }
                >
                    Exit
                </Button>
            </div>

        </div>

        <div className={classes.participants}>
            { players.map( player => (
                <Participant 
                    className={classes.participantsItem}
                    name={ player.name }
                    status='Ready'
                />
            ) ) }
        </div>

        <div className={classes.roomChat}>
            <GameChat />
        </div>

    </Paper>
);


export default withStyles(styles)(Room);