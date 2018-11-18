// Source: https://stackoverflow.com/questions/39977214/merge-in-es6-es7object-assign-without-overriding-undefined-values

const assign = ( target, ...sources ) => 
	Object.assign( target, ...sources.map( x => 
		Object.entries( x )
			.filter( ( [ key, value ] ) => value != undefined )
			.reduce( ( obj, [ key, value ] ) => ( obj[ key ] = value, obj ), {} )
	) );

export default assign;