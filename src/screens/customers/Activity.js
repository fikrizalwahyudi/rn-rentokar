import React, { Component } from 'react';
import { View, ScrollView} from 'react-native';

import {Title, Textarea, Container, Content, List, ListItem, InputGroup, ScrollableTab, Tab, Tabs, Header,Icon, H3, H2, H1, Form, Item, Input, Label, Button, Text, Thumbnail, Left, Body, Right, Switch } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

class Activity extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  render() {
    return (
      <Container >
        <Header hasTabs style={{paddingTop:15, backgroundColor:'#d32f2f'}} 
          androidStatusBarColor="#d32f2f">
          <Title>
            Activity
          </Title>
        </Header>
        <MyTabs />
      </Container>
    );
  }
}

class MyTabs extends Component {
  render() {
    return(
      // <Container>
        
        <Tabs locked={false}  >
          <Tab heading="Message" tabStyle={{backgroundColor: '#d32f2f'}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: '#d32f2f'}} activeTextStyle={{color: '#fff', fontWeight: 'normal'}} >
            <TabOne />
          </Tab>
          <Tab heading="Notification"  tabStyle={{backgroundColor: '#d32f2f'}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: '#d32f2f'}} activeTextStyle={{color: '#fff', fontWeight: 'normal'}} >
            <TabTwo />
          </Tab>
        </Tabs>
      // </Container>
    )
  }
}

class TabOne extends Component {
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

class TabTwo extends Component {
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

class TabThree extends Component {
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

export default Activity;
