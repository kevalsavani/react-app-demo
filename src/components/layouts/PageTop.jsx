import React, { Component } from 'react';


class PageTop extends Component{
  render(){
    return (
      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up" />
      </a>
    )
  }
}

export default PageTop;