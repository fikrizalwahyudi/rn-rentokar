import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import {Button, Container, Header, Content, H1, H2, H3, H4, Text, Input, Item, Left, Body, Right, Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import CodeInput from 'react-native-confirmation-code-input';

import * as dataServices from '../services/DataServices';

import { connect } from 'react-redux';
import firebase from 'react-native-firebase'

class Confirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.userId = "";
    this.phoneNumber = this.props.navigation.getParam('phoneNumber', 'Undefined');
    // console.log("ini ", this.props.state.users.id);
    console.log("ini ,", this.phoneNumber);
    var self = this;
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            self.userId = user.uid;
            console.log("ini ", self.userId);
          // self.props.navigation.navigate('App');
        } 
    });
  }

//   sumbitCode = (code) =>{
//     // var obj = {
//     //     phoneNumber:this.phoneNumber,
//     //     code:code,
//     //     id:this.userId
//     // }
//     dataServices.updatePhoneVerification(this.userId).then((r)=>{
//         this.props.navigation.navigate(r);
//     });
//   }

  _onFinishCheckingCode = (isValid, code) =>{
      
      console.log("ini user id ", this.userId);
      if(isValid){
        // var obj = {
        //     phoneNumber:this.phoneNumber,
        //     code:code,
        //     id:this.userId
        // }
        var self = this;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                dataServices.updatePhoneVerification(user.uid).then((r)=>{
                    self.props.navigation.navigate(r);
                });
            } 
        });
        
      }else{
          alert("Maaf code yang anda masukan salah")
      }
  }

  render() {
    return (
        <Container>
            <Header>
                <Left style={{flex: 1}}/>
                <Body style={{flex: 1, alignItems:'center'}}>
                    <Title>Confirmation</Title>
                </Body>
                <Right style={{flex: 1}}/>
            </Header>
            <Content >
                <Grid style={{marginTop:30}} >
                    <Col>
                        <H3 style={{padding:20, alignSelf: 'center',textAlign:'center'}}>We sent you a code to verify your phone number </H3 >
                        <Text style={{padding:10, alignSelf: 'center', color:'#c9d0db'}}>Sent to {this.phoneNumber} </Text>
                        
                            <CodeInput
                            ref="codeInputRef2"
                            keyboardType="numeric"
                            codeLength={5}
                            className={'border-circle'}
                            compareWithCode='12345'
                            autoFocus={false}
                            codeInputStyle={{ fontWeight: '800' }}
                            activeColor='rgba(49, 180, 4, 1)'
                            inactiveColor='rgba(49, 180, 4, 1.3)'
                            onFulfill={(isValid, code) => this._onFinishCheckingCode(isValid, code)}
                            />
                        {/* <Button onPress={this.sumbitCode} style={{width:300,marginTop:20, alignSelf:'center'}} block >
                            <Text>Submit</Text>
                        </Button> */}
                    </Col>
                </Grid>
                
                
            </Content>
        </Container>
    );
  }
}

const styles = StyleSheet.create({
    
    inputLabel3: {
      color: 'black',
      fontSize: 14,
      fontWeight: '800',
      textAlign: 'center'
    }
});

const mapStateToProps = (state, props) => {
    // console.log("tessss", state);
    return {
        state, props
    } 
};

export default connect(mapStateToProps)(Confirmation);
// export default Confirmation;
