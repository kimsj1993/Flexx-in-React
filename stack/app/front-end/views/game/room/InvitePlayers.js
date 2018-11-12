import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';



const styles = theme => ({

    contentRoot: {
        width: '350px',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    listBox: {
        maxHeight: '350px',
        overflowY: 'scroll'
    }
});


const Invitation = ({classes}) => (
    <div>
        <Dialog
            aria-labelledby="form-dialog-title"
            open = {true}
        >
            <DialogTitle id="form-dialog-title">Players In Lobby</DialogTitle>
            <DialogContent className={classes.contentRoot}>
                <DialogContentText>
                    Choose players to invite
                </DialogContentText>

                <List className = {classes.listBox}>
                    {[0, 1, 2, 3, 4, 5, 6].map(value => (
                        <ListItem key={value} role={undefined} dense button>
                            <Checkbox
                                tabIndex={-1}
                                disableRipple
                            />
                            <ListItemText primary={'UserName'} />
                        </ListItem>
                    ))}
                </List>

            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="secondary">
                    Close
                </Button>
                <Button variant="contained" color="primary">
                    Invite
                </Button>
            </DialogActions>
        </Dialog>

    </div>


);


export default withStyles(styles)(Invitation);