import { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
  card: {
    display: 'flex',
    maxWidth: '8rem',
    height: '10rem'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: '1rem',
    backgroundColor:'greenyellow'

  },
  avatar: {
    margin: '1rem',
  },
    row: {
    display: 'flex',
    justifyContent: 'center',
  },

});


class UserCard extends Component {
    render() {
      const {classes} = this.props;

    return (
    	<Card className={classes.card}>
        <CardActionArea>
      		<div className={classes.details} className={classes.cover}>
        	  <CardContent className={classes.content}>
         	    <Typography component="h6" variant="h6">
           		CardType
         		</Typography>
     		 	<Avatar className={classes.avatar}>H</Avatar>
          	    <Typography variant="subtitle3" color="textSecondary">
                Discription
                </Typography>
              </CardContent>
      		</div>
      		<div/>
        </CardActionArea>
    	</Card>
  
    );
	}
}


export default withStyles(styles)(UserCard);