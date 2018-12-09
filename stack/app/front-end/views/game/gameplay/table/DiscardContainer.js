import { connect } from 'react-redux';

import { tableSelectors } from '../../../../state/modules/data/table';
import { cardsSelectors } from '../../../../state/modules/data/cards';

import Discard from './Discard';

const mapStateToProps = (state, ownProps) => {
	const ids = tableSelectors.getDiscardIds( state );

	const cards = ids.map( id => cardsSelectors.getCardById( state, id ) );
	
	return { ids, cards };
};

const DiscardContainer = (props) => (
	<Discard {...props} />
);

export default connect(
	mapStateToProps
)(DiscardContainer);