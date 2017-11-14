import React, { Component } from 'react'
import {ScrollView,  View,StyleSheet,Platform } from 'react-native'
import styled from 'styled-components/native'
import { KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

// Flex: 1 will force the form to take up remaining height of the view
class Form extends Component {
  constructor(props) {
    super(props)

    this.state = {
      height: null
    }

    this.onLayout = this.onLayout.bind(this)
  }
  scrollToTopDone=false;

  onLayout(e) {
    this.setState({
      height: e.nativeEvent.layout.height
    })
  }

  render() {
    const { children, ...rest } = this.props
    if( Platform.OS === 'ios' ) {
      return (
        <View style={styles.container} onLayout={this.onLayout}>
          <KeyboardAwareScrollView contentContainerStyle={{ minHeight: this.state.height }}
            ref='scrollView'
            keyboardShouldPersistTaps={"handled"}
            onContentSizeChange={(contentWidth, contentHeight)=>{
              if(this.scrollToTopDone==false){
                this.scrollToTopDone=true;
          //      this.refs.scrollView.scrollTo({x:0, y:0,animated:false});
                this.refs.scrollView.scrollToPosition(0,0,false)
              }
            }}>
              { children }
          </KeyboardAwareScrollView>
        </View>
      )
    }else{
      return (
        <View style={styles.container} onLayout={this.onLayout}>
          <ScrollView contentContainerStyle={{ minHeight: this.state.height }}
            ref='scrollView'
            onContentSizeChange={(contentWidth, contentHeight)=>{
            //  this.refs.scrollView.scrollTo({x:0, y:0,animated:false});
              //this.refs.scrollView.scrollToPosition(0,0,false)
            }}>
              { children }
          </ScrollView>
        </View>
      )
    }
  }
}

var styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'white',
        flexWrap:'wrap',
    },
  });
export default Form
