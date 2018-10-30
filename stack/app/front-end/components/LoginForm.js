import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const LoginForm = ({ value, handleChange, handleLogin }) => (
	<form onSubmit={ handleLogin } >
		<TextField 
			variant='outlined'
			placeholder='Choose a name' 
			value={ value } 
			onChange={ handleChange }
		/>
		<Button type='submit'>Start</Button>
	</form>
);

export default LoginForm;