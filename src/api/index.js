

import axios from 'axios';



export const fetchData = async () => {
  try {
    const response = await fetch('https://randomuser.me/api');
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}

export const getProductListAPI = (payload = {}) => {

  try {
    return axios.get('http://localhost:3888/v1/products',{
      params: payload
    }).then(data => data.data).catch(err => err);
  } catch (error) {
    return {};
  }

}

export const createProductListAPI = (formData) => {

  try {
    return axios.post('http://localhost:3888/v1/products',formData,{
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json'
        //'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(data => data.data).catch(err => err);
  } catch (error) {
    return {};
  }

}

export const getSingleProductAPI = (id) => {

  try {
    return axios.get('http://localhost:3888/v1/products/'+id,{
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(data => data.data).catch(err => err);
  } catch (error) {
    return {};
  }

}

export const updateProductAPI = (id,formData) => {

  try {
    return axios.patch('http://localhost:3888/v1/products/'+id,formData,{
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(data => data.data).catch(err => err);
  } catch (error) {
    return {};
  }

}

export const deleteProductAPI = (id) => {

  try {
    return axios.delete('http://localhost:3888/v1/products/'+id,{
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(data => data.data).catch(err => err);
  } catch (error) {
    return {};
  }

}

export const getCategoryListAPI = (id) => {

  try {
    return axios.get('http://localhost:3888/v1/categories/',{
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(data => data.data).catch(err => err);
  } catch (error) {
    return {};
  }

}