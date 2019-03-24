import React from 'react';
import SavedTeamCell from './SavedTeamsCell';

const SavedTeamsList = ({ savedTeams }) => {
  const renderTeamCell = () => savedTeams.map(team => {
    return (
      <SavedTeamCell 
        key={team.id} 
        team={team} 
      />
    );
  });

  return (
    <div className='saved-teams' data-test='saved-teams-list'>
      <ul className='saved-teams__list'>
        {renderTeamCell()}
      </ul>
    </div> 
  );
};

export default SavedTeamsList;
