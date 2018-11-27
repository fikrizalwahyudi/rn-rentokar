import React , { Component } from 'react';
import {Platform, TouchableOpacity, View, ScrollView} from 'react-native';

import firebase from 'react-native-firebase';

import * as ImagePick from 'react-native-image-picker';
import ImagePicker  from 'react-native-image-crop-picker';


export const pickImageHandler = () => {
    return new Promise((resolve, reject) => {
        ImagePick.showImagePicker({title: "Pick an Image", maxWidth: 800, maxHeight: 600}, res => {
        if (res.didCancel) {
            // console.log("User cancelled!");
        } else if (res.error) {
            // console.log("Error", res.error);
        } else {
            ImagePicker.openCropper({
            path: res.uri.toString(),
            width: 300,
            height: 400
            }).then(image => {
                uploadImage(image).then((res)=>{
                    resolve(res);
                }).catch((err)=>{
                    reject(err);
                });
            });
            // uploadImage(res.uri);
        }
        });
    })
}

export const uploadImage = (uri, mime = 'application/octet-stream') => {
    return new Promise((resolve, reject) => {
        console.log("urinya", uri.path);
        const uploadUri =  uri.path;
        let currentUser = firebase.auth().currentUser;
        const sessionId = new Date().getTime();
        let uploadBlob = null;
        const imageRef = firebase.storage().ref('images/'+currentUser.uid).child(sessionId+'.jpg');
        imageRef.put(uri.path, { contentType: mime }).then((res=>{
          console.log(res);
          resolve(res.downloadURL);
        //   storeReference(res.downloadURL, sessionId).then((res)=>{
        //       resolve(res);
        //   });
        })).catch((error)=>{
            console.log(error);
            reject(error);
        });
    })
}
  
export const storeReference = (downloadUrl, sessionId) => {
    return new Promise((resolve, reject) => {
        // let imageRef = firebase.storage().ref('profilePicture').child('profileFile')
        let currentUser = firebase.auth().currentUser
        let image = {
        type: 'image',
        url: downloadUrl,
        createdAt: sessionId,
        user: {
            id: currentUser.uid,
            email: currentUser.email
            }
        }
        var obj={
        photoURL:downloadUrl
        }
        resolve(downloadUrl);
    })
    // dataServices.updateProfile(obj, currentUser.uid).then((res)=>{
    //   console.log("success ");
    //   this.props.state.users.photoURL = downloadUrl;
    // }).catch((error)=>{
    //   console.log(error);
    // })
    // firebase.database().ref('users').push(image);
}