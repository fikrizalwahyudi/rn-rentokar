import React, { Component } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Platform,
  Image,
  TouchableOpacity
} from 'react-native';
import { TabNavigator, StackNavigator, createBottomTabNavigator , createStackNavigator, createSwitchNavigator} from 'react-navigation';
import { Icon } from 'native-base';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import { GoogleSignin} from 'react-native-google-signin';
import firebase from 'react-native-firebase'

import * as dataServices from '../src/services/DataServices';

import { addUser, signUpWithGoogle } from '../src/actions/UserAction';

// import Feed from '../screens/Feed';
// import Settings from '../screens/Settings';
// import UserDetail from '../screens/UserDetail';
// import Me from '../screens/Me';
import Explore from './screens/customers/Explore';
import Activity from './screens/customers/Activity';
import Inquiry from './screens/customers/Inquiry';
import Profile from './screens/customers/Profile';
import ProductDetail from './screens/customers/ProductDetail';

import Login from './screens/Login';
import Verification from './screens/Verification';
import ConfirmationCode from './screens/ConfirmationCode';
import Intro from './screens/Intro';

// export const Tabs = createMaterialBottomTabNavigator({
//   Explore: {
//     screen:  createStackNavigator({
//       Explore: {
//         screen: Explore
//       },
//       ProductDetail: {
//         screen: ProductDetail
//       }
//     },{
//       headerMode: 'none',
//       initialRouteName: 'Explore'
//     }),
//     navigationOptions: {
//       tabBarLabel: 'Explore',
//       tabBarIcon: ({ tintColor }) => <Icon name="search" size={35} style={{color:tintColor}}  />,
//     },
//   },
//   Inquiry: {
//     screen: Inquiry,
//     navigationOptions: {
//       tabBarLabel: 'Transaksi',
//       tabBarIcon: ({ tintColor }) => <Icon name="apps" size={35} style={{color:tintColor}} />,
//     },
//   },
//   Activity: {
//     screen: Activity,
//     navigationOptions: {
//       tabBarLabel: 'Activity',
//       tabBarIcon: ({ tintColor }) => <Icon name="notifications" size={35} style={{color:tintColor}} />,
//     },

//   },
//   Profile: {
//     screen: Profile,
//     navigationOptions: {
//       tabBarLabel: 'Profile',
//       tabBarIcon: ({ tintColor }) => <Icon name="contact" size={35} style={{color:tintColor}} />,
//     },
//   },
// },{
//   initialRouteName: 'Explore',
//   activeTintColor: '#fff',
//   inactiveTintColor: '#fff',
//   barStyle: { backgroundColor: '#d32f2f' },
//   labeled: true,
//   shifting: true
// });


export const TabStack = createStackNavigator({
  Tabs: {
    screen: createMaterialBottomTabNavigator({
      Explore: {
        screen:  Explore,
        navigationOptions: {
          tabBarLabel: 'Explore',
          tabBarIcon: ({ tintColor }) => <Icon name="search" size={35} style={{color:tintColor}}  />,
        },
      },
      Inquiry: {
        screen: Inquiry,
        navigationOptions: {
          tabBarLabel: 'Transaksi',
          tabBarIcon: ({ tintColor }) => <Icon name="apps" size={35} style={{color:tintColor}} />,
        },
      },
      Activity: {
        screen: Activity,
        navigationOptions: {
          tabBarLabel: 'Activity',
          tabBarIcon: ({ tintColor }) => <Icon name="notifications" size={35} style={{color:tintColor}} />,
        },
    
      },
      Profile: {
        screen: Profile,
        navigationOptions: {
          tabBarLabel: 'Profile',
          tabBarIcon: ({ tintColor }) => <Icon name="contact" size={35} style={{color:tintColor}} />,
        },
      },
    },{
      initialRouteName: 'Explore',
      activeTintColor: '#fff',
      inactiveTintColor: '#fff',
      barStyle: { backgroundColor: '#d32f2f' },
      labeled: true,
      shifting: true
    }),
    navigationOptions: ({navigation}) => ({
      header: null,
    }), 
  },
  ProductDetail: {
    screen: ProductDetail,
    navigationOptions: () => ({
      title: `Product Detail`,
      headerMode: 'screen',
      headerStyle: {
        backgroundColor:"#d32f2f"
      },
      headerTitleStyle: {
        color: "white"
      },
      headerTintColor: "white"
    })
  }
},{
  initialRouteName: 'Tabs'
})

export const VendorTabStack = createStackNavigator({
  Tabs: {
    screen: createMaterialBottomTabNavigator({
      Explore: {
        screen:  Explore,
        navigationOptions: {
          tabBarLabel: 'Explore',
          tabBarIcon: ({ tintColor }) => <Icon name="search" size={35} style={{color:tintColor}}  />,
        },
      },
      Inquiry: {
        screen: Inquiry,
        navigationOptions: {
          tabBarLabel: 'Transaksi',
          tabBarIcon: ({ tintColor }) => <Icon name="apps" size={35} style={{color:tintColor}} />,
        },
      },
      Activity: {
        screen: Activity,
        navigationOptions: {
          tabBarLabel: 'Activity',
          tabBarIcon: ({ tintColor }) => <Icon name="notifications" size={35} style={{color:tintColor}} />,
        },
    
      },
      Profile: {
        screen: Profile,
        navigationOptions: {
          tabBarLabel: 'Profile',
          tabBarIcon: ({ tintColor }) => <Icon name="contact" size={35} style={{color:tintColor}} />,
        },
      },
    },{
      initialRouteName: 'Activity',
      activeTintColor: '#fff',
      inactiveTintColor: '#fff',
      barStyle: { backgroundColor: 'blue' },
      labeled: true,
      shifting: true
    }),
    navigationOptions: ({navigation}) => ({
      header: null,
    }), 
  },
  ProductDetail: {
    screen: ProductDetail,
    navigationOptions: () => ({
      title: `Product Detail`,
      headerMode: 'screen',
      headerStyle: {
        backgroundColor:"blue"
      },
      headerTitleStyle: {
        color: "white"
      },
      headerTintColor: "white"
    })
  }
},{
  initialRouteName: 'Tabs'
})

const LoginStack = createStackNavigator({
  Login: {
    screen: Login
  },
  Verification: {
    screen: Verification
  },
  ConfirmationCode: {
    screen: ConfirmationCode
  },
  Intro: {
    screen: Intro
  }
},
{
    headerMode: 'none',
    initialRouteName: 'Intro'
});


class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    setTimeout(()=>{this._getCurrentUser()}, 1000); 
  }

  // Fetch the token from storage then navigate to our appropriate place
  async _getCurrentUser() {
    try {
      var self = this;
      // const users = await GoogleSignin.signInSilently();
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          user.id = user.uid;
          // console.log(user.uid);
          // console.log(user.providerData);
          // var u = firebase.auth().currentUser;
          // console.log(user.email)
          // signUpWithGoogle(user);
          
          dataServices.checkUser(user).then((res)=>{
            self.props.navigation.navigate(res);
          })
          // self.props.navigation.navigate('App');
        } else {
          self.props.navigation.navigate('Auth');
        }
      });
    
    } catch (error) {
      alert(error)
      this.setState({
        error,
      });
      this.props.navigation.navigate('Auth');
    }
  }
  
  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./assets/img/logo-red.png')} style={{width:200, height:200, alignSelf:'center'}}/>
        <Image source={require('./assets/img/rentokar-black.png')} style={{ marginTop:5,alignSelf:'center', height:30, width:200}}/>
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class TabsContainer extends Component {
  constructor(props)  {
    super(props);
  }
  render() {
    return <Tabs screenProps={{ rootNavigation: this.props.navigation }}  />;
  }
}

// const FirstStack = createStackNavigator({
//   ProductDetail: {
//     screen: ProductDetail
//   },
//   Inside: {
//     screen: TabsContainer
//   }
// },{
//   headerMode: 'none',
//   initialRouteName: 'Inside'
// });


// const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen });
// const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: TabStack,
    Auth: LoginStack,
    Vendor: VendorTabStack
  },
  {
    initialRouteName: 'AuthLoading',
  }
);