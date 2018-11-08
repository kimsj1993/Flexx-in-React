import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';



const styles = theme => ({
    root: {
        padding: 8,
        backgroundColor: theme.palette.common.white
    },
    chat: {
        display: 'flex',
        height: '72',
        justifyContent: 'center',
        alignItems: 'center'
    },
    chatBox: {
        Height: '400',
        width: '300',
        paddingBottom: '30px',
        display: 'flex',
        justifyContent: 'start',
        position: 'relative'
    },
    chatMessage: {
        width: '300',
        paddingLeft: '40px',
        paddingTop: '20px',
        position: 'absolute',
        bottom: 0,
    },
    messages: {
        listStyleType: 'none'
    }
});

const GameChat = ({ classes, props }) => (
    <Paper classes={{ root: classes.root }} >
        <div className={classes.chatBox}>
            <ul className={classes.messages}>
                <li><b>username:</b>  message</li>
                <li><b>username:</b>  message</li>
                <li><b>username:</b>  message</li>
                <li><b>username:</b>  message</li>
                <li><b>username:</b>  message</li>
                <li><b>username:</b>  message</li>
                <li><b>username:</b>  message</li>
            </ul>
            <div className={classes.chatMessage}>
                <TextField  placeholder="Send a message ...." type="text" />
                <Button variant="contained" color="primary">
                    send
                </Button>
            </div>
        </div>
    </Paper>
);

export default withStyles(styles)(GameChat);