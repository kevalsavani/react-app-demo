import React, { Component, useEffect } from 'react';
import { Link, useLocation, matchPath } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export default (props) => {

  const location = useLocation();

  useEffect(()=>{
    // getActiveClass
  });

  const getActiveClass = (menuName) => {

    const productsRouter = {
      PRODUCT_MENU: [
        '/product/',
        '/product/create',
        '/product/:id/edit',
      ],
      USER_MENU: [
        '/productusers'
      ]
    };
      
    const currentRoutes = productsRouter[menuName];
    const matched = matchPath(location.pathname,currentRoutes);
    if (matched) {
      return 'active';
    }

  }

  return (
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
      <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
        <div className="sidebar-brand-icon rotate-n-15">
          <i className="fas fa-laugh-wink" />
        </div>
        <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
      </a>
      <hr className="sidebar-divider my-0" />
      <li className="nav-item">
        <NavLink exact className="nav-link" activeClassName="active" to="/dashboard">
          <i className="fas fa-fw fa-tachometer-alt" />
          <span>Dashboard</span>
        </NavLink>
        {/* <a className="" href="index.html"></a> */}
      </li>
      <hr className="sidebar-divider" />
      <div className="sidebar-heading">
        Interface
      </div>
      <li className="nav-item active">
        <a className="nav-link" href="/#" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
          <i className="fas fa-fw fa-cog" />
          <span>Components</span>
        </a>
        <div id="collapseTwo" className="collapse show" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
          <div className="bg-white py-2 collapse-inner rounded">
            <h6 className="collapse-header">Custom Components:</h6>
            <NavLink exact className="collapse-item" activeClassName="active" to="/">
              Buttons
            </NavLink>
            <NavLink exact className="collapse-item" activeClassName="active" to="/cards">
              Cards
            </NavLink>
            <NavLink exact className={`collapse-item ${getActiveClass("USER_MENU")}`} activeClassName="active" to="/users">
              Users
            </NavLink>
            <NavLink exact className={`collapse-item`} activeClassName="active" to="/socket">
              Socket Demo
            </NavLink>
            <NavLink exact className={`collapse-item ${getActiveClass("PRODUCT_MENU")}`}  activeClassName="active" to="/products">
              Products
            </NavLink>
          </div>
        </div>
      </li>
    </ul>
  )
}


