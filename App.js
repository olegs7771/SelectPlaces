import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import WelcomePage from './app/auth/WelcomePage';
import SelectPlace from './app/places/SelectPlace';
//Redux
import {Provider} from 'react-redux';
import configureStore from './store';
const store = configureStore();

const appStack = createStackNavigator(
  {
    Home: {screen: WelcomePage},
    Places: {screen: SelectPlace},
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

const AppContainer = createAppContainer(appStack);

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
