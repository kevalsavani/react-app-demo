import React, {Component} from 'react';
import { connect } from 'react-redux';
import { requestApiData } from '../../actions';
import { bindActionCreators } from 'redux';

class UserList extends Component{

  componentDidMount() {
    this.props.requestApiData();
  }

  render(){
    const { results = []} = this.props.data;
    const { data } = this.props;

    console.log(data);
    return (
      <div className="container-fluid">
        <h1 className="h3 mb-2 text-gray-800">Users List</h1>
        <p className="mb-4"></p>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">List</h6>
          </div>
          <div className="card-body">
            { data.isLoading && <div>Loading...</div>}
            <div className="table-responsive">
              <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Office</th>
                    <th>Age</th>
                    <th>Start date</th>
                    <th>Salary</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    results.map((res, index) => 
                      <tr key={index}>
                        <td>Tiger Nixon</td>
                        <td>System Architect</td>
                        <td>Edinburgh</td>
                        <td>61</td>
                        <td>2011/04/25</td>
                        <td>$320,800</td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.data
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({requestApiData},dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);