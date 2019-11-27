import React, {Component} from 'react';
import {Text, StyleSheet, View, Button} from 'react-native';
import {NavigationEvents} from 'react-navigation';

export default class WelcomePage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerTitle}>
          <Text style={styles.textTitle}> Welcome Page </Text>
        </View>
        <View style={styles.containerButton}>
          <Button
            title="Select Places"
            color="#acb6bf"
            onPress={() => this.props.navigation.navigate('Places')}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  containerTitle: {},
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',

    marginBottom: 10,
  },
  containerButton: {
    width: '50%',
    alignSelf: 'center',
  },
});
