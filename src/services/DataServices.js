import { AsyncStorage } from "react-native";
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import { Platform } from 'react-native';
import firebase from 'react-native-firebase';


const userRef = firebase.database().ref('users');

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

export const checkUser = (data)=>{
        
    const promise = new Promise(function(resolve, reject){
        firebase.database().ref('users/'+data.id).once('value').then(function(snapshot){
            console.log(snapshot.val());
            if(snapshot.exists()){
                console.log("masuuuuk", snapshot.val().email);
                if(snapshot.val().phoneVerification){
                    resolve("App")
                }else{
                    resolve("Verification")
                }
            }else{
                // console.log("ga masuk", snapshot)
                userRef.child(data.id).set({
                    email:data.email,
                    id:data.id,
                    fullName:data.displayName,
                    photoURL:data.photoURL,
                    provider:data.providerId,
                    phoneNumber:"",
                    phoneVerification:false
                }).then(e=>{
                    resolve("Verification");
                })
                
            }
        });
        // userRef.orderByChild('id').equalTo(data.id).once('value').then(function(snapshot){
        //     console.log("val ", snapshot.val());
        //     console.log("veri", snapshot.val.email);
        //     const obj = snapshot.val();
        //     console.log("obj", obj.);
        //     if(snapshot.exists()){
        //         // if(snapshot.val().)
        //         resolve("success");
        //     }else{
        //         userRef.child(data.id).set({
        //             email:data.email,
        //             id:data.id,
        //             fullName:data.displayName,
        //             photoURL:data.photoURL,
        //             provider:data.providerId,
        //             phoneNumber:"",
        //             phoneVerification:false
        //         })
        //         // console.log("belom ada");
        //         resolve("baru");
        //     }
        // })
    })
    return promise;
}

export const updatePhoneVerification = (id) =>{
    const promise = new Promise(function(resolve, reject){
        console.log("object ", id);
        firebase.database().ref('users/'+id).update({
            // phoneNumber:obj.phoneNumber,
            phoneVerification:true
        }).then(r=>{
            resolve("App");
        })
    })
    return promise;
}

export const generateCode = () =>{
    return Math.floor(Math.random()*90000) + 10000;
}