import React, {Component, useEffect, useState} from 'react';
import socketIOClient from "socket.io-client";
import _ from 'lodash';

const socketServerEndPoint = "http://localhost:3888";
let socket;

const SocketPage = (props) => {

  // const [socket, setSocket] = useState(null);
  let [products, setProducts] = useState({
    product1: {
      title: 'Product 1',
      name: 'Apple Mac Book 16"inc 2020',
      description: 'Macbook 2020 Edition, 1TB SSD',
      price: '$2999.00',
      category: 'Laptop',
      lastUpdated: 'N/A'
    },
    product2: {
      title: 'Product 2',
      name: 'Magic Mouse',
      description: '2019 edition',
      price: '$99.00',
      category: 'Accessories',
      lastUpdated: 'N/A' 
    },
    product3: {
      title: 'Product 3',
      name: 'iPhone X Pro',
      description: 'New iPhone X Pro 128 GB',
      price: '$699.00',
      category: 'Mobile',
      lastUpdated: 'N/A'
    }
  });

  useEffect(() => {
    socket = socketIOClient.connect(socketServerEndPoint);
    socket.on('connect', function() {
      console.log('Connected...');
      socket.emit('room', 'demoUser');
    });
    socket.on('product_details', function(data){
      if (data) {
        if (products[data.product]) {
          const productName = data.product;

          // get old data from state and update the state
          let product = products[data.product];
          product.lastUpdated = data.lastUpdated
          setProducts(oldProps => ({
            ...oldProps, [productName]:product
          }));
        }
      }
    });
    return () => {
      if (socket) {
        console.log('Disconnected...');
        socket.close();
      }
    }
  },[]);

  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-gray-800">Socket Realtime Data Update</h1>
      </div>
      <div className="row">
        {
          _.map(products,function (data, i) {
            return (
              <div key={i} className="col-lg-6">
                <div className="card mb-4">
                  <div className="card-header">
                    <span className="m-0 font-weight-bold text-primary">{data.title}</span>
                  </div>
                  <div className="card-body">
                    <dl className="row">
                      <dt className="col-sm-3 font-weight-bold">Name</dt>
                      <dd className="col-sm-9">{data.name}</dd>
                      <dt className="col-sm-3 font-weight-bold">Description</dt>
                      <dd className="col-sm-9">{data.description}</dd>
                      <dt className="col-sm-3 font-weight-bold">Category</dt>
                      <dd className="col-sm-9">{data.category}</dd>
                      <dt className="col-sm-3 font-weight-bold">Last Updated</dt>
                      <dd className="col-sm-9">{data.lastUpdated}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )

}

export default SocketPage;