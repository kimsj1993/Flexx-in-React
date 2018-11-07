import enum


class CARD_LOCATION(enum.Enum):
    # The discard pile, self-explanatory
    DISCARD   = "DISCARD"
    # The draw pile, ditto
    DRAW_PILE = "DRAW_PILE"
    # Cards in the player's hand
    HAND      = "HAND"
    # In front of the player, for keepers
    KEEPERS   = "KEEPERS"
    # Rules section of the table
    RULES     = "RULES"
    # Goals (usually 1, sometimes 2)
    GOALS     = "GOALS"
    # Temporary hand, for certain action cards
    TEMP_HAND = "TEMP_HAND"


class CARD_TYPE(enum.Enum):
    BASE     = "BASE"
    ACTION   = "ACTION"
    GOAL     = "GOAL"
    KEEPER   = "KEEPER"
    NEW_RULE = "NEW_RULE"
    CREEPER  = "CREEPER"


# where the cards *usually* go when played
CARD_TYPE_LOC_MAP = {
    CARD_TYPE.ACTION   : CARD_LOCATION.DISCARD,
    CARD_TYPE.GOAL     : CARD_LOCATION.GOALS,
    CARD_TYPE.KEEPER   : CARD_LOCATION.KEEPERS,
    CARD_TYPE.NEW_RULE : CARD_LOCATION.RULES
}
