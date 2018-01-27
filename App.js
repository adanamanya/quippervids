import React, {
  Component,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PlayLists from './components/PlayList';
import Vids from './components/vids';
import {
  Scene,
  Router,
  Reducer,
} from 'react-native-router-flux';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
//     alignItems: 'center',
//   },
//   tabBarStyle: {
//     backgroundColor: '#eee',
//   },
//   tabBarSelectedItemStyle: {
//     backgroundColor: '#ddd',
//   },
// });

const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    console.log('ACTION:', action);
    return defaultReducer(state, action);
  };
};
const getSceneStyle = () => ({
  backgroundColor: 'white',
  shadowOpacity: 1,
  shadowRadius: 3,
});

const Example = () => {
  return (
    <Router createReducer={reducerCreate} tintColor='red' getSceneStyle={getSceneStyle}>
            <Scene key="root" hideNavBar hideTabBar>
              <Scene key="vids" component={Vids} title="Menu"/>
              <Scene key="playlists" component={PlayLists} initial title="Jakarta"/>
            </Scene>
    </Router>
  );
}

export default Example;
