import { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Keeper from '../Keeper/Keeper.js'
import Avatar from '@material-ui/core/Avatar';



const styles = {
  card: {
    width: "15rem",
    height: "15rem",
    backgroundColor:'#af52bf'

  },
  header: {
    height: '3rem',
    weight: "50%",
    padding: "1rem"
  },
  name: {
  	    textAlign: "left"
  },





};


class Opponent extends Component {
    render() {
      const {classes} = this.props;

    return (
           <Card className={classes.card}>
           <div className = {classes.header}>
            <Typography className = {classes.name} component = "h3">Name</Typography>

 			<Avatar className={classes.avatar}>H</Avatar>

           </div>

        <CardContent>

        </CardContent>
      <CardActions>
      <Keeper></Keeper>
      <Keeper></Keeper>

      <Keeper></Keeper>



      </CardActions>
    </Card>
		);
	}


}
export default withStyles(styles)(Opponent);