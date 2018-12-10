import React from 'react';
import App, { Container } from 'next/app';

import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";

import { ConnectedRouter } from 'connected-next-router';

import configureStore from '../state/store.js';

import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import getPageContext from '../utils/getPageContext';

import { SnackbarProvider } from 'notistack';

import { routerOperations } from '../state/modules/router';
import { socketOperations } from '../state/modules/socket';

class MyApp extends App {
  constructor(props) {
    super(props);
    this.pageContext = getPageContext();
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }

    const { store } = this.props;

    store.dispatch( routerOperations.checkRoute() );

  }

  componentWillUnmount() {

    const { store } = this.props;

    store.dispatch( socketOperations.socketDisconnect() );
    
  }

  

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <Container>

        <Provider store={ store }>
          <SnackbarProvider
            variant='info'
            anchorOrigin={ {
              vertical: 'top',
              horizontal: 'right'
            } }
          >
            <ConnectedRouter>

              {/* Wrap every page in Jss and Theme providers */}
              <JssProvider
                registry={this.pageContext.sheetsRegistry}
                generateClassName={this.pageContext.generateClassName}
              >
                
                {/* MuiThemeProvider makes the theme available down the React
                    tree thanks to React context. */}
                <MuiThemeProvider
                  theme={this.pageContext.theme}
                  sheetsManager={this.pageContext.sheetsManager}
                >

                  {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                  <CssBaseline />
                  {/* Pass pageContext to the _document though the renderPage enhancer
                      to render collected styles on server side. */}

                  <Component pageContext={this.pageContext} {...pageProps} />
                  
                </MuiThemeProvider>
                
              </JssProvider>

            </ConnectedRouter>
          </SnackbarProvider>

        </Provider>

      </Container>
    );
  }
}

export default withRedux( configureStore )( MyApp );