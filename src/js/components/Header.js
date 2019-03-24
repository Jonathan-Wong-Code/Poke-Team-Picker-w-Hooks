import React from 'react';
import { connect } from 'react-redux';
import NavBar from './NavBar';

import togepi from './../../images/togepi.png';

// const togepi = require('./../../images/togepi.png');
const pikachu = require('./../../images/pikachu.png');
const squirtle = require('./../../images/squirtle.png');
const logo = require('./../../images/logo.png');
const bulbasaur = require('./../../images/bulbasaur.png');
const charmander = require('./../../images/charmander.png');
const eevee = require('./../../images/eevee.png');

export const Header = ({ history, isAuthenticated }) => {
  const headerClasses = isAuthenticated ? 'header' : 'header header--login';
  const headingClasses = isAuthenticated ? 'header__heading' : 'header__heading header__heading--login';
  const pokeBannerClasses = isAuthenticated ? 'poke-banner' : 'poke-banner poke-banner--login';

  return (
    <header className={headerClasses} data-test='header-component'> 
      <ul className={pokeBannerClasses}>
        <li className='poke-banner__item'>
          <img src={togepi} alt='togepi' className='poke-banner__img' />
        </li>

        <li className='poke-banner__item'>
          <img src={pikachu} alt='pikachu' className='poke-banner__img' />
        </li>

        <li className='poke-banner__item'>
          <img src={squirtle} alt='squirtle' className='poke-banner__img' />
        </li>

        <li className='poke-banner__item poke-banner__logo'>
          <img src={logo} alt='pokemon logo' className='poke-banner__img' />
        </li>

        <li className='poke-banner__item'>
          <img src={eevee} alt='eevee' className='poke-banner__img' />
        </li>

        <li className='poke-banner__item'>
          <img src={charmander} alt='charmander' className='poke-banner__img' />
        </li>
        
        <li className='poke-banner__item'>
          <img src={bulbasaur} alt='bulbasaur' className='poke-banner__img' />
        </li>
      </ul>
      <h1 className={headingClasses}>Poke-Team Picker</h1>
      {isAuthenticated && <NavBar history={history} />}
    </header>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated : !!state.auth.uid
});

export default connect(mapStateToProps)(Header);
