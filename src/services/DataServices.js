import { AsyncStorage } from "react-native";
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import { Platform } from 'react-native';
import firebase from 'react-native-firebase';


//category
export const getListCategory = () => {
    return firebase.database().ref('category');
};

export const createCategory = (data) =>{
    firebase.database().ref('category').push({
        categoryName: data.categoryName,
        categoryParent: data.categoryParent,
        categoryImageUrl: data.categoryImageUrl
    }).then(e=>{
        console.log(e);
        return 'success';
    }).catch(err=>{
        return 'error';
    });
} 


