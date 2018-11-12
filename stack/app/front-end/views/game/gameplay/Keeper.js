import { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
  	backgroundColor: theme.palette.grey[100],
  	height: 128,
  	width: 128,
  	borderRadius: 8,
  	boxShadow: theme.shadows[2]
  },
  header: {
  	width: '100%',
  	height: 36,
  	borderRadius: '8px 8px 0 0',
  	backgroundColor: theme.palette.cards.keeper
  },
  type: {
    fontFamily: "'Roboto Condensed', sans-serif",
    color: theme.palette.common.white,
    fontWeight: 'bold',
    fontSize: 14,
    textTransform: 'uppercase',
    paddingLeft: 8,
    height: 32,
    lineHeight: '32px',
    whiteSpace: 'nowrap'
  }
});

const Keeper = ({ classes, name, imageUrl }) => (
	<Paper classes={{ root: classes.root }}>
		<div className={ classes.header } >
			<Typography classes={{ root: classes.type }}>{ name }</Typography>
		</div>
	</Paper>
);

export default withStyles(styles)(Keeper);