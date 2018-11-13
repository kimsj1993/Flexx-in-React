import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        minWidth: '800px',
        marginTop: 48
    },
    table: {
        width: '100%'
    }
});

const Lobby = ( { classes, rooms, joinHandlerCreator, createHandler } ) => (
    <Paper className={ classes.root } >
        <Button variant='contained' color='primary' onClick={ createHandler } >Create Game</Button>
        <Table className={ classes.table } >
            <TableHead>
                <TableRow>
                    <TableCell>Players</TableCell>
                    <TableCell>Max Players</TableCell>
                    <TableCell />
                </TableRow>
            </TableHead>
            <TableBody>
                { rooms && rooms.map( room => (
                    <TableRow key={ room.id }>
                        <TableCell>
                            { room.playerCount }
                        </TableCell>
                        <TableCell>
                            { room.maxPlayers }
                        </TableCell>
                        <TableCell>
                            <Button 
                                variant='contained' 
                                color='primary' 
                                onClick={ joinHandlerCreator( room.id ) } 
                            >
                                Join
                            </Button>
                        </TableCell>
                    </TableRow>
                ) ) }
            </TableBody>
        </Table>
    </Paper>
);


export default withStyles(styles)(Lobby);