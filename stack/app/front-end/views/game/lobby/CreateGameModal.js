import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import { createGameModalUISelectors, createGameModalUIOperations } from '../../../state/modules/ui/create-game-modal';
import { lobbyOperations } from '../../../state/modules/data/lobby';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Collapse from '@material-ui/core/Collapse';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';

const SlideTransition = props => <Slide direction='down' { ...props } />;

const mapDispatchToProps = dispatch => ( {
	handleClose: () => dispatch( createGameModalUIOperations.hideDialog() ),
	handleMaxPlayersSelectChange: e => dispatch( createGameModalUIOperations.updateMaxPlayersSelect( { value: e.target.value } ) ),
	handleFreeJoinSwitchChange: e => dispatch( createGameModalUIOperations.updateFreeJoinSwitch( { value: e.target.checked } ) ),
	handlePasswordSwitchChange: e => dispatch( createGameModalUIOperations.updatePasswordSwitch( { value: e.target.checked } ) ),
	handlePasswordTextFieldChange: e => dispatch( createGameModalUIOperations.updatePasswordTextField( { value: e.target.value } ) ),
	createGame: ( { freeJoin, maxPlayers, hasPassword, password } ) => e => {
		e.preventDefault();
		dispatch( createGameModalUIOperations.createGame( { freeJoin, maxPlayers, hasPassword, password } ) );
	}
} );

const CreateGameForm = ( { maxPlayersSelectValue, freeJoinSwitchValue,
	passwordSwitchValue, passwordTextFieldValue, 
	handleMaxPlayersSelectChange, handleFreeJoinSwitchChange,
	handlePasswordSwitchChange, handlePasswordTextFieldChange, createGame,
	error, handleClose
} ) => (
	<>
	<DialogTitle>Create Game</DialogTitle>

	<form onSubmit={ createGame( { 
						freeJoin: freeJoinSwitchValue, 
						maxPlayers: maxPlayersSelectValue, 
						hasPassword: passwordSwitchValue,
						password: passwordTextFieldValue
					} )  } >

		<DialogContent>

			<TextField
				select
				label='Maximum Players'
				value={ maxPlayersSelectValue }
				onChange={ handleMaxPlayersSelectChange }
				helperText='Please select the maximum number of players allowed in this game.'
				fullWidth
				required
			>

				<MenuItem key={ 2 } value={ 2 } > 2 </MenuItem>
				<MenuItem key={ 3 } value={ 3 } > 3 </MenuItem>
				<MenuItem key={ 4 } value={ 4 } > 4 </MenuItem>
				<MenuItem key={ 5 } value={ 5 } > 5 </MenuItem>
				<MenuItem key={ 6 } value={ 6 } > 6 </MenuItem>

			</TextField>

			<FormControl>

				<FormGroup>

					<FormControlLabel
						control={
							<Switch
								checked={ freeJoinSwitchValue }
								onChange={ handleFreeJoinSwitchChange }
								value={ freeJoinSwitchValue }
							/>
						}
						label='Free Join?'
					/>

				</FormGroup>

				<FormHelperText> Select whether players can join after the game has started. </FormHelperText>

				<FormGroup>

					<FormControlLabel
						control={
							<Switch
								checked={ passwordSwitchValue }
								onChange={ handlePasswordSwitchChange }
								value={ passwordSwitchValue }
							/>
						}
						label='Require Password'
					/>

				</FormGroup>

				<FormHelperText> Select whether a password is required to join this game. </FormHelperText>

			</FormControl>

			<Collapse in={ passwordSwitchValue }>
				<TextField
					label='Password'
					value={ passwordTextFieldValue }
					onChange={ handlePasswordTextFieldChange }
					helperText='Input a password.'
					fullWidth
					required={ passwordSwitchValue }
					disabled={ !passwordSwitchValue }
				/>
			</Collapse>

		</DialogContent>

		<DialogActions>
			<Button onClick={ handleClose }>
				Cancel
			</Button>
			<Button 
				type='submit' 
				color='primary'
			>
				Create Game
			</Button>
		</DialogActions>

	</form>
	</>
);

const styles = theme => ( {
	loadingRoot: {
		margin: 64
	}
} );

let CreateGameModal = ( { classes, show, loading, handleClose, ...rest
}) => (
	<Dialog open={ show } onClose={ handleClose } TransitionComponent={ SlideTransition } >

		{ loading ? 
			<CircularProgress color='primary' classes={ { root: classes.loadingRoot } } /> : 
			<CreateGameForm { ...rest } handleClose={ handleClose } /> }

	</Dialog>
);

CreateGameModal = withStyles( styles )( CreateGameModal );

export default connect(
	createGameModalUISelectors.getProps,
	mapDispatchToProps
)( CreateGameModal );
