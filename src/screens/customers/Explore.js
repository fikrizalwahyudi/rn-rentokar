import React, { Component } from "react";

import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Platform,
    StatusBar,
    ScrollView,
    Image,
    Dimensions,
    Animated,
    TouchableOpacity
} from "react-native";

import {Header,Button, Container, Content, Item, Input, Icon, Left, Right, Body} from 'native-base';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

import Loader from '../utils/Loader';

import Category from './components/Explore/Category';
import Home from './components/Explore/Home';
import Tag from './components/Explore/Tag';


import {StackActions, NavigationActions} from 'react-navigation';
import * as categoryService from '../../services/DataServices';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addUser, signIn } from '../../actions/UserAction';

import * as dataServices from '../../services/DataServices';

const { height, width } = Dimensions.get('window')




class Explore extends React.Component {
    

    constructor(props) {
        super(props);
        this.state = {
            listCategory: [],
            userInfo: null,
            error: null,
            isLoading: false,
            listProduct:[]
        };
         

      }
    
    async componentDidMount() {
        // var self = this;
        await this.listenForCategory();
        dataServices.getAllProduct().then((res)=>{
            console.log(res);
            this.setState({listProduct:res});
        })
        // console.log("params", this.props.navigation.state.params);
        // if(this.props.navigation.state.params != undefined){
        //     this.props.signIn(this.props.navigation.state.params);
        // }
        
        // setTimeout(function(){
        //     self.hideLoader();
        // },3000)
        
        // console.log("data redux", this.props.state.users);
        // if(this.props.navigation.state.params){
        //     this.props.signUpWithGoogle(profile);
        // }
        
    }


    componentWillMount() {
       
    }

    showLoader = () => {
        this.setState({ isLoading: true });
    };

    hideLoader = () =>{
        this.setState({ isLoading: false });
    }

    listenForCategory() {
        categoryService.getListCategory().on('value', (dataSnapshot) => {
            var listCat = [];
            dataSnapshot.forEach((child) => {
                listCat.push({
                    name: child.val().categoryName,
                    _key: child.key
                });
            });
            
            this.setState({
                listCategory:listCat
            });
        });
    }

    
    // goToProductDetail = (obj) => {
        
    //     // const resetAction = StackActions.reset({
    //     //     index: 1,
    //     //     actions: [
    //     //       NavigationActions.navigate({
    //     //         routeName: 'Tabs'
    //     //       }),
    //     //       NavigationActions.navigate({
    //     //         routeName: 'ProductDetail'
    //     //       })
    //     //     ],
    //     //     key: null
    //     // });
        
    //     // this.props.navigation.dispatch(resetAction);
    // }

    render() {
        const prodArr = this.state.listProduct.filter(obj => obj.status != 2);
        return (
            <Container>
                <Loader loading={this.state.isLoading} />
                <Header style={{ backgroundColor: '#d32f2f' }} searchBar rounded androidStatusBarColor="#d32f2f" >
                    
                        <Item >
                            <Icon name="ios-search" />
                            {/* <TouchableOpacity onPress={()=>this.props.navigation.navigate("SearchPage", e)}> */}
                            <Input placeholder="Search" />
                            {/* </TouchableOpacity> */}
                            <Icon name="ios-people" />
                        </Item>
                    
                    <Button transparent >
                        <Text>Search</Text>
                    </Button>
                </Header>
                <Content>
                <View style={{ flex: 1 }}>
                
                <ScrollView
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [
                            { nativeEvent: { contentOffset: { y: this.scrollY } } }
                        ]
                    )}>
                    <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
                        <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>
                            Category 
                        </Text>

                        <View style={{ height: 130, marginTop: 20 }}>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                            >   
                            {
                                this.state.listCategory.map((e, key)=>{
                                    return(
                                        <Category  imageUri={require('../../assets/img/experiences.jpg')} key={key} name={e.name}  />
                                    )
                                })
                            }
                                
                                
                            </ScrollView>
                        </View>
                        
                        <View style={{ marginTop: 40, paddingHorizontal: 20 }}>
                            <Text style={{ fontSize: 24, fontWeight: '700' }}>
                                Introducing Rentokar 
                                {/* {JSON.stringify(this.props.state.users)}  */}
                            </Text>
                            <Text style={{ fontWeight: '100', marginTop: 10 }}>
                                A new selection of homes verified for quality & comfort
                                {/* {this.props.state} */}

                            </Text>
                            <View style={{ width: width - 40, height: 200, marginTop: 20 }}>
                                <Image
                                    style={{ flex: 1, height: null, width: null, resizeMode: 'cover', borderRadius: 5, borderWidth: 1, borderColor: '#dddddd' }}
                                    source={require('../../assets/img/home.jpg')}
                                />

                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 40 }}>
                        <Text style={{ fontSize: 24, fontWeight: '700', paddingHorizontal: 20 }}>
                            Homes around the world
                        </Text>
                        <View style={{ paddingHorizontal: 20, marginTop: 20, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                            {
                                prodArr.map((e, key)=>{
                                    e.bgColor = "#40c4ff";
                                    return(
                                        <TouchableOpacity onPress={()=>this.props.navigation.navigate("ProductDetail", e)} key={key}> 
                                            <Home width={width}
                                                name={e.productName}
                                                type="PRIVATE ROOM - 2 BEDS"
                                                price={82}
                                                rating={4}
                                                coverImg={e.coverImg}
                                            />
                                        </ TouchableOpacity  >
                                    )
                                })
                            }

                             
                            {/* <Home width={width}
                                name="The Cozy Place"
                                type="PRIVATE ROOM - 2 BEDS"
                                price={82}
                                rating={4}
                            />
                            <Home width={width}
                                name="The Cozy Place"
                                type="PRIVATE ROOM - 2 BEDS"
                                price={82}
                                rating={4}
                            />
                            <Home width={width}
                                name="The Cozy Place"
                                type="PRIVATE ROOM - 2 BEDS"
                                price={82}
                                rating={4}
                            />
                            <Home width={width}
                                name="The Cozy Place"
                                type="PRIVATE ROOM - 2 BEDS"
                                price={82}
                                rating={4}
                            /> */}
                            

                        </View>
                    </View>
                </ScrollView>

            </View>
                </Content>
            </Container>
               
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const mapStateToProps = (state, props) => {
    console.log(state);
    console.log(props);
    // console.log("tessss", state);
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
      addUser,signIn
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Explore);

