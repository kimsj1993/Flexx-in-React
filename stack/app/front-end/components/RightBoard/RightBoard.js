import { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SwipeableViews from 'react-swipeable-views';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import Button from '@material-ui/core/Button';
import Summary from './Summary/Summary.js'


function TabContainer(props) {
  const { children, dir } = props;

  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};



const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '32rem',
    position: 'relative',
    minHeight: '20rem',
  }
});


class RightBoard extends Component {
	state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

    handleChangeIndex = index => {
    this.setState({ value: index });
  };


    render() {
    const { classes, theme } = this.props;
    const transitionDuration = {
      enter: theme.transitions.duration.enteringScreen,
      exit: theme.transitions.duration.leavingScreen,
    };


    return (
    	<div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
          >
            <Tab label="Summary" />
            <Tab label="Rule" />
            <Tab label="Chat" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}><Summary></Summary></TabContainer>
          <TabContainer dir={theme.direction}>Rule</TabContainer>
          <TabContainer dir={theme.direction}>Chat</TabContainer>
        </SwipeableViews>
      </div>
		);
	}
}
export default withStyles(styles, { withTheme: true })(RightBoard);