import React from 'react';
import { Form, Input, Checkbox, Button, InputNumber, Select } from 'antd';

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 8 },
};

const { Option } = Select;


const ProductForm = (props) => {

  return (

    <Form {...layout} name="product-form" onSubmit={props.handelSubmit}>
      <Form.Item label="SKU" >
        {
          props.getFieldDecorator('sku', { 
            rules: [{required: true, message: 'SKU is required'}],
          })( <Input placeholder="SKU"/> )
        }
      </Form.Item>
      <Form.Item label="Product title" >
        {
          props.getFieldDecorator('product_title', { 
            rules: [{required: true, message: 'Product title is required'}],
          })( <Input placeholder="Product title"/> )
        }
      </Form.Item>
      <Form.Item  label="Description">
        {
          props.getFieldDecorator('description', { 
            rules: [{required: true, message: 'Description is required'}],
          })( <Input placeholder="Description"/> )
        }
      </Form.Item>
      <Form.Item  label="Category">
        {
          props.getFieldDecorator('category_id', { 
            rules: [{required: true, message: 'Category is required'}],
            
          })(
            <Select placeholder="Select category">
              {
                props.categoryList.map(data =>  <Option value={data.id}>{data.name}</Option>)
              }
            </Select>
          )
        }
      </Form.Item>
      <Form.Item  label="Price">
        {
          props.getFieldDecorator('price')( <InputNumber min={0} max={5000} /> )
        }
      </Form.Item>
      <Form.Item  label="Warranty">
        {
          props.getFieldDecorator('warranty')( <Checkbox name="warranty" checked={props.checkboxState.warranty} onChange={props.onChange}  /> )
        }
      </Form.Item>
      <Form.Item  label="Is New">
        {
          props.getFieldDecorator('is_new')( <Checkbox name="is_new" checked={props.checkboxState.is_new} onChange={props.onChange} /> )
        }
      </Form.Item>
      <Form.Item  label="Active">
        {
          props.getFieldDecorator('active')( <Checkbox name="active" checked={props.checkboxState.active} onChange={props.onChange} /> )
        }
      </Form.Item>
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 3 }}>
        <Button type="primary" htmlType="submit">
          { !props.from ? 'Create' : 'Update' }
        </Button>
      </Form.Item>
    </Form>
        
  )


}

export default ProductForm;