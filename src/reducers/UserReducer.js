import { combineReducers } from 'redux';

const INITIAL_STATE = {
  current: [],
  possible: [
    'Allie',
    'Gator',
    'Lizzie',
    'Reptar',
    'test'
  ],
  profile: []
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_USER':
      // Pulls current and possible out of previous state
      // We do not want to alter state directly in case
      // another action is altering it at the same time
      const {
        current,
        possible,
        profile
      } = state;

      // Pull friend out of friends.possible
      // Note that action.payload === friendIndex
      const userInfo = action.payload;
      console.log(action.payload);
      const addedUser = possible.splice(action.payload, 1);

      // And put friend in friends.current
      current.push(userInfo);

      // Finally, update our redux state
      const newState = { current, possible };
      return newState;
    default:
      return state
  }
};

export default combineReducers({
  users: userReducer,
});
