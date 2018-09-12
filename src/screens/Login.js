import React, { Component } from 'react';
import { View, StyleSheet, Image, Alert, Platform, Dimensions,ImageBackground } from 'react-native';
import { Container,  Content, Form, Item, Input, Label, Button, Text} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import * as _ from 'lodash';

import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import firebase from 'react-native-firebase';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addUser, signUpWithGoogle } from '../actions/UserAction';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: null,
            error: null
        };
    }
    
    
    async componentDidMount() {
        
    }
    
    // onLoginOrRegister = () => {
    //     GoogleSignin.signIn()
    //     .then((data) => {
    //         // Create a new Firebase credential with the token
    //         const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
    //         // Login with the credential
    //         return firebase.auth().signInWithCredential(credential);
    //     })
    //     .then((user) => {
    //         // If you need to do anything with the user, do it here
    //         // The user will be logged in automatically by the
    //         // `onAuthStateChanged` listener we set up in App.js earlier
    //     })
    //     .catch((error) => {
    //         const { code, message } = error;
    //         // For details of error codes, see the docs
    //         // The message contains the default Firebase string
    //         // representation of the error
    //     });
    // }
    
    
    _signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            await GoogleSignin.signIn()
            .then((data) => {
                // Create a new Firebase credential with the token
                const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
                // Login with the credential
                return firebase.auth().signInAndRetrieveDataWithCredential(credential);
            }).then((user)=>{
            
                var profile = {
                    email:user.user.email,
                    id:user.user.uid,
                    fullName:user.user.displayName,
                    photoURL:user.user.photoURL
                }
                // const array = _.values(profile);
                // console.log(array);
                this.props.signUpWithGoogle(profile);
                console.log(profile);
                this.props.navigation.navigate('App');
            })
        } catch (error) {
            
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // sign in was cancelled
                alert('cancelled');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation in progress already
                alert('in progress');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                alert('play services not available or outdated');
            } else {
                Alert.alert('Something went wrong', error.toString());
                this.setState({
                    error,
                });
            }
        }
    };
    
    
    _onSubmit = () =>{
        // this.props.navigation.navigate('Verification');
        // var a = this.g
    }
  
  render() {
    const {height: screenHeight} = Dimensions.get('window');
    const { userInfo } = this.state;

    // const { navigate } = this.props.navigation;

    return (
      
        <Container >
          <Content >
                <Grid>
                    <Col style={styles.grid}>
                        <Image style={styles.logo} source={require('../assets/img/rentokar-full-color.png')}/>
                    </Col>
                </Grid>
                <Grid style={styles.form}>
                    <Col>
                        <Form style={styles.input}>
                            <Item floatingLabel >
                                <Label style={{color:'grey'}}>Username </Label>
                                <Input />
                            </Item>
                            <Item floatingLabel >
                                <Label style={{color:'grey'}}>Password</Label>
                                <Input />
                            </Item>
                        </Form>
                        <Button style={styles.buttonSubmit} block onPress={this._onSubmit}>
                            <Text  >Submit </Text>
                        </Button>
                        <View style={{flex:1,justifyContent:'center', alignItems:'center', marginTop:10}}>
                            <Text >OR </Text>
                        </View>
                        <GoogleSigninButton
                            style={{ width: 300, alignSelf:'center', height: 48, marginTop:10 }}
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Dark}
                            onPress={this._signIn}/>
                    </Col>
                </Grid>
            </Content>
        </Container>
    ); 
  }
}


const styles = StyleSheet.create({
    grid: {
        marginTop: 50,
        alignItems: 'center'
    },
    form:{
        // paddingRight: 30,
        // paddingLeft: 10,
        alignItems:'center',
        justifyContent: 'center'
    },
    input:{
      alignItems:'center',
      paddingLeft: 15,
      paddingRight:30
    },
    logo: {
        alignItems: 'center',
        width:200,
        height:35,
        marginTop: 50,
    },
    buttonSubmit: {
        marginTop: 20,
        alignSelf: 'center',
        width:300
        
    },
    picture: {
      flex: 1,
      width: null,
      height: null,
      resizeMode: 'cover',
    },
});

const mapStateToProps = (state) => {
    const { users } = state
    return { users }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
      addUser,signUpWithGoogle
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Login);;
