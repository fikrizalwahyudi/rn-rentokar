import React, { Component } from 'react';
import {View, ScrollView} from 'react-native';

import { Fab, Title, Textarea, Container, Content, List, ListItem, InputGroup, ScrollableTab, Tab, Tabs, Header,Icon, H3, H2, H1, Form, Item, Input, Label, Button, Text, Thumbnail, Left, Body, Right, Switch } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
// import { Icon } from 'native-base';
import * as utils from '../utils/RenderInput';
import * as uploader from '../utils/ImageUploader';
import * as dataServices from '../../services/DataServices';
import * as _ from 'lodash';
import Loader from '../utils/Loader';


class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'true',
      listProduct: []
    };
    var current = dataServices.getCurrentUser();
    
    dataServices.getProductById(current.uid).then((res)=>{
      this.setState({listProduct:res});
    })
  }
  
  render() {
    return (
      <Container >
        <Header hasTabs style={{paddingTop:15, backgroundColor:'#40c4ff'}} 
          androidStatusBarColor="#40c4ff">
          <Title>
            Product
          </Title>
        </Header>
        <MyTabs state={this.state} navigation={this.props.navigation}/>
        <Fab
          direction="up"
          containerStyle={{ }}
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          onPress={() => this.props.navigation.navigate("ProductForm")}>
          <Icon name="add" />
        </Fab>
      </Container>
    );
  }
}

class MyTabs extends Component {
  constructor(props){
    super(props);
    this.state = {
      listProduct:[]
    }
  }

  componentWillReceiveProps(nextProps) {
    // update original states
    // this.setState({listProduct})
    // console.log("props", nextProps.prop);
    // console.log("state", nextProps.state);
    this.setState(nextProps.state);
    this.props = nextProps.prop;
    console.log("ini props ", this.props)
  }

  render() {
    return(
      // <Container>
        
        <Tabs locked={false} onChangeTab={({i})=>{console.log(i)}}>
          <Tab heading="Published"  tabStyle={{backgroundColor: '#40c4ff'}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: '#40c4ff'}} activeTextStyle={{color: '#fff', fontWeight: 'normal'}} >
            <TabOne state={this.state} navigation={this.props.navigation}/>
          </Tab>
          <Tab heading="Unlisted"  tabStyle={{backgroundColor: '#40c4ff'}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: '#40c4ff'}} activeTextStyle={{color: '#fff', fontWeight: 'normal'}} >
            <TabTwo state={this.state} navigation={this.props.navigation}/>
          </Tab>
          <Tab heading="Draft"  tabStyle={{backgroundColor: '#40c4ff'}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: '#40c4ff'}} activeTextStyle={{color: '#fff', fontWeight: 'normal'}} >
            <TabThree state={this.state} navigation={this.props.navigation}/>
          </Tab>
        </Tabs>
      // </Container>
    )
  }
}

class TabOne extends Component {
  constructor(props){
    super(props);
    this.state = {
      listProduct:[]
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.state);
    // this.props = nextProps.prop;
    console.log("ini props 2", this.props);
    
  }

  render() {
    return (
      <ScrollView style={{marginLeft:10}}>
        <List>
          {
            this.state.listProduct.map((e, key)=>{
              e.bgColor = "#40c4ff";
              return(
                <ListItem thumbnail key={key}>
                  <Left>
                    <Thumbnail square source={{uri: e.coverImg}} />
                  </Left>
                  <Body>
                    <Text style={{fontWeight: 'bold'}}>{e.productName}</Text>
                    <Text numberOfLines={1}>{e.productDescription}</Text>
                    <Text note numberOfLines={1}>1 day ago</Text>
                  </Body>
                  <Right>
                    <Button transparent onPress={()=>this.props.navigation.navigate("ProductDetail", e)}>
                      <Text>Detail</Text>
                    </Button>
                  </Right>
                </ListItem>
              )
            })
          }
          
        </List>
      </ScrollView>
    )
  }
} 

class TabTwo extends Component {
  constructor(props){
    super(props);
    this.state = {
      listProduct:this.props.state.listProduct
    }
    console.log("ressssss", this.props);
    // this.setState(this.props.state);
  }


  render() {
    const prodArr = this.state.listProduct.filter(obj => obj.status === 2);
    return (
      <ScrollView style={{marginLeft:10}}>
        <List>
        {
            prodArr.map((e, key)=>{
              e.bgColor = "#40c4ff";
              return(
                <ListItem thumbnail key={key}>
                  <Left>
                    <Thumbnail square source={{uri: e.coverImg}} />
                  </Left>
                  <Body>
                    <Text style={{fontWeight: 'bold'}}>{e.productName}</Text>
                    <Text numberOfLines={1}>{e.productDescription}</Text>
                    <Text note numberOfLines={1}>1 day ago</Text>
                  </Body>
                  <Right>
                    <Button transparent onPress={()=>this.props.navigation.navigate("ProductDetail", e)}>
                      <Text>Detail</Text>
                    </Button>
                  </Right>
                </ListItem>
              )
            })
          }
        </List>
      </ScrollView>
    )
  }
} 

class TabThree extends Component {
  constructor(props){
    super(props);
    this.state = {
      listProduct:this.props.state.listProduct
    }
    console.log("ressssss", this.props);
    // this.setState(this.props.state);
  }

  // componentWillReceiveProps(nextProps) {
  //   this.setState(nextProps.state);
  //   // this.props = nextProps.prop;
  //   console.log("ini props 5", this.props);
    
  // }

  render() {
    const prodArr = this.state.listProduct.filter(obj => obj.status === 0);
    
    return (
      <ScrollView >
        <List >
          {
            prodArr.map((e, key)=>{
              e.bgColor = "#40c4ff";
              return(
                <ListItem thumbnail key={key}>
                  <Left>
                    <Thumbnail square source={{uri: e.coverImg}} />
                  </Left>
                  <Body>
                    <Text style={{fontWeight: 'bold'}}>{e.productName}</Text>
                    <Text numberOfLines={1}>{e.productDescription}</Text>
                    <Text note numberOfLines={1}>1 day ago</Text>
                  </Body>
                  <Right>
                    <Button transparent onPress={()=>this.props.navigation.navigate("ProductDetail", e)}>
                      <Text>Detail</Text>
                    </Button>
                  </Right>
                </ListItem>
              )
            })
          }
        </List>
      </ScrollView>
    )
  }
} 

export default Product;
