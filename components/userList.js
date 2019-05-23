import React, { Component } from 'react';
import { Text, ListItem, Left, Right, Icon } from 'native-base';
import PropTypes from 'prop-types';

export default class StudentList extends Component {

  static propTypes = {
      items: PropTypes.array.isRequired
  };

   onPress = (uid) => {
    this.props.onPress(uid);
  }

  //for delete purposes
  onLongPress = (uid) => {
    this.props.onLongPress(uid);
  }

  render() {
    return(
      this.props.students.map((data, index) => {
        return(
          <ListItem key={index} onPress={() => this.onPress(data.uid)} onLongPress={() => this.onLongPress(data.uid)}>
          <Left>
          <Text>{data.name}</Text>
          </Left>
          <Right>
          <Icon name="arrow-forward" />
          </Right>
          </ListItem>
        )
      })
    )
  }
}