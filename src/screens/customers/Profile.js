import React, { Component } from 'react';
import {Platform, TouchableOpacity, View, ScrollView} from 'react-native';
import Avatar from 'react-native-interactive-avatar';
import {Textarea, Container, Content, List, ListItem, InputGroup, ScrollableTab, Tab, Tabs, Header,Icon, H3, H2, H1, Form, Item, Input, Label, Button, Text, Thumbnail, Left, Body, Right, Switch } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import firebase from 'react-native-firebase';

import * as ImagePick from 'react-native-image-picker';
import ImagePicker  from 'react-native-image-crop-picker';
// import RNFetchBlob from 'rn-fetch-blob'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addUser, signIn, switchToVendor } from '../../actions/UserAction';

import * as dataServices from '../../services/DataServices';


// const Blob = RNFetchBlob.polyfill.Blob;
// const fs = RNFetchBlob.fs;
// window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
// window.Blob = Blob;

// const dataProfile = {}

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVendor:false
    };

    
    // this.dataProfile = this.props.state.users;
    // console.log("data profile ", this.dataProfile);
  }
  
  pickImageHandler = () => {
    ImagePick.showImagePicker({title: "Pick an Image", maxWidth: 800, maxHeight: 600}, res => {
      if (res.didCancel) {
        // console.log("User cancelled!");
      } else if (res.error) {
        // console.log("Error", res.error);
      } else {
        ImagePicker.openCropper({
          path: res.uri.toString(),
          width: 300,
          height: 400
        }).then(image => {
          uploadImage(image);
        });
        // uploadImage(res.uri);
 
      }
    });
  }
  

  
  

  _signOut = async () => {
    try {
      await firebase.auth().signOut();
      GoogleSignin.signOut();
      this.setState({ userInfo: null, error: null });
      this.props.navigation.navigate('Login');
    } catch (error) {
      this.setState({
        error,
      });
    }
  };

  switchMode = async() =>{
    if(!this.props.state.users.isVendor){
      this.props.switchToVendor({isVendor:true});
      bgColor = '#40c4ff';
      this.props.navigation.navigate('Vendor');
    }else{
      this.props.switchToVendor({isVendor:false});
      bgColor = '#d32f2f';
      this.props.navigation.navigate('App');
    }
    // try {
    //   // await firebase.auth().signOut();
    //   // GoogleSignin.signOut();
    //   // this.setState({ userInfo: null, error: null });
      
    // } catch (error) {
    //   this.setState({
    //     error,
    //   });
    // }
  }

  // switchCustomer = async() =>{
  //   try {
  //     // await firebase.auth().signOut();
  //     // GoogleSignin.signOut();
  //     // this.setState({ userInfo: null, error: null });
  //     this.props.switchToVendor({isVendor:false});
  //     await this.props.navigation.navigate('App');
  //   } catch (error) {
  //     this.setState({
  //       error,
  //     });
  //   }
  // }
  
  render() {
    let bgColor = "#d32f2f";
    if(this.props.state.users.isVendor){
      bgColor = '#40c4ff';
    }
    return (
      <Container >
        <Content>
          <Grid style={{backgroundColor:bgColor,height:220}}>
            <Row style={{marginTop:10}}>
              <Col size={15}>
                <TouchableOpacity onPress={this.switchMode}>
                  <Icon name="swap" size={20} style={{ color:'white', alignSelf:'center'}} />
                </TouchableOpacity>
              </Col>
              <Col size={70}>
                <TouchableOpacity onPress={this.pickImageHandler} >
                  <Thumbnail source={{uri: this.props.state.users.photoURL}}  style={{borderColor:'white', borderRadius:100, borderWidth:5, marginTop:0,alignSelf:'center', width:120, height:120}}/>
                </TouchableOpacity>
              </Col>
              <Col size={15}>
                <TouchableOpacity onPress={this._signOut}>
                  <Icon name="exit" size={20} style={{ color:'white', alignSelf:'center'}} />
                </TouchableOpacity>
              </Col>
            </Row>
            <Row >
              <Col >
                <H2 style={{marginTop:25,alignSelf:'center', color:'white'}}>{this.props.state.users.fullName}</H2>      
              </Col>
            </Row>
          </Grid>
          
        </Content>
        
        <MyTabs bgColor={bgColor}/>
        
      </Container>
    );
  }
}

class MyTabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    
  }
  render() {
    return(
      // <Container>
        <Tabs locked={false} style={{marginTop:-200}}>
          <Tab heading="Profile" tabStyle={{backgroundColor: this.props.bgColor}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: this.props.bgColor}} activeTextStyle={{color: '#fff', fontWeight: 'normal'}}>
            <TabProfile />
          </Tab>
          <Tab heading="Info Bank" tabStyle={{backgroundColor: this.props.bgColor}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: this.props.bgColor}} activeTextStyle={{color: '#fff', fontWeight: 'normal'}}>
            <TabBank />
          </Tab>
          <Tab heading="Settings" tabStyle={{backgroundColor: this.props.bgColor}} textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: this.props.bgColor}} activeTextStyle={{color: '#fff', fontWeight: 'normal'}}>
            <TabSettings />
          </Tab>
        </Tabs>
      // </Container>
    )
  }
}

class TabProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    var current = dataServices.getCurrentUser();
    console.log("current", current.uid);
    dataServices.checkUser({id:current.uid}).then((res)=>{
      this.setState(res);
    }).catch((err)=>{
      console.log(err);
    })
  }
  render() {
    return (
      <ScrollView style={{marginLeft:10}}>
        <Item stackedLabel>
          <Label>Full Name</Label>
          <Input disabled value={this.state.fullName}/>
        </Item>
        <Item stackedLabel>
          <Label>Email</Label>
          <Input disabled value={this.state.email}/>
        </Item>
        <Item stackedLabel>
          <Label>Phone Number</Label>
          <Input disabled value="+6281286159467"/>
        </Item>
        <Item stackedLabel>
          <Label>Address</Label>
          <Textarea disabled value="Not Set"/>
        </Item>
      </ScrollView>
    )
  }
} 

class TabBank extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
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
  constructor(props) {
    super(props);
    this.state = {
    };
  }
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



const uploadImage = (uri, mime = 'application/octet-stream') => {
  return new Promise((resolve, reject) => {
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
      let currentUser = firebase.auth().currentUser;
      const sessionId = new Date().getTime();
      let uploadBlob = null;
      const imageRef = firebase.storage().ref('images').child(`${currentUser.uid}.jpg`);
      imageRef.put(uri, { contentType: mime }).then((res=>{
        console.log(res);
        storeReference(res.downloadURL, sessionId);
      }));
  })
}

const storeReference = (downloadUrl, sessionId) => {
  let imageRef = firebase.storage().ref('profilePicture').child('profileFile')
  let currentUser = firebase.auth().currentUser
  let image = {
    type: 'image',
    url: downloadUrl,
    createdAt: sessionId,
    user: {
      id: currentUser.uid,
      email: currentUser.email
    }
  }

  var obj={
    photoURL:downloadUrl
  }

  dataServices.updateProfile(obj, currentUser.uid).then((res)=>{
    console.log("success ");
    this.props.state.users.photoURL = downloadUrl;
  }).catch((error)=>{
    console.log(error);
  })
  // firebase.database().ref('users').push(image);
}



const mapStateToProps = (state, props) => {
  return {
      state, props
  } 
};

// export default connect(mapStateToProps)(Explore);

// const mapStateToProps = (state) => {
//     const { users } = state
//     return { users }
// };

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    addUser,signIn,switchToVendor
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

