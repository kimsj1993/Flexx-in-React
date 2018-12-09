import { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography/Typography";





const styles = theme => ({
    root: {
        height: 140,
        width: 300,
        borderRadius: 8,
        backgroundColor: theme.palette.common.white,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridGap: '10px',
        padding: '10px',
        margin: '15px'
    },
    userImage: {
        gridRowStart: '1',
        gridRowEnd:'3',
        backgroundColor: '#FFC0CB',
        border: '1px solid',
    },
    userInfo: {
        gridColumnStart: '2',
        gridColumnEnd: '4',
        textAlign: 'center'
    },
    userStatus: {
        gridColumnStart: '2',
        gridColumnEnd: '4',
        border: '1px solid',
        backgroundColor: '#1E90FF',
        textAlign: 'center',
        borderRadius: 8,

    },

});

const Participant = ({ classes, name }) => (
    <Paper classes={{ root: classes.root }} >
        <div className={classes.userImage}>
        </div>
        <div className={classes.userInfo}>
            <Typography variant="h4"  gutterBottom>
                { name }
            </Typography>

        </div>
    </Paper>
);


export default withStyles(styles)(Participant);