import React, { Component } from 'react';
import {View, ScrollView,TouchableOpacity} from 'react-native';

import {Card, CardItem, Title, Textarea, Container, Content, List, ListItem, InputGroup, ScrollableTab, Tab, Tabs, Header,Icon, H3, H2, H1, Form, Item, Input, Label, Button, Text, Thumbnail, Left, Body, Right, Switch } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import * as _ from 'lodash';

import SwipeableParallaxCarousel from 'react-native-swipeable-parallax-carousel';

import StarRating from 'react-native-star-rating'

import Calendar from 'react-native-calendar-select';

import ItemReference from './components/ProductDetail/ItemReference';

import * as utils from '../utils/RenderInput';
import * as uploader from '../utils/ImageUploader';
import * as dataServices from '../../services/DataServices';
import * as _ from 'lodash';
import Loader from '../utils/Loader';



class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(2017, 6, 12),  
      endDate: new Date(2017, 8, 2),
      data:{},
      vendorProfile:{}
    };
    this.confirmDate = this.confirmDate.bind(this);
    this.openCalendar = this.openCalendar.bind(this);
    this.datacarousel = [];

    if(this.props.navigation.state.params != undefined){
      
      this.props.navigation.state.params.image.forEach(element => {
        this.datacarousel.push({
          "id": element,
          "title": "Rp. "+ this.props.navigation.state.params.price,
          // "subtitle": "More than just a trend",
          "imagePath": element,
        })
      });
      // console.log("uid ", this.props.navigation.state.params.uid)
      var uid = this.props.navigation.state.params.uid;
      dataServices.getProfileById(uid).then((res)=>{
        this.setState({vendorProfile:res});
      }).catch((err)=>{
        console.log(err);
      })
    }
    
  }

  confirmDate({startDate, endDate, startMoment, endMoment}) {
    this.setState({
      startDate,
      endDate
    });
  }

  async componentDidMount() {
    this.setState({data:this.props.navigation.state.params});
    
    
    console.log("params ", this.props.navigation.state.params);
    
  }

  openCalendar() {
    this.calendar && this.calendar.open();
  }
  
  render() {
    let customI18n = {
      'w': ['', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'],
      'weekday': ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      'text': {
        'start': 'Start',
        'end': 'End',
        'date': 'Date',
        'save': 'Confirm',
        'clear': 'Reset'
      },
      'date': 'DD / MM'  // date format
    };
    // optional property, too.
    let color = {
      subColor: '#f0f0f0'
    };
    return (
      <Container>
        
        <Content >
        
            
          <ScrollView >
          <View style={{padding:10, marginLeft: 10,}}>
              <Text style={{marginTop: 10,fontSize:10, color:'red'}}>
                Automotive & Industrial / Motor
              </Text>
              <Text style={{ fontSize: 24, fontWeight: '700', color:'#757575' }}>
                {this.state.data.productName}
              </Text>
              <Grid>
                <Row style={{marginTop:10}}>
                  <Col size={20}>
                  <StarRating
                    disable={true}
                    maxStars={5}
                    rating={4}
                    starSize={20}
                    fullStarColor="red" />
                  </Col>
                  <Col size={20}>
                  </Col>
                  <Col size={40}>
                  
                  </Col>
                  <Col size={20}>
                    <TouchableOpacity >
                      <Icon name="bookmarks" size={25} style={{ color:'blue', alignSelf:'center'}} />
                    </TouchableOpacity>
                  </Col>
                </Row>
              </Grid>
              
            </View>
          <SwipeableParallaxCarousel 
              titleColor="white" 
              parallax={true} 
              data={this.datacarousel}
              navigation={true}
              navigationColor="white"
              />
              <View style={{paddingRight: 10, paddingBottom: 10,marginLeft: 10,}}>
              
              <List>
                <ListItem avatar noBorder>
                  <Left>
                    <Thumbnail source={{uri:this.state.vendorProfile.photoURL}} />
                  </Left>
                  <Body>
                    <Text>{this.state.vendorProfile.fullName}</Text>
                    <Text note>{this.state.data.city}</Text>
                  </Body>
                  <Right>
                    <Text note>Last Online 03:30</Text>
                    <Button small bordered primary iconLeft>
                    <Icon name="chatbubbles"  />
                    <Text>Chat</Text>
                  </Button>
                  </Right>
                </ListItem>
              </List>
            </View>
            {/* <View style={{backgroundColor: 'grey', padding:15}}>
              <Card  style={{paddingRight:  10}}> 
                <List>
                  <ListItem style={{ flex: 1, justifyContent: 'center'}}>
                  <TouchableOpacity>
                    <Button  small  bordered primary iconLeft onPress={this.openCalendar}>
                      <Icon name="calendar"  />
                      <Text>Order Sekarang</Text>
                    </Button>
                    </TouchableOpacity>
                   
                  </ListItem>
                </List>
                <Calendar
                  i18n="en"
                  ref={(calendar) => {this.calendar = calendar;}}
                  customI18n={customI18n}
                  color={color}
                  format="YYYYMMDD"
                  minDate="20170510"
                  maxDate="20180312"
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                  onConfirm={this.confirmDate}
                /> 
              </Card>
            </View> */}
            <View style={{padding:10, marginLeft: 10,}}>
              {/* <Text style={{ fontSize: 24, fontWeight: '700', color:'#757575'  }}>
                  Spesifikasi
              </Text>
              <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', flexGrow: 0}}>
                
                  <View style={{flexBasis: '25%', alignItems: 'center' ,marginTop:10 }} >
                    <Icon name="calendar"  />
                    <Text style={{textAlign: 'center'}}>Berat Bersih</Text>
                    <Text style={{textAlign: 'center'}}>10Kg   </Text>
                  </View>
                  <View style={{flexBasis: '25%', alignItems: 'center' ,marginTop:10 }} >
                    <Icon name="calendar"  />
                    <Text>10Kg</Text>
                  </View>
                  <View style={{flexBasis: '25%', alignItems: 'center' ,marginTop:10 }} >
                    <Icon name="calendar"  />
                    <Text>10Kg</Text>
                  </View>
                  <View style={{flexBasis: '25%', alignItems: 'center' ,marginTop:10 }} >
                    <Icon name="calendar"  />
                    <Text>10Kg</Text>
                  </View>
                  <View style={{flexBasis: '25%', alignItems: 'center' ,marginTop:10 }} >
                    <Icon name="calendar"  />
                    <Text>10Kg</Text>
                  </View>
                  <View style={{flexBasis: '25%', alignItems: 'center' ,marginTop:10 }} >
                    <Icon name="calendar"  />
                    <Text>10Kg</Text>
                  </View>
                  <View style={{flexBasis: '25%', alignItems: 'center' ,marginTop:10 }} >
                    <Icon name="calendar"  />
                    <Text>10Kg</Text>
                  </View>
              </View> */}
              {/* <View style={{ borderTopColor: 'black', borderTopWidth: 0.5,marginTop: 15,marginRight: 5, }}>
                <Text style={{ fontSize: 24, fontWeight: '700', marginTop: 15,  color:'#757575'  }}>
                    Deskripsi Item
                </Text>
                <Text style={{marginLeft: 10,}}>
                  Jika Butuh Mobil Silah bulanan bisa hubungi ke nomor 08128123123
                  Jika Butuh Mobil Silah bulanan bisa hubungi ke nomor 08128123123
                  Jika Butuh Mobil Silah bulanan bisa hubungi ke nomor 08128123123
                </Text>
              </View> */}
              <View >
                <Text style={{ fontSize: 24, fontWeight: '700',  color:'#757575'  }}>
                    Deskripsi Item
                </Text>
                <Text style={{marginLeft: 10,}}>
                  {this.state.data.productDescription}
                </Text>
              </View>
            </View>

            <View style={{backgroundColor:"grey", paddingTop:10}}>
              <View style={{backgroundColor:"white", padding:10 }}>
                <Text style={{ fontSize: 24, fontWeight: '700', color:'#757575', marginLeft: 10  }}>
                    Order Sekarang
                </Text>
                <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', flexGrow: 0, marginLeft: 10, marginTop: 10, marginBottom: -10}}>
                  <Button  small  bordered primary iconLeft onPress={this.openCalendar}>
                    <Icon name="calendar"  />
                    <Text>Pilih Tanggal</Text>
                  </Button>
                </View>    
                
                <OrderForm />
                
              </View>
            </View>

            <View style={{backgroundColor:"grey", paddingTop:5}}>
              <View style={{backgroundColor:"white", marginTop: 5,}}>
              <View style={{marginLeft: 10}}>
                <Text style={{ fontSize: 24, fontWeight: '700', marginTop: 15, marginLeft: 15, marginBottom: 10, color:'#757575'  }}>
                    Produk Terkait
                </Text>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >   
                <ItemReference width={20}
                    name="The Cozy Place"
                    type="PRIVATE ROOM - 2 BEDS"
                    price={82}
                    rating={4}
                    
                />
                <ItemReference width={20}
                    name="The Cozy Place"
                    type="PRIVATE ROOM - 2 BEDS"
                    price={82}
                    rating={4}
                />
                <ItemReference width={20}
                    name="The Cozy Place"
                    type="PRIVATE ROOM - 2 BEDS"
                    price={82}
                    rating={4}
                />
                <ItemReference width={20}
                    name="The Cozy Place"
                    type="PRIVATE ROOM - 2 BEDS"
                    price={82}
                    rating={4}
                />
                <ItemReference width={20}
                    name="The Cozy Place"
                    type="PRIVATE ROOM - 2 BEDS"
                    price={82}
                    rating={4}
                />
                    
                    
                </ScrollView>
              </View>
              </View>
            </View>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}


export default ProductDetail;
