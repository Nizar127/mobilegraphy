// ItemComponent.js

import React, { Component } from 'react';
import {  View, Text, StyleSheet , Image} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
    itemsList: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    itemtext: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

export default class ItemComponent extends React.Component {

  static propTypes = {
      items: PropTypes.array.isRequired
  };

  render() {
    return (
      <View style={styles.itemsList}>
        {this.props.items.map((item, index) => {
            return (
                <View key={index}>
                  <Image source={{ uri: item.imgURL }} style={{ width: 250, height: 250 }} />
                    <Text style={styles.itemtext}>{item.description}</Text>
                    
                </View>
                
            )
        })}
      </View>
    );
  }
}