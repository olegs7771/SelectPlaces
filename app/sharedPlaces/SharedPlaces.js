import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import SharedItems from './SharedItems';

import {connect} from 'react-redux';
import {getPlace} from '../../actions/placesAction';

class SharedPlaces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      respStyle: {
        landScape: false,
      },
    };
    Dimensions.addEventListener('change', dims => {
      this.setState(prevState => {
        return {
          respStyle: {
            ...prevState.respStyle,
            landScape: dims.window.height < 500 ? true : false,
          },
        };
      });
    });
  }

  componentDidMount() {
    this.props.getPlace();
  }

  render() {
    console.log('this.props.message', this.props.message);

    if (this.props.place.places === null || this.props.place.loading) {
      return (
        <View style={styles.container}>
          <Text style={styles.textTitle}> Here Shared Places </Text>
          <View style={{flex: 1, paddingBottom: 20, justifyContent: 'center'}}>
            {this.props.message.message ? (
              <Text>{this.props.message.message.message}</Text>
            ) : (
              <ActivityIndicator size="large" color="#0000ff" />
            )}
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.textTitle}> Here Shared Places</Text>
          <View style={{flex: 1, width: '100%', paddingBottom: 20}}>
            <FlatList
              data={this.props.place.places}
              renderItem={({item}) => (
                <SharedItems
                  key={item.key}
                  name={item.name}
                  image={item.img}
                  location={item.location}
                />
              )}
            />
          </View>
        </View>
      );
    }
  }
}

const mapStateToProps = state => ({
  place: state.place,
  message: state.message,
});

const mapDispatchToProps = {getPlace};

export default connect(mapStateToProps, mapDispatchToProps)(SharedPlaces);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',

    alignItems: 'center',
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
