import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import TextForm from '../components/TextForm';

import {connect} from 'react-redux';

export class SelectPlace extends Component {
  state = {
    placeName: '',
  };

  render() {
    console.log('this.state', this.state);

    return (
      <View style={styles.container}>
        <Text style={styles.textTitle}> Here Select Places </Text>
        <View style={styles.containerForm}>
          <TextForm
            onChangeText={text => this.setState({placeName: text})}
            value={this.state.placeName}
          />
        </View>
        <View>
          <Text>Choose Picture Here</Text>
        </View>
        <View>
          <Text>Choose Location Here</Text>
        </View>

        <View>
          <Text>Button Here</Text>
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
    paddingTop: 30,
    alignItems: 'center',
  },
  containerForm: {
    borderWidth: 1,
    width: '60%',
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SelectPlace);
