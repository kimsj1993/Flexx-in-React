import Button from '@material-ui/core/Button';

const LogoutButton = ({ handleLogout }) => (
	<Button onClick={ handleLogout }>Log Out</Button>
);

export default LogoutButton;