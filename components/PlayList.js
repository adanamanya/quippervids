import React, { Component } from 'react';
import {
 AppRegistry,
 StyleSheet,
 Text,
 View,
 Picker,
 Image,
 Alert,
 TouchableOpacity
} from 'react-native';
import {
 Container,
 Content,
 Header,
 Left,
 Right,
 Title,
 Card,
 CardItem,
 Button,
 Icon,
 Footer,
 FooterTab,
 Body,
 Spinner,
 List
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Actions } from 'react-native-router-flux';
import LocalStorage from 'react-native-local-storage';
import { ConnectivityRenderer } from 'react-native-offline';

export default class PlayLists extends Component {
 constructor() {
  super();

  this.state = {
   spinnerColor: 'white',
   vids: {},
   playlistdata: {},
  };
 }
 
 componentDidMount() {
  this.getVids();
  this.getofflinemode();
 }
 getVids() {
  this.setState({
   spinnerColor: 'blue',
   loading: true
  });
  
  return fetch('https://quipper.github.io/android-technical-exam/playlist.json')
   .then((response) => response.json())
   .then((responseJson) => {
    this.setState({
     vids: responseJson,
     loading: false,
    });
    return responseJson;
   })
   .then(() =>{
   LocalStorage.save('playlist', this.state.vids)
   })
   .catch((error) => {
    this.setState({loading: false});
   });
   
 }

 getofflinemode(){
    LocalStorage.get('playlist')
    .then((data) => {
        this.setState({
            playlistdata: data
           });
        console.log("get: ", this.state.playlistdata)});
 }

 handleItemPress(item) {
  Actions.vids(item);
 }
    
 render() {
  return (
   <Container>
    <Header hasTabs style={{ backgroundColor: '#00b0ff'}} iosStatusbar="light-content"
      androidStatusBarColor='#00b0ff'>
     <Body>
      <Title>playlist</Title>
     </Body>
     <Right />
    </Header>
    <ConnectivityRenderer>
      {isConnected => (
        isConnected ? (
    <Content>
     {this.state.loading ? <Spinner color={this.state.spinnerColor} /> :
      <List
       dataArray={this.state.vids}
       renderRow={(item) =>
        <TouchableOpacity onPress={() => this.handleItemPress(item)}>
         <Card>
          <CardItem>
           <Grid>
            <Row size={300}>
             <Col size={30} >
              <Image
               source={{ uri: item.thumbnail_url }}
               style={{ height: 100, width: 100, borderRadius: 8}}
              />
             </Col>
             <Col size={70} >
             <TouchableOpacity onPress={() => this.handleItemPress(item)}>
              <Row size={1} style={{ paddingTop: 3, paddingLeft: 10 }} >
               <Text style={styles.Title} >{item.title}</Text>
              </Row>
              </TouchableOpacity>
              <Row size={2} style={{paddingLeft: 10}} >
               <Text>presenter name: {item.presenter_name}</Text>
              </Row>
              <Row size={2} style={{paddingLeft: 10}} >
               <Text>{item.description}</Text>
              </Row>
              <Row size={2} style={{paddingLeft: 10}} >
               <Text>duration: {Math.round((item.video_duration)/60000)} minutes</Text>
              </Row>
             </Col>
            </Row>
           </Grid>
          </CardItem>
         </Card>
         </TouchableOpacity>
       }    
      />
     }
    </Content>
        ) : (
    <Content>
     {this.state.loading ? <Spinner color={this.state.spinnerColor} /> :
      <List
       dataArray={this.state.playlistdata}
       renderRow={(item) =>
        <TouchableOpacity onPress={() => this.handleItemPress(item)}>
         <Card>
          <CardItem>
           <Grid>
            <Row size={300}>
             <Col size={30} >
              <Image
               source={{ uri: item.thumbnail_url }}
               style={{ height: 100, width: 100, borderRadius: 8}}
              />
             </Col>
             <Col size={70} >
             <TouchableOpacity onPress={() => this.handleItemPress(item)}>
              <Row size={1} style={{ paddingTop: 10, paddingLeft: 10 }} >
               <Text style={styles.Title} >{item.title}</Text>
              </Row>
              </TouchableOpacity>
              <Row size={2} style={{paddingLeft: 10}} >
               <Text>presenter name: {item.presenter_name}</Text>
              </Row>
              <Row size={2} style={{paddingLeft: 10}} >
               <Text>{item.description}</Text>
              </Row>
              <Row size={2} style={{paddingLeft: 10}} >
               <Text>duration: {Math.round((item.video_duration)/60000)} minutes</Text>
              </Row>
             </Col>
            </Row>
           </Grid>
          </CardItem>
         </Card>
         </TouchableOpacity>
       }    
      />
     }
    </Content>
        )
      )}
    </ConnectivityRenderer>
    
   </Container>
  );
 }
}

const styles = StyleSheet.create({
 Title: {
  fontWeight: 'bold'
 },
 container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#F5FCFF',
 },
 welcome: {
  fontSize: 20,
  textAlign: 'center',
  margin: 10,
 },
 instructions: {
  textAlign: 'center',
  color: '#333333',
  marginBottom: 5,
 },
});