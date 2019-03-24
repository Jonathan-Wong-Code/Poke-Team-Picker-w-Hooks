import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Header from'../components/Header';
import { connect } from 'react-redux';

const PrivateRoute = ({ isAuthenticated, component : Component, ...rest}) => { 
  return isAuthenticated ? (
    <Route {...rest} 
      component = { (props) => 
        <div className='header-component-box'>
          <Header {...props} />
          <Component {...props} />
        </div> 
      }    
    />
  ) : (
    <Redirect to='/'/>
  )  
}

const mapStateToProps = (state) => ({
  isAuthenticated : !!state.auth.uid
})

export default connect(mapStateToProps)(PrivateRoute);



  
