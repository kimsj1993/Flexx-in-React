import { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';




const styles = theme => ({
  root: {
    width: '15rem',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    maxWidth: '10rem',
  },
  goal: {
  	textAlign: 'center'
  }
});

let id = 0;
function createData(draw, play, handLimit, keepLimit) {
  id += 1;
  return { id, draw, play, handLimit, keepLimit};
}



class Summary extends Component {
    render() {
      const {classes} = this.props;
      const rows = [ createData(2, 2, 0, '-') ];

    return (
    	<div>
	    <Paper className={classes}>
	      <Table className={classes.table}>
	        <TableHead>
	          <TableRow>
	            <TableCell numeric>Draw</TableCell>
	            <TableCell numeric>Play</TableCell>
	            <TableCell numeric>HandLimit</TableCell>
	            <TableCell >KeepLimit</TableCell>
	          </TableRow>
	        </TableHead>
	        <TableBody>
	          {rows.map(row => {
	            return (
	              <TableRow key={row.id}>
	                <TableCell numeric>{row.draw}</TableCell>
	                <TableCell numeric>{row.play}</TableCell>
	                <TableCell numeric>{row.handLimit}</TableCell>
	                <TableCell numeric>{row.keepLimit}</TableCell>
	              </TableRow>
	            );
	          })}
	        </TableBody>
	      </Table>
	    </Paper>

	    <div className= 'box'>
	    <Typography component="h6" className='goal'>
           Goal
         </Typography>	
          <Avatar className={classes.avatar}>H</Avatar>
          <Typography component="h6" variant="h6" styles = {styles.goal}>
           Goal components
         </Typography>
	    </div >

	   	</div>



		);
	}


}
export default withStyles(styles)(Summary);