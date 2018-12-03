import { withStyles } from '@material-ui/core/styles';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import InfoIcon from '@material-ui/icons/Info';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import JoinGameButton from './JoinGameButton';
import PasswordModal from './PasswordModal';
import CreateGameModal from './CreateGameModal';

const toolbarStyles = theme => ( {
    root: {
        display: 'flex'
    },
    spacer: {
        flexGrow: 1
    },
    buttonRoot: {
        width: 128
    }
} );

let TableToolbar = ( { classes, createGame, showCreateGameDialog } ) => (
    <Toolbar className={ classes.root } >
        <Typography variant='h6'>
            Available Rooms
        </Typography>
        <div className={ classes.spacer } />
        <Button classes={ { root: classes.buttonRoot } } variant='contained' color='primary' onClick={ showCreateGameDialog } >Create Game</Button>
    </Toolbar>
);

TableToolbar = withStyles( toolbarStyles )( TableToolbar );





const lobbyTableHeadStyles = theme => ( {
    infoIconRoot: {
        fontSize: '16px',
        marginLeft: '4px'
    }
} )

let LobbyTableHead = ( { classes } ) => (
    <TableHead>
        <TableRow>

            <TableCell> Host </TableCell>
            <TableCell> Created </TableCell>
            <TableCell> Started </TableCell>
            <TableCell> 
                Free Join 
                <Tooltip title='Whether you can join a game after it has started.'>
                    <InfoIcon classes={ { root: classes.infoIconRoot } } />
                </Tooltip>
            </TableCell>
            <TableCell> Players </TableCell>
            <TableCell numeric > Max Players </TableCell>
            <TableCell>  </TableCell>

        </TableRow>
    </TableHead>
);

LobbyTableHead = withStyles( lobbyTableHeadStyles )( LobbyTableHead );



const PlayerIcon = ( { player } ) => (
    <Tooltip title={ player.name } interactive >
        <AccountCircleIcon />
    </Tooltip>
);


const LobbyTableRow = ( { id, host, created, started, freeJoin, hasPassword,
    minPlayers, maxPlayers, players
 } ) => (
    <TableRow>

        <TableCell><PlayerIcon player={ host } /></TableCell>
        
        <TableCell>{ created }</TableCell>

        <TableCell>{ started }</TableCell>

        <TableCell>{ freeJoin }</TableCell>

        <TableCell>{ players.map( ( player, index ) => <PlayerIcon key={ index } player={ player } /> ) }</TableCell>

        <TableCell numeric >{ maxPlayers }</TableCell>

        <TableCell numeric ><JoinGameButton id={ id } hasPassword={ hasPassword } /></TableCell>

    </TableRow>
);




const LobbyTable = ( { rooms, joinGame, page, changePage } ) => (
    <Table>
        <LobbyTableHead />
        <TableBody>
            { rooms
                .slice( page * 10, page * 10 + 10 )
                .map( ( props, index ) => <LobbyTableRow key={ index } { ...props } /> ) }
        </TableBody>
        <TablePagination 
            count={ rooms.length }
            rowsPerPage={ 10 }
            page={ page }
            onChangePage={ changePage }
            rowsPerPageOptions={ [ 10 ] }
        />
    </Table>
);




const noItemsStyles = theme => ( {
    root: {
        textAlign: 'center',
        padding: 128
    }
} );

let NoItemsPlaceholder = ( { classes } ) => (
    <Typography variant='body2' classes={ { root: classes.root } } >
        There are no active games right now. Try creating one!
    </Typography>
);

NoItemsPlaceholder = withStyles( noItemsStyles )( NoItemsPlaceholder );




const mainStyles = theme => ({
    root: {
        minWidth: '800px',
        marginTop: 48,
        marginLeft: '16px',
        marginRight: '16px'
    },
    table: {
        width: '100%'
    }
});

const Lobby = ( { classes, createGame, joinGame, changePage, page, rooms, showCreateGameDialog } ) => (
    <Paper classes={ { root: classes.root } } >
        <PasswordModal />
        <CreateGameModal />
        <TableToolbar createGame={ createGame } showCreateGameDialog={ showCreateGameDialog } />
        { rooms.length ? 
            <LobbyTable rooms={ rooms } joinGame={ joinGame } page={ page } changePage={ changePage } /> : 
            <NoItemsPlaceholder /> 
        }
    </Paper>
);


export default withStyles( mainStyles )( Lobby );