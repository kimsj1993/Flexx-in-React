import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import {withStyles} from "@material-ui/core";

const styles = theme => ({
	root: {

        marginTop: 48,
        maxWidth: 600,
		backgroundColor:'#9c27b0'

    },
	container: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gridGap: '10px',
        padding: '10px',
	},

	item1 : {
		gridColumnStart: '1',
		gridColumnEnd: '4',
        backgroundColor: "rgba(255,255,255, 0.8)",
        textAlign: 'center',
        padding: '20px 0',
        fontSize: '30px'
	},

	item2 : {
		gridColumnStart: '1',
		gridColumnEnd: '2',
        backgroundColor: "rgba(255,255,255, 0.8)",
        textAlign: 'center',
        padding: '20px 0',
        fontSize: '30px'
	},
    item3 : {
        gridColumnStart: '2',
        gridColumnEnd: '4',
        backgroundColor: "rgba(255,255,255, 0.8)",
        textAlign: 'center',
        padding: '20px 0',
        fontSize: '30px'
    }


});

const LoginForm = ({classes, value, handleChange, handleLogin }) => (
	<div className={classes.root}>
		<div className={classes.container}>
			<div className={classes.item1}>
				Welcome to Fluxx
			</div>
			<div className={classes.item2}>
				Username
			</div>
			<div className={classes.item3}>
				<form onSubmit={ handleLogin } >
					<TextField
						variant='outlined'
						placeholder='Username'
						floatingLabelText = "Username"
						value={ value }
						onChange={ handleChange }
					/>
					<Button color='primary' type='submit'>Start</Button>
				</form>
			</div>
		</div>
	</div>
);

export default withStyles(styles)(LoginForm);