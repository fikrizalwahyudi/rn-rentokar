import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Platform,
  Image
} from 'react-native';
import { TabNavigator, StackNavigator, createBottomTabNavigator , createStackNavigator, createSwitchNavigator} from 'react-navigation';
import { Icon } from 'native-base';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { GoogleSignin} from 'react-native-google-signin';

// import Feed from '../screens/Feed';
// import Settings from '../screens/Settings';
// import UserDetail from '../screens/UserDetail';
// import Me from '../screens/Me';

import Explore from './screens/customers/Explore';
import Activity from './screens/customers/Activity';
import Inquiry from './screens/customers/Inquiry';
import Profile from './screens/customers/Profile';

import Login from './screens/Login';
import Verification from './screens/Verification';
import ConfirmationCode from './screens/ConfirmationCode';
import Intro from './screens/Intro';

export const Tabs = createMaterialBottomTabNavigator({
  Explore: {
    screen: Explore,
    navigationOptions: {
      tabBarLabel: 'Explore',
      tabBarIcon: ({ tintColor }) => <Icon name="search" size={35} style={{color:tintColor}}  />,
    },
  },
  Inquiry: {
    screen: Inquiry,
    navigationOptions: {
      tabBarLabel: 'Inquiry',
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
  barStyle: { backgroundColor: '#de1587' },
  labeled: true,
  shifting: true
});

export const LoginStack = createStackNavigator({
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

// export const Root = createStackNavigator({
//   Tabs: {
//     screen: Tabs,
//   },
//   Login: {
//     screen: LoginStack,
//   },
// }, {
//   mode: 'modal',
//   headerMode: 'none',
// });

class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    setTimeout(()=>{this._getCurrentUser()}, 1000); 
  }

  // Fetch the token from storage then navigate to our appropriate place
  async _getCurrentUser() {
    try {
      const users = await GoogleSignin.signInSilently();
      
      // alert(users);
      if(!users){
        this.props.navigation.navigate('Auth');
      }else{
        this.props.navigation.navigate('App');
      }
    
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


// const AppStack = createStackNavigator({ Home: HomeScreen, Other: OtherScreen });
// const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: Tabs,
    Auth: LoginStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);