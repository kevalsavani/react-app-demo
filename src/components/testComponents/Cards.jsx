import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { requestApiData } from '../../actions';


function Cards(props){


  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Cards Components</h1>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <div className="card mb-4">
            <div className="card-header">
              Default Card Example
            </div>
            <div className="card-body">
              This card uses Bootstrap's default styling with no utility classes added. Global styles are the only things modifying the look and feel of this default card example.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cards;