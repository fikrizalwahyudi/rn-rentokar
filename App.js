import React, { Component } from 'react';
import { StyleSheet,View,StatusBar,Platform } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon, Text, Badge } from 'native-base';

import { GoogleSignin} from 'react-native-google-signin';

import Login from './src/screens/Login';
import Verification from './src/screens/Verification';
import ConfirmationCode from './src/screens/ConfirmationCode';
import AuthLoadingScreen, { Root, Tabs } from './src/router';
import Explore from './src/screens/customers/Explore';
import Profile from './src/screens/customers/Profile';
// import Intro from './src/screens/Intro';
// import {AuthLoadingScreen} from './src/'


import { Provider } from 'react-redux';
import { createStore } from 'redux';
import UserReducer from './src/reducers/UserReducer';

const store = createStore(UserReducer);

export default class App extends Component {

  constructor(){
    super();
    this._configureGoogleSignIn();
  }

  _configureGoogleSignIn() {
    const configPlatform = {
      ...Platform.select({
        ios: {
        //   iosClientId: config.iosClientId,
        },
        android: {},
      }),
    };

    GoogleSignin.configure({
      ...configPlatform,
      webClientId: '487726989792-3tnrt4n44kesgf6ij039956eeevn5a90.apps.googleusercontent.com',
      offlineAccess: false,
    });
  }

  render() {
    // StatusBar.setTranslucent(true);
    StatusBar.setBackgroundColor('#d32f2f');
    StatusBar.setBarStyle('dark-content');
    return (
      <Provider store={ store }>
        <AuthLoadingScreen />
      </Provider>
    );
  }
}


// import React, { Component } from 'react';
// import { StyleSheet,View,StatusBar,Platform, Text, Button } from 'react-native';
// import {
//   createBottomTabNavigator,
//   createStackNavigator,
// } from 'react-navigation';

// import Explore  from './src/screens/customers/Explore'

// import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

// class DetailsScreen extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text>Details!</Text>
//       </View>
//     );
//   }
// }

// class HomeScreen extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         {/* other code from before here */}
//         <Button
//           title="Go to Details"
//           onPress={() => this.props.navigation.navigate('Details')}
//         />
//       </View>
//     );
//   }
// }

// class SettingsScreen extends React.Component {
//   render() {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         {/* other code from before here */}
//         <Button
//           title="Go to Details"
//           onPress={() => this.props.navigation.navigate('Details')}
//         />
//       </View>
//     );
//   }
// }

// const HomeStack = createStackNavigator({
//   Home: Explore,
//   Details: DetailsScreen,
// });

// const SettingsStack = createStackNavigator({
//   Settings: SettingsScreen,
//   Details: DetailsScreen,
// });

// export default createMaterialBottomTabNavigator(
//   {
//     Home: HomeStack,
//     Settings: SettingsStack,
//   },
//   {
//     /* Other configuration remains unchanged */
//   }
// );