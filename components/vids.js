import { Actions } from 'react-native-router-flux';
import React, {Component} from 'react';
import {
    Text,
    View,
    StyleSheet
} from 'react-native';

import VideoPlayer from 'react-native-video-controls';
import Orientation from 'react-native-orientation';

export default class Vids extends Component {
    constructor() {
        super();
        this.state = {
          videoUrl: undefined,
          spinnerColor: 'blue',
        };
      }
    _back(){
       Actions.playlists({type:'reset'});
    }
    render(){
        return (
            <View style={styles.container}>
                <VideoPlayer 
                    source={{uri:  this.props.video_url  }}
                    title={this.props.title}
                    onBack={() => this._back()}
                    disableFullscreen={ true } 
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

