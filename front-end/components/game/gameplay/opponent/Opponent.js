import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import Paper from '@material-ui/core/Paper';

import UserInfo from '../UserInfo';
import OpponentHand from './OpponentHand';
import PlayerKeepers from '../PlayerKeepers';

const styles = theme => ({
  root: {
    width: 288,
    height: '100%',
    paddingLeft: 16,
    paddingRight: 16
  },
  opponentHighlight: {
    backgroundColor: theme.palette.primary.light
  },
  userInfoRoot: {
    marginTop: 16,
    width: '100%',
    padding: 8,
    marginBottom: 8
  },
  userInfoHighlight: {
    width: 8,
    height: '100%',
    marginRight: 8,
    borderRadius: '4 0 0 4',
    backgroundColor: theme.palette.secondary.main
  }
});

const Opponent = ({ classes, imageUrl, name, playsRemaining, isTurn, cardCount, keeperIds }) => (
  <div className={ (isTurn) ? classes.opponentHighlight : '' } >
    <div className={ classes.root } >
        <Paper classes={{ root: classes.userInfoRoot }} >
          { (isTurn) ? (<div className={ classes.userInfoHighlight } />) : '' }
          <UserInfo 
            imageUrl={ imageUrl } 
            name={ name } 
            playsRemaining={ playsRemaining }
            isTurn={ isTurn }
          />
        </Paper>
        <OpponentHand count={ cardCount } />
        <PlayerKeepers keeperIds={ keeperIds } />
      </div>
  </div>
);



export default withStyles(styles)(Opponent);