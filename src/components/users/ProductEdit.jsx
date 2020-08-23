import React, {Component, useState, useEffect} from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { requestProductGet, requestProductUpdate, resetProductState, requestCategoryData } from '../../actions';
import { Link, useHistory } from 'react-router-dom';
import { Form, message } from 'antd';
import ProductForm from './ProductForm';

const ProductEdit = (props) => {

  let { isLoading, current,  errors, errorMessage, successMessage } = useSelector(({product}) => product);
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
    const id = props.match.params.id
    dispatch(requestProductGet(id))
    dispatch(requestCategoryData());
  },[dispatch]);

  useEffect(() => {
    
    if (current) {
      props.form.setFields({
        sku: {
          value: current.sku,
        },
        product_title: {
          value: current.product_title,
        },
        description: {
          value: current.description,
        },
        price: {
          value: current.price,
        },
        category_id: {
          value: current.category_id,
        },
      });
      setCheckboxState((prevProps) => ({
        ...prevProps,
        warranty: current.warranty,
        is_new: current.is_new,
        active: current.active,
      }))
    }

    if (errorMessage !=='') {
      message.error(errorMessage);
    }

    if (successMessage !=='') {
      message.success(successMessage);
      history.push("/products");
      dispatch(resetProductState());

    }
  
  },[current, errorMessage, successMessage]);
  
  useEffect(()=>{
    if (errors.length > 0) {
      console.log(formValues);
      errors.map(errField => {
        const {fieldName, message} = errField;  
        console.log(formValues[fieldName]);      
        props.form.setFields({
          [fieldName]: {
            value: formValues[fieldName],
            errors: [new Error(message)],
          },
        });  
      });
    }
  },[errors])

  const { getFieldDecorator } = props.form;

  const onChange = e => {
    setCheckboxState( (prevProps) => ({ ...prevProps, [e.target.name] : e.target.checked }));
  };

  const handelSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        const id = props.match.params.id
        setFormValues(values);
        dispatch(requestProductUpdate(id, values));
      }
    });
  };
      
  return (
    <div className="container-fluid">
      <h1 className="h3 mb-2 text-gray-800">Edit Product</h1>
      <p className="mb-4"></p>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <span className="m-0 font-weight-bold text-primary">Product Details</span>
          <Link to="/products" className="float-right">Back</Link>
        </div>
        <div className="card-body">
          { isLoading && <div>Loading data...</div>}
          
          <ProductForm
            handelSubmit={handelSubmit}
            getFieldDecorator={getFieldDecorator}
            checkboxState={checkboxState}
            onChange={onChange}
            categoryList={categories.list}
            from='edit'
          />
          
        </div>
      </div>
    </div>
  )


}

export default Form.create()(ProductEdit);