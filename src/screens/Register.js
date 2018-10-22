import React, { Component } from 'react';
import { View } from 'react-native';
import {Button, Container, Header, Content, H1, H2, H3, Text, Input, Item, Left, Body, Right, Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import t from 'tcomb-form-native';
import * as _ from 'lodash';
import StyleSheet from './utils/Styles';
import * as dataServices from '../services/DataServices';
import Toast, {DURATION} from 'react-native-easy-toast';
import Loader from './utils/Loader';

import { connect } from 'react-redux';
import { addUser, signIn } from '../actions/UserAction';
import { bindActionCreators } from 'redux';


const TForm = t.form.Form;
const Email = t.refinement(t.String, email => {
    const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/; 
    return reg.test(email.toLowerCase());
});

const Password = t.refinement(t.String, password => {
    const reg = /^(?=\S+$).{8,}$/;
    console.log(password.length);
    return reg.test(password);
});

const FormRegister = t.struct({
    fullName: t.String,
    email: Email,
    password: Password,
    confirmPassword: Password
});

const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

stylesheet.textbox.normal.borderWidth = 0;
stylesheet.textbox.error.borderWidth = 0;
stylesheet.textbox.normal.marginBottom = 0;
stylesheet.textbox.error.marginBottom = 0;
stylesheet.controlLabel.normal.fontSize = 12;

stylesheet.textboxView.normal.borderWidth = 0;
stylesheet.textboxView.error.borderWidth = 0;
stylesheet.textboxView.normal.borderRadius = 0;
stylesheet.textboxView.error.borderRadius = 0;
stylesheet.textboxView.normal.borderBottomWidth = 1;
stylesheet.textboxView.error.borderBottomWidth = 1;
stylesheet.textboxView.normal.marginBottom = 5;
stylesheet.textboxView.error.marginBottom = 5;

const options = {
    stylesheet: stylesheet,
    auto: 'placeholders',
    fields: {
        fullName: {
            label: 'Full Name'
        },
        email: {
            label: 'Email',
            error: 'Insert a valid email'
        },
        password: {
            password: true,
            secureTextEntry: true,
            label: 'Password',
            error: 'Password minimum 8 character'
        },
        confirmPassword: {
            password: true,
            secureTextEntry:true,
            label: 'Confirm Password',
            error: 'Password didnt match'
        }
    }
};

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: false
    };
  }

    showLoader = () => {
        this.setState({ isLoading: true });
    };

    hideLoader = () =>{
        this.setState({ isLoading: false });
    }

  _onSubmit() {
    const value = this.refs.form.getValue();
    // var self = this;
    //   console.log(value); // value here is an instance of LoginFields
     if (value) { // if validation fails, value will be null
        if(value.password != value.confirmPassword){
            this.refs.toast.show('Password didnt match', 1000);
        }else {
            dataServices.registerWithEmailPassword(value).then((obj)=>{
                var profile = {
                    email:value.email.toLowerCase(),
                    id:obj.uid,
                    fullName:value.fullName,
                    photoURL:'https://firebase  storage.googleapis.com/v0/b/rentokar-58839.appspot.com/o/avatar_circle_blue_512dp.png?alt=media&token=aa864786-d125-4428-8a31-11d740093acc',
                    providerId:"firebase"
                }
                
                dataServices.createUsers(profile).then((obj)=>{
                    console.log("masuk create", obj);
                    // console.log("masuk");
                    // this.props.signIn(profile);
                    this.props.navigation.navigate('Verification');
                    // console.log("success create user", obj);
                }).catch((e)=>{
                    console.log("masuk errror", e);
                    // console.log("failed to create users");
                });
                
    
            }).catch((e)=>{
                // console.log(e);
            });
            console.log(value); // value here is an instance of LoginFields
        }
        
     }
  }
  

  render() {
    return (
        <Container>
            <Loader loading={this.state.isLoading} />
            <Toast ref="toast" position='bottom'/>
            <Header>
                <Left style={{flex: 1}}/>
                <Body style={{flex: 1, alignItems:'center'}}>
                    <Title>Register</Title>
                </Body>
                <Right style={{flex: 1}}/>
            </Header>
            <Content style={StyleSheet.content}>
                <View >
                    <TForm ref="form" type={FormRegister} options={options} /> 
                    <Button block onPress={this._onSubmit.bind(this)}>
                        <Text >Submit </Text>
                    </Button>
                </View>
            </Content>
        </Container>
    );
  }
}

const mapStateToProps = (state) => {
    const { users } = state
    return { users }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
      addUser,signIn
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Register);
