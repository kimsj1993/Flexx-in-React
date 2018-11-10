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
import MenuItem from '@material-ui/core/MenuItem';



const styles = theme => ({
    menu: {
        width: 200,
    },
});

const currencies = [
    {
        value: '2',
        label: '2',
    },
    {
        value: '3',
        label: '3',
    },
    {
        value: '4',
        label: '4',
    },
    {
        value: '5',
        label: '5',
    },

    {
        value: '6',
        label: '6',
    },
];

const CreateRoom = ({classes}) => (
    <div>
        <Dialog
            aria-labelledby="form-dialog-title"
            open = {true}
        >
            <DialogTitle id="form-dialog-title">Create Room</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter name of your room and set the max capacity of players
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="roomName"
                    label="Room Name"
                    type=""
                    fullWidth
                />

                <TextField
                    id="standard-select-currency"
                    select
                    label="Maximum Players"
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    helperText="Please select maximum number of player"
                    margin="normal"
                >
                    {currencies.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>

            </DialogContent>
            <DialogActions>
                <Button color="primary">
                    Cancel
                </Button>
                <Button color="primary">
                    Create
                </Button>
            </DialogActions>
        </Dialog>

    </div>


);


export default withStyles(styles)(CreateRoom);