import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';



const styles = theme => ({
    root: {
        backgroundColor: theme.palette.common.white,
        display: 'flex',
        flexDirection: 'column',
        height: 'inherit'
    },
    messageArea: {
        display: 'flex',
        height: 48
    },
    textArea: {
        flexGrow: 1
    },
    messages: {
        listStyleType: 'none',
        height: 160,
        padding: 16,
        margin: 0,
        overflowY: 'scroll'
    }
});

const Chat = ({ classes, messages, sendMessage, value, handleChange }) => (
    <Paper classes={{ root: classes.root }} >
        <ul className={ classes.messages }>
            { messages.map( ( obj, index ) => ( <li key={ index } ><strong>{ obj.username }</strong>: { obj.message }</li> ))}
        </ul>
        <form onSubmit={ sendMessage( value ) } className={ classes.messageArea } >
            <TextField  
                classes={ { root: classes.textArea } }
                variant='outlined'
            	placeholder="Send a message ...."
            	type="text" 
            	value={ value }
            	onChange={ handleChange }
            />
            <Button variant="contained" color="primary" type='submit' >
                send
            </Button>
        </form>
    </Paper>
);

export default withStyles( styles )( Chat );