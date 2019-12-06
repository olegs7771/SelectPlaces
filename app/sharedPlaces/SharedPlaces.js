import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, FlatList} from 'react-native';
import SharedItems from './SharedItems';

import {connect} from 'react-redux';

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
  render() {
    console.log('this.state.respStyle', this.state.respStyle);

    return (
      <View style={styles.container}>
        <Text style={styles.textTitle}> Here Shared Places</Text>
        <View style={{flex: 1, width: '100%', paddingBottom: 20}}>
          <FlatList
            data={this.props.places}
            renderItem={({item}) => (
              <SharedItems
                key={item.key}
                name={item.name}
                image={item.image}
                location={item.location}
              />
            )}
          />
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

    alignItems: 'center',
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
