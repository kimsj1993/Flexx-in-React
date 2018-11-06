import { connect } from 'react-redux';

import Deck from './Deck';

const mapStateToProps = (state, ownProps) => {
	const { deckCount } = state.data.game;
	
	return { count: deckCount }
};

const DeckContainer = (props) => (
	<Deck {...props} />
);

export default connect(
	mapStateToProps
)(DeckContainer);