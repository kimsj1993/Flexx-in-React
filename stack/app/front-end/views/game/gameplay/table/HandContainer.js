import { connect } from 'react-redux';

import { handSelectors } from '../../../../state/modules/data/hand';
import { userSelectors } from '../../../../state/modules/data/user';
import { cardsSelectors } from '../../../../state/modules/data/cards';

import Hand from './Hand';

const mapStateToProps = (state, ownProps) => {
	const userId = userSelectors.getUserId( state );

	const handIds = handSelectors.getHandIds( state );

	const cards = handIds.map( id => cardsSelectors.getCardById( state, id ) );
	
	return { cards };
};

const HandContainer = (props) => (
	<Hand {...props} />
);

export default connect(
	mapStateToProps
)(HandContainer);