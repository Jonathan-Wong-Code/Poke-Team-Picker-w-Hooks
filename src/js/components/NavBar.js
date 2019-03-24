import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout, logout } from './../actions/auth';

export const NavBar = ({ startLogout, history, auth, logout }) => {
  const onLogoutClick = () => {
    if (auth === 'guest') {
      logout();
      history.push('/');
    } else {
      startLogout();
    }
  };

  return (
    <nav className='navbar' data-test='nav-bar-component'>
      <ul className='navbar__nav'>
        <li className='navbar__item'>
          <NavLink to='/create' activeClassName='is-active' className='navbar__link btn'>
            Create Team
          </NavLink>
        </li>
        <li className='navbar__item'>
          <NavLink to='/SavedTeams' activeClassName='is-active' className='navbar__link btn'>
            Saved Teams
          </NavLink>
        </li>
        <li className='navbar__item'>
          <button 
            onClick={onLogoutClick} 
            className='btn navbar__logout'  
            data-test='nav-bar-logout'>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );  
};

const mapStateToProps = (state) => ({
  auth : state.auth.uid
});

const mapDispatchToProps = (dispatch) => ({
  startLogout : () => dispatch(startLogout()),
  logout : () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
