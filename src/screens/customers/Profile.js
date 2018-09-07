import React, { Component } from 'react';
import { TouchableOpacity, View, ScrollView} from 'react-native';

import {Textarea, Container, Content, List, ListItem, InputGroup, ScrollableTab, Tab, Tabs, Header,Icon, H3, H2, H1, Form, Item, Input, Label, Button, Text, Thumbnail, Left, Body, Right, Switch } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

import { connect } from 'react-redux';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  _signOut = async () => {
    try {
    //   await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ userInfo: null, error: null });
      this.props.navigation.navigate('Login');
    } catch (error) {
      this.setState({
        error,
      });
    }
  };
  
  render() {
    return (
      <Container >
        <Content>
          <Grid style={{backgroundColor:'#de1587',height:220}}>
            <Row style={{marginTop:10}}>
              <Col size={15}>
              </Col>
              <Col size={70}>
                <H2 style={{marginTop:15,alignSelf:'center', color:'white'}}>Fikrizal</H2>      
              </Col>
              <Col size={15}>
                <TouchableOpacity onPress={this._signOut}>
                  <Icon name="exit" size={20} style={{ color:'white', alignSelf:'center'}} />
                </TouchableOpacity>
                
              </Col>
            </Row>
            <Row >
              <Col>
                <Thumbnail source={require('../../assets/img/logo-black.png')} style={{marginTop:-50,alignSelf:'center', width:120, height:120}}/>
              </Col>
            </Row>
          </Grid>
          
        </Content>
        <MyTabs />
        
      </Container>
    );
  }
}

class MyTabs extends Component {
  render() {
    return(
      // <Container>
        <Tabs locked={false} style={{marginTop:-200}}>
          <Tab heading="Profile" tabStyle={{backgroundColor: '#de1587'}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: '#de1587'}} activeTextStyle={{color: '#fff', fontWeight: 'normal'}}>
            <TabProfile />
          </Tab>
          <Tab heading="Info Bank" tabStyle={{backgroundColor: '#de1587'}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: '#de1587'}} activeTextStyle={{color: '#fff', fontWeight: 'normal'}}>
            <TabBank />
          </Tab>
          <Tab heading="Settings" tabStyle={{backgroundColor: '#de1587'}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: '#de1587'}} activeTextStyle={{color: '#fff', fontWeight: 'normal'}}>
            <TabSettings />
          </Tab>
        </Tabs>
      // </Container>
    )
  }
}

class TabProfile extends Component {
  render() {
    return (
      <ScrollView style={{marginLeft:10}}>
        <Item stackedLabel>
          <Label>Full Name</Label>
          <Input disabled value="Fikrizal Wahyudi"/>
        </Item>
        <Item stackedLabel>
          <Label>Email</Label>
          <Input disabled value="fikrizal@rentokar.com"/>
        </Item>
        <Item stackedLabel>
          <Label>Phone Number</Label>
          <Input disabled value="+6281286159467"/>
        </Item>
        <Item stackedLabel>
          <Label>Address</Label>
          <Textarea disabled value="Bukit Pabuaran Indah Blok L3 No 19 Cibinong Jawa Barat"/>
        </Item>
      </ScrollView>
    )
  }
} 

class TabBank extends Component {
  render() {
    return (
      <ScrollView style={{marginLeft:10}}>
        <Item stackedLabel>
          <Label>Bank</Label>
          <Input disabled value="BCA"/>
        </Item>
        <Item stackedLabel>
          <Label>Atas Nama</Label>
          <Input disabled value="Fikrizal Wahyudi"/>
        </Item>
        <Item stackedLabel>
          <Label>Nomor Rekening</Label>
          <Input disabled value="8330055236"/>
        </Item>
      </ScrollView>
    )
  }
} 

class TabSettings extends Component {
  render() {
    return (
      <ScrollView >
        <List >
          <ListItem >
            <Left>
              <Text>Change Password</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem>
            <Left>
              <Text>Change Phone Number</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem>
            <Left>
              <Text>FAQ</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem>
            <Left>
              <Text>Syarat dan Ketentuan</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem>
            <Left>
              <Text>Ketentuan Hukum</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem>
            <Left>
              <Text>Kebijakan Privasi</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem>
            <Left>
              <Text>Tentang Aplikasi</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem>
            <Left>
              <Text>Logout</Text>
            </Left>
            <Right>
              <Icon name="arrow-forward" />
            </Right>
          </ListItem>
        </List>
      </ScrollView>
    )
  }
} 

const mapStateToProps = (state) => {
  const { users } = state
  return { users }
};

export default connect(mapStateToProps)(Profile);
