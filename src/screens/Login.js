import React, { Component } from 'react';
import { View, StyleSheet, Image, Alert, Platform, Dimensions,ImageBackground, ActivityIndicator } from 'react-native';
import { Container,  Content, Form, Item, Input, Label, Button, Text} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Loader from './utils/Loader';
import t from 'tcomb-form-native';

import * as _ from 'lodash';

import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import firebase from 'react-native-firebase';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addUser, signIn } from '../actions/UserAction';

import * as dataServices from '../services/DataServices';

const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

stylesheet.textbox.normal.borderWidth = 0;
stylesheet.textbox.error.borderWidth = 0;
stylesheet.textbox.normal.marginBottom = 0;
stylesheet.textbox.error.marginBottom = 0;

stylesheet.textboxView.normal.borderWidth = 0;
stylesheet.textboxView.error.borderWidth = 0;
stylesheet.textboxView.normal.borderRadius = 0;
stylesheet.textboxView.error.borderRadius = 0;
stylesheet.textboxView.normal.borderBottomWidth = 1;
stylesheet.textboxView.error.borderBottomWidth = 1;
stylesheet.textboxView.normal.marginBottom = 5;
stylesheet.textboxView.error.marginBottom = 5;


const TForm = t.form.Form;

const FormUser = t.struct({
    email: t.String,
    password: t.String
});

const options = {
    stylesheet: stylesheet,
    auto: 'placeholders',
    fields: {
      password: {
        password: true,
        secureTextEntry: true
      }
    }
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: null,
            error: null,
            isLoading: false
        };
    }
    
    
    async componentDidMount() {
        
    }

    showLoader = () => {
        this.setState({ isLoading: true });
    };

    hideLoader = () =>{
        this.setState({ isLoading: false });
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
    
    
    _signInWithGoogleAccount = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            await GoogleSignin.signIn().then((data) => {
                this.showLoader();
                // Create a new Firebase credential with the token
                const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
                // Login with the credential
                return firebase.auth().signInAndRetrieveDataWithCredential(credential);
            }).then((user)=>{
                console.log("userrr", user);
                this.hideLoader();
                // console.log(user.user.providerData[0].providerId);
                
                // user.providerData.forEach(function (profile) {
                //     console.log("Sign-in provider: " + profile.providerId);
                //     console.log("  Provider-specific UID: " + profile.uid);
                //     console.log("  Name: " + profile.displayName);
                //     console.log("  Email: " + profile.email);
                //     console.log("  Photo URL: " + profile.photoURL);
                //   });
                var profile = {
                    email:user.user.email,
                    id:user.user.uid,
                    fullName:user.user.providerData[0].displayName,
                    photoURL:user.user.photoURL,
                    providerId:user.user.providerData[0].providerId
                }
                if(user.user.providerData[0].providerId == "google.com"){
                    profile.providerId = user.user.providerData[0].providerId
                }
                // const array = _.values(profile);
                // console.log(array);
                // this.props.signUpWithGoogle(profile);
                // console.log(profile);

                dataServices.checkUser(profile).then((res)=>{
                    console.log("ada");
                }).catch((e)=>{
                    console.log("ga ada", e);
                    dataServices.createUsers(profile).then((e)=>{
                        this.props.navigation.navigate('Verification');
                        // console.log("success create user", e);
                    }).catch((e)=>{
                        // console.log("failed to create users");
                    });
                })
            })
        } catch (error) {
            console.log(error);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // sign in was cancelled
                // console.log('cancelled');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation in progress already
                // console.log('in progress');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // console.log('play services not available or outdated');
            } else {
                // console.log("error");
                // Alert.alert('Something went wrong', error.toString());
                // this.setState({
                //     error,
                // });
            }
        }
    };
    
    
    _onSubmit = () =>{
        this.props.navigation.navigate('Verification');
        // var a = this.g
    }

    _register = () =>{
        this.props.navigation.navigate('Register');
    }

  
  render() {
    const {height: screenHeight} = Dimensions.get('window');
    const { userInfo } = this.state;

    // const { navigate } = this.props.navigation;

    return (
        <Container >
            <Loader loading={this.state.isLoading} />
            <Content >
            {/* <ActivityIndicator size="small" color="#00ff00" /> */}
                <Grid>
                    <Col style={styles.grid}>
                        <Image style={styles.logo} source={require('../assets/img/rentokar-full-color.png')}/>
                    </Col>
                </Grid>
                <Grid style={styles.form}>
                    <Col>
                        <View style={styles.tform}>
                            <TForm type={FormUser} options={options} /> 
                        </View>
                        {/* <Form style={styles.input}>
                            <Item floatingLabel >
                                <Label style={{color:'grey'}}>Username </Label>
                                <Input />
                            </Item>
                            <Item floatingLabel >
                                <Label style={{color:'grey'}}>Password</Label>
                                <Input />
                            </Item>
                        </Form> */}
                        <Button style={styles.buttonSubmit} block onPress={this._onSubmit}>
                            <Text  >Login </Text>
                        </Button>
                        <Button style={styles.buttonRegister} block onPress={this._register}>
                            <Text  >Register </Text>
                        </Button>
                        <View style={{flex:1,justifyContent:'center', alignItems:'center', marginTop:10}}>
                            <Text >OR </Text>
                        </View>
                        <GoogleSigninButton
                            style={{ width: 300, alignSelf:'center', height: 48, marginTop:10 }}
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Dark}
                            onPress={this._signInWithGoogleAccount}/>
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
        marginTop: 20,
    },
    buttonSubmit: {
        marginTop: 10,
        alignSelf: 'center',
        width:300
        
    },
    buttonRegister: {
        marginTop: 50,
        alignSelf: 'center',
        width:300
    },
    picture: {
      flex: 1,
      width: null,
      height: null,
      resizeMode: 'cover',
    },
    tform : {
        marginTop: 20,
        width:300,
        alignSelf: 'center',
        justifyContent: 'center',
    }
});

const mapStateToProps = (state) => {
    const { users } = state
    return { users }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
      addUser,signIn
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
