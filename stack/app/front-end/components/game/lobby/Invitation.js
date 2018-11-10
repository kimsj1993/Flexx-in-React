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



const styles = theme => ({

});


const Invitation = ({classes}) => (
    <div>
        <Dialog
            aria-labelledby="form-dialog-title"
            open = {true}
        >
            <DialogTitle id="form-dialog-title">Invitation</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    from UserName
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="secondary">
                    Reject
                </Button>
                <Button variant="contained" color="primary">
                    Accept
                </Button>
            </DialogActions>
        </Dialog>

    </div>


);


export default withStyles(styles)(Invitation);