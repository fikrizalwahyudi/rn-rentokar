export const addUser = data => (
    {
        type: 'ADD_USER',
        payload: data
    }
);

export const signUpWithGoogle = data => (
    {
        type: 'SIGNUP_GOOGLE',
        payload: data
    }
);

export const signIn = data => (
    {
        type: 'SIGNIN',
        payload: data
    }
);
