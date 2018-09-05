import { AsyncStorage } from "react-native";
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import { Platform } from 'react-native';
import firebase from 'react-native-firebase';
import { database } from "firebase";




export function getCategory(callback) {
    const categoryRef = database().ref('category');

    //start listening for new data
    categoryRef.on('value', function(snapshot) {
        callback(true, snapshot.val(), null)
    });
}

// function(waybill_no, callback) { 
//     databaseRef.orderByChild("waybill_no").equalTo(waybill_no).on('value', function(snapshot) {
//     var truth = snapshot.exists();
//     callback(truth); // this will "return" your value to the original caller
//   });
// }


// react-native's version of local storage

// export const KEY = "rickyfiguresitout";

// export const onSignIn = () => AsyncStorage.setItem(KEY, "true");
// // set storage to hold key as TRUE

// export const setStorage = (data) => AsyncStorage.setItem('data', JSON.stringify(data));
// // set storage to hold user data

// export const onSignOut = () => AsyncStorage.removeItem(KEY);
// //if user signs out, remove TRUE key

// export const isSignedIn = () => {
//   return new Promise((resolve, reject) => {
//     AsyncStorage.getItem(KEY)
//       .then(res => {
//         if (res !== null) {
//           resolve(true);
//         } else {
//           resolve(false);
//         }
//       })
//       .catch(err => reject(err));
//   });
// };

