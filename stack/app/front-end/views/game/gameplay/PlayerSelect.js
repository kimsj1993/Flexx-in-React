

const PlayerSelect = ( { player, selected, handleClick } ) => (
	<Paper elevation={ selected ? 2 : 8 } onClick={ handleClick } >
		<AccountCircle />
		<Typography>{ player.name }</Typography>
	</Paper>
);

export default PlayerSelect;