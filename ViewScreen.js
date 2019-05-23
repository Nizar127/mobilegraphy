import React, { Component } from 'react';
import { Container, Content, Footer, FooterTab, Button, Icon, Text, Form, Item, Label, Input, Picker } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { db } from '../config/db';
import { updatePost } from '../services/DataService';

let itemsRef = db.ref('/items');

export default class ViewScreen extends Component {
  constructor(){
   super();
   this.state = {
    items: [],
    name: null,
    description: null,
    imgURL: null
   }
  }

  componentDidMount() {
    let query = itemsRef.orderByChild("uid").equalTo(this.props.name);
      query.once('value', (snapshot) => {
      let data = snapshot.val();
          if(data){
            let firebaseData = Object.values(data);
            this.setState({items: firebaseData},()=>{
              this.state.items.map((element) => {
                this.setState({
                  name: element.name,
                  description: element.description,
                  imgURL: element.imgURL,
                });
              });
            });
          }
     });
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

  updateData = () =>{
    if(this.state.name && this.state.description && this.state.imgURL ){
        if(isNaN(this.state.imgURL)){
          Alert.alert('Status','Broken Image!');
        }
       else{
         updatePost(this.state.name && this.state.description && this.state.imgURL);
       }
    } else{
       Alert.alert('Status','Empty Field(s)!');
    }
  }

  render() {
    return (
        // modified based on feed
      <Container>
        <Content padder>
        <Text style={{textAlign: "center", height: 40, fontWeight: "bold", marginTop: 20}}>Student Information</Text>
        <Text>{this.state.postID}</Text>
        <Form>
        <Item fixedLabel last>
              <Label>Name</Label>
              <Input onChangeText={this.setName} value={this.state.name}/>
        </Item>
        <Item fixedLabel last>
              <Label>Description</Label>
              <Input onChangeText={this.setDescription} value={this.state.description}/>
        </Item>
        <Item fixedLabel last>
          <Label>Image</Label>
          <Input onChangeText={this.setImgURL} value={this.state.imgURL}/>
          
        </Item>
        </Form>

          <Button block last style={{marginTop: 50}} onPress={this.updateData}>
            <Text style={{fontWeight: "bold"}}>Update</Text>
          </Button>
        </Content>
        <Footer>
          <FooterTab>
            <Button vertical onPress={() => {Actions.HomeScreen();}}>
              <Icon name="home" />
              <Text>Home</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
      );
  }
}