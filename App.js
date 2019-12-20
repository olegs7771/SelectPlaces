import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createSwitchNavigator} from 'react-navigation';
import WelcomePage from './app/auth/WelcomePage';
import SelectPlace from './app/places/SelectPlace';
import SharedPlaces from './app/sharedPlaces/SharedPlaces';
import Register from './app/auth/Register';
import Login from './app/auth/Login';
import AuthLoadingScreen from './app/auth/AuthLoadingScreen';

//Redux
import {Provider} from 'react-redux';
import configureStore from './store';
const store = configureStore();

//App Stack
const appStack = createStackNavigator(
  {
    Home: {screen: WelcomePage},
    Places: {screen: SelectPlace},
    SharedPlaces: {screen: SharedPlaces},
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: ({navigation}) => {
      return {
        headerTitle: navigation.state.routeName,
        headerStyle: {
          borderWidth: 1,
          backgroundColor: '#acb6bf',
        },
        headerTitleStyle: {
          marginLeft: '40%',
        },
        headerTintColor: '#fff',
      };
    },
  },
);
//Auth Stack

const authStack = createStackNavigator(
  {
    SignIn: {screen: Login},
    SignUp: {screen: Register},
  },
  {
    defaultNavigationOptions: ({navigation}) => {
      return {
        headerTitle: navigation.state.routeName,
        headerStyle: {
          borderWidth: 1,
          backgroundColor: '#acb6bf',
        },
        headerTitleStyle: {
          marginLeft: '40%',
        },
        headerTintColor: '#fff',
      };
    },
  },
);

const switchNavigator = createSwitchNavigator({
  authLoading: AuthLoadingScreen,
  authStack,
  appStack,
});

const AppContainer = createAppContainer(switchNavigator);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

export default App;
