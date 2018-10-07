import React, { Component } from 'react';
import {View, ScrollView} from 'react-native';

import {Title, Textarea, Container, Content, List, ListItem, InputGroup, ScrollableTab, Tab, Tabs, Header,Icon, H3, H2, H1, Form, Item, Input, Label, Button, Text, Thumbnail, Left, Body, Right, Switch } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

class Inquiry extends Component {
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
            Transaksi
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
        
        <Tabs locked={false} >
          <Tab heading="Menunggu"  tabStyle={{backgroundColor: '#d32f2f'}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: '#d32f2f'}} activeTextStyle={{color: '#fff', fontWeight: 'normal'}} >
            <TabOne />
          </Tab>
          <Tab heading="Masa Sewa"  tabStyle={{backgroundColor: '#d32f2f'}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: '#d32f2f'}} activeTextStyle={{color: '#fff', fontWeight: 'normal'}} >
            <TabTwo />
          </Tab>
          <Tab heading="Riwayat"  tabStyle={{backgroundColor: '#d32f2f'}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: '#d32f2f'}} activeTextStyle={{color: '#fff', fontWeight: 'normal'}} >
            <TabThree />
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
        <List>
          <ListItem thumbnail>
            <Left>
              <Thumbnail square source={require('../../assets/img/experiences.jpg')} />
            </Left>
            <Body>
              <Text style={{fontWeight: 'bold'}}>Sepeda Gunung</Text>
              <Text numberOfLines={1}>Waiting for Confirmation</Text>
              <Text note numberOfLines={1}>1 day ago</Text>
            </Body>
            <Right>
              <Button transparent>
                <Text>Detail</Text>
              </Button>
            </Right>
          </ListItem>
          <ListItem thumbnail>
            <Left>
              <Thumbnail square source={require('../../assets/img/experiences.jpg')} />
            </Left>
            <Body>
              <Text style={{fontWeight: 'bold'}}>Sepeda Gunung</Text>
              <Text numberOfLines={1}>Waiting for Confirmation</Text>
              <Text note numberOfLines={1}>1 day ago</Text>
            </Body>
            <Right>
              <Button transparent>
                <Text>Detail</Text>
              </Button>
            </Right>
          </ListItem>
          <ListItem thumbnail>
            <Left>
              <Thumbnail square source={require('../../assets/img/experiences.jpg')} />
            </Left>
            <Body>
              <Text style={{fontWeight: 'bold'}}>Sepeda Gunung</Text>
              <Text numberOfLines={1}>Waiting for Confirmation</Text>
              <Text note numberOfLines={1}>1 day ago</Text>
            </Body>
            <Right>
              <Button transparent>
                <Text>Detail</Text>
              </Button>
            </Right>
          </ListItem>
          <ListItem thumbnail>
            <Left>
              <Thumbnail square source={require('../../assets/img/experiences.jpg')} />
            </Left>
            <Body>
              <Text style={{fontWeight: 'bold'}}>Sepeda Gunung</Text>
              <Text numberOfLines={1}>Waiting for Confirmation</Text>
              <Text note numberOfLines={1}>1 day ago</Text>
            </Body>
            <Right>
              <Button transparent>
                <Text>Detail</Text>
              </Button>
            </Right>
          </ListItem>
          <ListItem thumbnail>
            <Left>
              <Thumbnail square source={require('../../assets/img/experiences.jpg')} />
            </Left>
            <Body>
              <Text style={{fontWeight: 'bold'}}>Sepeda Gunung</Text>
              <Text numberOfLines={1}>Waiting for Confirmation</Text>
              <Text note numberOfLines={1}>1 day ago</Text>
            </Body>
            <Right>
              <Button transparent>
                <Text>Detail</Text>
              </Button>
            </Right>
          </ListItem>
          <ListItem thumbnail>
            <Left>
              <Thumbnail square source={require('../../assets/img/experiences.jpg')} />
            </Left>
            <Body>
              <Text style={{fontWeight: 'bold'}}>Sepeda Gunung</Text>
              <Text numberOfLines={1}>Waiting for Confirmation</Text>
              <Text note numberOfLines={1}>1 day ago</Text>
            </Body>
            <Right>
              <Button transparent>
                <Text>Detail</Text>
              </Button>
            </Right>
          </ListItem>
          <ListItem thumbnail>
            <Left>
              <Thumbnail square source={require('../../assets/img/experiences.jpg')} />
            </Left>
            <Body>
              <Text style={{fontWeight: 'bold'}}>Sepeda Gunung</Text>
              <Text numberOfLines={1}>Waiting for Confirmation</Text>
              <Text note numberOfLines={1}>1 day ago</Text>
            </Body>
            <Right>
              <Button transparent>
                <Text>Detail</Text>
              </Button>
            </Right>
          </ListItem>
          <ListItem thumbnail>
            <Left>
              <Thumbnail square source={require('../../assets/img/experiences.jpg')} />
            </Left>
            <Body>
              <Text style={{fontWeight: 'bold'}}>Sepeda Gunung</Text>
              <Text numberOfLines={1}>Waiting for Confirmation</Text>
              <Text note numberOfLines={1}>1 day ago</Text>
            </Body>
            <Right>
              <Button transparent>
                <Text>Detail</Text>
              </Button>
            </Right>
          </ListItem>
        </List>
      </ScrollView>
    )
  }
} 

class TabTwo extends Component {
  render() {
    return (
      <ScrollView style={{marginLeft:10}}>
        <List>
        <ListItem thumbnail>
            <Left>
              <Thumbnail square source={require('../../assets/img/experiences.jpg')} />
            </Left>
            <Body>
              <Text style={{fontWeight: 'bold'}}>Sepeda Gunung</Text>
              <Text numberOfLines={1}>Waiting for Confirmation</Text>
              <Text note numberOfLines={1}>1 day ago</Text>
            </Body>
            <Right>
              <Button transparent>
                <Text>Detail</Text>
              </Button>
            </Right>
          </ListItem>
          <ListItem thumbnail>
            <Left>
              <Thumbnail square source={require('../../assets/img/experiences.jpg')} />
            </Left>
            <Body>
              <Text style={{fontWeight: 'bold'}}>Sepeda Gunung</Text>
              <Text numberOfLines={1}>Waiting for Confirmation</Text>
              <Text note numberOfLines={1}>1 day ago</Text>
            </Body>
            <Right>
              <Button transparent>
                <Text>Detail</Text>
              </Button>
            </Right>
          </ListItem>
        </List>
      </ScrollView>
    )
  }
} 

class TabThree extends Component {
  render() {
    return (
      <ScrollView >
        <List >
        <ListItem thumbnail>
            <Left>
              <Thumbnail square source={require('../../assets/img/experiences.jpg')} />
            </Left>
            <Body>
              <Text style={{fontWeight: 'bold'}}>Sepeda Gunung</Text>
              <Text numberOfLines={1}>Waiting for Confirmation</Text>
              <Text note numberOfLines={1}>1 day ago</Text>
            </Body>
            <Right>
              <Button transparent>
                <Text>Detail</Text>
              </Button>
            </Right>
          </ListItem>
          <ListItem thumbnail>
            <Left>
              <Thumbnail square source={require('../../assets/img/experiences.jpg')} />
            </Left>
            <Body>
              <Text style={{fontWeight: 'bold'}}>Sepeda Gunung</Text>
              <Text numberOfLines={1}>Waiting for Confirmation</Text>
              <Text note numberOfLines={1}>1 day ago</Text>
            </Body>
            <Right>
              <Button transparent>
                <Text>Detail</Text>
              </Button>
            </Right>
          </ListItem>
        </List>
      </ScrollView>
    )
  }
} 

export default Inquiry;
