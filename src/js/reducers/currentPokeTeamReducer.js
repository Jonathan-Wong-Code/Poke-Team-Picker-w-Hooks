const currentPokeTeamReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_POKEMON':
      return [
        ...state,
        action.pokemon
      ];

    case 'REMOVE_POKEMON':
      return state.filter(pokemon => pokemon.uniqueId !== action.id);

    default:
      return state;
  }
};

export default currentPokeTeamReducer;
