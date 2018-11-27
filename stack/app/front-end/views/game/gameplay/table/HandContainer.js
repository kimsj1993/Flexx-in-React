import { connect } from 'react-redux';

import { handSelectors, handOperations } from '../../../../state/modules/data/hand';
import { userSelectors } from '../../../../state/modules/user';
import { cardsSelectors } from '../../../../state/modules/data/cards';

import Hand from './Hand';

const mapStateToProps = (state, ownProps) => {
	const userId = userSelectors.getUserId( state );

	const handIds = handSelectors.getHandIds( state );

	const cards = handIds.map( id => cardsSelectors.getCardById( state, id ) );
	
	return { cards };
};

const mapDispatchToProps = dispatch => ( {
	playCard: id => () => dispatch( handOperations.playCard( { cardId: id } ) )
} );

const HandContainer = (props) => (
	<Hand {...props} />
);

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(HandContainer);