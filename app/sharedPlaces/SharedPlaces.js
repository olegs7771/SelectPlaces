import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SharedItems from './SharedItems';

import {connect} from 'react-redux';

class SharedPlaces extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textTitle}> Here Shared Places</Text>
        <View>
          {this.props.places.map(place => (
            <SharedItems key={place.key} />
          ))}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  places: state.place.places,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SharedPlaces);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: 'red',
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
