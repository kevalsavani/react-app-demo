import React, {Component} from 'react';
import { connect } from 'react-redux';
import { requestProductData, requestProductDelete } from '../../actions';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Modal, message } from 'antd';
import DeleteModal from '../common/DeleteModal';
const { confirm } = Modal;


class ProductListBKUP extends Component{

  state = {
    ModalText: 'Content of the modal',
    visible: false,
    confirmLoading: false,
  };

  showModal = () => {
    
  };

  handleOk = () => {

    // this.setState({
    //   ModalText: 'The modal will be closed after two seconds',
    //   confirmLoading: true,
    // });
    // setTimeout(() => {
    //   this.setState({
    //     visible: false,
    //     confirmLoading: false,
    //   });
    // }, 2000);
  };

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };

  componentDidMount() {
    this.props.requestProductData();
  }

  componentDidUpdate(prevProps){
    const { errorMessage, successMessage, isDeleting } = this.props.data;
    if (errorMessage) {
      message.error(errorMessage);
    }
    if (successMessage) {
      message.success(successMessage);
    }
    console.log(prevProps);
    console.log(isDeleting);
    if (prevProps.data.isDeleting !== isDeleting) {
      if (isDeleting===false) {
        this.setState({visible:false});
      }
    }

  }

  handelCancelDeleteModal = () => {
    this.setState({
      visible: false
    });
  }
  
  handelShowDeleteModal = (id) => {
    
    this.setState({
      visible: true,
    });
    
  }

  render(){
    let { isLoading, list = [] } = this.props.data;
    const { visible } = this.state;

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
            { isLoading && <div>Loading...</div>}
            <div className="table-responsive">
              <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                <thead>
                  <tr>
                    <th>Product Title</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Warranty</th>
                    <th>New</th>
                    <th>Active</th>
                    <th>Updated</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    list.map((data, index) => 
                      <tr key={index}>
                        <td>{data.product_title}</td>
                        <td>{data.description}</td>
                        <td>{data.category_id}</td>
                        <td>{data.warranty ? 'Yes' : 'No'}</td>
                        <td>{data.is_new ? 'Yes' : 'No'}</td>
                        <td>{data.active ? 'Yes' : 'No'}</td>
                        <td>{data.updated_at}</td>
                        <td>
                          <Link to={`/product/${data.id}/edit`}>Edit</Link>
                          &nbsp;|&nbsp;
                          <span onClick={() => this.handelShowDeleteModal(data.id)} style={{ color:'red',cursor:'pointer' }}>Delete</span>
                        </td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <DeleteModal 
          visible={visible} 
          handelCancelDeleteModal={this.handelCancelDeleteModal}
          deleteRequest={this.props.requestProductDelete}
        />
      </div>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.product
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({requestProductData, requestProductDelete},dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductListBKUP);