import React, {Component} from 'react';
import {Text, View} from 'react-native';
//Navigation
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createSwitchNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from 'react-navigation-tabs';

//Screens
import WelcomePage from './app/auth/WelcomePage';
import SelectPlace from './app/places/SelectPlace';
import SharedPlaces from './app/sharedPlaces/SharedPlaces';
import SharedPlaceSelect from './app/sharedPlaces/SharedPlaceSelect';
import Register from './app/auth/Register';
import Login from './app/auth/Login';
import AuthLoadingScreen from './app/auth/AuthLoadingScreen';

//Redux
import {Provider} from 'react-redux';
import configureStore from './store';
const store = configureStore();

//Bottom Tab Navigator
const TabNavigator = createBottomTabNavigator(
  {
    Home: {screen: WelcomePage},
    MyPlaces: {screen: SharedPlaces},
    SelectPlace: {screen: SelectPlace},
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        const {routeName} = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'ios-home';
        } else if (routeName === 'MyPlaces') {
          iconName = `ios-images`;
        } else if (routeName === 'SelectPlace') {
          iconName = 'ios-aperture';
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
  },
);
//App Stack

const appStack = createStackNavigator(
  {
    Home: {screen: TabNavigator},
    Places: {screen: SelectPlace},
    SharedPlaces: {screen: SharedPlaces},
    SelectedPlace: {screen: SharedPlaceSelect},
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
