import { combineReducers } from 'redux';

const USER_INFO = {
  id:'',
  fullName:'',
  email:'',
  phoneNumber:'',
  phoneVerification:false,
  emailVerification:false,
  photoURL:'',
  isVendor:false
}

const userReducer = (state = USER_INFO, action) => {

  switch (action.type) {
    case 'ADD_USER':
      state = action.payload;
      return state
    case 'SIGNIN':
      state.id = action.payload.id,
      state.fullName = action.payload.fullName,
      state.email = action.payload.email,
      state.phoneNumber = action.payload.phoneNumber,
      state.emailVerification = action.payload.phoneVerification,
      state.photoURL = action.payload.photoURL
      return state
    case 'SWITCH_TO_VENDOR':
      state.isVendor = action.payload.isVendor
      return state

    // case 'SIGNUP_GOOGLE':
    //   state.id = action.payload.id,
    //   state.fullName = action.payload.fullName,
    //   state.email = action.payload.email,
    //   state.profilePicture = action.payload.profilePicture
    //   return state
    default:
      return state
  }
};

export default combineReducers({
  users: userReducer
});
