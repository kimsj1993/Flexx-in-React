import * as types from "./types";

const addCard = ( { id, name, type, subtype } ) => ( {
	type: types.ADD_CARD,
	payload: {
		id,
		name,
		type,
		subtype
	}
} );

const addCards = ( cards ) => ( {
	type: types.ADD_CARDS,
	payload: cards
} );

const addKeeperCard = ( { id, name, subtype } ) => 
	addCard( id, name, 'keeper', subtype );

const addGoalCard = ( { id, name, subtype } ) => 
	addCard( id, name, 'goal', subtype );

const addRuleCard = ( { id, name, subtype } ) => 
	addCard( id, name, 'rule', subtype );

const addActionCard = ( { id, name, subtype } ) => 
	addCard( id, name, 'action', subtype );

export {
	addCard,
	addKeeperCard,
	addGoalCard,
	addRuleCard,
	addActionCard
};