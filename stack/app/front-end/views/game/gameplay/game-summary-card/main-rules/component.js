import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import Rule from './rule';

const styles = theme => ( {
	root: {
		display: 'flex',
		width: '100%'
	}
} );

let Component = ( { classes, draw = 1, play = 1, handLimit, keeperLimit, 
	showDrawInfo = () => {}, showPlayInfo = () => {}, showLimitsInfo = () => {} } ) => (
	<div className={ classes.root } >
		<Rule count={ draw } label='Draw' showInfo={ showDrawInfo } />
		<Rule count={ play } label='Play' showInfo={ showPlayInfo } />
		<Rule count={ handLimit } label='Hand Limit' showInfo={ showLimitsInfo } />
		<Rule count={ keeperLimit } label='Keeper Limit' showInfo={ showLimitsInfo } />
	</div>
);

export default withStyles( styles )( Component );