import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  ActivityIndicator,
  Button,
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
      messages: {},
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
    console.log('sharing places cdm');

    this.props.getPlace();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.messages !== this.props.messages) {
      this.setState(prevState => {
        return {
          ...prevState,
          messages: this.props.messages.messages,
        };
      });
    }
  }

  render() {
    if (this.props.place.places === null || this.props.place.loading) {
      return (
        <View style={styles.container}>
          <Text style={styles.textTitle}> Here Shared Places </Text>
          <View style={{flex: 1, paddingBottom: 20, justifyContent: 'center'}}>
            {this.state.messages.message ? (
              <Text>{this.state.messages.message}</Text>
            ) : (
              <ActivityIndicator size="large" color="#0000ff" />
            )}
          </View>
          <View>
            <Button
              title="Back"
              onPress={() => this.props.navigation.navigate('Home')}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.textTitle}> Here Shared Places</Text>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              width: '100%',
              paddingBottom: 20,

              paddingLeft: '10%',
            }}>
            <FlatList
              data={this.props.place.places}
              renderItem={({item}) => (
                <SharedItems
                  key={item.key}
                  placeName={item.placeName}
                  imgURI={item.imgURI}
                  location={item.location}
                  id={item._id}
                  date={item.date}
                  navigate={this.props.navigation.navigate}
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
  messages: state.messages,
});

const mapDispatchToProps = {getPlace};

export default connect(mapStateToProps, mapDispatchToProps)(SharedPlaces);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',

    alignItems: 'center',
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
