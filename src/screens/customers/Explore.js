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
    Animated
} from "react-native";

import {Header,Button, Container, Content, Item, Input, Icon, Left, Right, Body} from 'native-base';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

// import Icon from 'react-native-vector-icons/Ionicons'
import Category from './components/Explore/Category';
import Home from './components/Explore/Home';
import Tag from './components/Explore/Tag';

import * as categoryService from '../../services/DataServices';

const { height, width } = Dimensions.get('window')


class Explore extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listCategory: [],
            userInfo: null,
            error: null
        };

      }
    
    componentDidMount() {
        this.listenForCategory();
    }


    componentWillMount() {
       
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

    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: '#de1587' }} searchBar rounded androidStatusBarColor="#de1587" >
                    <Item>
                        <Icon name="ios-search" />
                        <Input placeholder="Search" />
                        <Icon name="ios-people" />
                    </Item>
                    <Button transparent>
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
                            </Text>
                            <Text style={{ fontWeight: '100', marginTop: 10 }}>
                                A new selection of homes verified for quality & comfort

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
                            

                        </View>
                    </View>
                </ScrollView>

            </View>
                </Content>
            </Container>
               
        );
    }
}
export default Explore;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});