import authReducer from './../../reducers/auth';
import { LOGIN, LOGOUT, LOGIN_GUEST } from './../../actions/types';

describe('the auth reducer', () => {
  it('Should log the user in with their uid', () => {
    const action = {
      type : LOGIN,
      uid : 'test123'
    };

    const result = authReducer(null, action);
    expect(result).toEqual({ uid : 'test123' });
  });

  it('Should log the user out', () => {
    const action = {
      type : LOGOUT
    };

    const result = authReducer(null, action);
    expect(result).toEqual({ uid : null });
  });

  it('Should log the user in as a guest', () => {
    const action = {
      type : LOGIN_GUEST
    };

    const result = authReducer(null, action);
    expect(result).toEqual({ uid : 'guest' });
  });
});
