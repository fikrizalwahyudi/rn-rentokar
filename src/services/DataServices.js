import { AsyncStorage } from "react-native";
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import { Platform } from 'react-native';
import firebase from 'react-native-firebase';

import allReducers from '../reducers/Reducer';
import { addUser, signIn } from '../actions/UserAction';
import { createStore } from 'redux';

import * as _ from 'lodash';

const userRef = firebase.database().ref('users');
const store = createStore(allReducers);
//category
export const getListCategory = () => {
    return firebase.database().ref('category');
};

export const getCategory = () =>{
    const promise =new Promise(function(resolve, reject){
        firebase.database().ref('category').orderByChild('categoryParent').equalTo('').on('value', (dataSnapshot) => {
            var listCat = [];
            dataSnapshot.forEach((child) => {
                listCat.push({
                    name: child.val().categoryName,
                    _key: child.key
                });
            });
            console.log(listCat);
            resolve(listCat);
        },err=>{
            reject(err);
        });
    })

    return promise;
}

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
            // console.log(snapshot.val());
            if(snapshot.exists()){
                // console.log("masuuuuk", snapshot.val().email);
                // if(snapshot.val().phoneVerification){
                //     resolve("App")
                // }
                store.dispatch(signIn(snapshot.val()));
                return resolve(snapshot.val());
            }else{
                return reject(false);
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
            phoneNumber:obj.phoneNumber,
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

export const createUsers = (data) =>{
    const promise = new Promise(function(resolve, reject){
        var millisecond = Date.now();
        userRef.child(data.id).set({
            email:data.email,
            id:data.id,
            fullName:data.fullName,
            photoURL:data.photoURL,
            provider:data.providerId,
            phoneNumber:"",
            emailVerfirication: false,
            phoneVerification:false,
            createDate:millisecond
        }).then(e=>{
            firebase.database().ref('users/'+data.id).once('value').then((snap)=>{
                // console.log("ini obj users ",snap.val());
                // console.log("ini obj users ",snap.val().id);
                return resolve(snap.val());
            });
        }).catch((e)=>{
            return reject(false);
        })
    })
    return promise;
    
}


export const registerWithEmailPassword = (obj) =>{
    const promise = new Promise(function(resolve, reject){
        firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(obj.email, obj.password).then(function(e){
            // console.log("success");
            // console.log("ini console", e.user._auth._user.uid);
            return resolve(e.user._auth._user);
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // console.log(error);
            return reject(error);
            // ...
        });
    })
    return promise;
}

export const updateProfile = (obj, uid) =>{
    const promise = new Promise(function(resolve, reject){
        firebase.database().ref('users/'+uid).update(obj).then((data)=>{
            return resolve(data);
        }).catch((error)=>{
            return reject(error);
        })
    })
    return promise;
}

export const getCurrentUser = () =>{
    // store.dispatch(signIn({fullName:"test"}))
    
    return currentUser = firebase.auth().currentUser;
}

export const createProduct = (obj) =>{
    obj.uid = store.getState().users.id;
    console.log(obj);
    const promise = new Promise(function(resolve, reject){
        firebase.database().ref('products').push(obj).then(e=>{
            console.log(e);
            resolve(e);
        }).catch(err=>{
            reject(err);
        });
    }) 
    return promise;
}

export const getProductById = (uid) =>{
    const promise =new Promise(function(resolve, reject){
        firebase.database().ref('products').orderByChild('uid').equalTo(uid).on('value', (dataSnapshot) => {
            var listProduct = [];
            dataSnapshot.forEach((child) => {
                var obj = child.val();
                obj._key = child.key;
                listProduct.push(obj);
            });
            console.log(listProduct);
            resolve(listProduct);
        },err=>{
            reject(err);
        });
    })

    return promise;
}

export const getAllProduct = () =>{
    const promise =new Promise(function(resolve, reject){
        firebase.database().ref('products').on('value', (dataSnapshot) => {
            var listProduct = [];
            dataSnapshot.forEach((child) => {
                var obj = child.val();
                obj._key = child.key;
                listProduct.push(obj);
            });
            console.log(listProduct);
            resolve(listProduct);
        },err=>{
            reject(err);
        });
    })

    return promise;
}

export const getProfileById = (uid) =>{
    const promise = new Promise(function(resolve, reject){
        firebase.database().ref('users/'+uid).once('value').then(function(snapshot){
            // console.log(snapshot.val());
            if(snapshot.exists()){
                return resolve(snapshot.val());
            }else{
                return reject(false);
            }
        });
    })
    return promise;
}