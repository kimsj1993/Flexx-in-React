import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';


import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from "@material-ui/core/Typography/Typography";

const styles = theme => ( {
	root: {
		width: 300,
		margin: 'auto',
		marginTop: 64
	},
	buttonRoot: {
		marginTop: 16,
		width: '100%'
	}
} );

const LoginForm = ( { classes, loading, error, value, handleChange, handleLogin } ) => (
	loading ? 
		<CircularProgress /> :
		<form className={ classes.root } onSubmit={ handleLogin } >
            <Typography variant='h1' align='center'>
                Fluxx
            </Typography>

			<TextField 
				variant='outlined'
				label='Username'
				value={ value } 
				onChange={ handleChange }
				error={ Boolean( error ) }
				helperText={ error ? error : 'Please enter a username.' }
				required
				fullWidth
			/>
			<Button classes={ { root: classes.buttonRoot } } variant='contained' color='primary' type='submit'>Start</Button>

		</form>




);

export default withStyles( styles )( LoginForm );
