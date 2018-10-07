import React, { Component } from 'react';
import {View, ScrollView,TouchableOpacity} from 'react-native';

import {Card, CardItem, Title, Textarea, Container, Content, List, ListItem, InputGroup, ScrollableTab, Tab, Tabs, Header,Icon, H3, H2, H1, Form, Item, Input, Label, Button, Text, Thumbnail, Left, Body, Right, Switch } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import SwipeableParallaxCarousel from 'react-native-swipeable-parallax-carousel';

import StarRating from 'react-native-star-rating'

import Calendar from 'react-native-calendar-select';

import ItemReference from './components/ProductDetail/ItemReference';

const datacarousel = [
  {
      "id": 339964,
      "title": "Rp. 150.000/Hari",
      // "subtitle": "More than just a trend",
      "imagePath": "https://image.tmdb.org/t/p/w780/o6OhxtsgMurL4h68Uqei0aSPMNr.jpg",
  },
  {
      "id": 315635,
      "title": "Rp. 150.000/Hari",
      // "subtitle": "More than just a trend",
      "imagePath": "https://image.tmdb.org/t/p/w780/fn4n6uOYcB6Uh89nbNPoU2w80RV.jpg",
  }
];



class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(2017, 6, 12),  
      endDate: new Date(2017, 8, 2)
    };
    this.confirmDate = this.confirmDate.bind(this);
    this.openCalendar = this.openCalendar.bind(this);
  }

  confirmDate({startDate, endDate, startMoment, endMoment}) {
    this.setState({
      startDate,
      endDate
    });
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
                  Introducing Rentokar 
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
              data={datacarousel}
              navigation={true}
              navigationColor="white"
              />
              <View style={{paddingRight: 10, paddingBottom: 10,marginLeft: 10,}}>
              
              <List>
                <ListItem avatar noBorder>
                  <Left>
                    <Thumbnail source={require('../../assets/img/experiences.jpg')} />
                  </Left>
                  <Body>
                    <Text>Toko Fikrizal Wahyudi</Text>
                    <Text note>Depok</Text>
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
            <View style={{backgroundColor: 'grey', padding:15}}>
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
                {/* <ListItem icon>
                 
                  <Body>
                    <Text>Harga Sewa x 3 Hari</Text>
                  </Body>
                  <Right>
                    <Text>Rp 500.000</Text>
                  </Right>
                </ListItem>
                <ListItem icon>
                  <Body>
                    <Text>Total</Text>
                  </Body>
                  <Right>
                    <Text>Rp 500.000</Text>
                  </Right>
                </ListItem>
                <ListItem icon>
                  <Body>
                  <Item inlineLabel>
                    <Icon active name="quote"  />
                      <Input placeholder='Notes'/>
                    </Item>
                  </Body>
                  
                </ListItem>
                <List style={{paddingLeft: 20, padding:10}}>
                  
                  <Button block >
                    <Text>Submit</Text>
                  </Button>
                   
                </List> */}
              
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
            </View>
            <View style={{padding:10, marginLeft: 10,}}>
              <Text style={{ fontSize: 24, fontWeight: '700', color:'#757575'  }}>
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
              </View>
              <View style={{ borderTopColor: 'black', borderTopWidth: 0.5,marginTop: 15,marginRight: 5, }}>
                <Text style={{ fontSize: 24, fontWeight: '700', marginTop: 15,  color:'#757575'  }}>
                    Deskripsi Item
                </Text>
                <Text style={{marginLeft: 10,}}>
                  Jika Butuh Mobil Silah bulanan bisa hubungi ke nomor 08128123123
                  Jika Butuh Mobil Silah bulanan bisa hubungi ke nomor 08128123123
                  Jika Butuh Mobil Silah bulanan bisa hubungi ke nomor 08128123123
                </Text>
              </View>
              
             
            </View>
            <View style={{backgroundColor:"grey", paddingTop:5}}>
              <View style={{backgroundColor:"white", marginTop: 5,}}>
              <View style={{marginLeft: 10}}>
                <Text style={{ fontSize: 24, fontWeight: '700', marginTop: 15, marginLeft: 15, marginBottom: 10, color:'#757575'  }}>
                    Product Terkait
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
