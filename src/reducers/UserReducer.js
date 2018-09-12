import { combineReducers } from 'redux';

const USER_INFO = {
  id:'',
  fullName:'',
  email:'',
  phoneNumber:'',
  verified:false,
  lastState:'',
  photoURL:''
}

const userReducer = (state = USER_INFO, action) => {

  switch (action.type) {
    case 'ADD_USER':
      state = action.payload;
      return state
    case 'SIGNUP_GOOGLE':
      state.id = action.payload.id,
      state.fullName = action.payload.fullName,
      state.email = action.payload.email,
      state.profilePicture = action.payload.profilePicture
      return state
    default:
      return state
  }
};

export default combineReducers({
  users: userReducer
});
