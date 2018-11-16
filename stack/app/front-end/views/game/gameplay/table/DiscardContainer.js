import { connect } from 'react-redux';

import { tableSelectors } from '../../../../state/modules/data/table';
import { cardsSelectors } from '../../../../state/modules/data/cards';

import Discard from './Discard';

const mapStateToProps = (state, ownProps) => {
	const discardIds = tableSelectors.getDiscardIds( state );

	const cards = discardIds.map( id => cardsSelectors.getCardById( state, id ) );
	
	return { cards };
};

const DiscardContainer = (props) => (
	<Discard {...props} />
);

export default connect(
	mapStateToProps
)(DiscardContainer);