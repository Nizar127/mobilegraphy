import React, { Component } from 'react';
import { View, Text, StyleSheet , Image} from 'react-native';
import ItemComponent from './ItemComponent.js';

import { db } from './Config.js';

console.disableYellowBox = true;


let itemsRef = db.ref('/items');

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#B6A6BB',
    }
  })

export default class ListItem extends Component {

    state = {
        items: []
    }

    componentDidMount() {
        itemsRef.on('value', (snapshot) => {
            let data = snapshot.val();
            let items = Object.values(data);
            this.setState({items});
         });
    }
    
    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.items.length > 0
                    ? <ItemComponent items={this.state.items} />
                    : <Text>No items</Text>
                }
            </View>
        )
    }
}