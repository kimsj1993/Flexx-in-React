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
        height: '400',
        width: '300',
        paddingBottom: '30px',
        display: 'flex',
        justifyContent: 'start',
        position: 'relative',
        overflowY: 'scroll'
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

const Chat = ({ classes, messages, sendMessage, value, handleChange }) => (
    <Paper classes={{ root: classes.root }} >
        <div className={ classes.chatBox }>
            <ul className={ classes.messages }>
                { messages.map( ( obj, index ) => ( <li key={ index } ><strong>{ obj.username }</strong>: { obj.message }</li> ))}
            </ul>
            <div className={classes.chatMessage}>
                <form onSubmit={ sendMessage( value ) } >
                    <TextField  
                    	placeholder="Send a message ...."
                    	type="text" 
                    	value={ value }
                    	onChange={ handleChange }
                    />
                    <Button variant="contained" color="primary" type='submit' >
                        send
                    </Button>
                </form>
            </div>
        </div>
    </Paper>
);

export default withStyles( styles )( Chat );