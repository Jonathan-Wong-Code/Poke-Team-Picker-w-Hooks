import { LOGIN, LOGIN_GUEST, LOGOUT } from './../actions/types';

const initialAuthState = {
  uid : null
}

const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {

    case LOGIN:
      return {
        uid : action.uid
      };
    
    case LOGIN_GUEST:
      return {
        uid : 'guest'
      };

    case LOGOUT:
      return {
        uid : null
      };

    default:
      return state;
  }
};

export default authReducer;
