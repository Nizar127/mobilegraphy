import React, { Component } from 'react';
//import { Actions } from 'react-native-router-flux';
import { removeUser } from './dataServices';
import { Alert } from 'react-native';
import { Container, Content, Footer, FooterTab, Button, Icon, Text, List } from 'native-base';
import { db } from './config';
import userList from '../components/userList';

let itemsRef = db.ref('/items');

export default class HomeScreen extends Component {
  constructor(){
    super();
    this.state = {
    items: []
    }
  }

  componentDidMount() {
    itemsRef.on('value', (snapshot) => {
        let data = snapshot.val();
          if(data){
            let firebaseData = Object.values(data);
            this.setState({items: firebaseData});
            console.log(this.state.items);
          }
     });
  }

  deleteConfirmation= (uid) => {
    Alert.alert(
      'Status', 
      'Are you sure you want to delete this post?',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => removeUser(uid)}
      ],
      { cancelable: false }
      );
  }

  render() {
    return (
      <Container>

        <Content padder>
        <Text style={{textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20}}>Student List</Text>
        <List vertical={true}>
        <userList items={this.state.items} onPress={(uid) => {Actions.ViewScreen({matricno: matricno});}} onLongPress={(uid) => {this.deleteConfirmation(uid)}} />
        </List>
        <Text>{this.props.uid}</Text>
        </Content>
  
        <Footer>
          <FooterTab>
            <Button vertical onPress={() => {Actions.NewScreen();}}>
              <Icon name="person" />
              <Text>New Post</Text>
            </Button>
          </FooterTab>
        </Footer>

      </Container>
    );
  }
}
