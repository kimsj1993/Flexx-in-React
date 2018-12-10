import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import ActionModeSelect from './select';

const Transition = props => <Slide direction='down' { ...props } />;

const styles = theme => ( {
	
} );

const Component = ( { classes, show, card, handleClose, confirmSelection, selects, canSubmit } ) => {

	return (
		<Dialog open={ show } onClose={ handleClose } TransitionComponent={ Transition } disableBackdropClick disableEscapeKeyDown >

			<DialogTitle> { card && card.name } </DialogTitle>

			<DialogContent>

				<DialogContentText> { card && card.description } </DialogContentText>

				{ selects.map( ( select, index ) => <ActionModeSelect index={ index } /> ) }

			</DialogContent>

			<DialogActions>
				
				{

					canSubmit

					?

					<Button color='primary' onClick={ confirmSelection( { 
						cardId: card && card.id, 
						pick: selects.reduce( ( arr, select ) => [ ...arr, ...select.selected ], [] ) 
					} ) } >
						Confirm
					</Button>

					:

					<Tooltip title='You must make a correct selection to continue.' placement='top' >
						<span>
							<Button color='primary' disabled >
								Confirm
							</Button>
						</span>
					</Tooltip>

				}

			</DialogActions>

		</Dialog>
	)

};

export default withStyles( styles )( Component );

