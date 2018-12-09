import { connect } from 'react-redux';

import Component from './component';

const mapStateToProps = (state, ownProps) => {
	
};

const Container = (props) => (
	<Component {...props} />
);

export default connect(
	mapStateToProps
)( Container );