import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Paper from '@material-ui/core/Paper';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import CardSelect from '../../CardSelect';
import PlayerSelect from '../../PlayerSelect';
import DirectionSelect from '../../DirectionSelect';

const cardKindStyles = theme => ( {
	cardSelectWell: {
		display: 'flex',
		marginBottom: 8,
		marginTop: 8,
		overflowX: 'scroll',
		backgroundColor: theme.palette.grey[ 300 ],
		borderRadius: 8
	}
} );

let CardKind = ( { classes, options, selected, pick, satisfied, select, index } ) => (
	<section>

		<Typography variant='subtitle1'> Select Cards </Typography>

		<Paper classes={ { root: classes.cardSelectWell } } elevation={ 0 } >

			{ options.map( id => 
				<div onClick={ select( index, selected.includes( id ), id ) } >
					<CardSelect 
						cardId={ id } 
						selected={ selected.includes( id ) } 
						index={ pick.index }
					/>
				</div> ) 
			}

		</Paper>

		<Typography color={ satisfied ? 'default' : 'error' } variant="subtitle2"> { pick.message } </Typography>

	</section>
);

CardKind = withStyles( cardKindStyles )( CardKind );


const playerKindStyles = theme => ( {
	cardSelectWell: {
		display: 'flex',
		marginBottom: 8,
		marginTop: 8,
		overflowX: 'scroll',
		backgroundColor: theme.palette.grey[ 300 ],
		borderRadius: 8
	}
} );

let PlayerKind = ( { classes, options, selected, pick, satisfied, select, index } ) => (
	<section>

		<Typography variant='subtitle1'> Select Cards </Typography>

		<Paper classes={ { root: classes.cardSelectWell } } elevation={ 0 } >

			{ options.map( id => 
				<div onClick={ select( index, selected.includes( id ), id ) } >
					<PlayerSelect 
						playerId={ id }
						selected={ selected.includes( id ) }
					/>
				</div> ) 
			}

		</Paper>

		<Typography color={ satisfied ? 'default' : 'error' } variant="subtitle2"> { pick.message } </Typography>

	</section>
);

PlayerKind = withStyles( playerKindStyles )( PlayerKind );


const directionKindStyles = theme => ( {
	cardSelectWell: {
		display: 'flex',
		marginBottom: 8,
		marginTop: 8,
		overflowX: 'scroll',
		backgroundColor: theme.palette.grey[ 300 ],
		borderRadius: 8
	}
} );

let DirectionKind = ( { classes, options, selected, pick, satisfied, select, index } ) => (
	<section>

		<Typography variant='subtitle1'> Select Cards </Typography>

		<Paper classes={ { root: classes.cardSelectWell } } elevation={ 0 } >

			{ options.map( direction => 
				<div onClick={ select( index, selected.includes( direction ), direction ) } >
					<DirectionSelect 
						direction={ direction }
						selected={ selected.includes( direction ) }
					/>
				</div> ) 
			}

		</Paper>

		<Typography color={ satisfied ? 'default' : 'error' } variant="subtitle2"> { pick.message } </Typography>

	</section>
);

DirectionKind = withStyles( directionKindStyles )( DirectionKind );


const styles = theme => ( {
	root: {

	}
} );

let Component = ( { classes, options, selected, pick, satisfied, select, index } ) => (
	<Paper classes={ { root: classes.root } } key={ index } >

		{ pick.kind == 'CARD' && 
			<CardKind 
				options={ index ? options.map( ( value, index ) => index ) : options }
				selected={ selected }
				select={ select }
				pick={ pick }
				satisfied={ satisfied }
				index={ index }
			/> } 
		{ pick.kind == 'PLAYER' && <PlayerKind /> }
		{ pick.kind == 'DIRECTION' && <DirectionKind /> }

	</Paper>
);

export default withStyles( styles )( Component );