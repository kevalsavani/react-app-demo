import React, {Component, useState, useEffect} from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { requestProductCreate, resetProductState, requestCategoryData } from '../../actions';
import { bindActionCreators } from 'redux';
import { Link, useHistory } from 'react-router-dom';
import { Form, Input, Checkbox, Button, message } from 'antd';
import ProductForm from './ProductForm';


// class ProductCreate extends Component{
const ProductCreate = (props) => {

  let { isLoading, errors, errorMessage, successMessage } = useSelector(({product}) => product);
  let categories = useSelector(({category}) => category);

  const dispatch = useDispatch();
  const history = useHistory();
  let [formValues, setFormValues] = useState({});
  let [checkboxState, setCheckboxState] = useState({
    warranty: false,
    is_new: false,
    active: false,
  });

  useEffect(()=>{
    dispatch(requestCategoryData());
  },[dispatch]);

  useEffect(() => {
  
    if (errors.length > 0) {
      errors.map(errField => {
        const {fieldName, message} = errField;        
        props.form.setFields({
          [fieldName]: {
            value: formValues[fieldName],
            errors: [new Error(message)],
          },
        });  
      });
    }

    if (errorMessage !=='') {
      message.error(errorMessage);
    }

    if (successMessage !=='') {
      message.success(successMessage);
      history.push("/products");
      dispatch(resetProductState());
    }

  },[errors, formValues, errorMessage, successMessage]);

  const { getFieldDecorator } = props.form;

  const onChange = e => {
    setCheckboxState( (oldProps) => ({ ...oldProps, [e.target.name] : e.target.checked }));
  };

  const handelSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        setFormValues(values);
        dispatch(requestProductCreate(values));
      }
    });
  };
      
  return (
    <div className="container-fluid">
      <h1 className="h3 mb-2 text-gray-800">Create a Product</h1>
      <p className="mb-4"></p>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <span className="m-0 font-weight-bold text-primary">Product Details</span>
          <Link to="/products" className="float-right">Back</Link>
        </div>
        <div className="card-body">
          { isLoading && <div>Loading...</div>}

          <ProductForm
            handelSubmit={handelSubmit}
            getFieldDecorator={getFieldDecorator}
            checkboxState={checkboxState}
            categoryList={categories.list}
            onChange={onChange}
          />

        </div>
      </div>
    </div>
  )


}

export default Form.create()(ProductCreate);