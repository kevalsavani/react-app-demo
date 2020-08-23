import React, { Component } from 'react';
import NavBar from './NavBar';
import Home from '../testComponents/Home';
import Footer from './Footer';
import AppRouters from '../AppRouters';

class ContentWrapper extends Component{
  render(){
    return (
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <NavBar />
          <AppRouters />
        </div>
        <Footer />
      </div>
    )
  }
}

export default ContentWrapper;

