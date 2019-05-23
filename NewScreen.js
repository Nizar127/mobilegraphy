import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Alert } from 'react-native';
import { Container, Content, Footer, FooterTab, Button, Icon, Text, Form, Item, Label, Input, Picker } from 'native-base';
import { addPost } from './DataService';

export default class NewScreen extends Component {
  constructor() {
    super();
    this.state = {
      name: null,
      description: null,
      imgURL: null
    };
  }

  setName = (value) =>{
    this.setState({ name: value });
  }

  setDescription = (value) =>{
    this.setState({ description: value });
  }

  setImgURL = (value) => {
    this.setState({ imgURL: value });
  }



  saveData = () =>{
    if(this.state.name && this.state.description && this.state.imgURL ){
      if(isNaN(this.state.imgURL)){
        Alert.alert('Status','Broken Image!');
      }
       else{
         addPost(this.state.name && this.state.description && this.state.imgURL);
       }
    } else{
       Alert.alert('Status','Empty Field(s)!');
    }
  }

  render() {
    return (
      <Container> 
          {/* yg letak ape yg dlm feed. bawah nie salah */}
        <Content padder>
        <Text style={{textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20}}>Details</Text>
        <Form>
        <Item fixedLabel last>
              <Label>Name</Label>
              <Input onChangeText={this.setName} />
        </Item>
        <Item fixedLabel last>
              <Label>Description</Label>
              <Input onChangeText={this.setDescription} />
        </Item>
        <Item fixedLabel last>
          <Label>Image</Label>
          <Input onChangeText={this.setImgURL}/>
          
        </Item>
        </Form>

          <Button block last style={{marginTop: 50}} onPress={this.saveData}>
            <Text style={{fontWeight: "bold"}}>Save</Text>
          </Button>
        </Content>

        <Footer>
          <FooterTab>
          <Button vertical onPress={() => {Actions.HomeScreen();}}>
              <Icon name="home" />
              <Text>Dashboard</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}