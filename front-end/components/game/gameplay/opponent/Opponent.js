import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import Paper from '@material-ui/core/Paper';

import UserInfo from '../UserInfo';
import OpponentHand from './OpponentHand';
import PlayerKeepers from '../PlayerKeepers';

const styles = theme => ({
  root: {
    width: 272,
    height: '100%',
    paddingLeft: 16,
    paddingRight: 16
  },
  opponentHighlight: {
    backgroundColor: theme.pallete.primary.light
  },
  userInfoRoot: {
    width: '100%',
    padding: 8,
    marginBottom: 8
  },
  userInfoHighlight: {
    width: 8,
    height: '100%',
    marginRight: 8,
    borderRadius: '4 0 0 4',
    backgroundColor: theme.pallete.secondary.main
  }
});

const Opponent = ({ classes, playerId, imageUrl, name, playsRemaining, isTurn, cardCount, keeperIds }) => (
  <div className={ (isTurn) ? classes.opponentHighlight : '' } >
    <Paper classes={{ root: classes.userInfoRoot }} >
      { (isTurn) ? (<div className={ classes.userInfoHighlight } />) : '' }
      <UserInfo 
        imageUrl={ imageUrl } 
        name={ name } 
        playsRemaining={ playsRemaining }
        isTurn={ isTurn }
      />
      <OpponentHand count={ cardCount } />
      <PlayerKeepers keeperIds={ keeperIds } />
    </Paper>
  </div>
);


}
export default withStyles(styles)(Opponent);