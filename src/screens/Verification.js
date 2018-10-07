import React, { Component } from 'react';
import { View } from 'react-native';

import {Button, Container, Header, Content, H1, H2, H3, Text, Input, Item, Left, Body, Right, Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import PhoneInput from 'react-native-phone-input'
import md5 from "react-native-md5";

class Verification extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.phone;
  }

  _submit = () =>{
    // this.props.navigation.navigate('ConfirmationCode');
    // let hex_md5v = md5.hex_md5( Date.now() +"" );
    // console.log(">>>>hex_md5:", hex_md5v);
    console.log(this.phone.getValue());
    var phoneNumber = this.phone.getValue().replace("+62", "0");
    fetch('https://secure.gosmsgateway.com/api/Send.php?username=rentokar&mobile='+phoneNumber+'&message=Confirmation Code from Rentokar 12345 &password=gosms28382', {
         method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
         console.log(responseJson);
         if(responseJson == 1701){
            this.props.navigation.navigate('ConfirmationCode', {phoneNumber:phoneNumber});
         }else {

         }
        //  this.setState({
        //     data: responseJson
        //  })
      })
      .catch((error) => {
         console.error(error);
    });
    // console.log(this.phone.getValue());
    
  }


  render() {
    return (
        <Container>
            <Header>
                <Left style={{flex: 1}}/>
                <Body style={{flex: 1, alignItems:'center'}}>
                    <Title>Verification</Title>
                </Body>
                <Right style={{flex: 1}}/>
            </Header>
            <Content >
                <Grid style={{marginTop:30}}>
                    <Col>
                        <H3 style={{padding:20, alignSelf: 'center',}}>What's your phone number ?</H3 >
                        <Item fixedLabel style={{alignSelf: 'center', padding:10, marginLeft:40, marginRight:40}}>
                            <PhoneInput offset={20} allowZeroAfterCountryCode={false}  textStyle={{fontSize:18}} initialCountry="id" ref={(ref) => { this.phone = ref; }}/>
                        </Item>
                        <Button  style={{width:300,marginTop:20, alignSelf:'center'}} block onPress={this._submit}>
                            <Text>Submit</Text>
                        </Button>
                    </Col>
                </Grid>
                
            </Content>
        </Container>
    );
  }
}

export default Verification;
