import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import {Button, Container, Header, Content, H1, H2, H3, H4, Text, Input, Item, Left, Body, Right, Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import CodeInput from 'react-native-confirmation-code-input';

class Confirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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
                        <Text style={{padding:10, alignSelf: 'center', color:'#c9d0db'}}>Sent to +6281286159467</Text>
                        
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
                            onFulfill={(isValid, code) => this._onFinishCheckingCode2(isValid, code)}
                            />
                        <Button  style={{width:300,marginTop:20, alignSelf:'center'}} block >
                            <Text>Submit</Text>
                        </Button>
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

export default Confirmation;
