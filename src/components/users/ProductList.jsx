import React, {Component, useEffect, useState} from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { requestProductData, requestProductDelete, requestProductDeleteReset } from '../../actions';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Modal, message, Table, Input, Button, Row, Col } from 'antd';
import DeleteModal from '../common/DeleteModal';
import { render } from '@testing-library/react';
const { confirm } = Modal;


const ProductList = (props) => {

  const columns = [
    {
      title: 'SKU',
      dataIndex: 'sku',
      sorter: true,
      onHeaderCell: (column) => {
        return {
          onClick: () => {
            console.log(column);
            // console.log('onClick');
          }
        };
      }

    },
    {
      title: 'Product title',
      dataIndex: 'product_title',
      sorter: true,
      sortDirections: ['ascend', 'descend']
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Category',
      dataIndex: 'Category.category_name',
      sorter: true,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: true,
    },
    {
      title: 'Active',
      dataIndex: 'active',
      sorter: true,
    },
    {
      title: 'Created',
      dataIndex: 'created_at',
      sorter: true,
      defaultSortOrder: "descend"
    },
    {
      title: 'Actions',
      render:(text, record) => (
        <>
        <Link to={`/product/${record.id}/edit`}>Edit</Link>
        &nbsp;|&nbsp;
        <span onClick={() => handelShowDeleteModal(record.id)} style={{ color:'red',cursor:'pointer' }}>Delete</span>
        </>
      ),
    },
  ];

  let { isLoading, list, isDeleting, errorMessage, successMessage } = useSelector(({product}) => product);
  let [visible, setVisible] = useState(false);
  let [deleteId, setDeleteId] = useState(0);
  let [pagination, setPagination] = useState({pageSize:3});
  let [pageOptions, setPageOptions] = useState({
    page: 1,
    sort: 'created_at',
    order: 'desc',
    q: ''
  });
  let [searchKeyword, setSearchKeyword] = useState("");

  const dispatch = useDispatch();

  // API calls
  useEffect(() => {
    dispatch(requestProductData(pageOptions));
  },[dispatch,pageOptions]);

  useEffect(() => {
    
    if (errorMessage) {
      message.error(errorMessage);
    }
    if (successMessage) {
      message.success(successMessage);
    }
    if (isDeleting===2 || isDeleting===3) {
      setVisible(false);
      dispatch(requestProductDeleteReset());
      dispatch(requestProductData());
    }

  },[dispatch, isDeleting, errorMessage, successMessage]);

  const dispatchRequestProductDelete = () => {
    dispatch(requestProductDelete(deleteId));
  }
  
  const handelCancelDeleteModal = () => {
    setVisible(false);
  }
  
  const handelShowDeleteModal = id => {
    setDeleteId(id);
    setVisible(true);
  }

  const handleTableChange = (pagination, filters, sorter) => {
    console.log(sorter);
    const pager = { ...pagination };
    pager.current = pagination.current;
    setPagination(pager);
    setPageOptions({
      ...pageOptions,    
      page: pagination.current,
      sort: sorter.field,
      order: sorter.order === 'ascend' ? 'asc' : 'desc',
    });
  }

  const onSearch = () => {
    if (searchKeyword !=='') {
      setPageOptions({
        ...pageOptions,    
        q: searchKeyword
      });
    }
  }

  const resetSearch = () => {
    setSearchKeyword("");
    setPageOptions({...pageOptions, q: "" });
  }

  return (
    <div className="container-fluid">
      <h1 className="h3 mb-2 text-gray-800">Products List</h1>
      <p className="mb-4"></p>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <span className="m-0 font-weight-bold text-primary">List</span>
          <Link to="/product/create" className="float-right">Create new Product</Link>
        </div>
        <div className="card-body">
          <div>
            <Row span={24} style={{ marginBottom:"10px" }}>
              <Col span={7}>
                <Input value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)}  placeholder="Search product title" style={{ width:"280px" }}/>
              </Col>
              <Col span={2}>
                <Button onClick={onSearch} type="primary">Search</Button>
              </Col>
              <Col span={2}>
                <Button onClick={resetSearch} type="danger">Reset</Button>
              </Col>
            </Row>
          </div>
          <div className="table-responsive">
            <Table
              columns={columns}
              rowKey={record => record.id}
              dataSource={list.rows}
              pagination={{ ...pagination, total:list.count }}
              loading={isLoading}
              onChange={handleTableChange}
            />
          </div>
        </div>
      </div>

      <DeleteModal 
        visible={visible} 
        handelCancelDeleteModal={handelCancelDeleteModal}
        deleteRequest={dispatchRequestProductDelete}
      />
    </div>
  )


}

export default ProductList;