import React, { Component } from "react";
import { connect } from "react-redux";
import {Link} from 'react-router-dom';
import {HashLoader} from 'react-spinners';

import { fetchAdmins } from "../../actions/admins-actions";

class AdminList extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchAdmins();
  }

  render() {
    return (
      <div>
        <h1>Admin List</h1>
        {this.props.fetching ? 
        <HashLoader color={"#36bdb3"} size={40} loading={this.props.fetching} />
        :
        this.props.admins.map((admin) => (
          <div key={admin.id}>
            <p>{admin.fullname}</p>
            <p>{admin.email}</p>
            <p>
              {admin.movies.map((movie) => (
                <Link to={`/${movie.id}`}>{movie.name} &nbsp;</Link>
              ))}
            </p>
          </div>
        ))
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    admins: state.admins.admins,
    fetching:state.admins.fetching
  };
};

const mapDispatchToProps = {
  fetchAdmins,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminList);
