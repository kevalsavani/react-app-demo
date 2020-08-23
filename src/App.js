import React from 'react';
import './App.css';
import SideBar from './components/layouts/SideBar';
import PageTop from './components/layouts/PageTop';
import ContentWrapper from './components/layouts/ContentWrapper';
import { Router } from 'react-router-dom';
import { history } from './helpers';
import store from './helpers/store';
import { Provider } from 'react-redux';

const envVar = process.env.REACT_APP_TEST_VAR;
console.log(envVar);

class App extends React.Component {
  
  render(){
    return(
      <Provider store={store}>
        <Router history={history}>
          <SideBar />
          <ContentWrapper />
          <PageTop />
        </Router>
      </Provider>
    );
  }

}

export default App;
