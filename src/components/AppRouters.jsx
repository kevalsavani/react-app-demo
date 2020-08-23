import React, { Component } from 'react';

import { Switch, Route} from "react-router-dom";
import Home from './testComponents/Home';
import Cards from './testComponents/Cards';
import Dashboard from './testComponents/Dashboard';
import UsersList from './users/UsersList';
import ProductList from './users/ProductList';
import ProductCreate from './users/ProductCreate';
import ProductEdit from './users/ProductEdit';
import SocketPage from './socket';

const routes = [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/dashboard",
    exact: true,
    component: Dashboard
  },
  {
    path: "/cards",
    exact: true,
    component: Cards
  },
  {
    path: "/socket",
    exact: true,
    component: SocketPage
  },
  {
    path: "/users",
    exact: true,
    component: UsersList
  },
  {
    path: "/products",
    exact: true,
    component: ProductList
  },
  {
    path: "/product/create",
    exact: true,
    component: ProductCreate
  },
  {
    path: "/product/:id/edit",
    exact: true,
    component: ProductEdit
  }

];

export default () => {
  return (
    <Switch>
      {
        routes.map((route, i) => (
          <Route key={i} {...route} />
        ))
      }
    </Switch>
  )
}