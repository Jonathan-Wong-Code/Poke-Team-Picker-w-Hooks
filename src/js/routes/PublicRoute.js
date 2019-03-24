import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from'../components/Header';
import { connect } from 'react-redux';

const PublicRoute = ({ isAuthenticated, component : Component, ...rest, }) => { 
  return isAuthenticated ? (
    <Redirect to='/create'/>
  ) : (
      <Route {...rest} 
      component = { (props) => 
        <div className='header-login-box'>
          <Header {...props}/>
          <Component {...props} 
            exact
          /> 
        </div>
      } 
    />
  )   
}

const mapStateToProps = (state) => ({
  isAuthenticated : !!state.auth.uid
})

export default connect(mapStateToProps)(PublicRoute);

