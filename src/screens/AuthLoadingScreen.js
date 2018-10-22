import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Platform,
  Image,
  TouchableOpacity
} from 'react-native';

import { GoogleSignin} from 'react-native-google-signin';
import firebase from 'react-native-firebase'

import * as dataServices from '../services/DataServices';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addUser, signIn } from '../actions/UserAction';

class AuthLoadingScreen extends React.Component {
    constructor(props) {
      super(props);
      // props.signIn({
      //   fullName:"Fikri"
      // })
    //   console.log("ini props", props);
      // this.props.signIn("test");
      
    }
  
    componentWillMount() {
     
      var self = this;
      
      setTimeout(function(){ 
        self._getCurrentUser();
      }, 3000);
  }
  
    // Fetch the token from storage then navigate to our appropriate place
    async _getCurrentUser() {
      var self = this;
      try {
        // const users = await GoogleSignin.signInSilently();
        firebase.auth().onAuthStateChanged(function(user) {
          console.log("kepanggil", user);
          if (user) {
            console.log("already logged in");
            user.id = user.uid;
            // console.log(user.uid);
            // console.log(user.providerData);
            // var u = firebase.auth().currentUser;
            // console.log(user.email)
            // signUpWithGoogle(user);
            
            dataServices.checkUser(user).then((res)=>{
              // try{
              //   // self.props.signIn(res);
              //   // console.log(self.props.signIn(res));z
              // }catch(error){
              //   console.log(error);
              // }
              
              // console.log("masuk sini");
              console.log("kepanggil lagi", res);
              self.props.navigation.navigate("Explore");
            }).catch((e)=>{
              // console.log("gapunya user", user.providerData[0].providerId);
              // if(user.providerData[0].providerId === 'google.com'){
              //     try {
              //       firebase.auth().signOut();
              //       GoogleSignin.signOut();
              //       self.props.navigation.navigate('Auth');
              //     } catch (error) {
              //       console.log(error);
              //     }
              // }else{
              //   self.props.navigation.navigate("Auth");
              // }
             
              self.props.navigation.navigate("Auth");
              // console.log(e);
            })
            // self.props.navigation.navigate('App');
          } else {
            self.props.navigation.navigate('Auth');
          }
        });
      } catch (error) {
        this.props.navigation.navigate('Auth');
        // alert(error)
        // this.setState({
        //   error,
        // });
        
      }
    }
    
    // Render any loading content that you like here
    render() {
      return (
        <View style={styles.container}>
          <Image source={require('../assets/img/logo-red.png')} style={{width:200, height:200, alignSelf:'center'}}/>
          <Image source={require('../assets/img/rentokar-black.png')} style={{ marginTop:5,alignSelf:'center', height:30, width:200}}/>
          <StatusBar barStyle="default" />
        </View>
      );
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });



const mapStateToProps = (state, props) => {
    console.log(state);
    console.log(props);
    // console.log("tessss", state);
    return {
        state, props
    } 
  };

  const mapDispatchToProps = dispatch => (
    bindActionCreators({
      addUser,signIn
    }, dispatch)
  );
  

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);
