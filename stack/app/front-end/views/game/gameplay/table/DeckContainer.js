import { connect } from 'react-redux';

import { tableSelectors } from '../../../../state/modules/data/table';

import Deck from './Deck';

const mapStateToProps = (state, ownProps) => {
	const deckCount = tableSelectors.getDeckCount( state );
	
	return { count: deckCount }
};

const DeckContainer = (props) => (
	<Deck {...props} />
);

export default connect(
	mapStateToProps
)(DeckContainer);