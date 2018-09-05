import React, { Component } from 'react';
import { View } from 'react-native';

import {Button, Container, Header, Content, H1, H2, H3, Text, Input, Item, Left, Body, Right, Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import PhoneInput from 'react-native-phone-input'

class Verification extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  _submit = () =>{
    this.props.navigation.navigate('ConfirmationCode');
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
                            <PhoneInput offset={20} allowZeroAfterCountryCode={false}  textStyle={{fontSize:18}} initialCountry="id" ref='phone'/>
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
