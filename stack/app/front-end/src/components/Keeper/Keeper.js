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
const styles = {
  card: {
    maxWidth: '3rem',
  },
  header: {
    height: '1rem',
    backgroundColor:'greenyellow'
  }
};

class Keeper extends Component {
    render() {
      const {classes} = this.props;

    return (
              <div>
			    <Card className={classes.card}>
			      <CardActionArea>
			        <div className={classes.header}></div>
			        <CardContent>
			          <Typography component="subtitle2">
			          {classes.title}
			          </Typography>
			        </CardContent>
			      </CardActionArea>
			    </Card>
			   </div>
		);
	}


}
export default withStyles(styles)(Keeper);