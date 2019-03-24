import React from 'react';
import { connect } from 'react-redux';
import BuildPokeTeamPage from './BuildPokeTeamPage';
import { editPokeTeam } from './../actions/pokeTeam';

export const EditTeamPage = ({ editPokeTeam, editedTeam, history }) => {
  const handleEditTeam = (pokeTeam) => {
    editPokeTeam(pokeTeam);
  };

  return (
    <BuildPokeTeamPage 
      type='edit' 
      handleEditTeam={handleEditTeam} 
      pokeTeam={editedTeam}
      history={history}
      data-test='build-page-component'
    />
  );
};

const mapDispatchToProps = (dispatch) => ({
  editPokeTeam : (pokeTeam) => dispatch(editPokeTeam(pokeTeam))
});

const mapStateToProps = (state, props) => ({
  editedTeam : state.savedTeams[props.match.params.id]
});

export default connect(mapStateToProps, mapDispatchToProps)(EditTeamPage);
